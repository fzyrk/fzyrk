# Fzyrk Platform — Phase 1 & 2 Developer Guide

Welcome to the Fzyrk Developer Guide for Phase 1 (Foundation Setup) & Phase 2 (Digital Presence/Website implementation). This document outlines the architecture, workspace layout, created modules, and design patterns established for the Fzyrk codebase.

---

## 1. Monorepo Architecture Overview

The Fzyrk workspace is structured as an **Nx Monorepo** containing a primary marketing application and several shared feature/primitives libraries. The codebase uses **Angular standalone components**, **Signals-first reactivity**, and **custom CSS design tokens**.

### Monorepo Structure Layout
```
fzyrk/
├── apps/
│   ├── website/                        ← Marketing site & product shell
│   └── website-e2e/                    ← Playwright E2E tests
├── libs/
│   ├── theme/                          ← Design tokens & typography
│   ├── icons/                          ← 35 standalone SVG components
│   ├── ui/                             ← Reusable UI primitive components
│   ├── shared/                         ← Core services & directives
│   ├── models/                         ← Shared TS interface definitions
│   └── products/
│       └── resume/                     ← Full Resume Builder product workspace
├── vercel.json                         ← Production deployment config
├── nx.json                             ← Nx workspace config
├── package.json                        ← Global dependencies
└── tsconfig.base.json                  ← Import path mappings
```

---

## 2. Directory and File Index

Here is a comprehensive breakdown of all the primary files generated during this phase and their purposes.

### A. Core Configuration Files
* **[tsconfig.base.json](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/tsconfig.base.json)**: Declares custom paths mappings for imports (e.g. `@fzyrk/theme` mapped to `./libs/theme/src/index.ts`).
* **[vercel.json](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/vercel.json)**: Configures building output paths (`dist/apps/website/browser`) and rewrite paths for Vercel deployment.
* **[apps/website/project.json](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/apps/website/project.json)**: Configures build settings, pre-rendering targets, and adjusted bundle size budgets (up to 40KB style limits for rich styling).

---

### B. Library 1: `libs/theme` (Design Primitives)
Contains all CSS custom variables and TypeScript design system tokens.
* **[tokens.css](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/libs/theme/src/styles/tokens.css)**: Declares variables like `--fz-accent`, spacing scale, typographic weights, radii, transition timings, and shadow values.
* **[reset.css](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/libs/theme/src/styles/reset.css)**: Standard normalize resets.
* **[typography.css](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/libs/theme/src/styles/typography.css)**: Links Outfit/Inter fonts, specifies display scales and gradient text utilities.
* **[animations.css](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/libs/theme/src/styles/animations.css)**: Setup for fade-in, scale-in, shimmer, floating, and scroll reveal transitions.
* **[utilities.css](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/libs/theme/src/styles/utilities.css)**: Grid/flex, glassmorphism layouts.
* **[global.css](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/libs/theme/src/styles/global.css)**: Master CSS import barrel.
* **[colors.ts](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/libs/theme/src/tokens/colors.ts)**, **[typography.ts](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/libs/theme/src/tokens/typography.ts)**, **[spacing.ts](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/libs/theme/src/tokens/spacing.ts)**: Shared configuration constants exported for TS usage.

---

### C. Library 2: `libs/icons` (Tree-Shakeable SVG Icons)
Wraps individual SVGs inside Angular component nodes to remove HTTP requests.
* **[icons/](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/libs/icons/src/icons)**: Directory containing 35 individual SVG icons (e.g. `arrow-right`, `github`, `document`, `star`, etc.).
* **[icon-registry.service.ts](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/libs/icons/src/icon-registry.service.ts)**: Dictionary mapping string labels (e.g., `'menu'`) to component constructors.
* **[icon.component.ts](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/libs/icons/src/icon.component.ts)**: Generic `<fz-icon>` wrapper with dynamic component outlet sizing.

---

### D. Library 3: `libs/ui` (Shared Primitive Widgets)
Standalone components compiled using signals:
* **[button/button.ts](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/libs/ui/src/button/button.ts)**: A reactive component with loading animations, variants (primary, secondary, outline, ghost), and inline icon support.
* **[card/card.ts](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/libs/ui/src/card/card.ts)**: Container implementing standard/glass borders.
* **[badge/badge.ts](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/libs/ui/src/badge/badge.ts)**: Dot indicators and status tags.

