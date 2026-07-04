# 🏗 Fzyrk — Implementation Roadmap

> **New Priority**: Build the design system foundation **first** (tokens → icons → UI components), **then** build the website app on top of it.
>
> **Monorepo**: Nx · **Blog**: Separate route (`/blog`) · **Deploy**: Vercel
>
> **Routing**: All product apps under `/products/*` prefix

---

## URL Architecture

```
fzyrk.com                       → Home (marketing)
fzyrk.com/about                  → About
fzyrk.com/blog                   → Blog
fzyrk.com/pricing                → Pricing
fzyrk.com/contact                → Contact
fzyrk.com/privacy                → Privacy Policy
fzyrk.com/terms                  → Terms & Conditions

fzyrk.com/products               → Products listing page
fzyrk.com/products/resume        → Resume Builder app
fzyrk.com/products/portfolio     → Portfolio Builder (future)
fzyrk.com/products/ai            → AI Assistant (future)
fzyrk.com/products/interview     → Interview Platform (future)
fzyrk.com/products/learn         → Learning Platform (future)
fzyrk.com/products/jobs          → Job Board (future)
```

---

## Revised Build Order

```
 Phase A — Foundation                    Phase B — Website App
┌─────────────────────────────┐         ┌─────────────────────────────┐
│ 1. Nx Workspace Setup       │         │ 7. App Shell + Routing      │
│ 2. libs/theme (tokens)      │───────▶ │ 8. Navbar + Footer          │
│ 3. libs/icons (icon set)    │         │ 9. Home Page (all sections) │
│ 4. libs/ui (components)     │         │ 10. About, Blog, Pricing    │
│ 5. libs/shared (utilities)  │         │ 11. Contact, Privacy, Terms │
│ 6. libs/models (interfaces) │         │ 12. SEO + Animations        │
└─────────────────────────────┘         │ 13. Vercel Deploy           │
                                        └─────────────────────────────┘
```

---

## Monorepo Structure

