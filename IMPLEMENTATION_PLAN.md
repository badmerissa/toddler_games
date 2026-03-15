# Toddler Coloring Book — Implementation Plan

## Context

This plan covers a browser-based SVG coloring book game designed for 3-year-old toddlers. The app runs entirely client-side with no backend; progress is saved in `localStorage`. It is hosted on Cloudflare Pages using a Next.js static export with Tailwind CSS.

The core interaction is: tap a color → tap a shape region → it fills instantly. That's the whole game. Every choice succeeds; nothing can go wrong.

---

## Tech Stack Decisions

| Concern | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router, `output: 'export'`) | Static export → Cloudflare Pages; familiar ecosystem |
| Bundler | Turbopack (Next.js built-in) | Vite not directly compatible with Next.js App Router; Turbopack covers fast HMR |
| Styling | Tailwind CSS v3 | Rapid toddler-safe sizing utilities |
| Animation | Framer Motion | Declarative, performant celebration sequences |
| Audio | Howler.js | Simple cross-browser audio with sprite support |
| Storage | `localStorage` | No install required; survives page refresh |
| Deployment | Cloudflare Pages + Wrangler | Free tier, global CDN |
| SVG handling | Inline React SVG components | Direct DOM access for fill-on-click; no canvas needed |

---

## Project Structure

```
toddler-games/
├── public/
│   ├── audio/
│   │   ├── pop.mp3          # Color swatch tap
│   │   ├── fill.mp3         # Region filled
│   │   ├── hooray.mp3       # Page completed
│   │   └── undo.mp3         # Undo tap
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout, fonts, providers
│   │   ├── page.tsx          # Gallery / home screen
│   │   └── color/
│   │       └── [id]/
│   │           └── page.tsx  # Coloring page screen
│   ├── components/
│   │   ├── Gallery/
│   │   │   ├── Gallery.tsx           # Grid of image thumbnails
│   │   │   └── GalleryCard.tsx       # Single image card with progress ring
│   │   ├── ColoringCanvas/
│   │   │   ├── ColoringCanvas.tsx    # Wraps SVG + handles tap events
│   │   │   └── ColorRegion.tsx       # Single SVG path with fill state
│   │   ├── ColorPalette/
│   │   │   ├── ColorPalette.tsx      # Row/grid of color swatches
│   │   │   └── ColorSwatch.tsx       # Single large tappable swatch
│   │   ├── ToolBar.tsx               # Undo button + back button
│   │   ├── CelebrationOverlay.tsx    # Confetti + star burst on completion
│   │   └── SoundToggle.tsx           # Mute/unmute button
│   ├── svgs/
│   │   ├── Cat.tsx           # SVG as React component, paths have data-region ids
│   │   ├── Dog.tsx
│   │   ├── Duck.tsx
│   │   ├── Fish.tsx
│   │   ├── Apple.tsx
│   │   ├── Banana.tsx
│   │   ├── Car.tsx
│   │   └── House.tsx
│   ├── hooks/
│   │   ├── useColoringState.ts   # Coloring state + undo logic
│   │   ├── useStorage.ts         # localStorage read/write helpers
│   │   └── useSound.ts           # Howler.js wrapper
│   ├── lib/
│   │   ├── images.ts             # Image metadata registry
│   │   ├── colors.ts             # Palette color definitions
│   │   └── storage.ts            # Storage schema + serialization
│   └── context/
│       └── ColoringContext.tsx   # Global mute state, active color
├── next.config.ts
├── tailwind.config.ts
├── wrangler.toml
└── package.json
```

---

## Image Registry (`src/lib/images.ts`)

```ts
export type ColoringImage = {
  id: string;          // URL slug
  label: string;       // Screen-reader / alt text
  emoji: string;       // Gallery card display
  component: React.FC<ColoringCanvasProps>;
  regionCount: number; // Total fillable regions (for completion check)
};
```

Eight images at launch: Cat, Dog, Duck, Fish, Apple, Banana, Car, House.
All SVGs are **custom hand-crafted** — designed specifically for this project with toddler-appropriate simplicity (minimal paths, large regions, thick outlines). Each image is constructed directly as a React SVG component; no third-party SVG libraries are used.

---

## Color Palette (`src/lib/colors.ts`)

16 colors arranged in a 4×4 grid — primary, secondary, pastel. Each swatch is **80×80 px** minimum (44 px is accessibility minimum; 80 px is toddler-safe).

Colors: red, orange, yellow, green, teal, blue, purple, pink, brown, black, white, light-grey, light-blue, light-green, light-yellow, light-pink.

---

## SVG Design Convention

Each SVG image is a React component with the signature:
```ts
type ColoringCanvasProps = {
  fills: Record<string, string>; // regionId → hex color
  onRegionClick: (regionId: string) => void;
};
```

