import { Component, AfterViewInit, signal } from '@angular/core';
@Component({ selector: 'app-contact', standalone: true, imports: [], templateUrl: './contact.html', styleUrl: './contact.css' })
export class ContactComponent implements AfterViewInit {
  name = signal('');
  email = signal('');
  subject = signal('');
  message = signal('');
  sent = signal(false);
  submitting = signal(false);
  onSubmit(e: Event) { e.preventDefault(); this.submitting.set(true); setTimeout(() => { this.sent.set(true); this.submitting.set(false); }, 1500); }
  ngAfterViewInit() { const obs = new IntersectionObserver((e) => e.forEach(x => { if(x.isIntersecting){x.target.classList.add('visible');obs.unobserve(x.target);}}),{threshold:0.1}); document.querySelectorAll('[data-reveal]').forEach(el => {el.classList.add('fz-reveal');obs.observe(el);}); }
}