```
fzyrk/
├── apps/
│   ├── website/                        ← Phase B: Marketing + shell
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── app.ts              ← Root component (navbar + router-outlet + footer)
│   │   │   │   ├── app.html
│   │   │   │   ├── app.css
│   │   │   │   ├── app.routes.ts       ← Master routes (marketing + /products/*)
│   │   │   │   ├── pages/
│   │   │   │   │   ├── home/
│   │   │   │   │   ├── about/
│   │   │   │   │   ├── blog/
│   │   │   │   │   ├── pricing/
│   │   │   │   │   ├── contact/
│   │   │   │   │   ├── privacy/
│   │   │   │   │   ├── terms/
│   │   │   │   │   └── products/        ← Products listing + child routing
│   │   │   │   │       ├── products.ts
│   │   │   │   │       ├── products.html
│   │   │   │   │       ├── products.css
│   │   │   │   │       └── products.routes.ts  ← Lazy routes to product apps
│   │   │   │   └── components/
│   │   │   │       ├── hero/
│   │   │   │       ├── product-card/
│   │   │   │       ├── timeline/
│   │   │   │       ├── stats-counter/
│   │   │   │       ├── blog-card/
│   │   │   │       ├── value-card/
│   │   │   │       └── contact-form/
│   │   │   ├── index.html
│   │   │   ├── main.ts
│   │   │   └── styles.css              ← Imports libs/theme tokens
│   │   ├── public/
│   │   │   ├── favicon.svg
│   │   │   └── og-image.png
│   │   └── project.json
│   │
│   └── products/                       ← Product apps (each lazy-loaded)
│       ├── resume/                     ← fzyrk.com/products/resume
│       │   ├── src/
│       │   │   ├── app/
│       │   │   │   ├── resume-app.ts
│       │   │   │   ├── resume-app.html
│       │   │   │   ├── resume-app.routes.ts
│       │   │   │   ├── components/     ← Resume-specific components
│       │   │   │   ├── pages/          ← Resume-specific pages
│       │   │   │   └── services/       ← Resume-specific services
│       │   │   └── main.ts
│       │   └── project.json
│       ├── portfolio/                  ← fzyrk.com/products/portfolio (future)
│       ├── ai/                         ← fzyrk.com/products/ai (future)
│       ├── interview/                  ← fzyrk.com/products/interview (future)
│       ├── learn/                      ← fzyrk.com/products/learn (future)
│       └── jobs/                       ← fzyrk.com/products/jobs (future)
│
├── libs/
│   ├── theme/                          ← Phase A, Step 2
│   │   ├── src/
│   │   │   ├── index.ts                ← Public API barrel
│   │   │   ├── styles/
│   │   │   │   ├── tokens.css          ← All CSS custom properties
│   │   │   │   ├── reset.css           ← CSS reset / normalize
│   │   │   │   ├── typography.css      ← Font imports + type scale
│   │   │   │   ├── animations.css      ← Keyframes + animation utilities
│   │   │   │   ├── utilities.css       ← Common utility classes
│   │   │   │   └── global.css          ← Master import (imports all above)
│   │   │   └── tokens/
│   │   │       ├── colors.ts           ← Color tokens as TS constants
│   │   │       ├── typography.ts       ← Type scale as TS constants
│   │   │       ├── spacing.ts          ← Spacing scale as TS constants
│   │   │       └── index.ts            ← Re-exports all tokens
│   │   └── project.json
│   │
│   ├── icons/                          ← Phase A, Step 3
│   │   ├── src/
│   │   │   ├── index.ts                ← Public API barrel
│   │   │   ├── icon.component.ts       ← <fz-icon name="..."> component
│   │   │   ├── icon.component.html
│   │   │   ├── icon.component.css
│   │   │   ├── icon-registry.service.ts← SVG icon registration
│   │   │   ├── icons/                  ← Individual SVG icon components
│   │   │   │   ├── arrow-right.ts
│   │   │   │   ├── check.ts
│   │   │   │   ├── chevron-down.ts
│   │   │   │   ├── close.ts
│   │   │   │   ├── menu.ts
│   │   │   │   ├── search.ts
│   │   │   │   ├── mail.ts
│   │   │   │   ├── github.ts
│   │   │   │   ├── linkedin.ts
│   │   │   │   ├── twitter.ts
│   │   │   │   ├── youtube.ts
│   │   │   │   ├── globe.ts
│   │   │   │   ├── document.ts
│   │   │   │   ├── robot.ts
│   │   │   │   ├── microphone.ts
│   │   │   │   ├── book.ts
│   │   │   │   ├── briefcase.ts
│   │   │   │   ├── sparkle.ts
│   │   │   │   ├── sun.ts
│   │   │   │   ├── moon.ts
│   │   │   │   ├── external-link.ts
│   │   │   │   ├── phone.ts
│   │   │   │   ├── map-pin.ts
│   │   │   │   ├── clock.ts
│   │   │   │   ├── star.ts
│   │   │   │   ├── heart.ts
│   │   │   │   ├── eye.ts
│   │   │   │   ├── download.ts
│   │   │   │   ├── upload.ts
│   │   │   │   ├── user.ts
│   │   │   │   ├── settings.ts
│   │   │   │   ├── info.ts
│   │   │   │   ├── warning.ts
│   │   │   │   ├── error.ts
│   │   │   │   ├── success.ts
│   │   │   │   └── index.ts            ← All icons barrel
│   │   │   └── provide-icons.ts        ← Provider function
│   │   └── project.json
│   │
│   ├── ui/                             ← Phase A, Step 4
│   │   ├── src/
│   │   │   ├── index.ts                ← Public API barrel
│   │   │   ├── button/
│   │   │   │   ├── button.ts
│   │   │   │   ├── button.html
│   │   │   │   ├── button.css
│   │   │   │   └── button.spec.ts
│   │   │   ├── input/
│   │   │   ├── textarea/
│   │   │   ├── select/
│   │   │   ├── checkbox/
│   │   │   ├── radio/
│   │   │   ├── switch/
│   │   │   ├── card/
│   │   │   ├── avatar/
│   │   │   ├── badge/
│   │   │   ├── alert/
│   │   │   ├── toast/
│   │   │   ├── tooltip/
│   │   │   ├── dialog/
│   │   │   ├── drawer/
│   │   │   ├── modal/
│   │   │   ├── tabs/
│   │   │   ├── accordion/
│   │   │   ├── table/
│   │   │   ├── pagination/
│   │   │   ├── navbar/
│   │   │   ├── sidebar/
│   │   │   ├── breadcrumb/
│   │   │   ├── skeleton/
│   │   │   ├── empty-state/
│   │   │   └── theme-switcher/
│   │   └── project.json
│   │
│   ├── shared/                         ← Phase A, Step 5
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── directives/
│   │   │   │   ├── scroll-reveal.directive.ts
│   │   │   │   ├── animate-on-scroll.directive.ts
│   │   │   │   └── click-outside.directive.ts
│   │   │   ├── pipes/
│   │   │   │   ├── truncate.pipe.ts
│   │   │   │   └── time-ago.pipe.ts
│   │   │   └── services/
│   │   │       ├── theme.service.ts
│   │   │       ├── seo.service.ts
│   │   │       └── breakpoint.service.ts
│   │   └── project.json
│   │
│   └── models/                         ← Phase A, Step 6
│       ├── src/
│       │   ├── index.ts
│       │   ├── product.model.ts
│       │   ├── blog-post.model.ts
│       │   ├── milestone.model.ts
│       │   └── nav-item.model.ts
│       └── project.json
│
├── docs/
│   ├── BRAND.md
│   ├── ARCHITECTURE.md
│   ├── CODING_STANDARDS.md
│   └── COMPONENTS.md
│
├── ROADMAP.md
├── STARTUP_ROADMAP.md
├── README.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── nx.json
├── package.json
├── tsconfig.base.json
├── .prettierrc
├── .eslintrc.json
├── .gitignore
└── vercel.json                         ← Vercel deployment config
```

