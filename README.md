# CryptoLaunch

A modern, responsive crypto-themed service website built with Next.js (App Router), React, and TypeScript. No CSS frameworks — all styling is hand-written using CSS Modules, global CSS, and CSS variables.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm start
```

## Project Structure

- `app/` — App Router pages (`/`, `/services`, `/token-creator`, `/faq`, `/contact`)
- `components/` — Reusable React components and their CSS Modules
- `types/` — Shared TypeScript interfaces
- `data/` — Dummy data for services and FAQ
- `styles/` — Global CSS, CSS variables, and animation keyframes

## Notes

- The Token Creator page only collects token service requests. It does not connect wallets or deploy smart contracts.
- The Contact form validates inputs client-side and shows success/error states; there is no backend wired up.
# Zeeme_ERC20