Rules for SVG paths:
- Every fillable region has `data-region="<id>"` on its `<path>`
- Stroke is always black (`stroke="#000"` `strokeWidth="3"`)
- Default fill is `"#F5F5F5"` (near-white, shows as uncolored)
- SVG viewBox sized to `0 0 400 400`; rendered at `min(90vw, 500px)` square
- Outline paths (non-fillable decorations) have no `data-region`

---

## localStorage Schema

Key prefix: `toddler-colors/`

```ts
// Key: `toddler-colors/progress`
type StorageRoot = {
  version: 1;
  pages: {
    [imageId: string]: {
      fills: Record<string, string>; // regionId → hex
      completedAt?: string;          // ISO date if all regions filled
    };
  };
};
```

Writes happen on every fill action (debounced 300 ms). Storage failures are silently ignored (private browsing, quota).

---

## State Management

### `useColoringState(imageId)` hook

```
State:
  fills: Record<string, string>
  history: Array<Record<string, string>>  // undo stack, max 20
  activeColor: string
  isComplete: boolean

Actions:
  fillRegion(regionId)     → push to history, update fills, check completion
  undo()                   → pop history stack
  setActiveColor(hex)
  reset()                  → clear fills for this image
```

History is in-memory only (not persisted). `fills` is synced to localStorage.

### `ColoringContext`

Holds only cross-page global state:
- `isMuted: boolean` — persisted to localStorage
- (Active color is per-page in the hook, not global)

---

## Screen Designs

### 1. Gallery Screen (`/`)

- Title: large friendly font (Nunito or Fredoka One), 48 px
- 2-column grid of image cards on mobile, 4-column on tablet
- Each card: emoji (120 px) + colored progress ring (SVG arc, % complete)
- Tapping a card navigates to `/color/[id]`
- "Reset All" button hidden behind long-press (3 s) to prevent accidental taps

### 2. Coloring Screen (`/color/[id]`)

Layout (portrait-first):
```
┌────────────────────────┐
│  ← Back    🔇  Undo ↩  │  ← ToolBar (64 px tall)
├────────────────────────┤
│                        │
│     SVG Image          │  ← Grows to fill space
│     (400–500 px)       │
│                        │
├────────────────────────┤
│  Color Palette Grid    │  ← 4×4 grid, 80×80 px swatches
└────────────────────────┘
```

- Active color swatch has a 6 px white border + scale(1.15) transform
- Tapping an SVG region with an active color fills it immediately
- No loading states; everything is synchronous

### 3. Celebration Overlay

Triggered when all `regionCount` regions have a non-default fill.

- Full-screen semi-transparent overlay
- Framer Motion: 30 confetti particles, random colors, fall animation 2 s
- Large star burst emoji animation
- "🎉 Hooray!" text (no reading required — emoji conveys meaning)
- Auto-dismisses after 4 s OR tap to dismiss
- Plays `hooray.mp3`

---

## Key Component Details

### `ColoringCanvas.tsx`
```
- Renders the SVG component with current fills
- Intercepts clicks via event delegation on the SVG container
- Reads `data-region` from event.target to identify region
- Calls onRegionClick only if activeColor is set
- Visual feedback: region scales to 1.05 briefly on fill (Framer Motion)
```

### `ColorPalette.tsx`
```
- Renders 16 ColorSwatch components in a CSS grid
- Scrollable horizontally on very small screens
- Active swatch: ring + scale transform
```

### `ToolBar.tsx`
```
- Back button (← arrow icon, 64×64 px minimum)
- Undo button (↩ icon, 64×64 px, disabled when history empty)
- Sound toggle (🔊/🔇, 48×48 px)
- All icons, no text labels needed
```

---

## Toddler UX Rules (enforced throughout)

1. **No text required** — emoji and icons only for core interactions
2. **Minimum tap target: 80×80 px** (color swatches), 64×64 px (toolbar)
3. **No hover states that matter** — primary interaction is touch
4. **No timers, no scores, no failure** — every tap succeeds
5. **Instant feedback** — fill is synchronous, no async operations
6. **Undo is always available** — prevents frustration
7. **High contrast outlines** — 3 px black stroke on all SVG paths
8. **Bright, saturated colors** — toddlers prefer high saturation
9. **No small text** — minimum 24 px for any visible text
10. **Prevent accidental navigation** — Back button requires deliberate tap (no swipe back)

---

## Audio Plan

Using Howler.js with a sprite file to minimize HTTP requests:

```ts
// Sounds
pop       → 0.1 s   (color swatch selected)
fill      → 0.15 s  (region colored)
undo      → 0.1 s   (undo action)
hooray    → 2.5 s   (completion)
```

Audio only plays after first user interaction (browser autoplay policy). `useSound` hook wraps Howler, respects `isMuted` from context.

