# 🗺 Roadmap

> Product and technical roadmap for the Fzyrk platform.

---

## Current Status

```
                 ✅ Done         🔵 Now          ⬜ Next
                 ─────────      ─────────      ─────────
Startup:         Phase 1        Phase 2        Phase 3
                 Brand          Website        Design System

Product:         v1.0           v1.1           v1.2
                 MVP            UX Polish      Templates

Technical:       Angular Setup  Nx Monorepo    Fzyrk UI
                                               Component Library
```

---

## 🏢 Company Phases

### Phase 1 — Brand Foundation ✅ Complete
> Establish Fzyrk as a recognizable technology brand.

- [x] Company name, domain, social accounts
- [x] Logo, favicon, social banners
- [x] Vision, mission, core values
- [x] Brand guidelines, product roadmap
- [x] Technical architecture, coding standards

### Phase 2 — Digital Presence 🔵 In Progress
> Launch the official Fzyrk website.

- [ ] Build `fzyrk.com` website (Home, About, Blog, Pricing, Contact)
- [ ] Products catalog page (`/products`)
- [ ] Google Analytics + Search Console
- [ ] Sitemap, robots.txt, SEO meta tags
- [ ] Open Graph + Twitter Card tags
- [ ] Privacy Policy + Terms & Conditions

### Phase 3 — Design System ⬜ Upcoming
> Build the Fzyrk UI component library.

- [ ] Design tokens (`libs/theme`)
- [ ] Icon system (`libs/icons` — 35+ icons)
- [ ] 25 UI components (`libs/ui`)
- [ ] Shared utilities (`libs/shared`)
- [ ] Component documentation

### Phase 4 — Community ⬜ Upcoming
> Build audience and technical credibility.

- [ ] Regular content on LinkedIn, GitHub, X, YouTube
- [ ] Technical blog posts (Angular, UI Engineering)
- [ ] Startup journey updates
- [ ] Open-source contributions

### Phase 5 — Revenue ⬜ Upcoming
> Introduce paid features.

- [ ] Premium resume templates
- [ ] AI resume review
- [ ] Pro subscription plan (₹499/mo)
- [ ] Team plans (₹1,999/user/yr)

### Phase 6 — Expansion ⬜ Upcoming
> Multi-product platform.

- [ ] Portfolio Builder
- [ ] AI Assistant
- [ ] Interview Platform
- [ ] Learning Platform
- [ ] Job Board
- [ ] Mobile Apps

---

## 💻 Product Roadmap — Fzyrk Resume

### v1.0 — MVP ✅ Complete
- [x] Resume editor with 9 section types
- [x] Live preview with 8 templates
- [x] PDF export
- [x] Local storage persistence
- [x] Dark mode + responsive design

### v1.1 — UX Polish ⬜ Upcoming
- [ ] Drag & drop section reordering
- [ ] Better animations & transitions
- [ ] Full keyboard navigation
- [ ] Improved form validation
- [ ] Undo / Redo

### v1.2 — Template Expansion ⬜ Upcoming
- [ ] 6+ new templates (Corporate, Developer, Academic, Two-Column)
- [ ] Template color customization
- [ ] Font selection per template

### v2.0 — AI Features ⬜ Upcoming
- [ ] AI resume review (quality score)
- [ ] ATS compatibility scoring
- [ ] Grammar & writing suggestions
- [ ] Keyword optimization (per job description)
- [ ] Cover letter generator

### v3.0 — Backend & Accounts ⬜ Upcoming
- [ ] User registration & login (Email + OAuth)
- [ ] Cloud save with auto-sync
- [ ] Multiple resumes per account
- [ ] Resume sharing (public links)
- [ ] User dashboard
- [ ] Export to DOCX, JSON

### v4.0 — Portfolio Builder ⬜ Upcoming
- [ ] Auto-generate portfolio from resume data
- [ ] Multiple portfolio themes
- [ ] Custom domain support
- [ ] Project showcase with media

### v5.0 — Interview Platform ⬜ Upcoming
- [ ] Mock interviews (video/text)
- [ ] HR + technical question banks
- [ ] Real-time AI feedback
- [ ] Coding challenges
- [ ] Performance analytics

### v6.0 — Career Hub ⬜ Upcoming
- [ ] Unified dashboard (Resume + Portfolio + Interview + Learning + Jobs)
- [ ] AI Career Coach
- [ ] Goal setting & progress tracking

---

## 🏗 Technical Roadmap

### Current Stack
| Layer | Technology |
|---|---|
| Framework | Angular (Latest, standalone) |
| Language | TypeScript (strict) |
| Monorepo | Nx |
| Reactivity | Signals |
| Styling | CSS Custom Properties |
| State | Signal-based local state |
| Storage | LocalStorage |
| Export | html2canvas + jsPDF |
| Deployment | Vercel |

### Planned Additions

| Timeline | Technology | Purpose |
|---|---|---|
| Q3 2026 | Fzyrk UI (`libs/ui`) | Component library |
| Q4 2026 | NgRx SignalStore | Global state management |
| Q1 2027 | Playwright | E2E testing |
| Q2 2027 | NestJS | Backend API |
| Q2 2027 | PostgreSQL | Database |
| Q2 2027 | OpenAI / Gemini API | AI features |
| Q3 2027 | Redis | Caching |
| Q3 2027 | AWS S3 | File storage |
| Q4 2027 | Docker | Containerization |
| 2028 | React Native | Mobile apps |

### Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | > 95 |
| Lighthouse SEO | 100 |
| Lighthouse Accessibility | > 90 |
| First Contentful Paint | < 1.2s |
| Largest Contentful Paint | < 2.5s |
| Initial Bundle (gzipped) | < 200KB |

### Accessibility Target
**WCAG 2.2 AA Compliance** across all products.

---

## 📅 Quarterly Timeline

### 2026

| Quarter | Focus | Deliverables |
|---|---|---|
| Q1–Q2 | Foundation | ✅ Brand, docs, Resume Builder MVP |
| Q3 | Digital Presence | Website, SEO, public launch |
| Q4 | Design System | Fzyrk UI v0.1, Resume v1.1 |

### 2027

| Quarter | Focus | Deliverables |
|---|---|---|
| Q1 | Templates + Content | Resume v1.2, content engine |
| Q2 | AI + Revenue | Resume v2.0, paid plans |
| Q3 | Backend + Portfolio | Resume v3.0, Portfolio beta |
| Q4 | Scale | 10K resumes, ₹1L MRR |

### 2028

| Quarter | Focus | Deliverables |
|---|---|---|
| Q1 | Interview | Fzyrk Interview beta |
| Q2 | Learn + Jobs | Fzyrk Learn + Jobs beta |
| Q3 | Workspace | Unified dashboard, API |
| Q4 | Mobile | iOS + Android apps |

---

## 🎯 Success Metrics

### Short-Term (0–6 Months)
- [ ] Website live at fzyrk.com
- [ ] Resume Builder public launch
- [ ] Design system v0.1
- [ ] 10+ technical content pieces
- [ ] 50+ user feedback responses

### Medium-Term (6–18 Months)
- [ ] 1,000+ registered users
- [ ] 10,000+ resumes generated
- [ ] AI features launched
- [ ] ₹50,000+ monthly revenue
- [ ] Portfolio Builder launched

### Long-Term (2–5 Years)
- [ ] 100,000+ users
- [ ] 5+ products live
- [ ] Mobile apps shipped
- [ ] ₹10 Lakh+ monthly revenue
- [ ] Global user base (50+ countries)

---

*📅 Last Updated: July 4, 2026*
