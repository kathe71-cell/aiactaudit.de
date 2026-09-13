export type RiskLevel = 'prohibited' | 'high' | 'transparency' | 'minimal';

export type UserRole = 'all' | 'provider' | 'deployer';

export interface AuditUseCase {
  id: string;
  title: string;
  category: string;
  riskLevel: RiskLevel;
  riskLabel: string;
  articleRef: string;
  description: string;
  providerObligations: string[];
  deployerObligations: string[];
  auditFocus: string;
  penalties: string;
  recommendedAction: string;
  partnerLinkText?: string;
  partnerLinkUrl?: string;
}

export interface RequirementArticle {
  article: string;
  title: string;
  subtitle: string;
  coreRequirements: string[];
  documentationRequired: string[];
  auditChecklist: string[];
  practicalTip: string;
}

export interface TimelineMilestone {
  date: string;
  dateRaw: string;
  title: string;
  status: 'past' | 'imminent' | 'future';
  targetGroup: string;
  description: string;
  keyPoints: string[];
  penaltyRisk: string;
}

export interface AuditTool {
  id: string;
  name: string;
  category: string;
  type: string;
  description: string;
  useCase: string;
  url: string;
  pricing: string;
  badge?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
  legalRef?: string;
}
