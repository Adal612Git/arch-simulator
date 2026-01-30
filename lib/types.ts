export type Protocol =
  | 'http'
  | 'grpc'
  | 'websocket'
  | 'kafka'
  | 'postgres'
  | 'redis';

export type ConnectionDirection = 'unidirectional' | 'bidirectional' | 'pubsub';
export type ConnectionCriticality = 'low' | 'medium' | 'high' | 'critical';
export type HealthVariant = 'healthy' | 'warning' | 'error' | 'degraded';

export type ConnectionStyle = {
  stroke: string;
  strokeWidth: number;
  animated?: boolean;
  strokeDasharray?: string;
};

export interface SystemConnection {
  id: string;
  source: string;
  target: string;
  protocol: Protocol;
  direction: ConnectionDirection;
  criticality: ConnectionCriticality;
  latency: { min: number; max: number; unit: 'ms' | 's' };
  bandwidth: number;
  failureRate: number;
  metrics: {
    rps: number;
    errorRate: number;
    p99: number;
  };
  style: {
    base: ConnectionStyle;
    variant: HealthVariant;
  };
}

export const connectionStyles: Record<HealthVariant, ConnectionStyle> = {
  healthy: { stroke: '#10b981', strokeWidth: 2, animated: false },
  warning: { stroke: '#f59e0b', strokeWidth: 3, animated: true },
  error: { stroke: '#ef4444', strokeWidth: 4, strokeDasharray: '5,5' },
  degraded: { stroke: '#8b5cf6', strokeWidth: 2, strokeDasharray: '10,3' }
};

export type OperationMode =
  | 'design'
  | 'simulation'
  | 'analysis'
  | 'stress-test'
  | 'disaster';

export type SystemNodeKind =
  | 'dns'
  | 'gateway'
  | 'load-balancer'
  | 'mesh'
  | 'service'
  | 'database'
  | 'cache'
  | 'queue'
  | 'infrastructure';

export type SystemNodeData = {
  title: string;
  subtitle: string;
  description: string;
  kind: SystemNodeKind;
  stack: string[];
  owner: string;
  category?: string;
  tech?: string;
  costMonthly?: number;
  perfScore?: number;
  metrics: {
    rps: string;
    latency: string;
    errorRate: string;
  };
};
