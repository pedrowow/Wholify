# Wholify Core Framework

Wholify is a modular PWA designed for personal growth. This repository contains the core framework that allows for easy extension through a module registry.

## Architecture

### 1. Module Registry (`src/modules/registry.ts`)
New modules are added by creating a new entry in the `modules` array. Each entry specifies its route, category, and a lazy-loaded component. This keeps the initial bundle size small and allows for clean separation of concerns.

### 2. Notification System
The app uses a dual notification strategy:
- **Browser Notifications**: Using the Web Notifications API (in `src/services/notifications.ts`).
- **In-App Reminders**: A motivational modal (`src/components/NotificationModal.tsx`) that can be triggered when the user is active, featuring random motivational reasons.

### 3. Theme System (`src/themes/theme.css`)
Based entirely on CSS Custom Properties. Supports light and warm-dark themes. The palette is designed to be motivational and warm (Cream, Sage, Terracotta, Teal, Gold).

### 4. Storage (`src/services/db.ts`)
Uses IndexedDB via the `idb` library for local-first data storage. This ensures the app works offline and respects user privacy.

### 5. Square Screen Support
The layout is optimized for 1:1 aspect ratio screens (like the Unihertz Titan) using CSS media queries and a centered max-width container that expands on square displays.

### 6. Export System (`src/pages/Export.tsx`)
Allows users to export their daily progress to a Markdown file, suitable for inclusion in personal journals like Obsidian or Logseq.

## Getting Started

1. `npm install`
2. `npm run dev` (Starts on port 3000)
3. `npm run build` (Generates PWA assets in `dist/`)

## Tech Stack
- Vite
- React
- TypeScript
- React Router v6
- Lucide React
- Workbox (via vite-plugin-pwa)
- idb (IndexedDB)
