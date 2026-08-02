export interface Project {
  title: string;
  subtitle?: string;
  description: string;
  image: string | null;
  tags: string[];
  brand?: string;
  caseStudyUrl?: string;
  sourceUrl?: string;
  liveUrl?: string;
}