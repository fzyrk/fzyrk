import { isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, signal, PLATFORM_ID, inject } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  
  name = signal('');
  email = signal('');
  subject = signal('');
  message = signal('');
  sent = signal(false);
  submitting = signal(false);

  onSubmit(e: Event) {
    e.preventDefault();
    this.submitting.set(true);
    setTimeout(() => {
      this.sent.set(true);
      this.submitting.set(false);
    }, 1500);
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
