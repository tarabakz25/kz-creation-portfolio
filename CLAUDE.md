# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
bun install

# Start development server (localhost:4321)
bun dev

# Build production site to ./dist/
bun build

# Preview production build locally
bun preview

# Run Astro CLI commands
bun astro ...
```

## Architecture Overview

### Technology Stack
- **Framework**: Astro 5 with React 19 integration
- **Styling**: Tailwind CSS 4 with custom configuration
- **Animations**: GSAP for sophisticated UI transitions
- **UI Components**: shadcn/ui (New York style) + Radix UI primitives
- **3D Graphics**: Three.js with shader effects via @paper-design/shaders-react
- **Package Manager**: Bun

### Project Structure

```
src/
├── components/
│   ├── layouts/    # Global layout components (Header, Footer, Loading, ScreenMigration, MotionBackground)
│   ├── pages/      # Page-level React components (Home, Profile, Activity, Works, Index)
│   └── ui/         # shadcn/ui component library (50+ components)
├── content/        # Astro content collections (profile, activity, works)
├── pages/          # Astro pages (index.astro, API routes)
├── layouts/        # Astro layout templates (Layout.astro)
├── lib/            # Utilities (utils.ts for cn() helper)
├── hooks/          # React hooks (use-mobile.ts)
├── assets/         # Static assets (images, SVGs)
└── styles/         # Global CSS
```

### Key Architecture Patterns

**Single Page Application (SPA) Behavior**
- Built with Astro but behaves like a SPA through React component orchestration
- Main entry point: `src/pages/index.astro` → `src/components/pages/Index.tsx`
- Client-side routing managed via state (`currentPage: Page` type with 'home' | 'profile' | 'activity' | 'works')
- No native scroll: `overflow: hidden` on html/body, scroll prevention in Index.tsx
- Page transitions handled by `ScreenMigration.tsx` with GSAP animations

**Loading Experience**
- Session-based loading screen: shows once per session via `sessionStorage.getItem('hasVisited')`
- `Loading.tsx` component displays on first visit, then `onComplete` callback sets session flag
- Subsequent navigation shows content immediately without loading animation

**Content Collections**
- Profile data stored in `src/content/profile/` (structured with Zod schema)
- Activity/timeline data in `src/content/activity/`
- Schemas defined in `src/content/config.ts` with strict type validation
- Fetched server-side in Astro pages: `await getEntry('profile', 'kizuki-aiki')`

**Component Hydration Strategy**
- Heavy components lazy-loaded: `Activity` and `Works` use `React.lazy()` with Suspense
- Client directives: `client:load` for interactive components (IndexContent, MotionBackground)
- Performance optimization through code-splitting at page level

**Shader Background**
- `MotionBackground.tsx` renders full-screen animated gradient using `@paper-design/shaders-react`
- Currently uses `GrainGradient` with wave shape (commented-out `SimplexNoise` alternative)
- Positioned with `-z-10` to stay behind all content

**Path Aliases**
- `~/*` maps to `src/*` (configured in astro.config.mjs)
- Allows imports like `import Header from '~/components/layouts/Header'`

**GSAP Animation Architecture**
- Used extensively for micro-interactions (HoverCornerButton in Header)
- Handles page content fade-ins/outs in Index.tsx
- Controls migration screen transitions in ScreenMigration.tsx
- All animations use refs and `useEffect` cleanup for proper lifecycle management

**shadcn/ui Integration**
- Components in `src/components/ui/` follow New York style variant
- Configuration in `components.json` with path aliases
- Utility function `cn()` in `src/lib/utils.ts` for conditional classes (clsx + tailwind-merge)

**Custom Fonts**
- Adobe Typekit integration (kitId: 'vza3sdw') for custom fonts in Layout.astro
- Google Fonts (Fira Mono) for monospace text
- Tailwind extends with custom font families: fugaz, fira, futura, comma, eurostile, eurostile_cond

**Analytics**
- Vercel Analytics integrated in Layout.astro via `@vercel/analytics/react`

## Development Notes

- This is a portfolio/personal website for Kizuki Aiki (kz creation)
- Scroll behavior is intentionally disabled globally - do not re-enable without understanding SPA architecture
- When adding new pages, extend the `Page` type union and add case in `renderPageContent()` in Index.tsx
- New content collections require schema definition in `src/content/config.ts`
- UI components should use existing shadcn/ui components in `src/components/ui/` before creating new ones
- GSAP animations should always include cleanup in useEffect return to prevent memory leaks
