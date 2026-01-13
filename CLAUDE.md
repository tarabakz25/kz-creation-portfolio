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
- **Animations**: GSAP for UI transitions
- **UI Components**: shadcn/ui (New York style) + Radix UI primitives
- **3D Graphics**: Three.js with shader effects via @paper-design/shaders-react
- **Package Manager**: Bun

### Project Structure

```
src/
├── components/
│   ├── header-top.tsx       # Site header component
│   ├── footer-top.tsx       # Site footer component
│   ├── loading.tsx          # Session-based loading screen
│   ├── shader.tsx           # Animated background shader
│   ├── cursor/              # Custom cursor components (arrowPointer.tsx)
│   ├── gsap/                # GSAP animation components (cursorEffect, smoothScroll, menuHover)
│   └── ui/                  # shadcn/ui component library
├── content/                 # Astro content collections (profile, activity, works)
├── pages/                   # Astro pages (index.astro is main entry)
├── layouts/                 # Astro layout templates (Layout.astro)
├── lib/                     # Utilities (utils.ts for cn() helper)
├── assets/                  # Static assets (images, SVGs)
└── styles/                  # Global CSS (global.css)
```

### Key Architecture Patterns

**Multi-Page Portfolio Site with Smooth Scrolling**
- Main entry point: `src/pages/index.astro`
- Smooth scrolling enabled via GSAP ScrollSmoother (configured in `src/components/gsap/smoothScroll.tsx`)
- Layout wrapper structure: `#smooth-wrapper` contains `#smooth-content` for scroll effects
- Custom arrow cursor via `ArrowPointer` component (cursor-none set on body)
- Pages include: index (home), profile, lab, contact

**Scroll Behavior**
- GSAP ScrollSmoother creates smooth scroll experience with `smooth: 2` setting
- Wrapper/content structure in Layout.astro enables scroll animations
- Global CSS includes `.prevent-scroll` utility class for temporarily disabling scroll
- Body has `overflow-auto` by default; can be toggled with `prevent-scroll` class

**Loading Experience**
- Session-based loading screen: shows once per session via `sessionStorage.getItem('hasVisited')`
- `Loading.tsx` component renders grid animation with GSAP stagger effects
- Script in Layout.astro sets `data-first-visit` attribute for first-visit detection
- Loading element fades out after animation completes, main content fades in

**Shader Background**
- `Shader.tsx` renders full-screen animated background using Dithering shader
- Uses `Dithering` shader from `@paper-design/shaders-react`
- Positioned with `-z-10` to stay behind all content
- Responsive sizing based on window dimensions via useLayoutEffect

**Content Collections**
- Profile, activity, and works data stored in `src/content/` directories
- Schemas defined in `src/content/config.ts` with Zod validation
- Collections: `profile` (personal info), `activity` (timeline data), `works` (portfolio items - stored as works.json)
- Use `getCollection()` from `astro:content` to fetch collection data

**Component Hydration Strategy**
- Client directives: `client:load` used for interactive components (Loading, Shader, SmoothScroll, ArrowPointer)
- GSAP animations run in browser via Astro inline scripts or React useEffect hooks
- Header component passed as prop to Layout and conditionally rendered

**Path Aliases**
- `~/*` maps to `src/*` (configured in astro.config.mjs)
- Allows imports like `import Header from '~/components/header-top'`

**GSAP Animation Architecture**
- Loading grid animation uses stagger effects with center origin
- ScrollSmoother registered globally for smooth scroll effects
- All GSAP plugins registered via `gsap.registerPlugin()` in components
- All animations include proper cleanup in useEffect/useGSAP returns
- Custom cursor effects in `src/components/gsap/` for interactive animations

**shadcn/ui Integration**
- Components in `src/components/ui/` follow New York style variant
- Configuration in `components.json` with path aliases
- Utility function `cn()` in `src/lib/utils.ts` for conditional classes (clsx + tailwind-merge)
- Extensive component library including forms, dialogs, tooltips, etc.

**Custom Fonts**
- Adobe Typekit integration (kitId: 'vza3sdw') loaded in Layout.astro
- Google Fonts (Fira Mono) for monospace text
- Tailwind extends with custom font families: fugaz, fira, futura_100, futura_pt, comma, eurostile, eurostile_cond, shuei_gothic
- Font loading includes timeout handling for performance

**Analytics**
- Vercel Analytics integrated in Layout.astro via `@vercel/analytics/react`

**Custom Cursor**
- Native cursor hidden via `cursor-none` class on body element
- Custom arrow cursor rendered by `ArrowPointer` component
- Interactive cursor effects in `src/components/gsap/cursorEffectCanvas.tsx`

## Development Notes

- This is a portfolio/personal website for Kizuki Aiki (kz creation)
- Smooth scrolling is core to the experience via GSAP ScrollSmoother - do not disable without user request
- Session-based loading screen requires testing in incognito/clearing sessionStorage to see first-visit experience
- New content collections require schema definition in `src/content/config.ts`
- UI components should use existing shadcn/ui components in `src/components/ui/` before creating new ones
- GSAP animations should always include cleanup in useEffect/useGSAP return to prevent memory leaks
- Shader component dimensions update on window resize via useLayoutEffect
- Custom cursor requires both hiding native cursor and rendering ArrowPointer component
