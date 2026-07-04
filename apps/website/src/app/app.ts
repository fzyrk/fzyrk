import { Component, OnInit, inject, signal, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent implements OnInit {
  mobileMenuOpen = signal(false);
  scrolled = signal(false);
  currentYear = new Date().getFullYear();

  readonly navLinks = [
    { label: 'Home',     route: '/' },
    { label: 'Products', route: '/products' },
    { label: 'About',    route: '/about' },
    { label: 'Blog',     route: '/blog' },
    { label: 'Pricing',  route: '/pricing' },
    { label: 'Contact',  route: '/contact' },
  ];

  ngOnInit(): void {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
  }

  toggleMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
