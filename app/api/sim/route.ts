import { NextResponse } from 'next/server';
import { z } from 'zod';

const querySchema = z.object({
  mode: z.string().optional()
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({
    mode: searchParams.get('mode') ?? undefined
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid query params' },
      { status: 400 }
    );
  }

  return NextResponse.json({
    status: 'ok',
    mode: parsed.data.mode ?? 'design',
    metrics: {
      rps: 12480,
      p95: 182,
      errorRate: 0.008
    }
  });
}
