import { Injectable, inject, DOCUMENT } from '@angular/core';
import { FontConfig } from '../models/resume.model';

@Injectable({ providedIn: 'root' })
export class FontService {
  private readonly document = inject(DOCUMENT);
  private loadedFonts = new Set<string>();

  private readonly fonts: FontConfig[] = [
    { family: 'Inter', label: 'Inter', category: 'sans-serif', url: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' },
    { family: 'Roboto', label: 'Roboto', category: 'sans-serif', url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap' },
    { family: 'Poppins', label: 'Poppins', category: 'sans-serif', url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap' },
    { family: 'Open Sans', label: 'Open Sans', category: 'sans-serif', url: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap' },
    { family: 'Lato', label: 'Lato', category: 'sans-serif', url: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap' },
    { family: 'Outfit', label: 'Outfit', category: 'sans-serif', url: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap' },
    { family: 'Playfair Display', label: 'Playfair Display', category: 'serif', url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap' },
    { family: 'Merriweather', label: 'Merriweather', category: 'serif', url: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap' },
    { family: 'Lora', label: 'Lora', category: 'serif', url: 'https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap' },
    { family: 'Source Code Pro', label: 'Source Code Pro', category: 'monospace', url: 'https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;400;500;600;700&display=swap' },
    { family: 'Space Grotesk', label: 'Space Grotesk', category: 'sans-serif', url: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap' },
    { family: 'DM Sans', label: 'DM Sans', category: 'sans-serif', url: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap' },
  ];

  getAvailableFonts(): FontConfig[] {
    return this.fonts;
  }

  loadFont(fontFamily: string): void {
    if (this.loadedFonts.has(fontFamily)) return;

    const font = this.fonts.find((f) => f.family === fontFamily);
    if (!font) return;

    const link = this.document.createElement('link');
    link.rel = 'stylesheet';
    link.href = font.url;
    this.document.head.appendChild(link);
    this.loadedFonts.add(fontFamily);
  }

  getFontByFamily(family: string): FontConfig | undefined {
    return this.fonts.find((f) => f.family === family);
  }
}
