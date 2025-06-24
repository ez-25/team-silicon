# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Turborepo monorepo containing multiple Next.js applications with a shared component library. The project demonstrates a modern frontend stack with TypeScript, Material-UI, data visualization, and state management.

## Common Development Commands

**Development:**

- `pnpm dev` - Start all apps in development mode
- `pnpm dev --filter=web` - Start only the web app (port 3000)
- `pnpm dev --filter=docs` - Start only the docs app (port 3001)

**Build & Quality:**

- `pnpm build` - Build all apps and packages
- `pnpm lint` - Lint all packages with ESLint (max-warnings 0)
- `pnpm check-types` - Type check all TypeScript files
- `pnpm format` - Format code with Prettier

**Package Management:**

- Uses `pnpm` as package manager (v9.0.0)
- Workspace packages are linked with `workspace:*`

## Architecture

### Monorepo Structure

- `apps/web/` - Main dashboard application with MUI, charts, and data visualization
- `apps/docs/` - Documentation/demo application
- `packages/ui/` - Shared React component library
- `packages/eslint-config/` - Shared ESLint configurations
- `packages/typescript-config/` - Shared TypeScript configurations
- `packages/ez-test/` - Test utilities package

### Key Technologies

- **Framework:** Next.js 15+ with Turbopack
- **UI Library:** Material-UI v7 with Emotion styling
- **Charts:** @mui/x-charts for data visualization
- **State Management:** Zustand for global state
- **Data Fetching:** @tanstack/react-query (configured in root)
- **Type Checking:** TypeScript 5.8.2

### Web App Structure

- `app/` - Next.js app router pages
  - `charts/` - Chart visualization pages (chart1, chart2)
- `components/layout/` - Layout components (Header, LeftNavBar, MainLayout, ThemeProvider)
- `features/api/` - API layer with team/student endpoints
- `store/` - Zustand stores (userInfoStore for global state)
- `shared/` - Shared utilities (customFetch, providers)
- `json-server/` - Mock API data (db.json)

### Data Assets

- `data/` - CSV files for financial data (USD/KRW exchange rates, gold prices)
- `public/data/` - Additional CSV data files
- `scripts/fetch-gold-data.js` - Data fetching utilities

## Development Notes

### Linting & Type Checking

- ESLint configured with `--max-warnings 0` (zero tolerance)
- TypeScript strict mode enabled
- Always run `pnpm lint` and `pnpm check-types` before committing

### State Management

- Uses Zustand for client state (see `store/userInfoStore.js`)
- React Query configured via providers for server state
- Korean comments present in some files

### Styling

- Material-UI with custom theme provider
- Emotion for CSS-in-JS
- Responsive layout with drawer navigation

### Testing & Mock Data

- json-server for API mocking (see `json-server/db.json`)
- Custom fetch utilities in `shared/fetch/`
