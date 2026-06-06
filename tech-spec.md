# Technical Specification — Raghav Juneja Portfolio

## Dependencies

### Runtime

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.0 | UI framework |
| `react-dom` | ^19.0 | React DOM renderer |
| `gsap` | ^3.12 | Animation engine (ScrollTrigger, MorphSVGPlugin) |
| `three` | ^0.170 | WebGL library for post-processing pipeline |
| `@react-three/fiber` | ^9.0 | React renderer for Three.js |
| `@react-three/drei` | ^9.0 | R3F helpers (View, useTexture, OrthographicCamera) |
| `lenis` | ^1.1 | Smooth scroll with inertia |
| `clsx` | ^2.1 | Conditional class names |
| `tailwind-merge` | ^2.6 | Tailwind class deduplication |

### Dev

| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | ^6.0 | Build tool |
| `@vitejs/plugin-react` | ^4.3 | React support for Vite |
| `tailwindcss` | ^3.4 | Utility-first CSS |
| `postcss` | ^8.4 | CSS processing |
| `autoprefixer` | ^10.4 | Vendor prefixing |
| `typescript` | ^5.6 | Type checking |
| `@types/react` | ^19.0 | React type definitions |
| `@types/react-dom` | ^19.0 | ReactDOM type definitions |
| `@types/three` | ^0.170 | Three.js type definitions |

### Fonts (Google Fonts CDN, no npm packages)

DM Sans (700, 800), Caveat (600, 700), Inter (400, 500, 600)

---

## Component Inventory

### Layout

| Component | Source | Notes |
|-----------|--------|-------|
| `Navigation` | Custom | Sticky nav with scroll-reactive blur/border. Contains avatar, links, motion toggle, social icons. |
| `Footer` | Custom | Dark section with large contact links and copyright. |
| `GrainOverlay` | Custom | Fixed full-viewport noise texture overlay. CSS-only, no JS. |
| `CustomCursor` | Custom | Desktop-only, lerped follower with hover state. |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| `HeroSection` | Custom | Two-column layout, headline with script accents, illustration, floating sticker tag. |
| `WorkSection` | Custom | Section header + 3-col masonry grid of `ProjectCard`. |
| `AboutSection` | Custom | Two-column: photo with decorations + text. |
| `ExperienceSection` | Custom | Staggered 3-col layout of `ExperienceCard`. |
| `SpecializingSection` | Custom | Two-column: abstract graphic + skills list. |
| `TalksSection` | Custom | 3-col grid of `TalkCard` + tool icons row. |

### Reusable Components

| Component | Source | Used By | Notes |
|-----------|--------|---------|-------|
| `ProjectCard` | Custom | `WorkSection` | Polaroid-style card: image frame, title, caption, tags. Some cards are dark-themed. |
| `ExperienceCard` | Custom | `ExperienceSection` | Bordered card with date ribbon, company, title, bullets, category tag. |
| `TalkCard` | Custom | `TalksSection` | Square card with line-art illustration and title. Hover lift effect. |
| `MorphingShape` | Custom | Hero, About, Experience, Specializing, Talks | SVG path that morphs between path variations. See Animation table. |
| `PillButton` | Custom | Hero, About | Outline pill CTA with arrow icon. Hover fill + arrow shift. |
| `TagPill` | Custom | ProjectCard, ExperienceCard | Small rounded label. Two variants: outline (projects) and filled (experience). |
| `ScriptWord` | Custom | Hero, About, Experience | Wraps text in Caveat font span for brush-script emphasis within headings. |
| `PostProcessedImage` | Custom | WorkSection, AboutSection | Three.js-powered image with grain + chromatic aberration. See Core Effects. |

### Hooks

