# 🤝 Contributing Guide

> How to contribute to the Fzyrk project.

---

## Table of Contents

- [Welcome](#welcome)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Code Review](#code-review)
- [Testing](#testing)
- [Documentation](#documentation)
- [Design System](#design-system)
- [Need Help?](#need-help)

---

## Welcome

Thank you for your interest in contributing to Fzyrk! Whether you're fixing a bug, adding a feature, improving documentation, or sharing ideas — every contribution matters.

### Ways to Contribute

| Type | Description |
|---|---|
| 🐛 **Bug Reports** | Found a bug? Open an issue with reproduction steps |
| ✨ **Feature Requests** | Have an idea? Open an issue to discuss it |
| 💻 **Code** | Fix bugs, add features, improve performance |
| 📖 **Documentation** | Fix typos, improve guides, add examples |
| 🎨 **Design** | Improve UI/UX, suggest design improvements |
| 🧪 **Testing** | Add unit tests, component tests, or E2E tests |
| 🌍 **Accessibility** | Improve WCAG compliance, test with screen readers |

---

## Getting Started

### Prerequisites

| Tool | Version | Check |
|---|---|---|
| Node.js | ≥ 18.x | `node --version` |
| npm | ≥ 9.x | `npm --version` |
| Git | Latest | `git --version` |

### Fork & Clone

```bash
# 1. Fork the repo on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/fzryk.git
cd fzryk

# 3. Add upstream remote
git remote add upstream https://github.com/fzyrk/fzryk.git

# 4. Install dependencies
npm install
```

---

## Development Setup

### Running the Website App

```bash
# Serve locally (hot-reload at http://localhost:4200)
npx nx serve website
```

### Running a Product App

```bash
# Serve the resume builder
npx nx serve resume
```

### Running Tests

```bash
# Run all tests
npx nx run-many --target=test --all

# Run tests for a specific project
npx nx test ui
npx nx test website

# Run tests in watch mode
npx nx test ui --watch
```

### Linting

```bash
# Lint all projects
npx nx run-many --target=lint --all

# Lint a specific project
npx nx lint website
```

### Building

```bash
# Production build
npx nx build website --configuration=production

# View build stats
npx nx build website --stats-json
```

### Useful Commands

```bash
# View project dependency graph
npx nx graph

# Run only affected projects (based on git changes)
npx nx affected --target=test
npx nx affected --target=lint

# Generate a new component
npx nx generate @nx/angular:component my-component --project=website --standalone
```

---

## Project Structure

```
fzyrk/
├── apps/
│   ├── website/          → Marketing website
│   └── products/
│       └── resume/       → Resume Builder
├── libs/
│   ├── theme/            → Design tokens & global styles
│   ├── icons/            → SVG icon components
│   ├── ui/               → Fzyrk UI component library
│   ├── shared/           → Shared directives, pipes, services
│   └── models/           → TypeScript interfaces
└── docs/                 → Documentation
```

See [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md) for the complete guide.

---

## Development Workflow

### 1. Create a Branch

```bash
# Sync with upstream
git fetch upstream
git checkout main
git merge upstream/main

# Create your branch
git checkout -b feature/my-feature
```

### Branch Naming Convention

```
feature/    → feature/add-pricing-page
bugfix/     → bugfix/fix-nav-scroll
hotfix/     → hotfix/critical-pdf-export
chore/      → chore/update-dependencies
docs/       → docs/add-architecture-guide
refactor/   → refactor/extract-hero-component
test/       → test/add-button-tests
```

### 2. Make Changes

- Follow the [Coding Standards](./CODING_STANDARDS.md)
- Use design tokens from `libs/theme` (never hardcode colors, sizes, etc.)
- Import components from `@fzyrk/ui`, `@fzyrk/icons`, etc.
- Write unit tests for new components/services

### 3. Test Your Changes

```bash
# Run tests for affected projects
npx nx affected --target=test

# Lint
npx nx affected --target=lint

# Build (ensure no build errors)
npx nx build website
```

### 4. Commit

```bash
git add .
git commit -m "feat(ui): add FzBadge component with 6 variants"
```

### 5. Push & Create PR

```bash
git push origin feature/my-feature
```

Then create a Pull Request on GitHub.

---

## Coding Standards

Please follow the [Coding Standards](./CODING_STANDARDS.md) document. Key rules:

### Must-Follow Rules

| Rule | Details |
|---|---|
| **Standalone components** | No NgModules. All components are standalone. |
| **Signals API** | Use `input()`, `output()`, `model()`, `computed()`, `signal()` |
| **OnPush** | All components use `ChangeDetectionStrategy.OnPush` |
| **Design tokens** | Use `var(--fz-*)` — never hardcode values |
| **New control flow** | Use `@if`, `@for`, `@switch` — not `*ngIf`, `*ngFor` |
| **Inject function** | Use `inject()` — not constructor injection |
| **Lazy loading** | All routes except home must be lazy-loaded |
| **Kebab-case files** | `product-card.ts`, not `ProductCard.ts` |

---

## Commit Guidelines

Follow **Conventional Commits**:

```
<type>(<scope>): <description>
```

### Types

| Type | When to Use |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no logic change |
| `refactor` | Code restructuring |
| `perf` | Performance improvement |
| `test` | Adding or fixing tests |
| `chore` | Build, CI, tooling |

### Scope

Use the project or library name:

```
feat(ui): add FzTooltip directive
fix(resume): fix PDF export margin issue
docs(architecture): add state management diagram
chore(deps): update Angular to v19.2
test(icons): add unit tests for icon registry
```

### Rules

- Use **imperative mood** in descriptions: "add feature" not "added feature"
- Keep the first line under **72 characters**
- Reference issues: `fix(ui): resolve focus trap in modal (#42)`

---

## Pull Request Process

### PR Checklist

Before submitting a PR, verify:

- [ ] Code follows [Coding Standards](./CODING_STANDARDS.md)
- [ ] All tests pass (`npx nx affected --target=test`)
- [ ] Lint passes (`npx nx affected --target=lint`)
- [ ] Build succeeds (`npx nx build website`)
- [ ] New components have unit tests
- [ ] Documentation updated (if behavior changed)
- [ ] PR title follows Conventional Commits format
- [ ] Screenshots included (for UI changes)

### PR Template

```markdown
## What does this PR do?
Brief description of the change.

## Type
- [ ] Feature
- [ ] Bug Fix
- [ ] Documentation
- [ ] Refactor
- [ ] Performance
- [ ] Test

## Screenshots (if UI change)
Before | After
--- | ---
![before](url) | ![after](url)

## Checklist
- [ ] Tests pass
- [ ] Lint passes
- [ ] Docs updated
- [ ] Reviewed for accessibility
```

### Review Process

1. At least **1 approval** required before merge
2. All CI checks must pass
3. No merge conflicts
4. Squash merge into `main`

---

## Issue Guidelines

### Bug Reports

Use this template:

```markdown
## Bug Description
A clear description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen.

## Actual Behavior
What actually happens.

## Environment
- Browser: Chrome 126
- OS: macOS 15
- Screen size: 1440px

## Screenshots
If applicable.
```

### Feature Requests

```markdown
## Feature Description
What feature do you want?

## Problem It Solves
Why is this needed?

## Proposed Solution
How should it work?

## Alternatives Considered
Other approaches you've thought about.

## Additional Context
Mockups, examples, references.
```

---

## Code Review

### What Reviewers Look For

| Area | Check |
|---|---|
| **Correctness** | Does it work? Does it handle edge cases? |
| **Standards** | Does it follow coding standards? |
| **Design tokens** | Are values hardcoded or using `--fz-*` tokens? |
| **Accessibility** | ARIA labels? Keyboard navigation? Focus management? |
| **Performance** | Lazy loading? OnPush? No unnecessary re-renders? |
| **Testing** | Are there tests? Do they test behavior (not implementation)? |
| **Documentation** | Are docs updated? Are public APIs documented? |
| **Bundle size** | Does this add significant weight? |

### Review Etiquette

- **Be constructive** — Suggest improvements, don't just criticize
- **Be specific** — "Consider using a computed signal here for X" > "This is wrong"
- **Ask questions** — "Why did you choose X over Y?" (genuine curiosity)
- **Praise good work** — "Great approach to the animation!"

---

## Testing

### What to Test

| What | How |
|---|---|
| Component rendering | Does it render correctly with default inputs? |
| Input variations | Does each variant/size/state render? |
| User interactions | Click, type, focus, keyboard events |
| Edge cases | Empty data, long text, missing optional inputs |
| Accessibility | ARIA attributes, roles, keyboard navigation |

### Test Structure

```typescript
describe('FzButton', () => {
  // Rendering
  it('should render with default variant', () => { ... });
  it('should render with danger variant', () => { ... });

  // Behavior
  it('should emit clicked event on click', () => { ... });
  it('should NOT emit when disabled', () => { ... });
  it('should show loading spinner when loading', () => { ... });

  // Accessibility
  it('should have role="button"', () => { ... });
  it('should set aria-disabled when disabled', () => { ... });
});
```

### Coverage Targets

| Scope | Target |
|---|---|
| `libs/ui` | 90%+ |
| `libs/shared` | 90%+ |
| `libs/icons` | 80%+ |
| `apps/*` pages | 60%+ |

---

## Documentation

### When to Update Docs

- **New component** → Add to `COMPONENT_LIBRARY.md`
- **New feature** → Update `ROADMAP.md` and `CHANGELOG.md`
- **API change** → Update affected docs
- **Release** → Add to `RELEASE_NOTES.md` and `CHANGELOG.md`
- **Architecture change** → Update `ARCHITECTURE.md`

### Doc Writing Tips

- Use tables for structured data (APIs, configs)
- Include code examples for every component
- Keep examples minimal and focused
- Link to related docs

---

## Design System

### Using Design Tokens

All styling must reference design tokens from `libs/theme`:

```css
/* ✅ Correct */
.my-class {
  color: var(--fz-text-primary);
  padding: var(--fz-space-4);
  border-radius: var(--fz-radius-md);
}

/* ❌ Wrong — hardcoded values */
.my-class {
  color: #f0f0fa;
  padding: 16px;
  border-radius: 12px;
}
```

### Adding New Components to libs/ui

1. Create folder: `libs/ui/src/my-component/`
2. Create files: `my-component.ts`, `.html`, `.css`, `.spec.ts`
3. Export from `libs/ui/src/index.ts`
4. Document in `docs/COMPONENT_LIBRARY.md`
5. Follow the existing component patterns (signals, standalone, OnPush)

---

## Need Help?

- 📧 Email: hello@fzyrk.com
- 🐙 GitHub Issues: [github.com/fzyrk/fzryk/issues](https://github.com/fzyrk/fzryk/issues)
- 💼 LinkedIn: [linkedin.com/company/fzyrk](https://linkedin.com/company/fzyrk)

---

*Thank you for contributing to Fzyrk! Together, we're building software that helps professionals grow. 🚀*

*📅 Last Updated: July 4, 2026*