---

## Deployment Configuration

### `next.config.ts`
```ts
const config = {
  output: 'export',   // Static HTML export
  trailingSlash: true,
  images: { unoptimized: true }, // No Next.js image optimization (static)
};
```

### `wrangler.toml`
```toml
name = "toddler-coloring-game"
compatibility_date = "2024-01-01"

[site]
bucket = "./out"  # Next.js static export directory
```

### Cloudflare Pages Build Settings
```
Build command:   npm run build
Build output:    out/
Node version:    20
```

### `package.json` scripts
```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "deploy": "npm run build && wrangler pages deploy out"
}
```

---

## Dependencies

```json
{
  "dependencies": {
    "next": "^14.x",
    "react": "^18.x",
    "react-dom": "^18.x",
    "framer-motion": "^11.x",
    "howler": "^2.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "@types/react": "^18.x",
    "@types/howler": "^2.x",
    "tailwindcss": "^3.x",
    "autoprefixer": "^10.x",
    "postcss": "^8.x",
    "wrangler": "^3.x"
  }
}
```

Font: `Nunito` from Google Fonts (loaded via `next/font/google`) — rounded letterforms, friendly and readable.

---

## Implementation Phases

### Phase 1 — Scaffold (Day 1)
- [ ] `npx create-next-app@latest` with TypeScript + Tailwind + App Router
- [ ] Configure `output: 'export'` in `next.config.ts`
- [ ] Set up `wrangler.toml`
- [ ] Install Framer Motion + Howler.js
- [ ] Set up Tailwind with custom toddler-safe sizing tokens
- [ ] Create folder structure

### Phase 2 — Core SVG Images (Day 2–3)
- [ ] Design 8 custom SVG coloring pages (Cat, Dog, Duck, Fish, Apple, Banana, Car, House)
- [ ] Build as React components with `data-region` attributes on each fillable path
- [ ] Register in `src/lib/images.ts`
- [ ] Snapshot test each SVG renders correctly

### Phase 3 — Coloring Interaction (Day 3–4)
- [ ] `useColoringState` hook with fill + undo + completion detection
- [ ] `useStorage` hook with localStorage read/write
- [ ] `ColoringCanvas` component with event delegation
- [ ] `ColorPalette` with active swatch highlight
- [ ] `ToolBar` with working undo + back

### Phase 4 — Feedback & Polish (Day 4–5)
- [ ] `CelebrationOverlay` with Framer Motion confetti
- [ ] Audio integration via `useSound` + Howler.js
- [ ] Sound toggle in toolbar
- [ ] Progress ring on Gallery cards
- [ ] Smooth fill animation (scale pulse on region tap)

### Phase 5 — Deployment (Day 5)
- [ ] Cloudflare Pages project setup
- [ ] GitHub Actions CI: `npm run build` on PR
- [ ] Production deploy via `wrangler pages deploy`
- [ ] Test on iOS Safari + Android Chrome (primary toddler devices)

---

## Verification & Testing

| Test | Method |
|---|---|
| SVG fill interaction | Tap each region → verify color applied |
| Undo stack | Fill 5 regions, undo 5 times → verify back to blank |
| localStorage persistence | Fill regions, hard reload → verify fills restored |
| Completion detection | Fill all regions → verify celebration overlay fires |
| Mute persistence | Toggle mute, reload → verify state preserved |
| Touch targets | Use Chrome DevTools touch emulation, verify 80px+ targets |
| Cloudflare deploy | `wrangler pages deploy` → visit URL → full smoke test |
| Cross-device | Test on actual tablet/phone for toddler ergonomics |

---

## Files to Create (Critical Path)

1. `next.config.ts` — static export config
2. `wrangler.toml` — Cloudflare Pages config
3. `tailwind.config.ts` — custom sizing tokens
4. `src/app/layout.tsx` — root layout + font + providers
5. `src/app/page.tsx` — gallery screen
6. `src/app/color/[id]/page.tsx` — coloring screen
7. `src/context/ColoringContext.tsx` — global mute state
8. `src/hooks/useColoringState.ts` — core coloring logic
9. `src/hooks/useStorage.ts` — localStorage helpers
10. `src/hooks/useSound.ts` — audio wrapper
11. `src/lib/images.ts` — image registry
12. `src/lib/colors.ts` — palette definition
13. `src/lib/storage.ts` — storage schema
14. `src/components/Gallery/Gallery.tsx`
15. `src/components/ColoringCanvas/ColoringCanvas.tsx`
16. `src/components/ColorPalette/ColorPalette.tsx`
17. `src/components/ToolBar.tsx`
18. `src/components/CelebrationOverlay.tsx`
19. `src/svgs/Cat.tsx` (+ 7 more custom SVG components)
