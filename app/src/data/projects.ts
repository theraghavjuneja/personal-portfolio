import type { Project } from "@/types/project";

export const PROJECTS: Project[] = [
  {
    title: 'Zero-Downtime Migration: GCP to AWS',
    description: 'Rewrote infra-as-code and re-architected networking to move a production platform across clouds without a single minute of downtime.',
    image: '/images/work-1.jpg',
    tags: ['Case Study', 'Terraform', 'AWS', 'GCP'],
  },
  {
    title: 'Scaling Workflows from 0 to 100K+ Daily',
    description: 'Architected an event-driven, disposition-based campaign engine for B2C enterprises using Temporal.IO — fault-tolerant by design, optimized for PostgreSQL at scale.',
    image: '/images/work-2.jpg',
    tags: ['System Design', 'Temporal.IO', 'PostgreSQL'],
  },
  {
    title: 'Building Observability from Scratch',
    description: 'Designed a full Promtail → Loki → Grafana pipeline with Prometheus metrics and mTLS — cutting cloud costs 40%+ through rightsizing driven by real usage data.',
    image: '/images/work-3.jpg',
    tags: ['Observability', 'Grafana', 'Cost Optimization'],
  },
  {
    title: 'Meta-Compliant WhatsApp Messaging Platform',
    description: 'Built stateful WhatsApp flows, webhooks, and AI chatbots on top of a multi-provider communication layer with circuit breakers across 5+ providers.',
    image: '/images/work-4.jpg',
    tags: ['Case Study', 'Node.js', 'System Design'],
  },
  {
    title: 'PDF Translation at Scale',
    description: 'Engineered a serverless pipeline translating 200-page scanned PDFs across 20+ languages in under 3 minutes, using Pub/Sub, Cloud Run Jobs, and concurrency-controlled Gemini calls.',
    image: '/images/work-5.jpg',
    tags: ['Fintech', 'GCP', 'AI/ML'],
  },
  {
    title: 'MediScan AI — Medical Imaging Analyzer',
    description: 'A distributed system for MRI & X-ray disease detection, using Celery workers to offload heavy ML inference and keep the UI responsive.',
    image: '/images/work-6.jpg',
    tags: ['Healthcare', 'TensorFlow', 'Distributed Systems'],
  },


  // remaining projects...
];