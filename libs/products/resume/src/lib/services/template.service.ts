import { Injectable } from '@angular/core';
import { TemplateConfig } from '../models/resume.model';

@Injectable({ providedIn: 'root' })
export class TemplateService {
  private readonly templates: TemplateConfig[] = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean two-column layout with accent sidebar',
      previewClass: 'template-modern',
      layout: 'two-column',
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional single-column with elegant typography',
      previewClass: 'template-classic',
      layout: 'single',
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Clean whitespace-focused minimalist design',
      previewClass: 'template-minimal',
      layout: 'single',
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold colors with card-based sections',
      previewClass: 'template-creative',
      layout: 'two-column',
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Corporate look with navy accents',
      previewClass: 'template-professional',
      layout: 'single',
    },
    {
      id: 'elegant',
      name: 'Elegant',
      description: 'Refined serif typography with gold accents',
      previewClass: 'template-elegant',
      layout: 'single',
    },
    {
      id: 'bold',
      name: 'Bold',
      description: 'High-contrast with large headings',
      previewClass: 'template-bold',
      layout: 'single',
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'Premium dark header with clean body',
      previewClass: 'template-executive',
      layout: 'two-column',
    },
  ];

  getTemplates(): TemplateConfig[] {
    return this.templates;
  }

  getTemplateById(id: string): TemplateConfig | undefined {
    return this.templates.find((t) => t.id === id);
  }
}
