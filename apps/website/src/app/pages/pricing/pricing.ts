import { isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, signal, PLATFORM_ID, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pricing.html',
  styleUrl: './pricing.css'
})
export class PricingComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  
  openFaq = signal(-1);
  
  readonly tiers = [
    { name:'Free', price:'₹0', period:'/forever', badge:'', cta:'Get Started', route:'/products/resume', highlighted:false, desc:'Everything you need to create a great resume.', features:['5 resume templates','PDF export','Local storage save','Live preview','Dark mode','Basic formatting'] },
    { name:'Pro',  price:'₹499', period:'/month', badge:'Most Popular', cta:'Start Free Trial', route:'/products/resume', highlighted:true, desc:'Unlock the full power of Fzyrk Resume.', features:['All free features','15+ premium templates','AI resume review','ATS score checker','Grammar suggestions','Priority support','Custom fonts & colors','Unlimited resumes'] },
    { name:'Team', price:'₹1,999', period:'/user/year', badge:'', cta:'Contact Us', route:'/contact', highlighted:false, desc:'For recruiters and teams managing multiple candidates.', features:['Everything in Pro','Team dashboard','Candidate management','Bulk export','Custom branding','API access','Dedicated account manager','SLA guarantee'] },
  ];

  readonly faqs = [
    { q:'Is the free plan really free forever?', a:'Yes! Our free plan is free forever. No credit card required. You get access to 5 beautiful templates and unlimited PDF exports.' },
    { q:'Can I cancel my Pro subscription anytime?', a:'Absolutely. Cancel anytime from your account settings. You\'ll keep Pro access until the end of your billing period.' },
    { q:'Is my resume data safe?', a:'Yes. All your data is stored locally in your browser on the free plan. Pro plan data is encrypted and stored securely on our servers.' },
    { q:'Do you offer student discounts?', a:'Yes! Students get 50% off Pro with a valid .edu email. Contact us to apply.' },
    { q:'What payment methods do you accept?', a:'We accept all major credit/debit cards, UPI, net banking, and PayPal.' },
  ];

  toggleFaq(i: number) {
    this.openFaq.update(v => v === i ? -1 : i);
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
