# CLAUDE.md — Creator Analytics Dashboard

This file documents the codebase structure, development conventions, and workflows for AI assistants (Claude) working in this repository.

---

## Project Overview

**Creator Analytics Dashboard** is a Next.js 16 web application providing analytics and management tooling for content creators. It features a dark-themed login flow, a collapsible responsive sidebar, and a dashboard shell ready for feature development.

**Current status:** Early-stage — login UI and navigation scaffold are complete; dashboard pages are stubs awaiting backend integration and content.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.1.6 |
| UI Library | React | 19.2.3 |
| Language | TypeScript (strict) | ^5 |
| Styling | Tailwind CSS v4 | ^4 |
| Icons | Lucide React | ^0.564.0 |
| Validation | Zod | ^4.3.6 |
| Linter | ESLint (flat config) | ^9 |
| Package Manager | npm | — |

---

## Directory Structure

```
creator-analytics-dashboard/
├── app/                        # Next.js App Router pages & layouts
│   ├── layout.tsx              # Root layout (wraps entire app)
│   ├── page.tsx                # Home / landing page
│   ├── globals.css             # Global CSS — Tailwind imports + custom theme vars & animations
│   ├── favicon.ico
│   ├── login/
│   │   └── page.tsx            # Login page ("use client" — form + Zod validation)
│   └── dashboard/
│       ├── layout.tsx          # Dashboard layout — renders <Sidebar> + main content slot
│       └── page.tsx            # Dashboard home (stub)
├── components/
│   └── Sidebar.tsx             # Collapsible sidebar ("use client") — desktop + mobile
├── lib/
│   └── schema/
│       └── loginSchema.ts      # Zod schema for login form validation
├── public/                     # Static assets (SVGs)
├── next.config.ts              # Next.js config (minimal, all defaults)
├── tsconfig.json               # TypeScript config — strict, path alias @/*
├── eslint.config.mjs           # ESLint flat config (extends next/core-web-vitals, next/typescript)
├── postcss.config.mjs          # PostCSS — Tailwind CSS v4 plugin
└── package.json                # Scripts and dependencies
```

---

## Development Commands

```bash
npm run dev       # Start development server at http://localhost:3000
npm run build     # Production build (outputs to .next/)
npm run start     # Serve production build
npm run lint      # Run ESLint across the project
```

> There is **no test framework configured**. If tests are added, update this section.

---

## Routing

Routes follow the Next.js App Router file-system convention:

| URL | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Landing page |
| `/login` | `app/login/page.tsx` | Auth entry point |
| `/dashboard` | `app/dashboard/page.tsx` | Dashboard home (stub) |
| `/dashboard/*` | *(planned)* | Sidebar links: analytics, content, growth, revenue, audience, settings, etc. |

All `/dashboard/*` routes share the layout in `app/dashboard/layout.tsx`, which renders the `<Sidebar>` and a main content area.

---

## Component Conventions

### Server vs. Client Components

- Components are **Server Components by default** (Next.js App Router behaviour).
- Add `"use client"` **only** when a component needs browser APIs, React hooks (`useState`, `useEffect`, `usePathname`, etc.), or event handlers.
- Current client components: `app/login/page.tsx`, `components/Sidebar.tsx`.

### File Naming

- React component files: **PascalCase** (e.g., `Sidebar.tsx`).
- Schema/utility files: **camelCase** (e.g., `loginSchema.ts`).
- Next.js special files follow the framework convention: `page.tsx`, `layout.tsx`, `globals.css`.

### Imports / Path Aliases

Use the `@/` alias (mapped to the project root) for all non-relative imports:

```ts
// Correct
import { loginSchema } from "@/lib/schema/loginSchema";
import Sidebar from "@/components/Sidebar";

// Avoid
import { loginSchema } from "../../lib/schema/loginSchema";
```

---

## Styling Conventions

### Tailwind CSS v4

All styling uses **Tailwind CSS utility classes**. Do not write custom CSS unless adding a new design token or animation.

Custom theme tokens are defined in `app/globals.css`:

```css
--color-abyss: /* deep dark background */
--color-midnight: /* slightly lighter dark surface */
```

Custom animations defined there: `fade-in`, `slide-up`.

### Colour Themes

| Area | Palette |
|---|---|
| Login page | Dark — `slate-950`, `slate-900`, `slate-800` |
| Dashboard | Light — `slate-100`, white surfaces |
| Sidebar | Dark sidebar on light dashboard |

### Responsive Design

- Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`).
- Sidebar collapses to 72 px on desktop; on mobile it becomes a slide-in drawer toggled by a hamburger button.

---

## Form Validation

Validation is handled with **Zod**. Schemas live in `lib/schema/`.

`loginSchema.ts` enforces:
- **Email:** required, valid format, trimmed, lowercased.
- **Password:** 8–64 chars, must contain lowercase, uppercase, digit, special character, no spaces.

Pattern for new schemas:

```ts
import { z } from "zod";

export const mySchema = z.object({ /* ... */ });
export type MySchemaType = z.infer<typeof mySchema>;
```

Validation errors are surfaced inline via `React.useState` — no form library is used yet.

---

## Icons

Use **Lucide React** for all icons:

```tsx
import { BarChart2, Settings } from "lucide-react";
```

Do not add a second icon library. For brand/logo SVGs, inline them or place them in `public/`.

---

## Key Files — Quick Reference

| File | Purpose |
|---|---|
| `app/globals.css` | Global styles, Tailwind import, custom CSS vars & animations |
| `app/login/page.tsx` | Full login UI with client-side Zod validation |
| `app/dashboard/layout.tsx` | Wraps all dashboard routes with `<Sidebar>` |
| `components/Sidebar.tsx` | Navigation: collapsible desktop + mobile drawer, 15+ routes |
| `lib/schema/loginSchema.ts` | Zod login schema and inferred type |
| `tsconfig.json` | TS strict mode, `@/*` path alias |
| `eslint.config.mjs` | ESLint flat config — next/core-web-vitals + next/typescript |

---

## Architecture Notes

- **No backend / API routes** yet. All pages are frontend-only. Authentication is UI-only (no session, cookie, or JWT handling).
- **No state management library** (no Redux, Zustand, Context). Local `useState` is used where needed.
- **No middleware** (e.g., auth guards on `/dashboard`). Add `middleware.ts` at the root when protecting routes.
- **No database or ORM** configured.
- Dashboard sub-pages (analytics, content, growth, revenue, audience, settings) are navigation targets in the sidebar but do not have corresponding `page.tsx` files yet.

---

## Adding New Dashboard Pages

1. Create `app/dashboard/<route>/page.tsx`.
2. The file inherits the dashboard layout (sidebar) automatically.
3. Mark as `"use client"` only if it requires hooks or event handlers.
4. Add the corresponding route to the sidebar's `navItems` array in `components/Sidebar.tsx` if it isn't already listed.

---

## Git Conventions

- Commits follow the pattern: `<type>: <short description>` (e.g., `feat: add revenue chart`, `fix: sidebar mobile toggle`).
- Common types: `feat`, `fix`, `redesign`, `refactor`, `chore`, `docs`.
- Branches follow: `claude/<description>-<session-id>` for AI-assisted work.

---

## What Does Not Exist Yet (Planned)

- Testing framework (Jest / Vitest / Playwright)
- API routes (`app/api/`)
- Authentication middleware
- State management
- Backend / database integration
- Dashboard page content beyond the stub
- Environment variable configuration (`.env.local` template)

When adding any of the above, update this file accordingly.
