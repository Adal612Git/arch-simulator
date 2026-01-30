'use client';

import { Button } from '@/components/ui/button';
import { useUiStore } from '@/lib/store/ui-store';

const modes = [
  'design',
  'simulation',
  'analysis',
  'stress-test',
  'disaster'
] as const;

const modeLabels: Record<(typeof modes)[number], string> = {
  design: 'Diseño',
  simulation: 'Simulación',
  analysis: 'Análisis',
  'stress-test': 'Stress',
  disaster: 'Disaster'
};

export function TopBar() {
  const mode = useUiStore((state) => state.mode);
  const setMode = useUiStore((state) => state.setMode);

  return (
    <header className="panel flex flex-wrap items-center justify-between gap-4 px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/10" />
        <div>
          <div className="text-lg font-semibold">Digital Twin Console</div>
          <div className="text-sm text-white/60">
            Modo activo: <span className="text-glow">{modeLabels[mode]}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {modes.map((item) => (
          <Button
            key={item}
            variant={item === mode ? 'primary' : 'secondary'}
            className="uppercase tracking-[0.2em] text-[0.65rem]"
            onClick={() => setMode(item)}
          >
            {item}
          </Button>
        ))}
      </div>
    </header>
  );
}
