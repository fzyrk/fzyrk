import { Component, OnInit, inject, AfterViewInit, ElementRef, QueryList, ViewChildren, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FzProductLogoComponent } from '@fzyrk/ui';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FzProductLogoComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements AfterViewInit {
  @ViewChildren('[data-reveal]') revealEls!: QueryList<ElementRef>;

  readonly products = [
    { id: 'resume',    icon: '📄', name: 'Resume Builder',   description: 'Create stunning, ATS-friendly resumes in minutes with our live editor and beautiful templates.', status: 'live',         route: '/products/resume',    badge: 'Live' },
    { id: 'portfolio', icon: '🌐', name: 'Portfolio Builder', description: 'Auto-generate a beautiful portfolio website from your resume data with custom themes.',          status: 'coming-soon',  route: '/products/portfolio', badge: 'Soon' },
    { id: 'ai',        icon: '🤖', name: 'AI Assistant',      description: 'Get AI-powered resume reviews, grammar improvements, and ATS keyword optimization.',               status: 'coming-soon',  route: '/products/ai',        badge: 'Soon' },
    { id: 'interview', icon: '🎤', name: 'Interview Prep',    description: 'Practice with mock interviews, real-time AI feedback, and a massive question bank.',              status: 'coming-soon',  route: '/products/interview', badge: 'Soon' },
    { id: 'learn',     icon: '📚', name: 'Learning Platform', description: 'Level up your skills with curated courses, roadmaps, and hands-on projects.',                     status: 'coming-soon',  route: '/products/learn',     badge: 'Soon' },
    { id: 'jobs',      icon: '💼', name: 'Job Board',         description: 'Discover opportunities perfectly matched to your resume profile and skillset.',                    status: 'coming-soon',  route: '/products/jobs',      badge: 'Soon' },
  ];

  readonly stats = [
    { value: '10K+',  label: 'Resumes Created',    prefix: '' },
    { value: '50+',   label: 'Templates Available', prefix: '' },
    { value: '98%',   label: 'Satisfaction Rate',   prefix: '' },
    { value: '6',     label: 'Products in Pipeline',prefix: '' },
  ];

  readonly roadmapPhases = [
    { phase: '01', title: 'Foundation',      status: 'complete',     items: ['Brand identity', 'Design system', 'Architecture', 'Resume Builder MVP'] },
    { phase: '02', title: 'Digital Presence',status: 'in-progress',  items: ['fzyrk.com website', 'SEO optimization', 'Blog platform', 'Analytics'] },
    { phase: '03', title: 'Design System',   status: 'upcoming',     items: ['Fzyrk UI library', '25+ components', 'Icon system', 'Documentation'] },
    { phase: '04', title: 'AI Features',     status: 'upcoming',     items: ['Resume AI review', 'ATS scoring', 'Cover letter gen', 'Keyword optimizer'] },
    { phase: '05', title: 'Expansion',       status: 'upcoming',     items: ['Portfolio Builder', 'Interview Platform', 'Learning Platform', 'Job Board'] },
  ];

  readonly blogPosts = [
    { title: 'How to Build an ATS-Friendly Resume in 2026',   category: 'Career', readTime: '5 min', date: 'Jul 1, 2026',  slug: 'ats-friendly-resume-2026' },
    { title: 'The Ultimate Angular Signals Guide for 2026',    category: 'Tech',   readTime: '8 min', date: 'Jun 28, 2026', slug: 'angular-signals-guide' },
    { title: 'From 0 to SaaS: Building Fzyrk in Public',      category: 'Startup',readTime: '6 min', date: 'Jun 20, 2026', slug: 'building-fzyrk-in-public' },
  ];

  readonly values = [
    { icon: '⚡', title: 'Fast by Default',    description: 'Every feature is designed with performance first. Our tools load instantly and respond in milliseconds.' },
    { icon: '🎨', title: 'Beautiful by Design', description: 'We believe great tools should be a pleasure to use. Every pixel is crafted with care.' },
    { icon: '🔒', title: 'Private by Nature',   description: 'Your data lives in your browser. No accounts required. No tracking. Pure privacy.' },
    { icon: '🚀', title: 'Built for Growth',    description: 'Start free, grow as you go. Our platform scales with your career journey.' },
  ];

  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollReveal();
    }
  }

  private initScrollReveal(): void {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }),
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
  getPhaseClass(status: string): string {
    if (status === 'complete')    return 'phase--complete';
    if (status === 'in-progress') return 'phase--active';
    return 'phase--upcoming';
  }
}
