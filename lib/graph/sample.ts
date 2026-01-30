import type { Edge, Node } from 'reactflow';
import type { SystemNodeData } from '@/lib/types';

const withData = (data: SystemNodeData): SystemNodeData => data;

export const initialNodes: Node<SystemNodeData>[] = [
  {
    id: 'aws',
    type: 'system',
    position: { x: 60, y: 20 },
    data: withData({
      title: 'AWS Core',
      subtitle: 'EC2 + S3',
      description: 'Proveedor principal de infraestructura y almacenamiento.',
      kind: 'infrastructure',
      category: 'Infraestructura',
      tech: 'EC2 + S3',
      costMonthly: 320,
      perfScore: 85,
      stack: ['EC2', 'S3', 'CloudWatch'],
      owner: 'Infra Core',
      metrics: { rps: '34k', latency: '12ms', errorRate: '0.02%' }
    })
  },
  {
    id: 'vpc',
    type: 'system',
    position: { x: 60, y: 160 },
    data: withData({
      title: 'VPC / Network',
      subtitle: 'Subnets + VPN',
      description: 'Segmentación y túneles seguros entre zonas.',
      kind: 'infrastructure',
      category: 'Infraestructura',
      tech: 'Subnets + VPN',
      costMonthly: 15,
      perfScore: 80,
      stack: ['VPC', 'VPN', 'Security Groups'],
      owner: 'Infra Core',
      metrics: { rps: '28k', latency: '6ms', errorRate: '0.01%' }
    })
  },
  {
    id: 'lb',
    type: 'system',
    position: { x: 60, y: 300 },
    data: withData({
      title: 'Load Balancer',
      subtitle: 'L4/L7',
      description: 'Balanceo global y health checks de entrada.',
      kind: 'load-balancer',
      category: 'Infraestructura',
      tech: 'L4/L7',
      costMonthly: 18,
      perfScore: 82,
      stack: ['ALB', 'WAF', 'Health checks'],
      owner: 'Infra Core',
      metrics: { rps: '24k', latency: '9ms', errorRate: '0.03%' }
    })
  },
  {
    id: 'dns',
    type: 'system',
    position: { x: 280, y: 60 },
    data: withData({
      title: 'DNS Resolver',
      subtitle: 'Edge Routing Layer',
      description: 'Resuelve dominios, aplica health-checks y enruta al gateway.',
      kind: 'dns',
      category: 'Infraestructura',
      tech: 'Route 53',
      costMonthly: 12,
      perfScore: 88,
      stack: ['Route 53', 'Health checks', 'Geo routing'],
      owner: 'Infra Core',
      metrics: { rps: '28k', latency: '8ms', errorRate: '0.01%' }
    })
  },
  {
    id: 'gateway',
    type: 'system',
    position: { x: 520, y: 60 },
    data: withData({
      title: 'API Gateway',
      subtitle: 'Auth + Rate Limit',
      description: 'Punto de entrada global, tokens, throttling y observabilidad.',
      kind: 'gateway',
      category: 'Plataforma',
      tech: 'OAuth2 + WAF',
      costMonthly: 64,
      perfScore: 79,
      stack: ['OAuth2', 'Rate limits', 'WAF'],
      owner: 'Platform',
      metrics: { rps: '19k', latency: '24ms', errorRate: '0.12%' }
    })
  },
  {
    id: 'mesh',
    type: 'system',
    position: { x: 820, y: 60 },
    data: withData({
      title: 'Service Mesh',
      subtitle: 'mTLS + Telemetry',
      description: 'Controla tráfico interno, retries y circuit breakers.',
      kind: 'mesh',
      category: 'Plataforma',
      tech: 'Istio',
      costMonthly: 48,
      perfScore: 83,
      stack: ['Istio', 'mTLS', 'Envoy'],
      owner: 'SRE',
      metrics: { rps: '14k', latency: '15ms', errorRate: '0.06%' }
    })
  },
  {
    id: 'payments',
    type: 'system',
    position: { x: 860, y: 260 },
    data: withData({
      title: 'Payments Core',
      subtitle: 'Cobros con tarjeta',
      description: 'Orquesta cobros, antifraude y conciliación.',
      kind: 'service',
      category: 'Negocio',
      tech: 'Node + Stripe',
      costMonthly: 120,
      perfScore: 76,
      stack: ['Node.js', 'Stripe', 'Risk Engine'],
      owner: 'FinTech',
      metrics: { rps: '3.1k', latency: '220ms', errorRate: '0.8%' }
    })
  },
  {
    id: 'orders',
    type: 'system',
    position: { x: 820, y: 420 },
    data: withData({
      title: 'Order Orchestrator',
      subtitle: 'Estado de pedidos',
      description: 'Coordina inventario, pagos y fulfillment.',
      kind: 'service',
      category: 'Negocio',
      tech: 'Go + Temporal',
      costMonthly: 96,
      perfScore: 81,
      stack: ['Go', 'gRPC', 'Temporal'],
      owner: 'Commerce',
      metrics: { rps: '5.4k', latency: '140ms', errorRate: '0.3%' }
    })
  },
  {
    id: 'cache',
    type: 'system',
    position: { x: 520, y: 260 },
    data: withData({
      title: 'Redis Cluster',
      subtitle: 'Cache + Streams',
      description: 'Acelera lecturas y reduce presión a Postgres.',
      kind: 'cache',
      category: 'Data',
      tech: 'Redis',
      costMonthly: 18,
      perfScore: 88,
      stack: ['Redis', 'Sentinel', 'TTL policies'],
      owner: 'Platform',
      metrics: { rps: '42k', latency: '3ms', errorRate: '0.02%' }
    })
  },
  {
    id: 'db',
    type: 'system',
    position: { x: 520, y: 420 },
    data: withData({
      title: 'Postgres Primary',
      subtitle: 'OLTP + Billing',
      description: 'Datos transaccionales y contabilidad principal.',
      kind: 'database',
      category: 'Data',
      tech: 'Postgres 15',
      costMonthly: 45,
      perfScore: 86,
      stack: ['Postgres 15', 'Read replicas', 'PITR'],
      owner: 'Data',
      metrics: { rps: '2.2k', latency: '18ms', errorRate: '0.04%' }
    })
  },
  {
    id: 'queue',
    type: 'system',
    position: { x: 1100, y: 260 },
    data: withData({
      title: 'Event Bus',
      subtitle: 'Kafka Topics',
      description: 'Eventos de dominio y flujos de auditoría.',
      kind: 'queue',
      category: 'Data',
      tech: 'Kafka',
      costMonthly: 54,
      perfScore: 84,
      stack: ['Kafka', 'Schema Registry', 'DLQ'],
      owner: 'Data',
      metrics: { rps: '8.2k', latency: '12ms', errorRate: '0.05%' }
    })
  }
];

