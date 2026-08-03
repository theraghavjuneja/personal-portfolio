import type { Project } from "@/types/project";

export const PROJECTS: Project[] = [
  {
    title: 'Zero-Downtime Migration: GCP to AWS',
    subtitle: 'Cloud Infrastructure Overhaul',
    description: 'Rewrote infra-as-code and re-architected networking to move a production platform across clouds without a single minute of downtime. Managed VPC peering, IAM migrations, and stateful service handoffs.',
    image: '/images/work-1.png',
    tags: ['Case Study', 'Terraform', 'AWS', 'GCP'],
    caseStudyUrl: '#',
    sourceUrl: '#',
  },
  {
    title: 'Scaling Workflows from 0 to 100K+ Daily',
    subtitle: 'Disposition-Based Campaign Engine',
    description: 'Architected an event-driven campaign engine for B2C enterprises using Temporal.IO — fault-tolerant by design, optimized for PostgreSQL at scale. Handles retries, timeouts and business logic as code.',
    image: '/images/work-2.png',
    tags: ['System Design', 'Temporal.IO', 'PostgreSQL'],
    caseStudyUrl: '/case-study/scaling-workflows',
    liveUrl: '#',
  },
  {
    title: 'Building Observability from Scratch',
    subtitle: 'Full-Stack Monitoring & Cost Engineering',
    description: 'Designed a full Promtail → Loki → Grafana pipeline with Prometheus metrics and mTLS — cutting cloud costs 40%+ through rightsizing driven by real usage data. Gave the team visibility they never had.',
    image: '/images/work-3.png',
    tags: ['Observability', 'Grafana', 'Cost Optimization'],
    caseStudyUrl: '#',
    sourceUrl: '#',
  },
  {
    title: 'PDF Translation at Scale',
    subtitle: 'Serverless ML Pipeline on GCP',
    description: 'Engineered a serverless pipeline translating 200-page scanned PDFs across 20+ languages in under 3 minutes, using Pub/Sub, Cloud Run Jobs, and concurrency-controlled Gemini API calls.',
    image: '/images/work-4.png',
    tags: ['GCP', 'AI/ML', 'Pub/Sub'],
    caseStudyUrl: '#',
    liveUrl: '#',
  },

];