---

## Phase A — Design System Foundation

---

### Step 1: Initialize Nx Workspace

```bash
npx -y create-nx-workspace@latest fzyrk \
  --preset=angular-monorepo \
  --appName=website \
  --style=css \
  --nxCloud=skip \
  --packageManager=npm
```

Then generate the libraries:
```bash
npx nx generate @nx/angular:library theme   --directory=libs/theme   --standalone --skipTests
npx nx generate @nx/angular:library icons   --directory=libs/icons   --standalone
npx nx generate @nx/angular:library ui      --directory=libs/ui      --standalone
npx nx generate @nx/angular:library shared  --directory=libs/shared  --standalone
npx nx generate @nx/angular:library models  --directory=libs/models  --standalone --skipTests
```

---

### Step 2: `libs/theme` — Design Tokens & Global Styles

Every Fzyrk product imports `libs/theme/src/styles/global.css`. This is the single source of truth.

#### `tokens.css` — All CSS Custom Properties

```css
:root {
  /* ── Brand Colors ── */
  --fz-accent:            #6366f1;
  --fz-accent-hover:      #818cf8;
  --fz-accent-active:     #4f46e5;
  --fz-accent-glow:       rgba(99, 102, 241, 0.15);
  --fz-accent-2:          #a855f7;
  --fz-success:           #22c55e;
  --fz-warning:           #f59e0b;
  --fz-error:             #ef4444;
  --fz-info:              #3b82f6;

  /* ── Backgrounds ── */
  --fz-bg-deep:           #080810;
  --fz-bg-base:           #0f0f1a;
  --fz-bg-surface:        #13132a;
  --fz-bg-elevated:       rgba(30, 30, 56, 0.6);
  --fz-bg-glass:          rgba(20, 20, 40, 0.7);
  --fz-bg-overlay:        rgba(0, 0, 0, 0.6);

  /* ── Text ── */
  --fz-text-primary:      #f0f0fa;
  --fz-text-secondary:    #a0a0c0;
  --fz-text-muted:        #5c5c80;
  --fz-text-inverse:      #0f0f1a;
  --fz-text-accent:       #818cf8;

  /* ── Borders ── */
  --fz-border:            rgba(100, 100, 180, 0.15);
  --fz-border-strong:     rgba(100, 100, 180, 0.3);
  --fz-border-glow:       rgba(99, 102, 241, 0.4);

  /* ── Spacing ── */
  --fz-space-1:  4px;   --fz-space-2:  8px;   --fz-space-3:  12px;
  --fz-space-4:  16px;  --fz-space-5:  20px;  --fz-space-6:  24px;
  --fz-space-8:  32px;  --fz-space-10: 40px;  --fz-space-12: 48px;
  --fz-space-16: 64px;  --fz-space-20: 80px;  --fz-space-24: 96px;
  --fz-space-32: 128px;

  /* ── Typography ── */
  --fz-font-primary:  'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --fz-font-display:  'Plus Jakarta Sans', var(--fz-font-primary);
  --fz-font-mono:     'Source Code Pro', 'Fira Code', monospace;

  --fz-text-xs:  0.75rem;    /* 12px */
  --fz-text-sm:  0.875rem;   /* 14px */
  --fz-text-base: 1rem;      /* 16px */
  --fz-text-lg:  1.125rem;   /* 18px */
  --fz-text-xl:  1.25rem;    /* 20px */
  --fz-text-2xl: 1.5rem;     /* 24px */
  --fz-text-3xl: 1.875rem;   /* 30px */
  --fz-text-4xl: 2.25rem;    /* 36px */
  --fz-text-5xl: 3rem;       /* 48px */
  --fz-text-6xl: 3.75rem;    /* 60px */
  --fz-text-7xl: 4.5rem;     /* 72px */

  --fz-leading-tight:  1.2;
  --fz-leading-normal: 1.5;
  --fz-leading-relaxed: 1.7;

  --fz-weight-light:    300;
  --fz-weight-regular:  400;
  --fz-weight-medium:   500;
  --fz-weight-semibold: 600;
  --fz-weight-bold:     700;
  --fz-weight-extrabold: 800;

  /* ── Border Radius ── */
  --fz-radius-sm:   6px;
  --fz-radius-md:   12px;
  --fz-radius-lg:   18px;
  --fz-radius-xl:   24px;
  --fz-radius-2xl:  32px;
  --fz-radius-full: 9999px;

  /* ── Shadows ── */
  --fz-shadow-xs:      0 1px 2px rgba(0,0,0,0.3);
  --fz-shadow-sm:      0 1px 3px rgba(0,0,0,0.4);
  --fz-shadow-md:      0 4px 16px rgba(0,0,0,0.5);
  --fz-shadow-lg:      0 8px 32px rgba(0,0,0,0.6);
  --fz-shadow-xl:      0 16px 48px rgba(0,0,0,0.7);
  --fz-shadow-glow:    0 0 32px rgba(99,102,241,0.25);
  --fz-shadow-glow-lg: 0 0 64px rgba(99,102,241,0.35);

  /* ── Transitions ── */
  --fz-ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
  --fz-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --fz-ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --fz-dur-fast:    150ms;
  --fz-dur-normal:  250ms;
  --fz-dur-slow:    400ms;
  --fz-dur-slower:  600ms;

  /* ── Z-Index Scale ── */
  --fz-z-dropdown:  100;
  --fz-z-sticky:    200;
  --fz-z-overlay:   300;
  --fz-z-modal:     400;
  --fz-z-toast:     500;
  --fz-z-tooltip:   600;
}
```

