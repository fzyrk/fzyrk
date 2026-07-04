export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  slug: string;
  coverImage?: string;
  tags?: string[];
  author?: string;
}
