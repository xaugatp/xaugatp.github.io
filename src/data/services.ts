import type { Service } from '@/types'

export const services: Service[] = [
  {
    id: 'fullstack-engineering',
    icon: 'Globe',
    title: 'Fullstack Web Applications',
    description: 'I design and build complete web products from scratch: responsive frontends, scalable backends, and production databases. You get one engineer who owns the whole stack.',
    capabilities: [
      'Modern, responsive frontend development with component-based architecture',
      'Backend services in C#, .NET, Python, or the right tool for the job',
      'Database design, migrations, and performance-focused query patterns',
      'Clean, documented APIs and integration-ready architecture',
    ],
    highlighted: true,
  },
  {
    id: 'ai-engineering',
    icon: 'Bot',
    title: 'AI Systems and LLM Integration',
    description: 'I build production AI that works in your business: RAG pipelines, AI agents, document intelligence, and private offline deployments. Not demos—shipped, maintained software.',
    capabilities: [
      'Retrieval-augmented generation and semantic search',
      'LLM integration, prompt strategy, and evaluation',
      'Private, offline, and compliance-aware AI deployments',
      'Document extraction, structuring, and NLP automation',
    ],
    highlighted: true,
  },
  {
    id: 'ml-research',
    icon: 'FlaskConical',
    title: 'Computer Vision and Edge AI',
    description: 'Real-time vision systems for field, industrial, and embedded environments where latency and connectivity cannot be assumed.',
    capabilities: [
      'Object detection, segmentation, and tracking models',
      'Edge deployment on embedded, mobile, and field hardware',
      'Aerial, remote sensing, and on-device inference',
      'Performance tuning for low-latency, mission-critical workloads',
    ],
    highlighted: true,
  },
  {
    id: 'data-engineering',
    icon: 'BarChart3',
    title: 'Data Pipelines and Analytics',
    description: 'Automated data workflows, intelligent document parsing, predictive models, and dashboards that turn raw data into clear decisions.',
    capabilities: [
      'Data cleaning, validation, and feature engineering',
      'OCR and intelligent document processing',
      'Predictive modeling and anomaly detection',
      'Dashboard and reporting integrations',
    ],
  },
  {
    id: 'cloud-devops',
    icon: 'Cloud',
    title: 'Cloud and MLOps Infrastructure',
    description: 'Production cloud hosting, containerised model serving, and automated CI/CD pipelines. I deploy and operate your AI systems rather than just hand off code.',
    capabilities: [
      'Cloud architecture on AWS and Azure',
      'Containerised services and model serving',
      'CI/CD, monitoring, and observability',
      'Performance and cost optimisation',
    ],
  },
  {
    id: 'consulting-discovery',
    icon: 'Cpu',
    title: 'Technical Consulting and Audits',
    description: 'AI readiness assessments, architecture discovery sessions, and proof-of-concept prototypes. Understand what is feasible before you commit to a build.',
    capabilities: [
      'Feasibility, risk, and architecture reviews',
      'Research institution and enterprise collaboration',
      'Rapid prototypes and interactive demos',
      'Technical documentation and publication support',
    ],
  },
]
