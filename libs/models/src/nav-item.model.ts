export interface NavItem {
  label: string;
  route?: string;
  fragment?: string;
  icon?: string;
  children?: NavItem[];
  external?: boolean;
}

export interface Value {
  icon: string;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
  bio?: string;
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
  badge?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
