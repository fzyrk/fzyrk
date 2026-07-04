import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent implements AfterViewInit {
  readonly values = [
    { icon: '🎯', title: 'Purpose-Driven',   description: 'Every feature we build solves a real problem for real job seekers.' },
    { icon: '⚡', title: 'Speed & Quality',   description: 'We move fast without cutting corners. Performance is a feature.' },
    { icon: '🌍', title: 'Globally Inclusive', description: 'Career tools for everyone, everywhere — regardless of background.' },
    { icon: '🔓', title: 'Open by Default',   description: 'We build in public, share our learnings, and prioritize user trust.' },
    { icon: '🤝', title: 'User-First',         description: 'No dark patterns. No manipulation. Just tools that genuinely help.' },
    { icon: '🚀', title: 'Ambitious',          description: 'We\'re building the most comprehensive career platform in the world.' },
  ];

  readonly techStack = [
    { name: 'Angular', desc: 'Frontend framework', icon: '🅰️' },
    { name: 'TypeScript', desc: 'Type-safe development', icon: '🔷' },
    { name: 'Nx', desc: 'Monorepo tooling', icon: '🏗️' },
    { name: 'Vercel', desc: 'Deployment platform', icon: '▲' },
    { name: 'CSS Signals', desc: 'Reactivity model', icon: '⚡' },
    { name: 'Fzyrk UI', desc: 'Our design system', icon: '🎨' },
  ];

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('[data-reveal]').forEach(el => { el.classList.add('fz-reveal'); observer.observe(el); });
  }
}