---

### E. Library 4: `libs/shared` (Directives & Utilities)
* **[theme.service.ts](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/libs/shared/src/services/theme.service.ts)**: Tracks dark/light status, syncing with `data-theme` attribute and `localStorage`.
* **[seo.service.ts](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/libs/shared/src/services/seo.service.ts)**: Controls page title, robots directives, Twitter Cards, and Open Graph tags.
* **[breakpoint.service.ts](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/libs/shared/src/services/breakpoint.service.ts)**: Exposes screen signals (`isMobile`, `isTablet`, `isDesktop`).
* **[directives/scroll-reveal.directive.ts](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/libs/shared/src/directives/scroll-reveal.directive.ts)**: Controls entry animations.
* **[directives/click-outside.directive.ts](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/libs/shared/src/directives/click-outside.directive.ts)**: Detects out-of-element events for menus.

---

### F. Library 5: `libs/models` (Type Safety Interfaces)
* **[product.model.ts](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/libs/models/src/product.model.ts)**, **[blog-post.model.ts](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/libs/models/src/blog-post.model.ts)**, **[milestone.model.ts](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/libs/models/src/milestone.model.ts)**, **[nav-item.model.ts](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/libs/models/src/nav-item.model.ts)**: Defines structural interfaces for products, blog entries, roadmaps, stats, and pricing tiers.

---

### G. Application: `apps/website` (Marketing Site & Shell)
Handles the routing structure and displays all page modules.
* **[app/app.ts](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/apps/website/src/app/app.ts)**: Root configuration. Implements the global navbar with responsive hamburger menus and the marketing footer.
* **[app.routes.ts](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/apps/website/src/app/app.routes.ts)**: Master routes mapping `/about`, `/blog`, `/pricing`, `/contact`, `/privacy`, `/terms`, and `/products` to page modules.
* **[pages/home/home.ts](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/apps/website/src/app/pages/home/home.ts)**: Core page displaying the platform features, interactive stats counters, roadmap, and pricing CTA.
* **[pages/about/about.ts](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/apps/website/src/app/pages/about/about.ts)**: Displays mission statement, core values, and the development tech stack.
* **[pages/blog/blog.ts](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/apps/website/src/app/pages/blog/blog.ts)**: Blog layout complete with category-based dynamic filtering.
* **[pages/pricing/pricing.ts](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/apps/website/src/app/pages/pricing/pricing.ts)**: Configures plans, feature breakdowns, and an accordion-style FAQ.
* **[pages/contact/contact.ts](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/apps/website/src/app/pages/contact/contact.ts)**: Renders info cards and contact form.
* **[pages/products/products.routes.ts](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/apps/website/src/app/pages/products/products.routes.ts)**: Orchestrates products catalog page routing and lazy loading for the Resume app.

---

### H. Library 6: `libs/products/resume` (Resume Builder Application)
An integration of the standalone Resume Builder into the monorepo workspace.
* **[resume-app.component.ts](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/libs/products/resume/src/lib/resume-app.component.ts)**: Central controller for toolbar, editor, and live-preview rendering. Implements undo/redo keyboard actions.
* **[resume-app.routes.ts](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/libs/products/resume/src/lib/resume-app.routes.ts)**: Declares routes exposing the workspace component as the route entrypoint.
* **[resume.css](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/libs/products/resume/src/lib/resume.css)**: Implements typography and print layout configs for resume templates (Modern, Classic, Minimal, Creative).
* **[services/](file:///Users/amanullakhan/Developer/Fzyrk/fzyrk/libs/products/resume/src/lib/services)**: Services managing resume data (`resume.service.ts`), template styling (`template.service.ts`), local browser state syncing (`persistence.service.ts`), and PDF compilation using `jspdf` and `html2canvas` (`export.service.ts`).

---

## 3. Development Workflow and CLI Guide

To manage the monorepo workspace, you can execute the following commands from the root directory:

### Running the App Locally
```bash
npx nx serve website
```
Compiles and hosts the application locally at **http://localhost:4200/**. Code changes will trigger live reloads in your browser.

### Building for Production
```bash
npx nx build website
```
Builds the website app and outputs static HTML/JS files to `dist/apps/website/browser`. The project style budgets allow up to 40KB for custom component styles.

### Running Unit Tests
```bash
npx nx test ui
npx nx test shared
```
Runs component tests inside the library workspaces.
