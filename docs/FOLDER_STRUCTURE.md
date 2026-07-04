# 📁 Folder Structure

> Complete guide to the Fzyrk monorepo folder structure.

---

## Root Structure

```
fzyrk/
│
├── 📂 apps/                            Application projects
│   ├── 📂 website/                     Marketing website (fzyrk.com)
│   └── 📂 products/                    Product applications
│       ├── 📂 resume/                  Resume Builder
│       ├── 📂 portfolio/              Portfolio Builder (future)
│       ├── 📂 ai/                     AI Assistant (future)
│       ├── 📂 interview/             Interview Platform (future)
│       ├── 📂 learn/                  Learning Platform (future)
│       └── 📂 jobs/                   Job Board (future)
│
├── 📂 libs/                            Shared libraries
│   ├── 📂 theme/                       Design tokens & global styles
│   ├── 📂 icons/                       SVG icon components
│   ├── 📂 ui/                          Fzyrk UI component library
│   ├── 📂 shared/                      Shared utilities
│   └── 📂 models/                      TypeScript interfaces
│
├── 📂 docs/                            Documentation
│   ├── ARCHITECTURE.md                 System architecture
│   ├── FOLDER_STRUCTURE.md             This file
│   ├── COMPONENT_LIBRARY.md            UI component catalog
│   ├── CODING_STANDARDS.md             Coding conventions
│   ├── RELEASE_NOTES.md                Version release notes
│   ├── ROADMAP.md                      Product & tech roadmap
│   ├── CHANGELOG.md                    Change log
│   └── CONTRIBUTING.md                 Contribution guide
│
├── 📄 README.md                        Project overview
├── 📄 STARTUP_ROADMAP.md               Full company roadmap
├── 📄 implementationRoadMap.md         Technical implementation plan
├── 📄 nx.json                          Nx workspace config
├── 📄 package.json                     Root dependencies
├── 📄 tsconfig.base.json               Base TypeScript config
├── 📄 angular.json                     Angular workspace config
├── 📄 vercel.json                      Vercel deployment config
├── 📄 .prettierrc                      Prettier config
├── 📄 .eslintrc.json                   ESLint config
└── 📄 .gitignore                       Git ignore rules
```

---

## Apps

### `apps/website/` — Marketing Website

The main application shell and marketing pages for fzyrk.com.

```
apps/website/
├── src/
│   ├── app/
│   │   ├── app.ts                      Root component (navbar + router-outlet + footer)
│   │   ├── app.html                    Root template
│   │   ├── app.css                     Root styles
│   │   ├── app.routes.ts               Master route configuration
│   │   ├── app.config.ts               Application providers config
│   │   │
│   │   ├── 📂 pages/                   Route-level page components
│   │   │   ├── 📂 home/
│   │   │   │   ├── home.ts             Home page component
│   │   │   │   ├── home.html           Home page template
│   │   │   │   └── home.css            Home page styles
│   │   │   ├── 📂 about/
│   │   │   │   ├── about.ts
│   │   │   │   ├── about.html
│   │   │   │   └── about.css
│   │   │   ├── 📂 blog/
│   │   │   │   ├── blog.ts
│   │   │   │   ├── blog.html
│   │   │   │   └── blog.css
│   │   │   ├── 📂 pricing/
│   │   │   │   ├── pricing.ts
│   │   │   │   ├── pricing.html
│   │   │   │   └── pricing.css
│   │   │   ├── 📂 contact/
│   │   │   │   ├── contact.ts
│   │   │   │   ├── contact.html
│   │   │   │   └── contact.css
│   │   │   ├── 📂 privacy/
│   │   │   │   ├── privacy.ts
│   │   │   │   └── privacy.html
│   │   │   ├── 📂 terms/
│   │   │   │   ├── terms.ts
│   │   │   │   └── terms.html
│   │   │   └── 📂 products/
│   │   │       ├── products.ts          Products listing page
│   │   │       ├── products.html
│   │   │       ├── products.css
│   │   │       └── products.routes.ts   Child routes to product apps
│   │   │
│   │   └── 📂 components/              Website-specific components
│   │       ├── 📂 hero/                 Hero section
│   │       ├── 📂 product-card/         Product showcase card
│   │       ├── 📂 timeline/             Roadmap timeline
│   │       ├── 📂 stats-counter/        Animated stat counters
│   │       ├── 📂 blog-card/            Blog post preview card
│   │       ├── 📂 value-card/           Company value card
│   │       └── 📂 contact-form/         Contact form
│   │
│   ├── index.html                       HTML entry point
│   ├── main.ts                          Bootstrap entry
│   └── styles.css                       Global styles (imports libs/theme)
│
├── public/                              Static assets
│   ├── favicon.svg
│   ├── favicon.ico
│   ├── og-image.png
│   └── logo.svg
│
├── project.json                         Nx project config
└── tsconfig.app.json                    App TypeScript config
```

