'use client';

import type { NodeProps } from 'reactflow';
import type { SystemNodeData } from '@/lib/types';

const kindLabel: Record<SystemNodeData['kind'], string> = {
  dns: 'DNS',
  gateway: 'Gateway',
  'load-balancer': 'Load Balancer',
  mesh: 'Service Mesh',
  service: 'Service',
  database: 'Database',
  cache: 'Cache',
  queue: 'Event Bus',
  infrastructure: 'Infra'
};

export function SystemNode({ data, selected }: NodeProps<SystemNodeData>) {
  return (
    <div
      className={`rounded-2xl border px-4 py-3 text-left shadow-glow transition ${
        selected
          ? 'border-glow/80 bg-white/15'
          : 'border-white/15 bg-white/10'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="text-xs uppercase tracking-[0.25em] text-white/50">
          {kindLabel[data.kind]}
        </div>
        <div className="text-[0.6rem] uppercase tracking-[0.2em] text-glow">
          {data.metrics.rps} rps
        </div>
      </div>
      <div className="mt-2 text-sm font-semibold">{data.title}</div>
      <div className="text-xs text-white/60">{data.subtitle}</div>
      <div className="mt-2 text-[0.65rem] text-white/50">
        {data.description}
      </div>
    </div>
  );
}
