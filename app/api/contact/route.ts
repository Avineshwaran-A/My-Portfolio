import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validators';

// Simple in-memory rate limiting (upgrade to Redis for production)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function getRateLimit(ip: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterSec: 0 };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, retryAfterSec: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count++;
  return { allowed: true, retryAfterSec: 0 };
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const { allowed, retryAfterSec } = getRateLimit(ip);

    if (!allowed) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: { 'Retry-After': String(retryAfterSec) },
        }
      );
    }

    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed.',
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, message, honeypot } = parsed.data;

    // Honeypot check
    if (honeypot && honeypot.length > 0) {
      // Silently succeed (don't reveal bot detection)
      return NextResponse.json({ success: true });
    }

    // Log metadata only (no PII message body in production logs)
    console.log('[contact] submission received', {
      timestamp: new Date().toISOString(),
      nameLen: name.length,
      emailDomain: email.split('@')[1],
      msgLen: message.length,
      ip: ip.substring(0, 8) + '…', // partial IP
    });

    // Email sending — configure CONTACT_TO_EMAIL env var
    // Using fetch to call Resend API if RESEND_API_KEY is set
    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (resendKey && toEmail) {
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: [toEmail],
          subject: `Portfolio message from ${name}`,
          html: `
            <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
              <h2 style="color: #2f6b4f; margin-bottom: 16px;">New Portfolio Message</h2>
              <p><strong>From:</strong> ${name.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
              <p><strong>Email:</strong> ${email.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
              <hr style="border: 1px solid #e5e7eb; margin: 16px 0;" />
              <p style="white-space: pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
            </div>
          `,
          reply_to: email,
        }),
      });

      if (!emailRes.ok) {
        console.error('[contact] Resend API error', await emailRes.text());
        return NextResponse.json(
          { success: false, message: 'Message queuing failed. Please try again.' },
          { status: 500 }
        );
      }
    } else {
      // Development: just log (no email sent)
      console.log('[contact] DEV MODE — email would be sent to:', toEmail ?? 'CONTACT_TO_EMAIL not set');
      console.log('[contact] name:', name, '| email:', email);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact] unexpected error', err);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
