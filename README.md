# Manuel Cherian portfolio

Next.js 16 (App Router) + Tailwind CSS 4 + GSAP 3 (ScrollTrigger, @gsap/react).

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Change the content

Every word on the site lives in `content.ts`, filled from Manuel's CV. Lines marked
`PLACEHOLDER` (the three projects and the GitHub URL) need real values, and
lines marked `ADDED` are data science skills not on the CV yet, to confirm with Manuel.

## How it's put together

- Look: black background, off-white text (#f4f1ee), coral accent (#f44849).
  Fonts are Geist and Geist Mono (free, Google Fonts).
- Motion: GSAP ScrollTrigger + Lenis smooth scrolling. Reduced-motion settings are respected.
- `components/Hero.tsx`: rotating point-sphere (canvas, `Orb.tsx`), headline rise + light sweep, tech marquee.
  The hero stays pinned while the About card rides up over it.
- `About.tsx`: words brighten as you scroll. `Skills.tsx`: sticky intro, list lights up at screen centre.
- `Journey.tsx`: scroll-driven headline band + milestone cards.
- `Work.tsx`: stacking project cards, floating "focus" glass cards with parallax.
- `Process.tsx`: auto-advancing phase tabs. `Principles.tsx`: scrolling band + list that lights line by line.
- `Curiosity.tsx`, `Contact.tsx`: closing statement, coral contact section with FAQ and "Send a message / Here" bar.
