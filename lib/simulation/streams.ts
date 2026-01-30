import { interval, map, share } from 'rxjs';

export const metricsStream = interval(1000).pipe(
  map((tick) => ({
    tick,
    rps: 12000 + Math.round(Math.sin(tick / 3) * 800),
    latency: 160 + Math.round(Math.cos(tick / 2) * 20)
  })),
  share()
);
