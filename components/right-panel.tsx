'use client';

import { initialNodes } from '@/lib/graph/sample';
import { useUiStore } from '@/lib/store/ui-store';
import type { SystemNodeData } from '@/lib/types';

const metrics = [
  { label: 'RPS', value: '12.4k', trend: '+6%' },
  { label: 'p95 Latency', value: '180ms', trend: '-12%' },
  { label: 'Error Rate', value: '0.8%', trend: '+0.2%' }
];

const alerts = [
  {
    title: 'Circuit breaker activo',
    detail: 'payments-service en modo degradado'
  },
  {
    title: 'Posible SPOF',
    detail: 'cache-layer no redundante'
  }
];

export function RightPanel() {
  const selectedNodeId = useUiStore((state) => state.selectedNodeId);
  const mode = useUiStore((state) => state.mode);
  const selectedNode = initialNodes.find((node) => node.id === selectedNodeId);
  const selectedData = selectedNode?.data as SystemNodeData | undefined;

  const recommendations = {
    design: [
      'Agregar réplica en Postgres para lecturas',
      'Aislar Cache Layer en subnet dedicada'
    ],
    simulation: [
      'Elevar tráfico a 20k RPS en gateway',
      'Simular timeouts en Service Mesh'
    ],
    analysis: [
      'Eliminar SPOF en Cache Layer',
      'Balancear cargas en Payments'
    ],
    'stress-test': [
      'Probar límite de CPU en Payments',
      'Validar autoscaling en Gateway'
    ],
    disaster: [
      'Failover automático en Postgres',
      'Revalidar health checks del LB'
    ]
  };

  return (
    <aside className="panel flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <span className="panel-title">Inspector</span>
        <span className="badge">Live</span>
      </div>
      <div className="grid gap-3">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <div className="text-xs uppercase tracking-[0.2em] text-white/50">
              {metric.label}
            </div>
            <div className="mt-2 flex items-end justify-between">
              <div className="text-2xl font-semibold">{metric.value}</div>
              <div className="text-xs text-glow">{metric.trend}</div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="panel-title mb-2">Servicio activo</div>
        {selectedData ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm font-semibold">{selectedData.title}</div>
            <div className="text-xs text-white/60">{selectedData.subtitle}</div>
            <div className="mt-2 text-[0.7rem] text-white/60">
              {selectedData.description}
            </div>
            <div className="mt-2 flex flex-wrap gap-2 text-[0.65rem] text-white/60">
              {selectedData.category && (
                <span>Categoria: {selectedData.category}</span>
              )}
              {selectedData.tech && <span>Tech: {selectedData.tech}</span>}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedData.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/10 px-2 py-1 text-[0.6rem] uppercase tracking-[0.2em]"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-3 text-[0.65rem] text-white/50">
              <span>Owner: {selectedData.owner}</span>
              {typeof selectedData.costMonthly === 'number' && (
                <span>Coste: ${selectedData.costMonthly}/mes</span>
              )}
              {typeof selectedData.perfScore === 'number' && (
                <span>Perf: {selectedData.perfScore}</span>
              )}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/50">
            Selecciona un nodo para ver detalles de la infraestructura.
          </div>
        )}
      </div>
      <div>
        <div className="panel-title mb-2">Alertas</div>
        <div className="space-y-2">
          {alerts.map((alert) => (
            <div
              key={alert.title}
              className="rounded-2xl border border-danger/40 bg-danger/10 p-3"
            >
              <div className="text-sm font-semibold text-danger">
                {alert.title}
              </div>
              <div className="text-xs text-white/60">{alert.detail}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="panel-title mb-2">Decisiones sugeridas</div>
        <div className="space-y-2">
          {recommendations[mode].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-white/70"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