### `apps/products/resume/` — Resume Builder

```
apps/products/resume/
├── src/
│   ├── app/
│   │   ├── resume-app.ts               Root component
│   │   ├── resume-app.html
│   │   ├── resume-app.routes.ts         Internal routes
│   │   │
│   │   ├── 📂 components/
│   │   │   ├── 📂 editor/              Resume form editor
│   │   │   ├── 📂 preview/             Live resume preview
│   │   │   ├── 📂 toolbar/             Top toolbar (template, export)
│   │   │   ├── 📂 sidebar/             Section navigation
│   │   │   └── 📂 template-selector/   Template picker
│   │   │
│   │   ├── 📂 pages/
│   │   │   ├── 📂 builder/             Main builder page
│   │   │   └── 📂 templates/           Template gallery page
│   │   │
│   │   ├── 📂 services/
│   │   │   ├── resume-storage.service.ts  LocalStorage CRUD
│   │   │   ├── pdf-export.service.ts      PDF generation
│   │   │   └── resume-data.service.ts     Resume state management
│   │   │
│   │   └── 📂 models/
│   │       ├── resume.model.ts          Resume data interface
│   │       └── template.model.ts        Template config interface
│   │
│   ├── main.ts
│   └── styles.css
│
├── project.json
└── tsconfig.app.json
```

---

## Libraries

### `libs/theme/` — Design Tokens & Global Styles

```
libs/theme/
├── src/
│   ├── index.ts                         Public API barrel export
│   │
│   ├── 📂 styles/                       CSS files (imported by apps)
│   │   ├── tokens.css                   All CSS custom properties (--fz-*)
│   │   ├── reset.css                    CSS reset / normalize
│   │   ├── typography.css               @font-face + typographic classes
│   │   ├── animations.css               @keyframes + animation utilities
│   │   ├── utilities.css                Helper classes (.fz-container, .fz-glass)
│   │   └── global.css                   Master import (imports all above)
│   │
│   └── 📂 tokens/                       TypeScript token constants
│       ├── colors.ts                    Color palette constants
│       ├── typography.ts                Font & size constants
│       ├── spacing.ts                   Spacing scale constants
│       └── index.ts                     Barrel export
│
└── project.json
```

### `libs/icons/` — Icon System

```
libs/icons/
├── src/
│   ├── index.ts                         Public API barrel
│   ├── icon.component.ts               Generic <fz-icon name="..."> wrapper
│   ├── icon.component.html
│   ├── icon.component.css
│   ├── icon-registry.service.ts        Icon name → component mapping
│   ├── provide-icons.ts               Provider function
│   │
│   └── 📂 icons/                       Individual SVG icon components
│       ├── arrow-right.ts
│       ├── arrow-left.ts
│       ├── chevron-down.ts
│       ├── chevron-up.ts
│       ├── chevron-right.ts
│       ├── close.ts
│       ├── menu.ts
│       ├── search.ts
│       ├── check.ts
│       ├── external-link.ts
│       ├── github.ts
│       ├── linkedin.ts
│       ├── twitter.ts
│       ├── youtube.ts
│       ├── mail.ts
│       ├── phone.ts
│       ├── map-pin.ts
│       ├── clock.ts
│       ├── globe.ts
│       ├── document.ts
│       ├── robot.ts
│       ├── microphone.ts
│       ├── book.ts
│       ├── briefcase.ts
│       ├── sparkle.ts
│       ├── sun.ts
│       ├── moon.ts
│       ├── star.ts
│       ├── heart.ts
│       ├── eye.ts
│       ├── download.ts
│       ├── upload.ts
│       ├── user.ts
│       ├── settings.ts
│       ├── info.ts
│       ├── warning.ts
│       ├── error.ts
│       ├── success.ts
│       └── index.ts                    All icons barrel
│
└── project.json
```

