# EstateVista - Premium Real Estate Platform Frontend

A customer-facing, high-end, responsive luxury real estate web application built with modern web technologies.

## Technology Stack

- **Framework**: Next.js App Router (React 19, Next.js 16)
- **Language**: TypeScript Strict Mode
- **Styling**: Tailwind CSS, Glassmorphism design system & micro-animations
- **Animations**: Framer Motion
- **State Management**: Zustand (Favorites, Comparison, Recently Viewed, Auth)
- **Data Fetching & Cache**: TanStack React Query
- **Form Management & Validation**: React Hook Form + Zod
- **Icons**: Lucide Icons
- **Testing**: Vitest

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [EstateVista](https://yasir263.github.io/estatevista-real-estate-frontend/)) in your browser.

---

## Verification & Commands

- **Type Check**: `npm run typecheck`
- **Lint**: `npm run lint`
- **Unit Tests**: `npm run test`
- **Production Build**: `npm run build`

---

## Project Architecture

```
estatevista-real-estate-frontend/
├── app/                  # Next.js App Router (All customer routes & dynamic pages)
├── components/           # UI components, layout, search, properties, maps, forms
├── features/             # Feature-specific logic modules
├── services/             # API interfaces, mock data (60+ properties), adapters
├── stores/               # Zustand stores for client state & persistence
├── types/                # Strict TypeScript domain interfaces
├── tests/                # Vitest unit test suites
```
