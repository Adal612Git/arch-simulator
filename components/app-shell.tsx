'use client';

import { FlowCanvas } from '@/components/canvas/flow-canvas';
import { LeftPanel } from '@/components/left-panel';
import { RightPanel } from '@/components/right-panel';
import { TopBar } from '@/components/top-bar';

export function AppShell() {
  return (
    <div className="flex min-h-screen flex-col gap-4 p-6">
      <TopBar />
      <div className="grid flex-1 gap-4 lg:grid-cols-[280px_minmax(0,1fr)_320px]">
        <LeftPanel />
        <section className="panel relative overflow-hidden">
          <FlowCanvas />
        </section>
        <RightPanel />
      </div>
    </div>
  );
}
