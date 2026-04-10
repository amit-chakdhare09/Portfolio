# Amit Chakdhare Portfolio

Personal portfolio website for **Amit Omprakash Chakdhare**, focused on Machine Learning, Computer Vision, and Software Development.

Built with **React + TypeScript + Vite**, with interactive UI/animation effects powered by GSAP, Locomotive Scroll, and Three.js.

## Highlights

- Responsive single-page portfolio (desktop + mobile)
- Animated gradient WebGL background
- Horizontal pinned projects section
- Project cards with GitHub + live demo links
- Skills section grouped by domain
- Custom cursor and mascot interaction
- Skeleton loading states for media

## Tech Stack

- React 19
- TypeScript
- Vite
- CSS (custom styling)
- GSAP + ScrollTrigger (CDN)
- Locomotive Scroll (CDN)
- Three.js (CDN)

## Project Structure

```text
Portfolio/
├─ src/
│  ├─ App.tsx          # Main React page layout/content
│  └─ main.tsx         # React entry point
├─ assets/             # Local media assets used in the portfolio
├─ style.css           # Global styles
├─ script.js           # Runtime interaction/animation logic
├─ index.html          # Vite HTML entry + CDN includes
└─ package.json
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Run Vite dev server
- `npm run build` - Type-check and build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint checks

## Notes

- External animation libraries are loaded from CDN in `index.html`.
- `script.js` initializes interactive effects after React mounts.
- If `Amit_Chakdhare_Resume.pdf` is missing, the resume button is disabled automatically.

## License

MIT - see [LICENSE](./LICENSE)