#### `reset.css` — Normalize

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { height: 100%; width: 100%; }
body {
  font-family: var(--fz-font-primary);
  background: var(--fz-bg-base);
  color: var(--fz-text-primary);
  -webkit-font-smoothing: antialiased;
  line-height: var(--fz-leading-normal);
}
img, video, svg { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }
button { cursor: pointer; border: none; background: none; font: inherit; color: inherit; }
input, textarea, select { font: inherit; color: inherit; }
ul, ol { list-style: none; }
::selection { background: var(--fz-accent); color: white; }
:focus-visible { outline: 2px solid var(--fz-accent); outline-offset: 2px; }
```

#### `typography.css` — Fonts + Type Classes

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Source+Code+Pro:wght@400&display=swap');

.fz-display   { font-family: var(--fz-font-display); font-weight: 800; line-height: var(--fz-leading-tight); }
.fz-heading   { font-weight: var(--fz-weight-bold); line-height: var(--fz-leading-tight); }
.fz-subhead   { font-weight: var(--fz-weight-semibold); line-height: var(--fz-leading-normal); }
.fz-body      { font-weight: var(--fz-weight-regular); line-height: var(--fz-leading-normal); }
.fz-caption   { font-size: var(--fz-text-sm); color: var(--fz-text-secondary); }
.fz-overline  { font-size: var(--fz-text-xs); font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; }
.fz-mono      { font-family: var(--fz-font-mono); }

.fz-gradient-text {
  background: linear-gradient(135deg, var(--fz-accent) 0%, var(--fz-accent-2) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

#### `animations.css` — Keyframes + Utilities

```css
@keyframes fz-fade-in       { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fz-fade-in-left  { from { opacity: 0; transform: translateX(-16px); } to { opacity: 1; transform: translateX(0); } }
@keyframes fz-fade-in-right { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
@keyframes fz-scale-in      { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
@keyframes fz-slide-up      { from { transform: translateY(100%); } to { transform: translateY(0); } }
@keyframes fz-slide-down    { from { transform: translateY(-100%); } to { transform: translateY(0); } }
@keyframes fz-pulse         { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
@keyframes fz-spin          { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes fz-float         { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
@keyframes fz-shimmer       { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes fz-glow-pulse    { 0%, 100% { box-shadow: 0 0 20px rgba(99,102,241,0.2); } 50% { box-shadow: 0 0 40px rgba(99,102,241,0.4); } }

/* Scroll reveal base */
.fz-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity var(--fz-dur-slow) var(--fz-ease-out),
              transform var(--fz-dur-slow) var(--fz-ease-out);
}
.fz-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger children */
.fz-stagger > .fz-reveal:nth-child(1) { transition-delay: 0ms; }
.fz-stagger > .fz-reveal:nth-child(2) { transition-delay: 80ms; }
.fz-stagger > .fz-reveal:nth-child(3) { transition-delay: 160ms; }
.fz-stagger > .fz-reveal:nth-child(4) { transition-delay: 240ms; }
.fz-stagger > .fz-reveal:nth-child(5) { transition-delay: 320ms; }
.fz-stagger > .fz-reveal:nth-child(6) { transition-delay: 400ms; }
```

#### `utilities.css` — Helpers

```css
.fz-container      { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 var(--fz-space-6); }
.fz-container-sm   { max-width: 800px; }
.fz-container-lg   { max-width: 1400px; }
.fz-section        { padding: var(--fz-space-24) 0; }
.fz-glass          { background: var(--fz-bg-glass); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid var(--fz-border); }
.fz-glow-border    { border: 1px solid var(--fz-border-glow); }
.fz-text-center    { text-align: center; }
.fz-sr-only        { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }

/* Scrollbar */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(100,100,160,0.3); border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: rgba(100,100,160,0.5); }
```

#### `global.css` — Master Import

```css
@import './tokens.css';
@import './reset.css';
@import './typography.css';
@import './animations.css';
@import './utilities.css';
```

---

### Step 3: `libs/icons` — Icon System

**Approach**: Inline SVG components (tree-shakeable, no HTTP requests, styleable with CSS).

Each icon is a standalone Angular component:

```typescript
// libs/icons/src/icons/arrow-right.ts
@Component({
  selector: 'fz-icon-arrow-right',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" [attr.width]="size" [attr.height]="size"
         viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 12h14"/>
      <path d="m12 5 7 7-7 7"/>
    </svg>
  `,
  styles: [`:host { display: inline-flex; align-items: center; }`]
})
export class ArrowRightIcon {
  @Input() size: number | string = 24;
}
```

**Plus a generic `<fz-icon>` wrapper**:

```typescript
// libs/icons/src/icon.component.ts
@Component({
  selector: 'fz-icon',
  standalone: true,
  template: `<ng-container [ngComponentOutlet]="iconComponent()" />`,
  styles: [`:host { display: inline-flex; align-items: center; line-height: 0; }`]
})
export class FzIconComponent {
  name = input.required<string>();
  size = input<number | string>(24);
  iconComponent = computed(() => ICON_MAP[this.name()]);
}
```

#### Full Icon Catalog (35 icons)

| Category | Icons |
|---|---|
| **Navigation** | `arrow-right`, `arrow-left`, `chevron-down`, `chevron-up`, `chevron-right`, `external-link`, `menu`, `close` |
| **Social** | `github`, `linkedin`, `twitter`, `youtube` |
| **Products** | `document` (resume), `globe` (portfolio), `robot` (AI), `microphone` (interview), `book` (learn), `briefcase` (jobs) |
| **Actions** | `search`, `download`, `upload`, `eye`, `star`, `heart`, `settings` |
| **Communication** | `mail`, `phone`, `map-pin`, `clock` |
| **Status** | `check`, `info`, `warning`, `error`, `success`, `sparkle` |
| **Theme** | `sun`, `moon` |
| **Users** | `user` |

---

### Step 4: `libs/ui` — Fzyrk UI Component Library

Every component follows this pattern:
- **Standalone** Angular component
- Uses **signals** (`input()`, `output()`, `computed()`, `model()`)
- Imports design tokens from `libs/theme`
- Uses icons from `libs/icons`
- Accessible (ARIA, keyboard, focus management)
- Documented with JSDoc

#### Component Specs

##### Form Controls

| Component | Selector | Key Inputs | Key Outputs |
|---|---|---|---|
| **Button** | `<fz-button>` | `variant: 'primary'\|'secondary'\|'outline'\|'ghost'\|'danger'`, `size: 'sm'\|'md'\|'lg'`, `disabled`, `loading`, `icon` | `(clicked)` |
| **Input** | `<fz-input>` | `type`, `placeholder`, `label`, `hint`, `error`, `icon`, `disabled` | `(valueChange)` |
| **Textarea** | `<fz-textarea>` | `placeholder`, `label`, `rows`, `maxLength`, `error` | `(valueChange)` |
| **Select** | `<fz-select>` | `options`, `placeholder`, `label`, `error`, `multiple` | `(selectionChange)` |
| **Checkbox** | `<fz-checkbox>` | `label`, `checked`, `disabled`, `indeterminate` | `(checkedChange)` |
| **Radio** | `<fz-radio-group>` | `options`, `name`, `value`, `label` | `(valueChange)` |
| **Switch** | `<fz-switch>` | `label`, `checked`, `disabled` | `(checkedChange)` |

##### Data Display

| Component | Selector | Key Inputs |
|---|---|---|
| **Card** | `<fz-card>` | `variant: 'default'\|'glass'\|'elevated'\|'outlined'`, `hoverable`, `clickable`, `padding` |
| **Avatar** | `<fz-avatar>` | `src`, `alt`, `name` (initials fallback), `size: 'sm'\|'md'\|'lg'\|'xl'`, `shape: 'circle'\|'square'` |
| **Badge** | `<fz-badge>` | `variant: 'default'\|'success'\|'warning'\|'error'\|'info'\|'accent'`, `size`, `dot` |
| **Table** | `<fz-table>` | `columns`, `data`, `sortable`, `striped`, `hoverable` |
| **Pagination** | `<fz-pagination>` | `total`, `pageSize`, `currentPage` → `(pageChange)` |

##### Feedback

| Component | Selector | Key Inputs |
|---|---|---|
| **Alert** | `<fz-alert>` | `variant: 'info'\|'success'\|'warning'\|'error'`, `title`, `dismissible` → `(dismissed)` |
| **Toast** | `FzToastService` | `show(message, type, duration)` — injected service with overlay |
| **Tooltip** | `fzTooltip` directive | `[fzTooltip]="text"`, `position: 'top'\|'bottom'\|'left'\|'right'` |
| **Skeleton** | `<fz-skeleton>` | `variant: 'text'\|'circle'\|'rect'`, `width`, `height`, `lines` |
| **Empty State** | `<fz-empty-state>` | `icon`, `title`, `description`, `actionLabel` → `(action)` |

##### Overlays

| Component | Selector | Key Inputs |
|---|---|---|
| **Dialog** | `<fz-dialog>` | `open`, `title`, `size: 'sm'\|'md'\|'lg'`, `closeOnOverlay` → `(closed)` |
| **Drawer** | `<fz-drawer>` | `open`, `position: 'left'\|'right'`, `size` → `(closed)` |
| **Modal** | `<fz-modal>` | `open`, `title`, `fullscreen` → `(closed)` |

##### Navigation

| Component | Selector | Key Inputs |
|---|---|---|
| **Navbar** | `<fz-navbar>` | `brand`, `items: NavItem[]`, `sticky`, `transparent`, `glass` |
| **Sidebar** | `<fz-sidebar>` | `items: NavItem[]`, `collapsed`, `position` → `(toggle)` |
| **Breadcrumb** | `<fz-breadcrumb>` | `items: {label, route}[]` |
| **Tabs** | `<fz-tabs>` | `tabs: {label, content}[]`, `activeIndex` → `(tabChange)` |
| **Accordion** | `<fz-accordion>` | `items: {title, content}[]`, `multiple` |

##### Utilities

| Component | Selector | Key Inputs |
|---|---|---|
| **Theme Switcher** | `<fz-theme-switcher>` | `mode: 'toggle'\|'dropdown'` |

---

### Step 5: `libs/shared` — Utilities

| Type | Name | Purpose |
|---|---|---|
| **Directive** | `fzScrollReveal` | Add `.visible` class when element enters viewport |
| **Directive** | `fzAnimateOnScroll` | Trigger CSS animation on scroll |
| **Directive** | `fzClickOutside` | Detect clicks outside element |
| **Service** | `ThemeService` | Toggle dark/light mode, persist preference |
| **Service** | `SeoService` | Set page title, meta description, OG tags |
| **Service** | `BreakpointService` | Reactive screen size signals |
| **Pipe** | `truncate` | Truncate text to length |
| **Pipe** | `timeAgo` | Relative time display |

---

### Step 6: `libs/models` — Shared Interfaces

```typescript
export interface Product {
  name: string;
  icon: string;
  description: string;
  status: 'live' | 'coming-soon' | 'beta';
  route?: string;
}

export interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  slug: string;
  coverImage?: string;
}

export interface Phase {
  number: number;
  title: string;
  status: 'complete' | 'in-progress' | 'upcoming';
  items: string[];
}

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
  isNumeric: boolean;
}

export interface NavItem {
  label: string;
  route?: string;
  fragment?: string;
  icon?: string;
  children?: NavItem[];
  external?: boolean;
}

export interface Value {
  icon: string;
  title: string;
  description: string;
}
```

---

## Phase B — Website App

> Built entirely on top of `libs/theme`, `libs/icons`, `libs/ui`, `libs/shared`, and `libs/models`.

### Routes

```typescript
// apps/website/src/app/app.routes.ts — Master routes
export const routes: Routes = [
  { path: '',        component: HomeComponent },
  { path: 'about',   loadComponent: () => import('./pages/about/about').then(m => m.AboutComponent) },
  { path: 'blog',    loadComponent: () => import('./pages/blog/blog').then(m => m.BlogComponent) },
  { path: 'pricing', loadComponent: () => import('./pages/pricing/pricing').then(m => m.PricingComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact').then(m => m.ContactComponent) },
  { path: 'privacy', loadComponent: () => import('./pages/privacy/privacy').then(m => m.PrivacyComponent) },
  { path: 'terms',   loadComponent: () => import('./pages/terms/terms').then(m => m.TermsComponent) },

  // ── Product apps (all under /products/*) ──
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.routes').then(m => m.PRODUCT_ROUTES)
  },

  { path: '**',      redirectTo: '' }
];
```

```typescript
// apps/website/src/app/pages/products/products.routes.ts — Product child routes
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
    loadChildren: () => import('@fzyrk/products/portfolio').then(m => m.PORTFOLIO_ROUTES)
    // fzyrk.com/products/portfolio → Portfolio Builder (future)
  },
  {
    path: 'ai',
    loadChildren: () => import('@fzyrk/products/ai').then(m => m.AI_ROUTES)
    // fzyrk.com/products/ai → AI Assistant (future)
  },
  {
    path: 'interview',
    loadChildren: () => import('@fzyrk/products/interview').then(m => m.INTERVIEW_ROUTES)
    // fzyrk.com/products/interview → Interview Platform (future)
  },
  {
    path: 'learn',
    loadChildren: () => import('@fzyrk/products/learn').then(m => m.LEARN_ROUTES)
    // fzyrk.com/products/learn → Learning Platform (future)
  },
  {
    path: 'jobs',
    loadChildren: () => import('@fzyrk/products/jobs').then(m => m.JOBS_ROUTES)
    // fzyrk.com/products/jobs → Job Board (future)
  }
];
```

### All Pages

| Route | Page | Key Sections |
|---|---|---|
| `/` | Home | Hero, Products preview, About preview, Roadmap, Stats, Blog preview, Contact CTA |
| `/about` | About | Story, Mission/Vision, Values, Team, Tech stack |
| `/blog` | Blog | Card grid, category filters, "Coming Soon" |
| `/pricing` | Pricing | 3 tiers (Free/Pro/Team), feature table, FAQ |
| `/contact` | Contact | Form + info cards + social |
| `/privacy` | Privacy | Policy text |
| `/terms` | Terms | T&C text |
| `/products` | Products | Full product catalog with cards, status, descriptions |
| `/products/resume` | Resume Builder | Full resume builder app (migrated from existing) |
| `/products/portfolio` | Portfolio Builder | Future — placeholder |
| `/products/ai` | AI Assistant | Future — placeholder |
| `/products/interview` | Interview Prep | Future — placeholder |
| `/products/learn` | Learning Platform | Future — placeholder |
| `/products/jobs` | Job Board | Future — placeholder |

### Vercel Deployment

```json
// vercel.json
{
  "buildCommand": "npx nx build website --configuration=production",
  "outputDirectory": "dist/apps/website/browser",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## Complete Build Order (Revised)

| Step | What | Library/App | Est. Size |
|---|---|---|---|
| **1** | Initialize Nx workspace | workspace | Setup |
| **2** | `tokens.css` + `reset.css` + `typography.css` + `animations.css` + `utilities.css` + `global.css` | `libs/theme` | ~6 files |
| **3** | TS token constants (`colors.ts`, `spacing.ts`, etc.) | `libs/theme` | ~4 files |
| **4** | Icon components (35 icons + registry + wrapper) | `libs/icons` | ~38 files |
| **5** | Button, Input, Textarea, Select | `libs/ui` | ~12 files |
| **6** | Checkbox, Radio, Switch | `libs/ui` | ~9 files |
| **7** | Card, Avatar, Badge | `libs/ui` | ~9 files |
| **8** | Alert, Toast, Tooltip | `libs/ui` | ~9 files |
| **9** | Dialog, Drawer, Modal | `libs/ui` | ~9 files |
| **10** | Tabs, Accordion | `libs/ui` | ~6 files |
| **11** | Table, Pagination | `libs/ui` | ~6 files |
| **12** | Navbar, Sidebar, Breadcrumb | `libs/ui` | ~9 files |
| **13** | Skeleton, Empty State, Theme Switcher | `libs/ui` | ~9 files |
| **14** | Directives, Pipes, Services | `libs/shared` | ~8 files |
| **15** | Model interfaces | `libs/models` | ~5 files |
| **16** | Website app shell + routing | `apps/website` | ~5 files |
| **17** | Navbar + Footer (website-specific) | `apps/website` | ~6 files |
| **18** | Home page (Hero, Products, Roadmap, Stats, Blog preview) | `apps/website` | ~20 files |
| **19** | About, Blog, Pricing pages | `apps/website` | ~9 files |
| **20** | Contact, Privacy, Terms pages | `apps/website` | ~9 files |
| **21** | SEO service + meta tags | `apps/website` | ~3 files |
| **22** | Animations + scroll reveals | `apps/website` | Polish |
| **23** | Vercel config + deploy | workspace | ~2 files |

**Total**: ~200+ files across the full build.

---

## Verification Plan

### Automated
```bash
npx nx test theme       # Token TS exports
npx nx test icons       # Icon rendering
npx nx test ui          # All UI component tests
npx nx test website     # Website component tests
npx nx build website    # Production build (no errors)
npx nx lint website     # ESLint
```

### Manual
- [ ] Every UI component renders in isolation
- [ ] All marketing routes load (`/`, `/about`, `/blog`, `/pricing`, `/contact`, `/privacy`, `/terms`)
- [ ] `/products` listing page shows all product cards
- [ ] `/products/resume` loads the resume builder app
- [ ] Future product routes show "Coming Soon" placeholders
- [ ] Responsive at 375px / 768px / 1024px / 1440px
- [ ] Navbar, footer present on all pages
- [ ] Navbar hides/changes on product app pages (optional)
- [ ] Dark theme consistent across all components
- [ ] Animations trigger on scroll
- [ ] Lighthouse > 95 / 100 / 90 (Perf / SEO / A11y)
- [ ] Vercel preview deploy works

