# TechStack Pro

A full-stack marketplace platform for discovering and managing tech stack tools and resources. Built with Next.js, TypeScript, MongoDB, and Tailwind CSS.

## Features

- **Browse & Discover** — Explore items with search, sort, filtering (by category, price, tags, date), and pagination
- **Item Details** — Dedicated pages with image gallery, overview, specifications, ratings, and related items
- **User Authentication** — Email/password login, Google OAuth, and demo login buttons
- **Dashboard** — Add and manage your own items with a full form editor
- **Admin Panel** — User management, item management, and analytics charts (Recharts)
- **Responsive Design** — Mobile hamburger menu, sidebar drawer, filter drawer, adaptive grid layouts
- **Modern UI** — Dark/light theme, skeleton loaders, animations (Motion), gradient effects

## Tech Stack

### Frontend
- **Next.js 16** (App Router) — React framework with server/client components
- **TypeScript** — Type-safe throughout
- **Tailwind CSS v4** — Utility-first styling with dark mode
- **Motion** — Animations and transitions
- **Recharts** — Admin analytics charts
- **Lucide React** — Icon library
- **next-themes** — Theme switching

### Backend
- **Next.js API Routes** — Serverless API endpoints
- **MongoDB** — Database with native driver
- **better-auth** — Authentication library with email/password and Google OAuth

### Auth
- Email/password registration and login
- Google social login
- Session management via HTTP-only cookies
- Protected API routes with server-side session validation

## Project Structure

```
src/
├── app/
│   ├── (main)/           # Public pages
│   │   ├── page.tsx      # Home (Hero, Stats, Features, Testimonials, Integrations, FAQ, CTA)
│   │   ├── explore/      # Browse items with search/filter/pagination
│   │   ├── login/        # Login with demo accounts
│   │   ├── register/     # Registration form
│   │   ├── support/      # Support page with FAQ and contact
│   │   └── items/[id]/   # Item details with image gallery
│   ├── (dashboard)/      # Protected pages
│   │   ├── layout.tsx    # Responsive sidebar with admin panel section
│   │   ├── dashboard/    # Dashboard overview
│   │   ├── items/add/    # Add new item form
│   │   ├── items/manage/ # Manage items (edit modal, delete, view)
│   │   └── admin/        # Admin panel (users, items, charts)
│   └── api/              # API routes
│       ├── items/        # CRUD for items
│       ├── admin/        # Admin-only endpoints
│       └── auth/[...all] # better-auth handler
├── components/
│   ├── Navbar.tsx        # Responsive navbar with auth state
│   ├── Footer.tsx        # Footer with real links and socials
│   ├── Home/             # Home page section components
│   └── explore/          # ProductCard, FilterSidebar, ProductGrid, Pagination
└── lib/
    ├── auth.ts           # Server-side auth config
    ├── auth-client.ts    # Client-side auth client
    ├── db.ts             # MongoDB connection
    └── constants.ts      # Shared constants (POPULAR_TAGS)
```

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB (Atlas or local)

### Installation

```bash
git clone <repo-url>
cd scic_type_script
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
BETTER_AUTH_SECRET=<your-secret>
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=<your-mongodb-uri>
DB_NAME=scic_task_3
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo Accounts

- **Admin** — `admin@admin.com` / `Test@test.test12`
- **User** — `rootadmin@company.com` / `Test@test.test12`

## API Routes

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/items` | Public | List items (optional `?createdBy=` filter) |
| GET | `/api/items/[id]` | Public | Get single item |
| POST | `/api/items` | Required | Create item |
| PUT | `/api/items/[id]` | Required | Update item |
| DELETE | `/api/items/[id]` | Required | Delete item |
| GET | `/api/admin/users` | Admin | List all users |
| GET | `/api/admin/items` | Admin | List all items |
| GET | `/api/admin/stats` | Admin | Stats/chart data |
| DELETE | `/api/admin/users/[id]` | Admin | Delete user |
| DELETE | `/api/admin/items/[id]` | Admin | Delete item |
