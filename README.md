# Avineshwaran A. — Portfolio

A premium, **Neo-Futuristic Glassmorphism** portfolio built from scratch with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## ✨ Theme: Aurora Glass

- **Dark-mode-first** with toggleable light mode and `localStorage` persistence
- **Animated aurora gradient mesh blobs** rendered on canvas behind frosted-glass panels
- **Vibrant accent palette**: Electric violet → Cyan → Magenta
- **Variable font pairing**: Space Grotesk (headings) + Inter (body) + JetBrains Mono (code tags only)
- **Micro-interactions everywhere**: magnetic buttons, 3D tilt-on-hover cards, letter-decode nav hover, animated gradient borders, scroll-triggered reveals

---

## 🗂 Architecture

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 14 App Router | SSR/SSG + API routes |
| **Styling** | Tailwind CSS v3 + CSS custom properties | Design token system |
| **Animation** | Framer Motion v11 | All motion (scroll/hover/entrance) |
| **Forms** | react-hook-form + Zod | Validated contact form |
| **Email** | Resend API | Contact form delivery |
| **Icons** | lucide-react | Icon system |
| **Data** | `content/*.json` → `lib/content.ts` | Decoupled content layer |

### What's Dynamic vs Static

| Feature | Type | Notes |
|---|---|---|
| Contact form → email | **Dynamic (API)** | `/api/contact` → Resend |
| GitHub stars/forks | **Dynamic (API)** | `/api/github-stats` + cache |
| Visitor counter | **Dynamic (API)** | `/api/visits` (in-memory; upgrade to Redis) |
| Skills / timeline / projects | **Static-but-data-driven** | Rendered from `content/*.json` at build time |
| Profile / social | **Static-but-data-driven** | Same content layer |

---

## 📁 Folder Structure

```
/
├── app/
│   ├── layout.tsx          # Root layout, fonts, ThemeProvider
│   ├── page.tsx            # Home page (server component)
│   ├── globals.css         # Design token CSS custom properties
│   └── api/
│       ├── contact/        # POST — validate + email
│       ├── github-stats/   # GET — GitHub proxy + cache
│       └── visits/         # GET/POST — visitor counter
├── components/
│   ├── background/         # AuroraBackground canvas
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Hero, Skills, Projects, Timeline, Contact
│   ├── ClientShell.tsx     # Client orchestrator (preloader + sections)
│   ├── Preloader.tsx       # Animated logo preloader
│   └── ThemeProvider.tsx   # Dark/light theme context
├── content/                # ALL CONTENT — edit here, zero code changes needed
│   ├── profile.json
│   ├── skills.json
│   ├── projects.json
│   ├── timeline.json
│   └── social.json
├── lib/
│   ├── content.ts          # Typed content-access layer
│   ├── types.ts            # Shared TypeScript types
│   ├── utils.ts            # cn(), statusConfig, skillColorConfig
│   └── validators.ts       # Zod schemas for API validation
└── .env.example            # Copy to .env.local with your secrets
```

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
# Edit .env.local with your real values (see below)
```

### 3. Run development server

```bash
npm run dev
# Open http://localhost:3000
```

---

## ⚙️ Environment Variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | For email | Get from [resend.com](https://resend.com) |
| `CONTACT_TO_EMAIL` | For email | Your email that receives contact form messages |
| `GITHUB_TOKEN` | Optional | Personal access token to increase GitHub API rate limit |
| `UPSTASH_REDIS_URL` | Optional | For persistent visitor counter (replace in-memory store) |
| `UPSTASH_REDIS_TOKEN` | Optional | Upstash Redis auth token |

> **Without `RESEND_API_KEY`**: the contact form will still validate and show success/error states, but emails won't be sent. The API logs to console in dev mode.

---

## 📝 Adding / Editing Content

**Everything is in `content/*.json` — no component changes needed.**

### Add a new project

Edit `content/projects.json`, add an entry following the existing shape:

```json
{
  "id": "my-new-project",
  "pid": "0xABCD",
  "title": "My New Project",
  "shortTitle": "Short Name",
  "status": "active",
  "order": 4,
  "description": "Description here.",
  "stack": ["Python", "FastAPI"],
  "repoUrl": "https://github.com/you/repo",
  "demoUrl": null,
  "imageAlt": "Alt text"
}
```

### Add a timeline entry

Edit `content/timeline.json` following the same pattern. The `order` field controls display order.

### Update social links

Edit `content/social.json`:
- Replace `YOUR_LINKEDIN_USERNAME` with your actual LinkedIn username
- Replace `your.email@example.com` with your real email

---

## 🎨 Design System

All design tokens are CSS custom properties in `app/globals.css`:

```css
--bg, --bg-elevated, --bg-glass          /* Backgrounds */
--accent-violet, --accent-cyan, --accent-magenta   /* Accent colors */
--text-primary, --text-secondary, --text-muted     /* Typography */
--border-glass, --border-glass-hover               /* Borders */
--shadow-glass, --shadow-glow-violet, ...          /* Shadows */
```

Light mode overrides are applied via `[data-theme="light"]` on `<html>`.

---

## 🚢 Deployment (Vercel)

1. Push to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy — Vercel auto-detects Next.js

```bash
npm run build   # Verify build locally before deploying
```

---

## 📌 Known TODOs Before Going Live

- [ ] Replace `YOUR_LINKEDIN_USERNAME` in `content/social.json`
- [ ] Replace `your.email@example.com` in `content/social.json`
- [ ] Add `RESEND_API_KEY` and `CONTACT_TO_EMAIL` to Vercel env vars
- [ ] Add real `repoUrl` for private projects when they go public in `content/projects.json`
- [ ] Optionally upgrade visitor counter to Upstash Redis for persistence across server restarts
