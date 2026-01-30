'use client';

import { useMemo, useState } from 'react';
import topology from '@/lib/data/topology.json';
import { useUiStore } from '@/lib/store/ui-store';

const modeDescriptions = {
  design: 'Arrastra componentes y define conexiones semánticas.',
  simulation: 'Inyecta tráfico y observa métricas en tiempo real.',
  analysis: 'Detecta SPOF, cuellos de botella y riesgos.',
  'stress-test': 'Eleva carga y valida capacidad límite.',
  disaster: 'Simula fallos catastróficos y recuperación.'
};

const catalog = [
  {
    title: 'API Gateway',
    subtitle: 'Autenticación + Rate limit',
    detail: 'Aplica políticas de acceso y observabilidad.',
    kind: 'gateway'
  },
  {
    title: 'Service Mesh',
    subtitle: 'mTLS + retries',
    detail: 'Gestión de tráfico y resiliencia interna.',
    kind: 'mesh'
  },
  {
    title: 'Postgres Core',
    subtitle: 'Transacciones críticas',
    detail: 'Base transaccional con réplicas.',
    kind: 'database'
  },
  {
    title: 'Kafka Bus',
    subtitle: 'Eventos de dominio',
    detail: 'Auditoría y comunicación asíncrona.',
    kind: 'queue'
  }
];

const infraHighlights = topology.nodes.filter(
  (node) => node.category === 'Infraestructura'
);

const dataHighlights = topology.nodes.filter(
  (node) => node.category === 'Bases de datos'
);

export function LeftPanel() {
  const mode = useUiStore((state) => state.mode);
  const [customTitle, setCustomTitle] = useState('');
  const [customSubtitle, setCustomSubtitle] = useState('');
  const [customDetail, setCustomDetail] = useState('');
  const [customKind, setCustomKind] =
    useState<(typeof catalog)[number]['kind']>('service');

  const customCard = useMemo(
    () => ({
      title: customTitle.trim() || 'Custom Component',
      subtitle: customSubtitle.trim() || 'Nueva tecnologia',
      detail: customDetail.trim() || 'Define su rol y alcance.',
      kind: customKind
    }),
    [customDetail, customKind, customSubtitle, customTitle]
  );

  return (
    <aside className="panel flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <span className="panel-title">Library</span>
        <span className="badge">Core</span>
      </div>
      <div className="rounded-2xl border border-glow/30 bg-glow/10 p-4">
        <div className="text-xs uppercase tracking-[0.25em] text-glow">
          {mode}
        </div>
        <div className="mt-2 text-sm text-white/80">
          {modeDescriptions[mode]}
        </div>
      </div>
      <div className="space-y-3">
        {catalog.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-glow/50"
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData(
                'application/reactflow',
                JSON.stringify(item)
              );
              event.dataTransfer.effectAllowed = 'move';
            }}
          >
            <div className="text-sm font-semibold">{item.title}</div>
            <div className="text-xs text-white/60">{item.subtitle}</div>
            <div className="mt-2 text-[0.65rem] text-white/50">
              {item.detail}
            </div>
            <div className="mt-2 text-[0.6rem] uppercase tracking-[0.2em] text-white/40">
              Arrastra al canvas
            </div>
          </div>
        ))}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs uppercase tracking-[0.25em] text-white/50">
            Nueva tecnologia
          </div>
          <input
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white"
            placeholder="Nombre (ej: CDN Global)"
            value={customTitle}
            onChange={(event) => setCustomTitle(event.target.value)}
          />
          <input
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white"
            placeholder="Subtitulo (ej: Edge caching)"
            value={customSubtitle}
            onChange={(event) => setCustomSubtitle(event.target.value)}
          />
          <textarea
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white"
            placeholder="Descripcion corta"
            rows={2}
            value={customDetail}
            onChange={(event) => setCustomDetail(event.target.value)}
          />
          <select
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white"
            value={customKind}
            onChange={(event) =>
              setCustomKind(
                event.target.value as (typeof catalog)[number]['kind']
              )
            }
          >
            <option value="service">Service</option>
            <option value="gateway">Gateway</option>
            <option value="mesh">Service Mesh</option>
            <option value="database">Database</option>
            <option value="cache">Cache</option>
            <option value="queue">Event Bus</option>
            <option value="load-balancer">Load Balancer</option>
            <option value="dns">DNS</option>
          </select>
          <div
            className="mt-3 rounded-2xl border border-glow/30 bg-glow/10 p-3"
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData(
                'application/reactflow',
                JSON.stringify(customCard)
              );
              event.dataTransfer.effectAllowed = 'move';
            }}
          >
            <div className="text-sm font-semibold">{customCard.title}</div>
            <div className="text-xs text-white/60">{customCard.subtitle}</div>
            <div className="mt-2 text-[0.65rem] text-white/50">
              {customCard.detail}
            </div>
            <div className="mt-2 text-[0.6rem] uppercase tracking-[0.2em] text-glow">
              Arrastra al canvas
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="panel-title mb-2">Infraestructura real</div>
        <div className="grid gap-2">
          {infraHighlights.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-3"
            >
              <div className="text-xs font-semibold">{item.title}</div>
              <div className="text-[0.65rem] text-white/50">
                {item.tech} · ${item.cost}/mes
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="panel-title mb-2">Bases de datos</div>
        <div className="grid gap-2">
          {dataHighlights.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-3"
            >
              <div className="text-xs font-semibold">{item.title}</div>
              <div className="text-[0.65rem] text-white/50">
                {item.tech} · ${item.cost}/mes
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="panel-title mb-2">Stack activo</div>
        <div className="flex flex-wrap gap-2">
          {['Next.js 14', 'TypeScript', 'PostgreSQL', 'Redis', 'Kafka'].map(
            (item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/10 px-2 py-1 text-[0.6rem] uppercase tracking-[0.2em]"
              >
                {item}
              </span>
            )
          )}
        </div>
      </div>
      <div className="mt-auto rounded-2xl border border-ember/30 bg-ember/10 p-4">
        <div className="text-sm font-semibold">Stress Score</div>
        <div className="mt-2 text-2xl font-semibold text-ember">72%</div>
        <div className="text-xs text-white/60">Alta saturación en edge</div>
      </div>
    </aside>
  );
}
