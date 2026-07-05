import { isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, PLATFORM_ID, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FzProductLogoComponent } from '@fzyrk/ui';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [RouterLink, FzProductLogoComponent],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class ProductsListComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  
  readonly products = [
    { id: 'resume',    icon: '📄', name: 'Resume Builder',   description: 'Create stunning, ATS-friendly resumes in minutes with our live editor and beautiful templates.', status: 'live',         route: '/products/resume',    badge: 'Live' },
    { id: 'portfolio', icon: '🌐', name: 'Portfolio Builder', description: 'Auto-generate a beautiful portfolio website from your resume data with custom themes.',          status: 'coming-soon',  route: '/products/portfolio', badge: 'Soon' },
    { id: 'ai',        icon: '🤖', name: 'AI Assistant',      description: 'Get AI-powered resume reviews, grammar improvements, and ATS keyword optimization.',               status: 'coming-soon',  route: '/products/ai',        badge: 'Soon' },
    { id: 'interview', icon: '🎤', name: 'Interview Prep',    description: 'Practice with mock interviews, real-time AI feedback, and a massive question bank.',              status: 'coming-soon',  route: '/products/interview', badge: 'Soon' },
    { id: 'learn',     icon: '📚', name: 'Learning Platform', description: 'Level up your skills with curated courses, roadmaps, and hands-on projects.',                     status: 'coming-soon',  route: '/products/learn',     badge: 'Soon' },
    { id: 'jobs',      icon: '💼', name: 'Job Board',         description: 'Discover opportunities perfectly matched to your resume profile and skillset.',                    status: 'coming-soon',  route: '/products/jobs',      badge: 'Soon' },
  ];

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

  getStatusClass(status: string): string {
    if (status === 'live') return 'badge--live';
    return 'badge--soon';
  }
}
