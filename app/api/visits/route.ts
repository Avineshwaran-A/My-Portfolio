import { NextResponse } from 'next/server';

// Simple in-memory visitor counter (replace with Redis/KV for production persistence)
let visitorCount = 0;
const sessions = new Set<string>();

export async function GET() {
  return NextResponse.json({ count: visitorCount });
}

export async function POST(req: Request) {
  // Use a session identifier from cookie or IP to deduplicate within a session
  const forwarded = req.headers.get('x-forwarded-for') ?? 'unknown';
  const sessionKey = forwarded.split(',')[0].trim();

  if (!sessions.has(sessionKey)) {
    sessions.add(sessionKey);
    visitorCount++;

    // Keep sessions set from growing unboundedly (simple rolling window)
    if (sessions.size > 10000) {
      const first = sessions.values().next().value;
      if (first) sessions.delete(first);
    }
  }

  return NextResponse.json({ count: visitorCount });
}
