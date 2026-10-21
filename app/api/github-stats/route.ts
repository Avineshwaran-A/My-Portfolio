import { NextRequest, NextResponse } from 'next/server';
import { githubStatsQuerySchema } from '@/lib/validators';

// Simple in-memory cache (TTL 1 hour)
const cache = new Map<string, { data: unknown; expiresAt: number }>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const repo = searchParams.get('repo');

  const parsed = githubStatsQuerySchema.safeParse({ repo });
  if (!parsed.success) {
    return NextResponse.json({ success: false, message: 'Invalid repo parameter.' }, { status: 400 });
  }

  const { repo: validRepo } = parsed.data;

  // Check cache
  const cached = cache.get(validRepo);
  if (cached && cached.expiresAt > Date.now()) {
    return NextResponse.json(cached.data, {
      headers: {
        'X-Cache': 'HIT',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  try {
    const githubToken = process.env.GITHUB_TOKEN;
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'avineshwaran-portfolio',
    };
    if (githubToken) headers['Authorization'] = `token ${githubToken}`;

    const res = await fetch(`https://api.github.com/repos/${validRepo}`, {
      headers,
      next: { revalidate: 3600 }, // Next.js cache
    });

    if (!res.ok) {
      // Try serving stale cache on GitHub error
      if (cached) {
        return NextResponse.json(cached.data, { headers: { 'X-Cache': 'STALE' } });
      }
      return NextResponse.json(
        { success: false, message: 'GitHub API unavailable.' },
        { status: 502 }
      );
    }

    const gh = await res.json();
    const stats = {
      stars: gh.stargazers_count ?? 0,
      forks: gh.forks_count ?? 0,
      updatedAt: gh.updated_at ?? new Date().toISOString(),
    };

    cache.set(validRepo, { data: stats, expiresAt: Date.now() + CACHE_TTL });

    return NextResponse.json(stats, {
      headers: {
        'X-Cache': 'MISS',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (err) {
    console.error('[github-stats] error', err);
    if (cached) {
      return NextResponse.json(cached.data, { headers: { 'X-Cache': 'STALE' } });
    }
    return NextResponse.json(
      { success: false, message: 'Failed to fetch GitHub stats.' },
      { status: 502 }
    );
  }
}
