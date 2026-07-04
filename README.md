# 🚀 Fzyrk

> **Build. Showcase. Grow.**

Fzyrk is a modern technology company building intelligent software products that help professionals build, showcase, and grow their careers.

---

## 🌍 About

Fzyrk is a CareerTech platform delivering a suite of beautifully designed, accessible, and high-performance tools for professionals worldwide. Starting with our flagship **Resume Builder**, we're building an ecosystem that covers every stage of career development.

### Mission

Build intelligent software that helps professionals **build**, **showcase**, and **grow** their careers.

### Vision

Become the world's most trusted ecosystem for career development and professional productivity.

---

## 🏗 Monorepo Structure

This project uses an **Nx Angular monorepo** with the following structure:

```
fzyrk/
├── apps/
│   ├── website/          → Marketing website (fzyrk.com)
│   └── products/
│       ├── resume/       → Resume Builder (/products/resume)
│       ├── portfolio/    → Portfolio Builder (/products/portfolio)
│       ├── ai/           → AI Assistant (/products/ai)
│       ├── interview/    → Interview Platform (/products/interview)
│       ├── learn/        → Learning Platform (/products/learn)
│       └── jobs/         → Job Board (/products/jobs)
│
├── libs/
│   ├── theme/            → Design tokens, global styles
│   ├── icons/            → SVG icon component library
│   ├── ui/               → Fzyrk UI component library
│   ├── shared/           → Shared directives, pipes, services
│   └── models/           → TypeScript interfaces & types
│
└── docs/                 → Documentation
```

---

## 📦 Products

| Product | Status | Description |
|---|---|---|
| **Fzyrk Resume** | ✅ Live | Build beautiful resumes with 8+ templates, live preview & PDF export |
| **Fzyrk Portfolio** | 🔜 Coming Soon | Generate portfolio websites directly from your resume |
| **Fzyrk AI** | 🔜 Coming Soon | AI-powered resume review, ATS scoring & grammar suggestions |
| **Fzyrk Interview** | 🔜 Coming Soon | Mock interviews with AI feedback and coding challenges |
| **Fzyrk Learn** | 🔜 Coming Soon | Curated learning paths for career professionals |
| **Fzyrk Jobs** | 🔜 Coming Soon | Smart job matching based on your resume profile |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Angular (Latest) |
| **Language** | TypeScript (Strict) |
| **Monorepo** | Nx |
| **Reactivity** | Signals |
| **Styling** | CSS Custom Properties |
| **State** | Signal Store / NgRx |
| **UI Library** | Fzyrk UI (custom) |
| **Icons** | Custom inline SVG components |
| **Testing** | Jest, Angular Testing Library, Playwright |
| **CI/CD** | GitHub Actions |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **Angular CLI** (installed globally or via npx)
- **Nx CLI** (installed globally or via npx)

### Installation

```bash
# Clone the repository
git clone https://github.com/fzyrk/fzryk.git
cd fzyrk

# Install dependencies
npm install
```

### Development

```bash
# Serve the website app
npx nx serve website

# Serve a specific product app
npx nx serve resume

# Run all tests
npx nx run-many --target=test --all

# Build for production
npx nx build website --configuration=production

# Lint all projects
npx nx run-many --target=lint --all
```

### Useful Nx Commands

```bash
# See project dependency graph
npx nx graph

# Run affected tests (only changed projects)
npx nx affected --target=test

# Generate a new library
npx nx generate @nx/angular:library my-lib --directory=libs/my-lib --standalone

# Generate a new component
npx nx generate @nx/angular:component my-component --project=website --standalone
```

---

## 📁 Documentation

All documentation lives in the [`docs/`](./docs/) directory:

| Document | Description |
|---|---|
| [Architecture](./docs/ARCHITECTURE.md) | System architecture, patterns, and technical decisions |
| [Folder Structure](./docs/FOLDER_STRUCTURE.md) | Detailed project folder structure guide |
| [Component Library](./docs/COMPONENT_LIBRARY.md) | Fzyrk UI component catalog and usage |
| [Coding Standards](./docs/CODING_STANDARDS.md) | Code style, naming conventions, and best practices |
| [Release Notes](./docs/RELEASE_NOTES.md) | Per-version release notes |
| [Roadmap](./docs/ROADMAP.md) | Product and technical roadmap |
| [Changelog](./docs/CHANGELOG.md) | Chronological change log |
| [Contributing Guide](./docs/CONTRIBUTING.md) | How to contribute to Fzyrk |

Additional root-level documents:

| Document | Description |
|---|---|
| [Startup Roadmap](./STARTUP_ROADMAP.md) | Full company roadmap (2026–2030) |
| [Implementation Roadmap](./implementationRoadMap.md) | Technical implementation plan |

---

## 🎨 Design System

Fzyrk uses a custom design system built from scratch:

- **Design Tokens**: CSS custom properties with `--fz-` prefix
- **Typography**: Inter (body) + Plus Jakarta Sans (display)
- **Theme**: Dark-first with glassmorphism
- **Icons**: 35+ inline SVG icon components
- **Components**: 25+ accessible, reusable Angular components
- **Animations**: Scroll reveal, micro-interactions, spring easing

See the [Component Library](./docs/COMPONENT_LIBRARY.md) for full details.

---

## 🌐 URL Architecture

```
fzyrk.com                       → Home
fzyrk.com/about                 → About
fzyrk.com/blog                  → Blog
fzyrk.com/pricing               → Pricing
fzyrk.com/contact               → Contact
fzyrk.com/products              → Product Catalog
fzyrk.com/products/resume       → Resume Builder
fzyrk.com/products/portfolio    → Portfolio Builder
fzyrk.com/products/ai           → AI Assistant
fzyrk.com/products/interview    → Interview Platform
fzyrk.com/products/learn        → Learning Platform
fzyrk.com/products/jobs         → Job Board
```

---

## 📄 License

Copyright © 2026 Fzyrk. All rights reserved.

---

## 🔗 Links

- **Website**: [fzyrk.com](https://fzyrk.com)
- **GitHub**: [github.com/fzyrk](https://github.com/fzyrk)
- **LinkedIn**: [linkedin.com/company/fzyrk](https://linkedin.com/company/fzyrk)
- **X (Twitter)**: [x.com/fzyrk](https://x.com/fzyrk)
- **YouTube**: [youtube.com/@fzyrk](https://youtube.com/@fzyrk)

---

*Built with ❤️ by the Fzyrk Team*