| Hook | Purpose |
|------|---------|
| `useSmoothScroll` | Initializes Lenis, connects to GSAP ScrollTrigger, exposes scroll instance. |
| `useScrollReveal` | Wraps GSAP ScrollTrigger fade-up pattern. Accepts ref, options (y, duration, stagger, delay). |
| `useReducedMotion` | Reads `prefers-reduced-motion` + nav toggle. Provides boolean, persists to localStorage. |
| `useCursor` | Tracks mouse position with lerp, manages cursor state (default/hover). |
| `useInView` | IntersectionObserver wrapper for conditional rendering (used by PostProcessedImage). |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| SVG Stroke Morph (organic shapes) | GSAP + MorphSVGPlugin | Pre-store 3-5 path variants per shape as data attributes. GSAP timeline with `morphSVG`, `repeat: -1`, `yoyo: true`. 4-10s cycles per shape. | **High** 🔒 |
| SVG Stroke Morph (talk illustrations) | GSAP + MorphSVGPlugin | Same pattern but gentler: 5-10% path deviation, 8s cycles. Only morph decorative paths, keep subject static. | **High** 🔒 |
| Film-grain chromatic post-process | Three.js + R3F + custom GLSL | Orthographic scene with fullscreen quad shader. Fragment shader applies chromatic aberration + animated grain. Shared Canvas with per-image Views. | **High** 🔒 |
| Smooth scroll | Lenis | Global Lenis instance with `lerp: 0.1`. Connect to ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`. | Low |
| Hero text word-by-word reveal | GSAP | Split headline into words. `gsap.from` with `opacity: 0, y: 30`, `stagger: 0.08`, `duration: 0.6`, `power3.out`. | Low |
| Hero illustration entrance | GSAP | `gsap.from` with `opacity: 0, scale: 0.95`, `duration: 1`, `delay: 0.3`, `power3.out`. | Low |
| Hero decorative shapes entrance | GSAP | Fade-in with `delay: 0.5` after text starts. Shapes already in motion loops. | Low |
| Hero shapes continuous motion | GSAP | Spiral: rotation 20s/rev. Starburst: scale pulse 0.95-1.05 over 4s. Blob: slow translateX drift 0-20px over 10s. Combined with morph timelines. | Medium |
| Work cards staggered reveal | GSAP ScrollTrigger | `gsap.from` with `opacity: 0, y: 60`, `stagger: 0.15`, `duration: 0.8`. `start: "top 80%"`. Cards have static CSS rotation. | Low |
| About photo slide-in | GSAP ScrollTrigger | `gsap.from` with `opacity: 0, x: -60`, `duration: 1`, `power3.out`. Decorative shapes stagger fade 0.3s after. | Low |
| About text line reveal | GSAP ScrollTrigger | Line-by-line with `stagger: 0.1`, each from `opacity: 0, y: 20`. | Low |
| Experience cards staggered reveal | GSAP ScrollTrigger | `gsap.from` with `opacity: 0, y: 80`, `stagger: 0.2`, `duration: 0.9`. Shapes fade 0.5s after. | Low |
| Specializing illustration entrance | GSAP ScrollTrigger | `gsap.from` with `opacity: 0, scale: 0.9`, `duration: 1.2`. | Low |
| Specializing skills list stagger | GSAP ScrollTrigger | Each skill item `gsap.from` with `opacity: 0, y: 30`, `stagger: 0.08`, `duration: 0.6`. | Low |
| Talk cards staggered reveal | GSAP ScrollTrigger | `gsap.from` with `opacity: 0, y: 50`, `stagger: 0.12`, `duration: 0.7`. | Low |
| Talk card hover lift | CSS | `translateY(-8px)` + deeper shadow on hover. `transition: 400ms cubic-bezier(0.4,0,0.2,1)`. | Low |
| Nav scroll-reactive style | ScrollTrigger | Toggle class when scroll > 100px for blur/border. Or use `onUpdate` callback. | Low |
| Nav link hover dot | CSS | Pseudo-element scales from 0 to 1 on hover. `transition: 200ms`. | Low |
| CTA button hover | CSS | Fill + color invert + arrow `translateX(6px)`. `transition: 300ms`. | Low |
| Footer link hover underline | CSS | `scaleX(0→1)` from center on pseudo-element. `transition: 300ms`. | Low |
| Custom cursor follow | requestAnimationFrame | Lerp position toward `clientX/clientY`. Scale + blend mode change on hover targets. | Medium |
| Grain overlay | CSS | Fixed div with repeating noise PNG, `mix-blend-mode: multiply/soft-light`, `pointer-events: none`. Static. | Low |
| Reduced motion fallback | GSAP + Lenis + CSS | `matchMedia` for `(prefers-reduced-motion: reduce)`. Kill timelines, set immediate, disable Lenis, shorten CSS transitions. | Medium |

---

## State & Logic

### Reduced Motion (Global)

A React context at the app root provides `reducedMotion: boolean` and `setReducedMotion: (v: boolean) => void`. Initialization reads `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and `localStorage.getItem('reduced-motion')`. The nav toggle updates both state and localStorage. All GSAP animations, Lenis, the cursor, and CSS transitions read this context.

### Lenis ↔ ScrollTrigger Sync

Lenis owns the scroll position. GSAP ScrollTrigger must be told to use Lenis's scroll position instead of native scroll. This is done via `lenis.on('scroll', ScrollTrigger.update)` and setting `ScrollTrigger.scrollerProxy` or using the newer ScrollTrigger integration pattern. All ScrollTrigger instances use the default scroller (no custom scroller needed if Lenis is set up correctly with `ScrollTrigger.update`).

### Three.js Canvas Architecture

A single `<Canvas>` is mounted at the app root with `position: fixed; inset: 0; pointer-events: none; z-index: 10`. It contains `<View.Port />` from `@react-three/drei`. Each `PostProcessedImage` component creates its own `<View>` with an `OrthographicCamera` and a fullscreen quad mesh using the custom grain/aberration shader. The DOM image is rendered normally but hidden via CSS (`visibility: hidden`). A `ResizeObserver` on each DOM image updates the corresponding `<View>`'s position and size to maintain pixel-perfect alignment.

The Canvas render loop is paused/resumed per-image via `useInView` — only images in the viewport trigger `useFrame` updates and Three.js renders. This caps active post-processed images to ~3 at any time.

### SVG Path Morph Data

Morphing shapes require pre-normalized SVG path data with identical node counts. Path data is stored as semicolon-separated strings in `data-paths` attributes on each `<path>` element. The `MorphingShape` component parses these on mount and creates a GSAP timeline. Path normalization is a build-time concern — the raw paths from the design document must be processed (e.g., via GSAP's `MorphSVGPlugin.convertToPath` and point-matching tools) before being embedded as component data.

---

## Other Key Decisions

### No shadcn/ui

This is a fully custom-designed portfolio with no standard UI patterns (forms, dialogs, tables, etc.). shadcn/ui components would add no value. All components are bespoke.

### Image Strategy

All images are static assets in `/public/images/`. The 14 images are generated once and referenced by filename. The Three.js post-processing pipeline loads them as textures via `useTexture` from `@react-three/drei`.

### Routing

Single-page application, no routing library needed. Nav links use Lenis `scrollTo()` for smooth scroll to section anchors (`#work`, `#about`, etc.).
