'use client';

import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useReactFlow,
  addEdge,
  type Connection
} from 'reactflow';
import { initialEdges, initialNodes } from '@/lib/graph/sample';
import { useUiStore } from '@/lib/store/ui-store';
import { SystemNode } from '@/components/canvas/system-node';
import type { SystemNodeData } from '@/lib/types';

function FlowCanvasInner() {
  const selectNode = useUiStore((state) => state.selectNode);
  const mode = useUiStore((state) => state.mode);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const nodeTypes = useMemo(() => ({ system: SystemNode }), []);
  const [nodes, setNodes, onNodesChange] =
    useNodesState<SystemNodeData>(initialNodes);
  const [edgesState, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    const raw = window.localStorage.getItem('arch-sim-state');
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as {
        nodes?: Node<SystemNodeData>[];
        edges?: Edge[];
      };
      if (parsed.nodes && parsed.nodes.length > 0) {
        setNodes(parsed.nodes);
      }
      if (parsed.edges && parsed.edges.length > 0) {
        setEdges(parsed.edges);
      }
    } catch {
      // Ignore corrupted local data
    }
  }, [setEdges, setNodes]);

  useEffect(() => {
    const payload = JSON.stringify({ nodes, edges: edgesState });
    window.localStorage.setItem('arch-sim-state', payload);
  }, [nodes, edgesState]);

  const viewEdges = useMemo(() => {
    return edgesState.map((edge) => {
      if (mode === 'simulation') {
        return { ...edge, animated: true };
      }
      if (mode === 'analysis') {
        return {
          ...edge,
          style: {
            ...(edge.style ?? {}),
            strokeWidth: 3
          }
        };
      }
      if (mode === 'disaster') {
        return {
          ...edge,
          style: {
            ...(edge.style ?? {}),
            stroke: '#ff6b4a',
            strokeDasharray: '4 4'
          }
        };
      }
      if (mode === 'stress-test') {
        return {
          ...edge,
          animated: true,
          style: {
            ...(edge.style ?? {}),
            strokeWidth: 4
          }
        };
      }
      return edge;
    });
  }, [edgesState, mode]);

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node<SystemNodeData>) => {
      selectNode(node.id);
    },
    [selectNode]
  );

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const raw = event.dataTransfer.getData('application/reactflow');
      if (!raw || !wrapperRef.current) return;
      const payload = JSON.parse(raw) as {
        title: string;
        subtitle: string;
        detail: string;
        kind: SystemNodeData['kind'];
      };
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY
      });
      const id = `${payload.kind}-${Date.now()}`;
      setNodes((current) => [
        ...current,
        {
          id,
          type: 'system',
          position,
          data: {
            title: payload.title,
            subtitle: payload.subtitle,
            description: payload.detail,
            kind: payload.kind,
            stack: ['Drag & Drop'],
            owner: 'Manual',
            metrics: { rps: '0', latency: '-', errorRate: '-' }
          }
        }
      ]);
    },
    [screenToFlowPosition, setNodes]
  );

  const handleConnect = useCallback(
    (connection: Connection) => {
      setEdges((current) =>
        addEdge(
          {
            ...connection,
            animated: mode !== 'design',
            label: 'custom',
            style: { stroke: '#42f5d3', strokeWidth: 2 }
          },
          current
        )
      );
    },
    [mode, setEdges]
  );

  return (
    <div
      className="relative h-[640px] w-full"
      ref={wrapperRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <ReactFlow
        nodes={nodes}
        edges={viewEdges as Edge[]}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        onNodeClick={handleNodeClick}
        fitView
        proOptions={{ hideAttribution: true }}
        nodeTypes={nodeTypes}
      >
        <Background gap={24} size={1} color="rgba(255,255,255,0.06)" />
        <MiniMap
          pannable
          zoomable
          nodeColor={() => '#42f5d3'}
          maskColor="rgba(9, 12, 19, 0.65)"
        />
        <Controls />
      </ReactFlow>
      <div className="pointer-events-none absolute left-4 top-4 flex flex-col gap-2 rounded-2xl border border-white/10 bg-black/40 p-3 text-xs text-white/70">
        <div className="text-[0.6rem] uppercase tracking-[0.3em] text-white/50">
          Leyenda
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-4 rounded bg-[#42f5d3]" /> HTTP / Edge
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-4 rounded bg-[#3de0ff]" /> mTLS / Mesh
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-4 rounded bg-[#f59e0b]" /> Postgres
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-4 rounded bg-[#10b981]" /> Kafka
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-4 rounded bg-[#ff6b4a]" /> Riesgo alto
        </div>
      </div>
    </div>
  );
}

export function FlowCanvas() {
  return (
    <ReactFlowProvider>
      <FlowCanvasInner />
    </ReactFlowProvider>
  );
}
