import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

/**
 * SeoService — dynamically sets page title, meta description, and OG tags.
 * Inject in page components and call update() on init.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly SITE_NAME = 'Fzyrk';
  private readonly BASE_URL = 'https://fzyrk.com';
  private readonly DEFAULT_OG_IMAGE = `${this.BASE_URL}/og-image.png`;

  constructor(private title: Title, private meta: Meta) {}

  update(config: SeoConfig): void {
    const fullTitle = `${config.title} | ${this.SITE_NAME}`;

    this.title.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: config.description });

    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    // Open Graph
    this.meta.updateTag({ property: 'og:title',       content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:type',        content: config.ogType ?? 'website' });
    this.meta.updateTag({ property: 'og:image',       content: config.ogImage ?? this.DEFAULT_OG_IMAGE });
    this.meta.updateTag({ property: 'og:site_name',   content: this.SITE_NAME });

    if (config.canonicalUrl) {
      this.meta.updateTag({ property: 'og:url', content: `${this.BASE_URL}${config.canonicalUrl}` });
    }

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card',        content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title',       content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image',       content: config.ogImage ?? this.DEFAULT_OG_IMAGE });
  }
}
