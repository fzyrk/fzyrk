# 📝 Changelog

> All notable changes to the Fzyrk platform are documented in this file.
>
> The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
> and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- `libs/theme` — Design tokens and global styles
- `libs/icons` — 35+ SVG icon components
- `libs/ui` — Fzyrk UI component library (25 components)
- `libs/shared` — Shared directives, pipes, and services
- `libs/models` — TypeScript interfaces
- `apps/website` — Marketing website (Home, About, Blog, Pricing, Contact)

---

## [0.1.0] — 2026-07-04

### Added

#### Project Foundation
- Initialized Git repository at `github.com/fzyrk/fzryk`
- Created Fzyrk brand identity (logo, favicon, social banners)
- Established company vision, mission, and core values

#### Documentation
- `README.md` — Project overview, tech stack, getting started guide, product catalog
- `STARTUP_ROADMAP.md` — Full startup roadmap (2026–2030) with 6 phases, 10 milestones, quarterly timeline
- `implementationRoadMap.md` — Technical implementation plan with monorepo structure, design system tokens, UI component specs, routing architecture, and build order

#### Documentation (docs/)
- `docs/ARCHITECTURE.md` — System architecture with project graph, library layers, routing hierarchy, state management, performance strategy
- `docs/FOLDER_STRUCTURE.md` — Complete folder structure guide with naming conventions and import path configuration
- `docs/COMPONENT_LIBRARY.md` — Full Fzyrk UI component catalog (25 components) with API specs, usage examples, accessibility notes
- `docs/CODING_STANDARDS.md` — TypeScript, Angular, CSS, git, testing, performance, and accessibility standards
- `docs/RELEASE_NOTES.md` — Version release notes
- `docs/ROADMAP.md` — Product and technical roadmap with timeline
- `docs/CHANGELOG.md` — This file
- `docs/CONTRIBUTING.md` — Contribution guide

#### Architecture Decisions
- **Monorepo tool**: Nx (over Angular CLI workspaces) for better multi-app support
- **Routing**: Path-based under single domain (`fzyrk.com/products/*`)
- **Design system**: Custom CSS custom properties with `--fz-` prefix
- **Icons**: Inline SVG Angular components (tree-shakeable, no HTTP requests)
- **Components**: Standalone Angular components with Signals API
- **Deployment target**: Vercel with SPA fallback rewrites
- **Dark-first theme**: Dark mode as default, light mode as secondary

---

## Version Format

```
MAJOR.MINOR.PATCH

MAJOR — Breaking changes, major features, or platform-level changes
MINOR — New features, new components, new pages
PATCH — Bug fixes, small improvements, documentation updates
```

### Examples
```
0.1.0 — Foundation (docs, architecture, roadmap)
0.2.0 — Design system (tokens, icons, core components)
0.3.0 — Website MVP (all marketing pages)
1.0.0 — Resume Builder integrated into platform
1.1.0 — UX improvements (drag & drop, undo/redo)
2.0.0 — AI features (resume review, ATS scoring)
3.0.0 — Backend (accounts, cloud save)
```

---

## How to Update This Changelog

When making changes, add entries under `[Unreleased]` in the appropriate category:

- **Added** — New features, components, pages
- **Changed** — Changes to existing functionality
- **Deprecated** — Features that will be removed in upcoming releases
- **Removed** — Features that have been removed
- **Fixed** — Bug fixes
- **Security** — Vulnerability fixes

When releasing a new version, move entries from `[Unreleased]` to a new version section.

---

*📅 Last Updated: July 4, 2026*
