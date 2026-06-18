# Amit Chakdhare Portfolio

Personal portfolio website for **Amit Omprakash Chakdhare**, focused on **Machine Learning, Computer Vision, and Software Development**.

This project is built with **React + TypeScript + Vite**, with advanced UI/interaction effects powered by **GSAP, ScrollTrigger, Locomotive Scroll, and Three.js**.

## Live Preview

- Portfolio: `localhost` during development (`npm run dev`)
- GitHub: [amit-chakdhare09/Portfolio](https://github.com/amit-chakdhare09/Portfolio)

## Core Features

- Responsive single-page portfolio (desktop + mobile)
- Animated WebGL gradient background
- Smooth scrolling + horizontal pinned project section
- Skills section grouped by category
- Project cards with GitHub and live demo links
- Custom cursor interactions
- Mascot + contextual popup interaction
- Media skeleton loading states

## Project Showcase

1. Integrated-Object-Pose-Detection-Pipeline  
   GitHub: <https://github.com/amit-chakdhare09/Integrated-Object-Pose-Detection-Pipeline>

2. Lane-Detection-Object-Hazard-System  
   GitHub: <https://github.com/amit-chakdhare09/Lane-Detection-Object-Hazard-System>

3. Enhanced-MediaPipe-Pose-Estimation  
   GitHub: <https://github.com/amit-chakdhare09/Enhanced-MediaPipe-Pose-Estimation>

4. Hello-Sakhi  
   GitHub: <https://github.com/amit-chakdhare09/Hello-Sakhi>  
   Live: <https://main--hellosakhi.netlify.app/>

5. Photo_Studio  
   GitHub: <https://github.com/amit-chakdhare09/Photo_Studio>  
   Live: <https://amit-chakdhare09.github.io/Photo_Studio/>

## Tech Stack

- React 19
- TypeScript
- Vite
- CSS (custom styling)
- GSAP + ScrollTrigger (CDN)
- Locomotive Scroll (CDN)
- Three.js (CDN)

## Folder Structure

```text
Portfolio/
├─ src/
│  ├─ App.tsx          # Main page layout/content in React
│  └─ main.tsx         # React entry point
├─ assets/             # Portfolio images and project media
├─ style.css           # Global styling
├─ script.js           # Runtime interactive/animation logic
├─ index.html          # Vite HTML entry + external CDN includes
├─ package.json
└─ README.md
```

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Build production bundle

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## NPM Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Run TypeScript build + Vite production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint checks

## Implementation Notes

- External animation libraries are loaded from CDN in `index.html`.
- `script.js` initializes effects after React mount.
- If `Amit_Chakdhare_Resume.pdf` is missing, resume download button is auto-disabled.

## License

MIT - see [LICENSE](./LICENSE).
