# 📋 Release Notes

> Per-version release notes for the Fzyrk platform.

---

## Version History

| Version | Date | Product | Type |
|---|---|---|---|
| [v0.1.0](#v010--foundation) | July 2026 | Platform | Foundation |

---

## v0.1.0 — Foundation

**Release Date**: July 4, 2026
**Type**: Initial Setup

### What's New

#### 🏗 Project Foundation
- Initialized Fzyrk monorepo structure
- Created complete startup roadmap (2026–2030)
- Created implementation roadmap with technical specifications
- Established brand identity and documentation

#### 📚 Documentation
- **README.md** — Project overview, tech stack, getting started guide
- **STARTUP_ROADMAP.md** — Full company roadmap with 6 phases, product versions, milestones
- **implementationRoadMap.md** — Technical implementation plan with monorepo structure, design system, routing architecture
- **docs/ARCHITECTURE.md** — System architecture, project graph, library layers
- **docs/FOLDER_STRUCTURE.md** — Complete folder structure guide
- **docs/COMPONENT_LIBRARY.md** — Fzyrk UI component catalog (25 components)
- **docs/CODING_STANDARDS.md** — TypeScript, Angular, CSS, and git conventions
- **docs/RELEASE_NOTES.md** — This file
- **docs/ROADMAP.md** — Product and technical roadmap
- **docs/CHANGELOG.md** — Change log
- **docs/CONTRIBUTING.md** — Contribution guide

#### 🎯 Architecture Decisions
- **Monorepo**: Nx Angular monorepo with `apps/` and `libs/` structure
- **Routing**: Path-based routing under single domain (`fzyrk.com/products/*`)
- **Design System**: Custom design tokens with `--fz-` prefix, dark-first theme
- **Icons**: Inline SVG Angular components (tree-shakeable)
- **Components**: 25+ standalone Angular components with signals
- **Deployment**: Vercel with SPA fallback rewrites

### Breaking Changes
None — initial release.

### Known Issues
None.

---

## Upcoming Releases

### v0.2.0 — Design System (Planned)
- `libs/theme` — Complete design tokens and global styles
- `libs/icons` — 35+ SVG icon components
- `libs/ui` — Core form components (Button, Input, Card)

### v0.3.0 — Website MVP (Planned)
- `apps/website` — Marketing website with all pages
- Home, About, Blog, Pricing, Contact, Privacy, Terms
- Product catalog page with `/products` routing

### v1.0.0 — Resume Builder Integration (Planned)
- Migrate existing Resume Builder into `apps/products/resume`
- Full integration with Fzyrk UI components
- Live at `fzyrk.com/products/resume`

---

*📅 Last Updated: July 4, 2026*
