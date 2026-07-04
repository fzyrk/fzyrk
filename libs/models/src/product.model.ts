export type ProductStatus = 'live' | 'coming-soon' | 'beta';

export interface Product {
  id: string;
  name: string;
  icon: string;
  description: string;
  longDescription?: string;
  status: ProductStatus;
  route?: string;
  features?: string[];
  techStack?: string[];
}