export const initialEdges: Edge[] = [
  {
    id: 'aws-vpc',
    source: 'aws',
    target: 'vpc',
    animated: true,
    label: 'Private link',
    style: { stroke: '#8c96b2', strokeWidth: 2 }
  },
  {
    id: 'vpc-lb',
    source: 'vpc',
    target: 'lb',
    animated: true,
    label: 'Ingress',
    style: { stroke: '#42f5d3', strokeWidth: 2 }
  },
  {
    id: 'lb-dns',
    source: 'lb',
    target: 'dns',
    animated: true,
    label: 'Anycast',
    style: { stroke: '#3de0ff', strokeWidth: 2 }
  },
  {
    id: 'dns-gateway',
    source: 'dns',
    target: 'gateway',
    animated: true,
    label: 'HTTP/2',
    style: { stroke: '#42f5d3', strokeWidth: 2 }
  },
  {
    id: 'gateway-mesh',
    source: 'gateway',
    target: 'mesh',
    animated: true,
    label: 'mTLS',
    style: { stroke: '#3de0ff', strokeWidth: 2 }
  },
  {
    id: 'mesh-payments',
    source: 'mesh',
    target: 'payments',
    label: 'gRPC',
    style: { stroke: '#ff6b4a', strokeWidth: 3, strokeDasharray: '6 4' }
  },
  {
    id: 'mesh-orders',
    source: 'mesh',
    target: 'orders',
    label: 'gRPC',
    style: { stroke: '#8c96b2', strokeWidth: 2 }
  },
  {
    id: 'gateway-cache',
    source: 'gateway',
    target: 'cache',
    label: 'Redis',
    style: { stroke: '#8c96b2', strokeWidth: 2 }
  },
  {
    id: 'orders-db',
    source: 'orders',
    target: 'db',
    label: 'Postgres',
    style: { stroke: '#f59e0b', strokeWidth: 2 }
  },
  {
    id: 'payments-queue',
    source: 'payments',
    target: 'queue',
    label: 'Kafka',
    style: { stroke: '#10b981', strokeWidth: 2 }
  }
];
