# 🎨 Component Library — Fzyrk UI

> Complete catalog of the Fzyrk UI component library (`libs/ui`).
>
> Every component is **standalone**, uses **Angular Signals**, references **design tokens** from `libs/theme`, and meets **WCAG 2.2 AA** accessibility standards.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Form Controls](#form-controls)
  - [Button](#button)
  - [Input](#input)
  - [Textarea](#textarea)
  - [Select](#select)
  - [Checkbox](#checkbox)
  - [Radio Group](#radio-group)
  - [Switch](#switch)
- [Data Display](#data-display)
  - [Card](#card)
  - [Avatar](#avatar)
  - [Badge](#badge)
  - [Table](#table)
  - [Pagination](#pagination)
- [Feedback](#feedback)
  - [Alert](#alert)
  - [Toast](#toast)
  - [Tooltip](#tooltip)
  - [Skeleton](#skeleton)
  - [Empty State](#empty-state)
- [Overlays](#overlays)
  - [Dialog](#dialog)
  - [Drawer](#drawer)
  - [Modal](#modal)
- [Navigation](#navigation)
  - [Navbar](#navbar)
  - [Sidebar](#sidebar)
  - [Breadcrumb](#breadcrumb)
  - [Tabs](#tabs)
  - [Accordion](#accordion)
- [Utilities](#utilities)
  - [Theme Switcher](#theme-switcher)

---

## Installation

All components are part of the `@fzyrk/ui` library. Import them directly:

```typescript
import { FzButtonComponent, FzCardComponent, FzInputComponent } from '@fzyrk/ui';
```

Components import the design token CSS automatically. Ensure your app's global styles import:

```css
@import '@fzyrk/theme/styles/global.css';
```

---

## Usage

All components follow the same pattern:

```typescript
@Component({
  standalone: true,
  imports: [FzButtonComponent, FzCardComponent],
  template: `
    <fz-card variant="glass" hoverable>
      <h3>My Card</h3>
      <fz-button variant="primary" (clicked)="onSave()">
        Save
      </fz-button>
    </fz-card>
  `
})
export class MyComponent {
  onSave() { /* ... */ }
}
```

---

## Form Controls

### Button

Interactive button with multiple variants, sizes, and states.

**Selector**: `<fz-button>`

| Input | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading spinner state |
| `icon` | `string` | — | Icon name (left position) |
| `iconRight` | `string` | — | Icon name (right position) |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `fullWidth` | `boolean` | `false` | Full width button |

| Output | Type | Description |
|---|---|---|
| `clicked` | `EventEmitter<MouseEvent>` | Click event (blocked when disabled/loading) |

**Examples**:

```html
<!-- Primary -->
<fz-button variant="primary">Save Resume</fz-button>

<!-- Outline with icon -->
<fz-button variant="outline" icon="download">Export PDF</fz-button>

<!-- Loading state -->
<fz-button variant="primary" [loading]="isSaving">
  {{ isSaving ? 'Saving...' : 'Save' }}
</fz-button>

<!-- Danger -->
<fz-button variant="danger" icon="error">Delete</fz-button>

<!-- Ghost (no background) -->
<fz-button variant="ghost" size="sm">Cancel</fz-button>
```

**Accessibility**:
- Renders as native `<button>` element
- `aria-disabled` when disabled
- `aria-busy` when loading
- Focus ring via `:focus-visible`

---

### Input

Text input with label, hint, error, and icon support.

**Selector**: `<fz-input>`

| Input | Type | Default | Description |
|---|---|---|---|
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url'` | `'text'` | Input type |
| `label` | `string` | — | Label text |
| `placeholder` | `string` | — | Placeholder text |
| `hint` | `string` | — | Helper text below input |
| `error` | `string` | — | Error message (shows red state) |
| `icon` | `string` | — | Leading icon |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Required field |
| `value` | `string` | `''` | Current value (two-way with `model()`) |

| Output | Type | Description |
|---|---|---|
| `valueChange` | `EventEmitter<string>` | Value change event |

**Examples**:

```html
<!-- Basic -->
<fz-input label="Full Name" placeholder="John Doe" [(value)]="name" />

<!-- With icon and hint -->
<fz-input label="Email" type="email" icon="mail" hint="We'll never share your email" [(value)]="email" />

<!-- With error -->
<fz-input label="Password" type="password" [error]="passwordError()" [(value)]="password" />
```

---

### Textarea

Multi-line text input.

**Selector**: `<fz-textarea>`

| Input | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Label text |
| `placeholder` | `string` | — | Placeholder |
| `rows` | `number` | `4` | Visible rows |
| `maxLength` | `number` | — | Max character count (shows counter) |
| `error` | `string` | — | Error message |
| `value` | `string` | `''` | Current value |

**Example**:

```html
<fz-textarea label="Summary" placeholder="Write a brief professional summary..." [rows]="5" [maxLength]="500" [(value)]="summary" />
```

---

### Select

Dropdown select with search and multi-select support.

**Selector**: `<fz-select>`

| Input | Type | Default | Description |
|---|---|---|---|
| `options` | `{ label: string; value: any }[]` | `[]` | Options list |
| `label` | `string` | — | Label text |
| `placeholder` | `string` | `'Select...'` | Placeholder |
| `error` | `string` | — | Error message |
| `multiple` | `boolean` | `false` | Multi-select mode |
| `searchable` | `boolean` | `false` | Enable search |
| `value` | `any` | — | Selected value |

**Example**:

```html
<fz-select label="Template" [options]="templates" placeholder="Choose a template..." [(value)]="selectedTemplate" />
```

---

### Checkbox

Single checkbox with label.

**Selector**: `<fz-checkbox>`

| Input | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Label text |
| `checked` | `boolean` | `false` | Checked state |
| `disabled` | `boolean` | `false` | Disabled |
| `indeterminate` | `boolean` | `false` | Indeterminate state |

| Output | Type | Description |
|---|---|---|
| `checkedChange` | `EventEmitter<boolean>` | Check state change |

**Example**:

```html
<fz-checkbox label="Include profile photo" [(checked)]="includePhoto" />
```

---

### Radio Group

Group of radio buttons.

**Selector**: `<fz-radio-group>`

| Input | Type | Default | Description |
|---|---|---|---|
| `options` | `{ label: string; value: any }[]` | `[]` | Options |
| `name` | `string` | — | Group name |
| `label` | `string` | — | Group label |
| `value` | `any` | — | Selected value |
| `orientation` | `'horizontal' \| 'vertical'` | `'vertical'` | Layout |

**Example**:

```html
<fz-radio-group label="Export Format" name="format" [options]="formats" [(value)]="selectedFormat" orientation="horizontal" />
```

---

### Switch

Toggle switch with label.

**Selector**: `<fz-switch>`

| Input | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Label text |
| `checked` | `boolean` | `false` | On/off state |
| `disabled` | `boolean` | `false` | Disabled |
| `size` | `'sm' \| 'md'` | `'md'` | Size |

**Example**:

```html
<fz-switch label="Dark Mode" [(checked)]="isDarkMode" />
```

---

## Data Display

### Card

Container with glassmorphism and elevation variants.

**Selector**: `<fz-card>`

| Input | Type | Default | Description |
|---|---|---|---|
| `variant` | `'default' \| 'glass' \| 'elevated' \| 'outlined'` | `'default'` | Visual variant |
| `hoverable` | `boolean` | `false` | Lift effect on hover |
| `clickable` | `boolean` | `false` | Cursor pointer + click event |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Internal padding |

**Examples**:

```html
<!-- Glass card -->
<fz-card variant="glass" hoverable>
  <h3>Resume Builder</h3>
  <p>Build beautiful resumes in minutes.</p>
</fz-card>

<!-- Outlined card -->
<fz-card variant="outlined" padding="lg">
  <fz-avatar name="Aman" size="lg" />
  <h4>Aman Ullah Khan</h4>
</fz-card>
```

---

### Avatar

User avatar with image, initials fallback, and status indicator.

**Selector**: `<fz-avatar>`

| Input | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | — | Image URL |
| `alt` | `string` | — | Alt text |
| `name` | `string` | — | Name (for initials fallback) |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Avatar size |
| `shape` | `'circle' \| 'square'` | `'circle'` | Shape |
| `status` | `'online' \| 'offline' \| 'busy'` | — | Status indicator |

**Examples**:

```html
<!-- With image -->
<fz-avatar src="/assets/photo.jpg" alt="Aman" size="lg" />

<!-- Initials fallback -->
<fz-avatar name="Aman Ullah Khan" size="md" status="online" />
```

---

### Badge

Small label for status, counts, or categories.

**Selector**: `<fz-badge>`

| Input | Type | Default | Description |
|---|---|---|---|
| `variant` | `'default' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'accent'` | `'default'` | Color variant |
| `size` | `'sm' \| 'md'` | `'md'` | Size |
| `dot` | `boolean` | `false` | Dot-only mode (no text) |

**Examples**:

```html
<fz-badge variant="success">Live</fz-badge>
<fz-badge variant="warning">Coming Soon</fz-badge>
<fz-badge variant="accent">New</fz-badge>
<fz-badge variant="error" dot /> <!-- Notification dot -->
```

---

### Table

Data table with sorting, striping, and hover effects.

**Selector**: `<fz-table>`

| Input | Type | Default | Description |
|---|---|---|---|
| `columns` | `{ key: string; label: string; sortable?: boolean; width?: string }[]` | `[]` | Column config |
| `data` | `any[]` | `[]` | Row data |
| `sortable` | `boolean` | `false` | Enable sorting |
| `striped` | `boolean` | `false` | Alternating row colors |
| `hoverable` | `boolean` | `true` | Row hover highlight |

**Example**:

```html
<fz-table [columns]="columns" [data]="users" sortable striped />
```

---

### Pagination

Page navigation for lists and tables.

**Selector**: `<fz-pagination>`

| Input | Type | Default | Description |
|---|---|---|---|
| `total` | `number` | `0` | Total items |
| `pageSize` | `number` | `10` | Items per page |
| `currentPage` | `number` | `1` | Current page |

| Output | Type | Description |
|---|---|---|
| `pageChange` | `EventEmitter<number>` | Page changed |

---

## Feedback

### Alert

Inline alert message with icon and dismiss.

**Selector**: `<fz-alert>`

| Input | Type | Default | Description |
|---|---|---|---|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Alert type |
| `title` | `string` | — | Alert title |
| `dismissible` | `boolean` | `false` | Show dismiss button |

**Examples**:

```html
<fz-alert variant="success" title="Resume saved!">
  Your resume has been saved to local storage.
</fz-alert>

<fz-alert variant="warning" dismissible (dismissed)="onDismiss()">
  Your session data will be lost if you clear browser data.
</fz-alert>
```

---

### Toast

Non-blocking notification that appears and auto-dismisses.

**Usage**: Injected service, not a template component.

```typescript
import { FzToastService } from '@fzyrk/ui';

@Component({ /* ... */ })
export class MyComponent {
  private toast = inject(FzToastService);

  onSave() {
    this.toast.success('Resume saved successfully!');
  }

  onError() {
    this.toast.error('Failed to export PDF.');
  }

  onInfo() {
    this.toast.info('Tip: Use keyboard shortcuts for faster editing.', { duration: 5000 });
  }
}
```

**API**:

| Method | Parameters | Description |
|---|---|---|
| `success(message, options?)` | `message: string`, `{ duration?: number }` | Green success toast |
| `error(message, options?)` | `message: string`, `{ duration?: number }` | Red error toast |
| `warning(message, options?)` | `message: string`, `{ duration?: number }` | Yellow warning toast |
| `info(message, options?)` | `message: string`, `{ duration?: number }` | Blue info toast |

Default duration: 3000ms. Toasts stack vertically at the top-right corner.

---

### Tooltip

Hover/focus tooltip directive.

**Selector**: `[fzTooltip]`

| Input | Type | Default | Description |
|---|---|---|---|
| `fzTooltip` | `string` | — | Tooltip text |
| `fzTooltipPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position |
| `fzTooltipDelay` | `number` | `200` | Show delay (ms) |

**Example**:

```html
<fz-button fzTooltip="Export your resume as PDF" fzTooltipPosition="bottom">
  Export
</fz-button>
```

---

### Skeleton

Loading placeholder that mimics content shape.

**Selector**: `<fz-skeleton>`

| Input | Type | Default | Description |
|---|---|---|---|
| `variant` | `'text' \| 'circle' \| 'rect'` | `'text'` | Shape |
| `width` | `string` | `'100%'` | Width |
| `height` | `string` | `'1rem'` | Height |
| `lines` | `number` | `1` | Number of text lines |

**Example**:

```html
<!-- Text skeleton (3 lines) -->
<fz-skeleton variant="text" [lines]="3" />

<!-- Avatar skeleton -->
<fz-skeleton variant="circle" width="48px" height="48px" />

<!-- Card skeleton -->
<fz-skeleton variant="rect" width="100%" height="200px" />
```

---

### Empty State

Placeholder for empty content areas.

**Selector**: `<fz-empty-state>`

| Input | Type | Default | Description |
|---|---|---|---|
| `icon` | `string` | — | Icon name |
| `title` | `string` | — | Title text |
| `description` | `string` | — | Description text |
| `actionLabel` | `string` | — | Action button label |

| Output | Type | Description |
|---|---|---|
| `action` | `EventEmitter<void>` | Action button clicked |

**Example**:

```html
<fz-empty-state icon="document" title="No resumes yet" description="Create your first resume to get started." actionLabel="Create Resume" (action)="createResume()" />
```

---

## Overlays

### Dialog

Confirmation dialog with title, content, and action buttons.

**Selector**: `<fz-dialog>`

| Input | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | `false` | Open/close state |
| `title` | `string` | — | Dialog title |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Width |
| `closeOnOverlay` | `boolean` | `true` | Close on backdrop click |

**Example**:

```html
<fz-dialog [open]="showDeleteDialog" title="Delete Resume?" size="sm" (closed)="showDeleteDialog = false">
  <p>This action cannot be undone.</p>
  <div class="dialog-actions">
    <fz-button variant="ghost" (clicked)="showDeleteDialog = false">Cancel</fz-button>
    <fz-button variant="danger" (clicked)="deleteResume()">Delete</fz-button>
  </div>
</fz-dialog>
```

---

### Drawer

Slide-in panel from left or right edge.

**Selector**: `<fz-drawer>`

| Input | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | `false` | Open/close state |
| `position` | `'left' \| 'right'` | `'right'` | Slide direction |
| `size` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | Width |

**Example**:

```html
<fz-drawer [open]="showMobileMenu" position="right" (closed)="showMobileMenu = false">
  <!-- Mobile nav links -->
</fz-drawer>
```

---

### Modal

Full-featured modal with header, body, and footer slots.

**Selector**: `<fz-modal>`

| Input | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | `false` | Open/close state |
| `title` | `string` | — | Modal title |
| `fullscreen` | `boolean` | `false` | Fullscreen mode |

---

## Navigation

### Navbar

Top navigation bar with logo, links, and actions.

**Selector**: `<fz-navbar>`

| Input | Type | Default | Description |
|---|---|---|---|
| `brand` | `string` | — | Brand name / logo |
| `items` | `NavItem[]` | `[]` | Navigation items |
| `sticky` | `boolean` | `true` | Fixed to top |
| `transparent` | `boolean` | `false` | Transparent background (for hero) |
| `glass` | `boolean` | `true` | Glassmorphism effect |

---

### Sidebar

Vertical navigation panel.

**Selector**: `<fz-sidebar>`

| Input | Type | Default | Description |
|---|---|---|---|
| `items` | `NavItem[]` | `[]` | Navigation items |
| `collapsed` | `boolean` | `false` | Collapsed (icon-only) mode |
| `position` | `'left' \| 'right'` | `'left'` | Side |

---

### Breadcrumb

Hierarchical navigation trail.

**Selector**: `<fz-breadcrumb>`

| Input | Type | Default | Description |
|---|---|---|---|
| `items` | `{ label: string; route?: string }[]` | `[]` | Breadcrumb items |

**Example**:

```html
<fz-breadcrumb [items]="[
  { label: 'Home', route: '/' },
  { label: 'Products', route: '/products' },
  { label: 'Resume Builder' }
]" />
```

---

### Tabs

Tabbed content panels.

**Selector**: `<fz-tabs>`

| Input | Type | Default | Description |
|---|---|---|---|
| `tabs` | `{ label: string; icon?: string }[]` | `[]` | Tab definitions |
| `activeIndex` | `number` | `0` | Active tab index |

| Output | Type | Description |
|---|---|---|
| `tabChange` | `EventEmitter<number>` | Tab changed |

**Example**:

```html
<fz-tabs [tabs]="[{ label: 'Editor' }, { label: 'Preview' }]" [(activeIndex)]="activeTab">
  @if (activeTab === 0) { <app-editor /> }
  @if (activeTab === 1) { <app-preview /> }
</fz-tabs>
```

---

### Accordion

Collapsible content sections.

**Selector**: `<fz-accordion>`

| Input | Type | Default | Description |
|---|---|---|---|
| `items` | `{ title: string; content: string }[]` | `[]` | Accordion items |
| `multiple` | `boolean` | `false` | Allow multiple open panels |

---

## Utilities

### Theme Switcher

Dark/light mode toggle.

**Selector**: `<fz-theme-switcher>`

| Input | Type | Default | Description |
|---|---|---|---|
| `mode` | `'toggle' \| 'dropdown'` | `'toggle'` | UI mode |

**Example**:

```html
<fz-theme-switcher mode="toggle" />
```

Uses `ThemeService` from `@fzyrk/shared` internally. Persists preference to `localStorage`.

---

## Design Token Integration

Every component uses CSS custom properties from `libs/theme`:

```css
/* Example: Button component styles */
:host {
  --btn-bg: var(--fz-accent);
  --btn-color: white;
  --btn-radius: var(--fz-radius-md);
  --btn-padding: var(--fz-space-3) var(--fz-space-6);
  --btn-shadow: var(--fz-shadow-sm);
  --btn-transition: var(--fz-dur-fast) var(--fz-ease-out);
}

button {
  background: var(--btn-bg);
  color: var(--btn-color);
  border-radius: var(--btn-radius);
  padding: var(--btn-padding);
  box-shadow: var(--btn-shadow);
  transition: all var(--btn-transition);
}

button:hover {
  background: var(--fz-accent-hover);
  box-shadow: var(--fz-shadow-glow);
  transform: translateY(-1px);
}
```

---

*📅 Last Updated: July 4, 2026*
*📝 Maintained by: Fzyrk Team*
