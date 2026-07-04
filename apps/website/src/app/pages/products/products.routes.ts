import { Routes } from '@angular/router';
import { ProductsListComponent } from './products';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    component: ProductsListComponent   // fzyrk.com/products → Products showcase page
  },
  {
    path: 'resume',
    loadChildren: () => import('@fzyrk/products/resume').then(m => m.RESUME_ROUTES)
    // fzyrk.com/products/resume → Resume Builder app
  },
  {
    path: 'portfolio',
    loadComponent: () => import('./coming-soon').then(m => m.ComingSoonProductComponent)
  },
  {
    path: 'ai',
    loadComponent: () => import('./coming-soon').then(m => m.ComingSoonProductComponent)
  },
  {
    path: 'interview',
    loadComponent: () => import('./coming-soon').then(m => m.ComingSoonProductComponent)
  },
  {
    path: 'learn',
    loadComponent: () => import('./coming-soon').then(m => m.ComingSoonProductComponent)
  },
  {
    path: 'jobs',
    loadComponent: () => import('./coming-soon').then(m => m.ComingSoonProductComponent)
  }
];