### `libs/ui/` — Fzyrk UI Component Library

```
libs/ui/
├── src/
│   ├── index.ts                         Public API barrel
│   │
│   ├── 📂 button/                       Each component has this structure:
│   │   ├── button.ts                    Component class
│   │   ├── button.html                  Template
│   │   ├── button.css                   Scoped styles
│   │   └── button.spec.ts              Unit tests
│   │
│   ├── 📂 input/
│   ├── 📂 textarea/
│   ├── 📂 select/
│   ├── 📂 checkbox/
│   ├── 📂 radio/
│   ├── 📂 switch/
│   ├── 📂 card/
│   ├── 📂 avatar/
│   ├── 📂 badge/
│   ├── 📂 alert/
│   ├── 📂 toast/
│   ├── 📂 tooltip/
│   ├── 📂 dialog/
│   ├── 📂 drawer/
│   ├── 📂 modal/
│   ├── 📂 tabs/
│   ├── 📂 accordion/
│   ├── 📂 table/
│   ├── 📂 pagination/
│   ├── 📂 navbar/
│   ├── 📂 sidebar/
│   ├── 📂 breadcrumb/
│   ├── 📂 skeleton/
│   ├── 📂 empty-state/
│   └── 📂 theme-switcher/
│
└── project.json
```

### `libs/shared/` — Shared Utilities

```
libs/shared/
├── src/
│   ├── index.ts                         Public API barrel
│   │
│   ├── 📂 directives/
│   │   ├── scroll-reveal.directive.ts   Add .visible on viewport enter
│   │   ├── animate-on-scroll.directive.ts  Trigger CSS animation on scroll
│   │   └── click-outside.directive.ts   Detect outside clicks
│   │
│   ├── 📂 pipes/
│   │   ├── truncate.pipe.ts             Truncate text to N characters
│   │   └── time-ago.pipe.ts            Relative time display
│   │
│   └── 📂 services/
│       ├── theme.service.ts             Dark/light mode toggle
│       ├── seo.service.ts               Dynamic meta tags
│       └── breakpoint.service.ts        Screen size signals
│
└── project.json
```

### `libs/models/` — TypeScript Interfaces

```
libs/models/
├── src/
│   ├── index.ts                         Public API barrel
│   ├── product.model.ts                 Product interface
│   ├── blog-post.model.ts              BlogPost interface
│   ├── milestone.model.ts              Phase, Stat interfaces
│   └── nav-item.model.ts              NavItem, Value interfaces
│
└── project.json
```

---

## Naming Conventions

### Files

| Type | Convention | Example |
|---|---|---|
| Component | `kebab-case.ts` | `product-card.ts` |
| Template | `kebab-case.html` | `product-card.html` |
| Styles | `kebab-case.css` | `product-card.css` |
| Test | `kebab-case.spec.ts` | `product-card.spec.ts` |
| Service | `kebab-case.service.ts` | `theme.service.ts` |
| Directive | `kebab-case.directive.ts` | `scroll-reveal.directive.ts` |
| Pipe | `kebab-case.pipe.ts` | `truncate.pipe.ts` |
| Model | `kebab-case.model.ts` | `product.model.ts` |
| Route config | `*.routes.ts` | `app.routes.ts` |
| Barrel export | `index.ts` | `index.ts` |

### Folders

| Type | Convention | Example |
|---|---|---|
| Pages | `kebab-case/` | `pages/home/` |
| Components | `kebab-case/` | `components/hero/` |
| Services | `services/` | `services/` |
| Models | `models/` | `models/` |

### Import Paths

Libraries are imported using the `@fzyrk/` prefix:

```typescript
import { FzButtonComponent } from '@fzyrk/ui';
import { Product } from '@fzyrk/models';
import { ThemeService } from '@fzyrk/shared';
import { FzIconComponent } from '@fzyrk/icons';
```

These paths are configured in `tsconfig.base.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@fzyrk/theme":  ["libs/theme/src/index.ts"],
      "@fzyrk/icons":  ["libs/icons/src/index.ts"],
      "@fzyrk/ui":     ["libs/ui/src/index.ts"],
      "@fzyrk/shared": ["libs/shared/src/index.ts"],
      "@fzyrk/models": ["libs/models/src/index.ts"]
    }
  }
}
```

---

*📅 Last Updated: July 4, 2026*
