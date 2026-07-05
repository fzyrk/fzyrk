import { isPlatformBrowser, NgClass } from '@angular/common';
import { Component, AfterViewInit, signal, PLATFORM_ID, inject } from '@angular/core';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [NgClass],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class BlogComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  
  activeCategory = signal('All');
  readonly categories = ['All', 'Career', 'Tech', 'Startup', 'Design'];
  
  readonly posts = [
    { title: 'How to Build an ATS-Friendly Resume in 2026', category: 'Career', readTime: '5 min', date: 'Jul 1, 2026', excerpt: 'Applicant Tracking Systems reject 75% of resumes before a human ever sees them. Here\'s how to beat them.' },
    { title: 'The Ultimate Angular Signals Guide for 2026', category: 'Tech', readTime: '8 min', date: 'Jun 28, 2026', excerpt: 'Signals are Angular\'s future. Learn how to use them effectively in production apps.' },
    { title: 'From 0 to SaaS: Building Fzyrk in Public', category: 'Startup', readTime: '6 min', date: 'Jun 20, 2026', excerpt: 'How we\'re building a career platform from scratch, documenting every step of the journey.' },
    { title: 'Design Systems That Scale: Lessons from Fzyrk UI', category: 'Design', readTime: '7 min', date: 'Jun 15, 2026', excerpt: 'Building 25+ accessible Angular components taught us a lot about design system architecture.' },
    { title: '10 Resume Mistakes That Cost You Interviews', category: 'Career', readTime: '4 min', date: 'Jun 10, 2026', excerpt: 'Common resume errors we see thousands of times — and exactly how to fix them.' },
    { title: 'Nx Monorepo Setup for Angular Apps in 2026', category: 'Tech', readTime: '10 min', date: 'Jun 5, 2026', excerpt: 'A complete guide to setting up an Nx Angular monorepo with shared libraries.' },
  ];

  setCategory(cat: string) {
    this.activeCategory.set(cat);
  }

  get filteredPosts() {
    return this.activeCategory() === 'All' ? this.posts : this.posts.filter(p => p.category === this.activeCategory());
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollReveal();
    }
  }

  private initScrollReveal(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-reveal]').forEach(el => {
      el.classList.add('fz-reveal');
      observer.observe(el);
    });
  }
}
