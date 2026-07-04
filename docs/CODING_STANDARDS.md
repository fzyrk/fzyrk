# 📏 Coding Standards

> Code style, naming conventions, and best practices for the Fzyrk codebase.

---

## Table of Contents

- [General Principles](#general-principles)
- [TypeScript Standards](#typescript-standards)
- [Angular Standards](#angular-standards)
- [CSS Standards](#css-standards)
- [File & Folder Naming](#file--folder-naming)
- [Git Standards](#git-standards)
- [Testing Standards](#testing-standards)
- [Performance Standards](#performance-standards)
- [Accessibility Standards](#accessibility-standards)
- [Documentation Standards](#documentation-standards)

---

## General Principles

| Principle | Rule |
|---|---|
| **Readability** | Code is read 10x more than it's written. Prioritize clarity over cleverness. |
| **Consistency** | Follow the established patterns. When in doubt, look at existing code. |
| **Simplicity** | Don't over-engineer. Solve the current problem, not hypothetical future ones. |
| **DRY** | Don't Repeat Yourself. Extract shared logic into `libs/shared` or `libs/ui`. |
| **YAGNI** | You Aren't Gonna Need It. Don't build features until they're needed. |
| **Single Responsibility** | Each file, class, and function should do one thing well. |

---

## TypeScript Standards

### General

```typescript
// ✅ DO: Use strict TypeScript
// tsconfig.json: "strict": true

// ✅ DO: Use explicit types for public APIs
export function calculateScore(data: ResumeData): number { ... }

// ❌ DON'T: Use `any`
function process(data: any) { ... }

// ✅ DO: Use `unknown` instead of `any` when type is uncertain
function handleResponse(data: unknown): void { ... }
```

### Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Classes | PascalCase | `ResumeEditorComponent` |
| Interfaces | PascalCase (no `I` prefix) | `Product`, `BlogPost` |
| Types | PascalCase | `ButtonVariant` |
| Enums | PascalCase | `ExportFormat` |
| Enum values | PascalCase | `ExportFormat.PDF` |
| Functions | camelCase | `calculateScore()` |
| Variables | camelCase | `currentTemplate` |
| Constants | UPPER_SNAKE_CASE | `MAX_FILE_SIZE` |
| Private members | No underscore prefix | `private count = 0` |
| Signals | camelCase | `isLoading = signal(false)` |
| Computed signals | camelCase | `fullName = computed(...)` |
| Observables | camelCase with `$` suffix | `clicks$`, `data$` |
| Boolean variables | `is/has/can/should` prefix | `isVisible`, `hasError`, `canEdit` |

### Interfaces & Types

```typescript
// ✅ DO: Use interfaces for data shapes
export interface Product {
  name: string;
  description: string;
  status: ProductStatus;
  route?: string;
}

// ✅ DO: Use type aliases for unions/intersections
export type ProductStatus = 'live' | 'coming-soon' | 'beta';
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

// ✅ DO: Use readonly for immutable data
export interface AppConfig {
  readonly apiUrl: string;
  readonly version: string;
}

// ❌ DON'T: Use `I` prefix for interfaces
interface IProduct { ... }  // Bad
interface Product { ... }   // Good
```

### Functions

```typescript
// ✅ DO: Use arrow functions for callbacks
const items = products.filter(p => p.status === 'live');

// ✅ DO: Use function declarations for named, top-level functions
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US').format(date);
}

// ✅ DO: Use early returns to reduce nesting
function getUser(id: string): User | null {
  if (!id) return null;
  if (!isValidId(id)) return null;
  return userMap.get(id) ?? null;
}

// ❌ DON'T: Deep nesting
function getUser(id: string): User | null {
  if (id) {
    if (isValidId(id)) {
      const user = userMap.get(id);
      if (user) {
        return user;
      }
    }
  }
  return null;
}
```

### Imports

```typescript
// ✅ DO: Order imports in groups (separated by blank lines)
// 1. Angular core
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

// 2. Third-party libraries
import { Subject } from 'rxjs';

// 3. Fzyrk libraries
import { FzButtonComponent, FzCardComponent } from '@fzyrk/ui';
import { Product } from '@fzyrk/models';

// 4. Local imports
import { HeroComponent } from './components/hero/hero';
```

---

## Angular Standards

### Component Architecture

```typescript
// ✅ DO: Use standalone components (NO NgModules)
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FzButtonComponent, FzCardComponent, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { }
```

### Signals (Preferred Reactivity)

```typescript
// ✅ DO: Use signals for component state
export class EditorComponent {
  // Input signals
  resumeData = input.required<ResumeData>();
  template = input<string>('modern');

  // Output signals
  saved = output<ResumeData>();

  // Two-way binding (model)
  selectedSection = model<string>('personal');

  // Local state
  isLoading = signal(false);
  sections = signal<Section[]>([]);

  // Computed
  sectionCount = computed(() => this.sections().length);
  hasData = computed(() => this.sections().some(s => s.data.length > 0));

  // Effects (side effects)
  constructor() {
    effect(() => {
      // Auto-save when data changes
      localStorage.setItem('resume', JSON.stringify(this.resumeData()));
    });
  }
}
```

### When to Use RxJS vs Signals

| Use Case | Use |
|---|---|
| Component state | **Signals** |
| Form values | **Signals** (with `model()`) |
| Computed/derived state | **`computed()`** |
| HTTP requests | **RxJS** (HttpClient returns Observables) |
| Event streams | **RxJS** |
| Timer/interval | **RxJS** |
| WebSocket | **RxJS** |

### Template Syntax

```html
<!-- ✅ DO: Use new control flow syntax -->
@if (isLoading()) {
  <fz-skeleton />
} @else {
  <div class="content">{{ data() }}</div>
}

@for (item of items(); track item.id) {
  <fz-card>{{ item.name }}</fz-card>
} @empty {
  <fz-empty-state title="No items found" />
}

@switch (status()) {
  @case ('live') { <fz-badge variant="success">Live</fz-badge> }
  @case ('coming-soon') { <fz-badge variant="warning">Coming Soon</fz-badge> }
  @default { <fz-badge>Unknown</fz-badge> }
}

<!-- ❌ DON'T: Use legacy structural directives -->
<div *ngIf="isLoading">...</div>
<div *ngFor="let item of items">...</div>
```

### Services

```typescript
// ✅ DO: Use inject() function (not constructor injection)
export class HomeComponent {
  private themeService = inject(ThemeService);
  private seoService = inject(SeoService);
}

// ❌ DON'T: Use constructor injection
export class HomeComponent {
  constructor(
    private themeService: ThemeService,
    private seoService: SeoService,
  ) { }
}
```

### Routing

```typescript
// ✅ DO: Use lazy loading for all routes except home
export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.AboutComponent)
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.routes').then(m => m.PRODUCT_ROUTES)
  },
];
```

---

## CSS Standards

### Token-Based Styling

```css
/* ✅ DO: Reference design tokens */
.card {
  background: var(--fz-bg-surface);
  border: 1px solid var(--fz-border);
  border-radius: var(--fz-radius-md);
  padding: var(--fz-space-6);
  box-shadow: var(--fz-shadow-sm);
}

/* ❌ DON'T: Hardcode values */
.card {
  background: #13132a;
  border: 1px solid rgba(100, 100, 180, 0.15);
  border-radius: 12px;
  padding: 24px;
}
```

### Component Scoping

```css
/* ✅ DO: Use :host for component-level styles */
:host {
  display: block;
  padding: var(--fz-space-6);
}

/* ✅ DO: Use :host selectors for variants */
:host([variant="glass"]) {
  background: var(--fz-bg-glass);
  backdrop-filter: blur(20px);
}
```

### Naming

```css
/* ✅ DO: Use BEM-like naming for complex components */
.hero { }
.hero__title { }
.hero__subtitle { }
.hero__cta { }
.hero__cta--primary { }
.hero__cta--secondary { }

/* ✅ DO: Use utility class prefix */
.fz-container { }
.fz-glass { }
.fz-reveal { }
```

### Media Queries (Mobile-First)

```css
/* ✅ DO: Mobile-first breakpoints */
.grid {
  display: grid;
  grid-template-columns: 1fr;          /* Mobile */
  gap: var(--fz-space-6);
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);  /* Tablet */
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);  /* Desktop */
  }
}
```

### Transitions

```css
/* ✅ DO: Use token-based transitions */
.card {
  transition: transform var(--fz-dur-fast) var(--fz-ease-out),
              box-shadow var(--fz-dur-fast) var(--fz-ease-out);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--fz-shadow-glow);
}

/* ❌ DON'T: Use `transition: all` */
.card {
  transition: all 0.3s ease;
}
```

---

## File & Folder Naming

| Rule | Convention | Example |
|---|---|---|
| All files | `kebab-case` | `product-card.ts` |
| Components | `name.ts` | `hero.ts` |
| Templates | `name.html` | `hero.html` |
| Styles | `name.css` | `hero.css` |
| Tests | `name.spec.ts` | `hero.spec.ts` |
| Services | `name.service.ts` | `theme.service.ts` |
| Directives | `name.directive.ts` | `scroll-reveal.directive.ts` |
| Pipes | `name.pipe.ts` | `truncate.pipe.ts` |
| Models | `name.model.ts` | `product.model.ts` |
| Routes | `name.routes.ts` | `app.routes.ts` |
| Constants | `name.constants.ts` | `templates.constants.ts` |
| Barrel exports | `index.ts` | `index.ts` |

### Folders

- One feature per folder
- Each component gets its own folder with `.ts`, `.html`, `.css`, `.spec.ts`
- Group by feature, not by type

```
✅ DO:
pages/
├── home/
│   ├── home.ts
│   ├── home.html
│   └── home.css

❌ DON'T:
components/home.ts
templates/home.html
styles/home.css
```

---

## Git Standards

### Branch Naming

```
feature/   → feature/add-pricing-page
bugfix/    → bugfix/fix-nav-scroll
hotfix/    → hotfix/critical-pdf-export
chore/     → chore/update-dependencies
docs/      → docs/add-architecture-guide
refactor/  → refactor/extract-hero-component
```

### Commit Messages

Follow the **Conventional Commits** specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types**:

| Type | Description |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code formatting (no logic change) |
| `refactor` | Code restructuring (no feature/fix) |
| `perf` | Performance improvement |
| `test` | Add or fix tests |
| `chore` | Build, CI, tooling changes |

**Examples**:

```
feat(ui): add FzBadge component with 6 variants
fix(resume): fix PDF export cutting off last section
docs(architecture): add routing architecture diagram
refactor(website): extract hero into standalone component
perf(website): lazy-load about and blog pages
chore: update Angular to v19.1
```

### Pull Request Rules

1. **One feature per PR** — Keep PRs focused and reviewable
2. **Update docs** — If you change behavior, update related docs
3. **Add tests** — New components must have unit tests
4. **Pass CI** — All lint, test, and build checks must pass
5. **Descriptive title** — Use conventional commit format for PR title
6. **Screenshots** — Include before/after screenshots for UI changes

---

## Testing Standards

### Unit Tests

```typescript
// ✅ DO: Test component behavior, not implementation
describe('FzButton', () => {
  it('should emit clicked event when clicked', () => {
    const fixture = TestBed.createComponent(FzButtonComponent);
    const spy = jest.spyOn(fixture.componentInstance.clicked, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should not emit clicked when disabled', () => {
    const fixture = TestBed.createComponent(FzButtonComponent);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const spy = jest.spyOn(fixture.componentInstance.clicked, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should apply variant class', () => {
    const fixture = TestBed.createComponent(FzButtonComponent);
    fixture.componentRef.setInput('variant', 'danger');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button').classList).toContain('btn--danger');
  });
});
```

### Test File Naming

```
button.spec.ts          → Unit test for button component
theme.service.spec.ts   → Unit test for theme service
```

### Coverage Targets

| Metric | Target |
|---|---|
| Libraries (`libs/*`) | 80%+ |
| UI Components (`libs/ui`) | 90%+ |
| Services (`libs/shared`) | 90%+ |
| App pages | 60%+ |

---

## Performance Standards

| Rule | Details |
|---|---|
| **Lazy load routes** | Every route except home must use `loadComponent()` or `loadChildren()` |
| **OnPush detection** | All components use `ChangeDetectionStrategy.OnPush` |
| **Track in @for** | Always use `track` in `@for` loops |
| **No unnecessary subscriptions** | Prefer signals. If using RxJS, use `takeUntilDestroyed()` |
| **Image optimization** | Use `loading="lazy"`, provide `width`/`height`, prefer WebP |
| **Bundle size** | Monitor with `npx nx build website --stats-json` |

---

## Accessibility Standards

| Rule | Details |
|---|---|
| **Semantic HTML** | Use `<button>`, `<nav>`, `<main>`, `<section>`, `<article>` — not div soup |
| **ARIA labels** | All interactive elements must have accessible names |
| **Keyboard navigation** | All features must work with keyboard only |
| **Focus management** | Modals/dialogs trap focus. Route changes move focus. |
| **Color contrast** | Minimum 4.5:1 ratio for text, 3:1 for large text |
| **Alt text** | All images must have meaningful `alt` attributes |
| **Screen reader testing** | Test with VoiceOver (Mac) |
| **Target**: WCAG 2.2 AA | |

---

## Documentation Standards

| Rule | Details |
|---|---|
| **JSDoc** | Document all public methods, inputs, and outputs |
| **README** | Every library must have usage docs in `COMPONENT_LIBRARY.md` |
| **Inline comments** | Explain *why*, not *what*. Code should be self-documenting. |
| **Update docs** | Every PR that changes behavior must update related docs |

```typescript
// ✅ DO: Explain WHY
// We delay the animation by 100ms to prevent flash-of-unstyled-content
// when the component is rendered server-side
setTimeout(() => this.isVisible.set(true), 100);

// ❌ DON'T: Explain WHAT (obvious from the code)
// Set isVisible to true
this.isVisible.set(true);
```

---

*📅 Last Updated: July 4, 2026*
*📝 Maintained by: Fzyrk Team*
