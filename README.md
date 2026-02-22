# Creator Analytics Dashboard

A dark-themed analytics and management dashboard for content creators, built with Next.js 16 and the App Router.

---

## Features

- **Login page** — dark UI with client-side Zod validation (email format, password strength)
- **Collapsible sidebar** — icon-only mode on desktop, slide-in drawer on mobile
- **Dashboard overview** — KPI cards (Total Views, Subscribers, Revenue, Engagement Rate) with trend indicators
- **30-day views chart** — daily view count line chart powered by Recharts
- **Top performing posts** — table of the 5 highest-viewed posts
- **Platform breakdown** — per-platform view and engagement stats (YouTube, Instagram, TikTok)
- **Analytics page** — full posts table across all platforms
- **Revenue page** — bar chart of revenue data

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.1.6 |
| UI Library | React | 19.2.3 |
| Language | TypeScript (strict) | ^5 |
| Styling | Tailwind CSS v4 | ^4 |
| Charts | Recharts | ^3.7.0 |
| Icons | Lucide React | ^0.564.0 |
| Validation | Zod | ^4.3.6 |
| Linter | ESLint (flat config) | ^9 |
| Package Manager | npm | — |

---

## Project Structure

```
creator-analytics-dashboard/
├── app/                            # Next.js App Router pages & layouts
│   ├── layout.tsx                  # Root layout — Geist fonts, global metadata
│   ├── page.tsx                    # Home (renders login page)
│   ├── globals.css                 # Tailwind import, custom theme tokens & animations
│   ├── login/
│   │   └── page.tsx                # Login page — form with Zod validation
│   └── dashboard/
│       ├── layout.tsx              # Dashboard layout — renders <Sidebar> + content slot
│       ├── page.tsx                # Dashboard overview (KPI cards, charts, tables)
│       ├── analytics/
│       │   └── page.tsx            # Performance analytics — full posts table
│       └── revenue/
│           └── page.tsx            # Revenue — bar chart
├── components/
│   ├── Sidebar.tsx                 # Collapsible sidebar (desktop + mobile drawer)
│   ├── charts/
│   │   ├── ViewsLineChart.tsx      # 30-day views line chart (Recharts)
│   │   └── RevenueBarChart.tsx     # Revenue bar chart (Recharts)
│   └── dashboard/
│       └── PostsTable.tsx          # Reusable posts data table
├── lib/
│   ├── mockPosts.ts                # Mock post data for tables and charts
│   └── schema/
│       └── loginSchema.ts          # Zod schemas for login form validation
├── public/                         # Static assets
├── next.config.ts                  # Next.js config (defaults)
├── tsconfig.json                   # TypeScript strict mode, @/* path alias
├── eslint.config.mjs               # ESLint flat config (next/core-web-vitals + typescript)
└── postcss.config.mjs              # PostCSS — Tailwind CSS v4 plugin
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
git clone <repo-url>
cd creator-analytics-dashboard
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

```bash
npm run dev     # Start dev server at http://localhost:3000
npm run build   # Production build (outputs to .next/)
npm run start   # Serve the production build
npm run lint    # Run ESLint across the project
```

---

## Routing

| URL | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Landing — renders the login UI |
| `/login` | `app/login/page.tsx` | Auth entry point |
| `/dashboard` | `app/dashboard/page.tsx` | Overview with KPI cards and charts |
| `/dashboard/analytics` | `app/dashboard/analytics/page.tsx` | Full performance analytics table |
| `/dashboard/revenue` | `app/dashboard/revenue/page.tsx` | Revenue bar chart |

All `/dashboard/*` routes share the layout in `app/dashboard/layout.tsx`, which renders the `<Sidebar>` alongside the page content.

---

## Styling

All styling uses **Tailwind CSS v4** utility classes. Custom design tokens and animations are defined in `app/globals.css`:

**Custom colour tokens**

| Token | Value | Usage |
|---|---|---|
| `--color-abyss` | `#080F25` | Deep dark background |
| `--color-midnight` | `#0D1A3A` | Slightly lighter card/surface colour |

**Custom animations:** `fade-in`, `slide-up`, `slide-in-left`

---

## Form Validation

Login validation is handled with **Zod** in `lib/schema/loginSchema.ts`:

- **Email:** required, valid format, trimmed and lowercased
- **Password:** 8–64 characters; must include at least one lowercase letter, uppercase letter, digit, and special character; no spaces allowed

Errors are displayed inline beneath each field — no external form library is used.

---

## Architecture Notes

- **No backend / API routes** — authentication is UI-only. The login form validates client-side and redirects to `/dashboard`.
- **No auth middleware** — `/dashboard` routes are not protected. Add `middleware.ts` at the root to guard routes when a backend is introduced.
- **No state management library** — local `useState` is used where needed.
- **No database or ORM** — dashboard data uses mock data from `lib/mockPosts.ts` and a `/api/dashboard/overview` fetch on the overview page.
- **No test framework** — none configured yet.

---

## Git Conventions

Commit message format: `<type>: <short description>`

Common types: `feat`, `fix`, `redesign`, `refactor`, `chore`, `docs`

AI-assisted branches follow the pattern: `claude/<description>-<session-id>`
