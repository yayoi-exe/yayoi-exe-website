# Portfolio Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the `yayoi_exe` portfolio site's visual design (colors, fonts, icons) and trim it down to three pages (Home, Career, Projects), removing all non-desktop responsive styling and every component/page that becomes unused in the process.

**Architecture:** This is a CRA (Create React App) + React Router app with per-component CSS files (no CSS-in-JS, no design-system library). The redesign keeps that architecture — plain CSS files, CSS custom properties in `src/global.css` for design tokens — and works file-by-file: first strip dead pages/routes down to a clean 3-page skeleton, then lay down global tokens, then rebuild each page's body against those tokens.

**Tech Stack:** React 18, react-router-dom v6, framer-motion (page transitions), gsap (existing decode/typewriter effect), prop-types, CRA/react-scripts (build + jest test runner).

**Working directory:** All file paths below are relative to the repository root. The app itself lives in `yayoi_exe/`. Run all `npm`/`CI=true` commands from inside `yayoi_exe/`.

## Global Constraints

- Colors (define once as CSS custom properties, no other color values anywhere): accent `#F5B700`, sub1 `#1A1A1A`, sub2 `#71717A`, main `#FAFAF7`, sub-accent = accent at 50% opacity (`rgba(245, 183, 0, 0.5)`).
- Fonts (define once as CSS custom properties): Latin = `Space Grotesk` (Regular 400 + Bold 700 only); Japanese = `M PLUS 1` (Regular 400 + Bold 700 only). Combined stack falls back Latin → Japanese.
- Icons: Material Symbols Outlined for everything, except GitHub/LinkedIn which use dedicated brand SVG components (Material has no brand logos).
- Responsive: PC-only. No `@media` query may remain anywhere in the codebase after this plan is complete.
- Pages: only `/` (Home), `/career` (Career), `/projects` (Projects). No About/Contact routes, pages, or footer.
- No unused CSS files, components, or pages — anything that becomes orphaned mid-plan gets deleted in the same task that orphans it.
- Photos: placeholder only (a colored circle), no `<img>` tags for profile photos.

Mid-plan note: after Task 1 and Task 2, several pages will look visually broken (old CSS files still reference color tokens that Task 2 removes). This is expected — each page's own restyle task (6, 7, 8) fixes its look, and Task 9 is the final full visual pass.

---

### Task 1: Trim routes to Home/Career/Projects, delete dead pages

**Files:**
- Delete: `yayoi_exe/src/pages/About.js`
- Delete: `yayoi_exe/src/components/IntroCodeFrame.js`
- Delete: `yayoi_exe/src/components/IntroCodeContent.js`
- Delete: `yayoi_exe/src/components/ContactForm.js`
- Delete: `yayoi_exe/src/components/Footer.js`
- Delete: `yayoi_exe/src/components/career/EducationCard.js`
- Delete: `yayoi_exe/src/components/career/EducationCard.css`
- Delete: `yayoi_exe/src/assets/styles/contact.css`
- Delete: `yayoi_exe/src/assets/styles/contactForm.css`
- Delete: `yayoi_exe/src/assets/styles/codeContent.css`
- Delete: `yayoi_exe/src/assets/styles/footer.css`
- Delete: `yayoi_exe/public/fonts/KronaOne-Regular.ttf`
- Delete: `yayoi_exe/public/fonts/helvetiker_regular.typeface.json`
- Modify: `yayoi_exe/src/App.js`
- Modify: `yayoi_exe/src/components/Header.js`
- Modify: `yayoi_exe/src/pages/Career.js`

**Interfaces:**
- Produces: `App.js` with exactly 3 routes (`/`, `/career`, `/projects`), no `<Footer />`. `Header.js` tabs array with exactly 3 entries. `Career.js` with the education-card list section removed (Timeline section untouched for now — its full restyle happens in Task 7).
- Consumes: nothing from other tasks.

- [ ] **Step 1: Delete the dead page files and their styles**

```bash
cd yayoi_exe
git rm src/pages/About.js \
  src/components/IntroCodeFrame.js \
  src/components/IntroCodeContent.js \
  src/components/ContactForm.js \
  src/components/Footer.js \
  src/components/career/EducationCard.js \
  src/components/career/EducationCard.css \
  src/assets/styles/contact.css \
  src/assets/styles/contactForm.css \
  src/assets/styles/codeContent.css \
  src/assets/styles/footer.css \
  public/fonts/KronaOne-Regular.ttf \
  public/fonts/helvetiker_regular.typeface.json
```

- [ ] **Step 2: Rewrite `App.js` to drop the About/Contact routes and the footer**

Replace the full contents of `yayoi_exe/src/App.js` with:

```jsx
import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Main from './pages/Main';
import Career from './pages/Career';
import Projects from './pages/Projects';
import './app.css';

// ヘッダーのタブ並び順。移動方向の判定に使う
const tabOrder = ['/', '/career', '/projects'];

// forward = 右のタブへ（中身は左へ流れる）／back = 左のタブへ
const pageVariants = {
    enter: (direction) => ({
        x: direction === 'forward' ? '75%' : '-75%',
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction) => ({
        x: direction === 'forward' ? '-75%' : '75%',
        opacity: 0,
    }),
};

// 旧ページと新ページを同時にスライドさせるページ遷移
function AnimatedRoutes() {
    const location = useLocation();
    const prevPathRef = useRef(location.pathname);

    const prevIndex = tabOrder.indexOf(prevPathRef.current);
    const currIndex = tabOrder.indexOf(location.pathname);
    const direction =
        prevIndex !== -1 && currIndex !== -1 && currIndex < prevIndex ? 'back' : 'forward';

    useEffect(() => {
        prevPathRef.current = location.pathname;
    }, [location.pathname]);

    return (
        <div className="main">
            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                <motion.div
                    key={location.pathname}
                    className="page-transition"
                    custom={direction}
                    variants={pageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Routes location={location}>
                        <Route path="/" element={<Main />} />
                        <Route path="/career" element={<Career />} />
                        <Route path="/projects" element={<Projects />} />
                    </Routes>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <div className="app-container">
                <Header className="header" />
                <AnimatedRoutes />
            </div>
        </BrowserRouter>
    );
}

export default App;
```

- [ ] **Step 3: Trim the tabs array in `Header.js`**

In `yayoi_exe/src/components/Header.js`, replace the `tabs` array (lines 5-12) with:

```js
const tabs = [
    { path: '/', label: 'Home.html' },
    { path: '/career', label: 'Career.js' },
    { path: '/projects', label: 'Projects.js' },
];
```

- [ ] **Step 4: Remove the education-card section from `Career.js`**

Replace the full contents of `yayoi_exe/src/pages/Career.js` with:

```jsx
import React from 'react';
import '../assets/styles/career.css';
import educationData from '../data/education.json';
import Timeline from '../components/career/Timeline';

const Career = () => {
    const timelineItems = educationData.map((data) => {
        const year = data.end ? `${data.start}\n -- \n${data.end}` : `${data.start}\n --- \n現在`;
        const title = data.type === 'education' ? data.university : data.company;
        const description = data.type === 'education' ? data.degree : data.title;
        return { id: data.id, year, title, description };
    });

    return (
        <div className="home-container">
            <main className="home-main">
                <section id="timeline" className="home-section">
                    <h2 className="home-subtitle">経歴</h2>
                    <Timeline items={timelineItems} />
                </section>
            </main>
        </div>
    );
};

export default Career;
```

(This is an interim version — the full restyle with the sorted timeline and photo happens in Task 7. This step only removes the now-broken import of the deleted `EducationCard`.)

- [ ] **Step 5: Verify the app still builds**

```bash
cd yayoi_exe && npm run build
```

Expected: `Compiled successfully.` with no errors (warnings about unused CSS selectors are fine — no more component/page files reference the deleted modules).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Trim routes to Home/Career/Projects, delete About/Contact/Footer and dead components"
```

---

### Task 2: Global design tokens, fonts, and flat desktop layout

**Files:**
- Modify: `yayoi_exe/src/global.css`
- Modify: `yayoi_exe/src/app.css`
- Modify: `yayoi_exe/public/index.html`

**Interfaces:**
- Produces: CSS custom properties `--color-accent`, `--color-accent-soft`, `--color-sub1`, `--color-sub2`, `--color-main`, `--font-base`, `--font-weight-regular`, `--font-weight-bold` in `global.css`; a `.material-symbols-outlined` utility class; `app.css` with no `@media` blocks and a flat `--color-main` background.
- Consumes: nothing from other tasks.

- [ ] **Step 1: Replace `global.css`**

Replace the full contents of `yayoi_exe/src/global.css` with:

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=M+PLUS+1:wght@400;700&display=swap');

:root {
    /* ── Colors ── */
    --color-accent: #f5b700;
    --color-accent-soft: rgba(245, 183, 0, 0.5);
    --color-sub1: #1a1a1a;
    --color-sub2: #71717a;
    --color-main: #fafaf7;

    /* ── Typography ── */
    --font-base: 'Space Grotesk', 'M PLUS 1', sans-serif;
    --font-weight-regular: 400;
    --font-weight-bold: 700;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: var(--color-main);
    color: var(--color-sub1);
    font-family: var(--font-base);
    font-weight: var(--font-weight-regular);
    overflow-x: hidden;
}

button,
input,
textarea,
select {
    font-family: inherit;
}

img {
    max-width: 100%;
}

/* Material Symbols Outlined — Google's recommended base rule */
.material-symbols-outlined {
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
    vertical-align: middle;
    line-height: 1;
}
```

- [ ] **Step 2: Replace `app.css`**

Replace the full contents of `yayoi_exe/src/app.css` with:

```css
.app-container {
    background-color: var(--color-main);
    display: flex;
    flex-flow: column;
    width: 100vw;
    min-height: 100vh;
}

.header {
    flex: 0 0 auto;
}

.main {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

/* ウィンドウ切り替えのように左右へスライドするページ */
.page-transition {
    width: 100%;
    will-change: transform, opacity;
}
```

- [ ] **Step 3: Add font/icon links and update the page title in `index.html`**

In `yayoi_exe/public/index.html`, replace the full `<head>...</head>` block with:

```html
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#FAFAF7" />
    <meta name="description" content="Taichi Shirakawa's portfolio site." />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
    <link
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
      rel="stylesheet"
    />
    <title>Yayoi-exe | Taichi Shirakawa</title>
  </head>
```

- [ ] **Step 4: Verify the app builds**

```bash
cd yayoi_exe && npm run build
```

Expected: `Compiled successfully.` (Visually, most pages will now look unstyled/broken where they reference deleted `--palette-*`/`--color-surface-*` tokens — that's expected until Tasks 5-8 restyle each page.)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Replace global design tokens with new color/font palette, flatten app layout"
```

---

### Task 3: GitHub/LinkedIn brand icon components

**Files:**
- Create: `yayoi_exe/src/components/icons/GithubIcon.js`
- Create: `yayoi_exe/src/components/icons/LinkedinIcon.js`

**Interfaces:**
- Produces: `GithubIcon` and `LinkedinIcon`, both default-exported no-prop components rendering a 24×24 `currentColor` SVG.
- Consumes: nothing from other tasks (used by Task 6's Home page).

- [ ] **Step 1: Create `GithubIcon.js`**

```jsx
import React from 'react';

const GithubIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .3.21.66.8.55A11.52 11.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
    </svg>
);

export default GithubIcon;
```

- [ ] **Step 2: Create `LinkedinIcon.js`**

```jsx
import React from 'react';

const LinkedinIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
);

export default LinkedinIcon;
```

- [ ] **Step 3: Verify the app builds**

```bash
cd yayoi_exe && npm run build
```

Expected: `Compiled successfully.` (These files aren't imported anywhere yet, so this just confirms they don't break the build.)

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add GitHub/LinkedIn brand icon components"
```

---

### Task 4: Simplify PhotoFrame to a placeholder circle, remove CodeFrameWindow

**Files:**
- Delete: `yayoi_exe/src/components/CodeFrameWindow.js`
- Delete: `yayoi_exe/src/assets/styles/codeFrameWindow.css`
- Modify: `yayoi_exe/src/components/PhotoFrame.js`
- Create: `yayoi_exe/src/assets/styles/photoFrame.css`

**Interfaces:**
- Produces: `PhotoFrame` — a default-exported, no-prop component rendering `<div className="photo-frame" aria-hidden="true" />` (an accent-colored circle placeholder, no `<img>`, no click-to-navigate).
- Consumes: `--color-accent` from Task 2.

- [ ] **Step 1: Delete `CodeFrameWindow` and its stylesheet**

```bash
cd yayoi_exe
git rm src/components/CodeFrameWindow.js src/assets/styles/codeFrameWindow.css
```

(Safe to delete now: `IntroCodeFrame.js`, its other consumer, was already deleted in Task 1. `PhotoFrame.js` is the last consumer and stops using it in this task.)

- [ ] **Step 2: Rewrite `PhotoFrame.js`**

Replace the full contents of `yayoi_exe/src/components/PhotoFrame.js` with:

```jsx
import React from 'react';
import '../assets/styles/photoFrame.css';

const PhotoFrame = () => <div className="photo-frame" aria-hidden="true" />;

export default PhotoFrame;
```

- [ ] **Step 3: Create `photoFrame.css`**

```css
.photo-frame {
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background-color: var(--color-accent);
    flex-shrink: 0;
}
```

- [ ] **Step 4: Verify the app builds**

```bash
cd yayoi_exe && npm run build
```

Expected: `Compiled successfully.`

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Simplify PhotoFrame to a placeholder circle, remove CodeFrameWindow"
```

---

### Task 5: Restyle the Header

**Files:**
- Modify: `yayoi_exe/src/assets/styles/header.css`

**Interfaces:**
- Produces: header visuals using the Task 2 tokens, no `@media` blocks.
- Consumes: `--color-main`, `--color-sub1`, `--color-sub2`, `--color-accent`, `--color-accent-soft`, `--font-base`, `--font-weight-bold` from Task 2. Assumes the 3-tab structure and `nav-tab-slider` DOM/JS from Task 1 are unchanged (only CSS changes here).

- [ ] **Step 1: Replace `header.css`**

Replace the full contents of `yayoi_exe/src/assets/styles/header.css` with:

```css
.header {
    background-color: var(--color-main);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: var(--color-sub1);
    flex-wrap: nowrap;
    overflow: hidden;
    padding: 0.5rem 1rem;
}

.tab-title {
    flex-shrink: 0;
    white-space: normal;
    font-family: var(--font-base);
    font-weight: var(--font-weight-bold);
    font-size: 1.5rem;
    color: var(--color-sub1);
}

.header-tab {
    color: var(--color-sub2);
    background-color: transparent;
    cursor: pointer;
    position: relative;
    z-index: 1;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: color 0.25s ease;
    font-family: var(--font-base);
    font-size: 1rem;
    margin-right: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 2px;
    border-top: 4px solid transparent;
    width: 120px;
}

.header-tab.active {
    color: var(--color-sub1);
    font-weight: var(--font-weight-bold);
}

.header-tab:hover {
    color: var(--color-sub1);
}

.nav-tabs {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    flex-shrink: 0;
    white-space: nowrap;
    overflow: hidden;
}

/* アクティブタブを表す共有スライダー。DOM座標に合わせて滑らかに移動する */
.nav-tab-slider {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    background-color: var(--color-accent-soft);
    opacity: 0;
    pointer-events: none;
    will-change: transform, width;
    border-radius: 2px;
    border-top: 4px solid var(--color-accent);
}

.nav-tab-slider.is-visible {
    opacity: 1;
}

/* 初回描画以降のみアニメーション。ウィンドウ移動のようにヌルッと追従させる */
.nav-tab-slider.is-animated {
    transition:
        transform 0.38s cubic-bezier(0.22, 1, 0.36, 1),
        width 0.38s cubic-bezier(0.22, 1, 0.36, 1),
        opacity 0.2s ease;
}

/* ホバー時はスライダーの上に薄いハイライトを重ねる */
.header-tab:not(.active):hover::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background-color: var(--color-accent-soft);
    opacity: 0.5;
    border-radius: inherit;
}
```

- [ ] **Step 2: Verify the app builds**

```bash
cd yayoi_exe && npm run build
```

Expected: `Compiled successfully.`

- [ ] **Step 3: Manual check**

```bash
cd yayoi_exe && npm start
```

Open `http://localhost:3000`. Confirm: header background is off-white (`#FAFAF7`), the 3 tabs read `Home.html` / `Career.js` / `Projects.js`, and clicking a tab slides an accent-colored underline/highlight beneath it.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Restyle header with new color tokens"
```

---

### Task 6: Rebuild the Home page

**Files:**
- Delete: `yayoi_exe/src/components/layout/TwoColumnLayout.js`
- Modify: `yayoi_exe/src/pages/Main.js`
- Modify: `yayoi_exe/src/components/AnimatedTitle.js`
- Modify: `yayoi_exe/src/assets/styles/main.css`
- Modify: `yayoi_exe/src/assets/styles/animatedTitle.css`

**Interfaces:**
- Produces: `Main.js` rendering the full hero (static name, decoding tagline, CTA to `/projects`, social row, decorative SVG, `PhotoFrame`). `AnimatedTitle` now takes a required `phrases: string[]` prop (breaking change from the old no-prop, hardcoded-`TITLES` version) and renders a `<p className="home-tagline">` instead of an `<h1>` — this is safe because `Main.js` (updated in this same task) is its only consumer.
- Consumes: `useTypewriterEffect` (unchanged, `src/hooks/useTypewriterEffect.js`), `PhotoFrame` from Task 4, `GithubIcon`/`LinkedinIcon` from Task 3, `--color-accent`/`--color-sub1`/`--color-sub2`/`--font-base`/`--font-weight-*` from Task 2.

- [ ] **Step 1: Delete `TwoColumnLayout.js`**

```bash
cd yayoi_exe
git rm src/components/layout/TwoColumnLayout.js
```

(Its only two consumers were `About.js`, deleted in Task 1, and `Main.js`, rewritten below to lay out the hero directly.)

- [ ] **Step 2: Repurpose `AnimatedTitle.js` to drive the tagline instead of the name**

Replace the full contents of `yayoi_exe/src/components/AnimatedTitle.js` with:

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import useTypewriterEffect from '../hooks/useTypewriterEffect';
import '../assets/styles/animatedTitle.css';

const AnimatedTitle = ({ phrases }) => {
    const contentRef = useTypewriterEffect(phrases);

    return <p className="home-tagline" ref={contentRef}></p>;
};

AnimatedTitle.propTypes = {
    phrases: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AnimatedTitle;
```

- [ ] **Step 3: Replace `animatedTitle.css`**

Replace the full contents of `yayoi_exe/src/assets/styles/animatedTitle.css` with:

```css
.home-tagline {
    font-family: var(--font-base);
    font-weight: var(--font-weight-regular);
    font-size: 1.1rem;
    color: var(--color-sub2);
    min-height: 1.6em;
}
```

- [ ] **Step 4: Rewrite `Main.js`**

Replace the full contents of `yayoi_exe/src/pages/Main.js` with:

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedTitle from '../components/AnimatedTitle';
import PhotoFrame from '../components/PhotoFrame';
import GithubIcon from '../components/icons/GithubIcon';
import LinkedinIcon from '../components/icons/LinkedinIcon';
import '../assets/styles/main.css';

const TAGLINE_PHRASES = [
    "Software Engineer & Master's Student",
    "Let's build something amazing together!",
];

const SOCIAL_LINKS = {
    github: 'https://github.com/yayoi-exe',
    linkedin: '#',
    email: 'email@email.com',
};

const Main = () => {
    return (
        <div className="home-hero">
            <div className="home-hero-copy">
                <h1 className="home-name">Taichi Shirakawa</h1>
                <AnimatedTitle phrases={TAGLINE_PHRASES} />
                <Link to="/projects" className="hero-cta">
                    View Projects
                    <span className="material-symbols-outlined" aria-hidden="true">
                        arrow_forward
                    </span>
                </Link>
                <div className="home-socials">
                    <a
                        href={SOCIAL_LINKS.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <GithubIcon />
                    </a>
                    <a
                        href={SOCIAL_LINKS.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                    >
                        <LinkedinIcon />
                    </a>
                    <a href={`mailto:${SOCIAL_LINKS.email}`} className="home-email">
                        {SOCIAL_LINKS.email}
                    </a>
                </div>
            </div>
            <div className="home-hero-photo">
                <span className="home-caption">Engineering What&apos;s Next.</span>
                <PhotoFrame />
                <svg className="home-decoration" viewBox="0 0 200 300" aria-hidden="true">
                    <polyline className="home-decoration-line" points="20,280 90,150 170,60" />
                    <circle className="home-decoration-dot" cx="20" cy="280" r="6" />
                    <circle className="home-decoration-dot" cx="90" cy="150" r="6" />
                    <circle className="home-decoration-dot" cx="170" cy="60" r="6" />
                </svg>
            </div>
        </div>
    );
};

export default Main;
```

- [ ] **Step 5: Replace `main.css`**

Replace the full contents of `yayoi_exe/src/assets/styles/main.css` with:

```css
.home-hero {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
}

.home-hero-copy {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    max-width: 480px;
}

.home-name {
    font-family: var(--font-base);
    font-weight: var(--font-weight-bold);
    font-size: 3.5rem;
    color: var(--color-sub1);
    line-height: 1.1;
}

.hero-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: 999px;
    background-color: var(--color-accent);
    color: var(--color-sub1);
    font-family: var(--font-base);
    font-weight: var(--font-weight-bold);
    text-decoration: none;
    transition: transform 0.2s ease;
}

.hero-cta:hover {
    transform: translateY(-2px);
}

.home-socials {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.home-socials a {
    color: var(--color-sub1);
    display: inline-flex;
}

.home-email {
    font-family: var(--font-base);
    font-weight: var(--font-weight-bold);
    font-size: 0.95rem;
    text-decoration: none;
}

.home-hero-photo {
    position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.home-caption {
    align-self: flex-end;
    font-family: var(--font-base);
    font-weight: var(--font-weight-regular);
    font-size: 0.85rem;
    color: var(--color-sub2);
}

.home-decoration {
    position: absolute;
    top: 0;
    left: -60px;
    width: 100px;
    height: 150px;
    pointer-events: none;
}

.home-decoration-line {
    fill: none;
    stroke: var(--color-accent);
    stroke-width: 2;
}

.home-decoration-dot {
    fill: var(--color-accent);
}
```

- [ ] **Step 6: Verify the app builds**

```bash
cd yayoi_exe && npm run build
```

Expected: `Compiled successfully.`

- [ ] **Step 7: Manual check**

```bash
cd yayoi_exe && npm start
```

Open `http://localhost:3000`. Confirm: "Taichi Shirakawa" appears as a static bold heading, the line below it decodes/scrambles and cycles between the two tagline phrases, "View Projects" is a pill button that navigates to `/projects`, GitHub/LinkedIn icons and the email link appear, and the accent-colored circle + dot decoration render on the right.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "Rebuild Home page hero with new layout and decoding tagline"
```

---

### Task 7: Career timeline — real data, reverse-chronological, with tests

**Files:**
- Create: `yayoi_exe/src/components/career/timelineData.js`
- Create: `yayoi_exe/src/components/career/timelineData.test.js`
- Modify: `yayoi_exe/src/components/career/Timeline.js`
- Modify: `yayoi_exe/src/components/career/Timeline.css`
- Modify: `yayoi_exe/src/pages/Career.js`
- Modify: `yayoi_exe/src/assets/styles/career.css`

**Interfaces:**
- Produces: `buildTimelineItems(educationData)` — pure function returning `{ id, title, description, year, isCurrent }[]`, sorted by `start` descending. `Timeline` component now expects each item to include `isCurrent: boolean` and renders a single-column dot list (no more left/right alternating layout).
- Consumes: `PhotoFrame` from Task 4, `--color-accent`/`--color-sub1`/`--color-sub2`/`--font-base`/`--font-weight-*` from Task 2, `src/data/education.json` (unchanged).

- [ ] **Step 1: Write the failing test for `buildTimelineItems`**

Create `yayoi_exe/src/components/career/timelineData.test.js`:

```js
import { buildTimelineItems } from './timelineData';

const fixture = [
    { id: 1, type: 'education', university: 'A College', degree: 'Degree A', start: 2017, end: 2022 },
    { id: 2, type: 'education', university: 'B College', degree: 'Degree B', start: 2022, end: 2024 },
    { id: 3, type: 'work', company: 'Acme Corp', title: 'Engineer', start: 2024, end: null },
];

test('sorts items with the most recent start year first', () => {
    const result = buildTimelineItems(fixture);
    expect(result.map((item) => item.id)).toEqual([3, 2, 1]);
});

test('marks only the item with a null end date as current', () => {
    const result = buildTimelineItems(fixture);
    expect(result.find((item) => item.id === 3).isCurrent).toBe(true);
    expect(result.find((item) => item.id === 2).isCurrent).toBe(false);
    expect(result.find((item) => item.id === 1).isCurrent).toBe(false);
});

test('uses company/title for work entries and university/degree for education entries', () => {
    const result = buildTimelineItems(fixture);
    const work = result.find((item) => item.id === 3);
    expect(work.title).toBe('Acme Corp');
    expect(work.description).toBe('Engineer');
    const edu = result.find((item) => item.id === 1);
    expect(edu.title).toBe('A College');
    expect(edu.description).toBe('Degree A');
});

test('formats the year range, using 現在 for the ongoing entry', () => {
    const result = buildTimelineItems(fixture);
    expect(result.find((item) => item.id === 3).year).toBe('2024 - 現在');
    expect(result.find((item) => item.id === 1).year).toBe('2017 - 2022');
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd yayoi_exe && CI=true npm test -- --testPathPattern=timelineData
```

Expected: FAIL — `Cannot find module './timelineData'` (the module doesn't exist yet).

- [ ] **Step 3: Implement `buildTimelineItems`**

Create `yayoi_exe/src/components/career/timelineData.js`:

```js
export function buildTimelineItems(educationData) {
    return [...educationData]
        .sort((a, b) => b.start - a.start)
        .map((data) => {
            const isCurrent = data.end === null;
            return {
                id: data.id,
                title: data.type === 'education' ? data.university : data.company,
                description: data.type === 'education' ? data.degree : data.title,
                year: isCurrent ? `${data.start} - 現在` : `${data.start} - ${data.end}`,
                isCurrent,
            };
        });
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
cd yayoi_exe && CI=true npm test -- --testPathPattern=timelineData
```

Expected: PASS — 4 tests passing.

- [ ] **Step 5: Rewrite `Timeline.js` as a single-column dot list**

Replace the full contents of `yayoi_exe/src/components/career/Timeline.js` with:

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './Timeline.css';

const Timeline = ({ items }) => {
    return (
        <ol className="timeline-list">
            {items.map((item, index) => (
                <motion.li
                    key={item.id}
                    className="timeline-row"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                    <span
                        className={`timeline-dot ${item.isCurrent ? 'is-current' : ''}`}
                        aria-hidden="true"
                    />
                    <div className="timeline-body">
                        <span className="timeline-year">{item.year}</span>
                        <h3 className="timeline-title">{item.title}</h3>
                        <p className="timeline-description">{item.description}</p>
                    </div>
                </motion.li>
            ))}
        </ol>
    );
};

Timeline.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            year: PropTypes.string,
            title: PropTypes.string,
            description: PropTypes.string,
            isCurrent: PropTypes.bool,
        })
    ).isRequired,
};

export default Timeline;
```

- [ ] **Step 6: Replace `Timeline.css`**

Replace the full contents of `yayoi_exe/src/components/career/Timeline.css` with:

```css
.timeline-list {
    list-style: none;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    padding-left: 10px;
}

.timeline-list::before {
    content: '';
    position: absolute;
    left: 20px;
    top: 14px;
    bottom: 14px;
    width: 2px;
    background-color: var(--color-sub2);
    opacity: 0.5;
}

.timeline-row {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    position: relative;
    z-index: 1;
}

.timeline-body {
    flex: 1;
}

.timeline-dot {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: var(--color-sub2);
    margin-top: 4px;
}

.timeline-dot.is-current {
    background-color: var(--color-accent);
}

.timeline-year {
    display: block;
    font-family: var(--font-base);
    font-weight: var(--font-weight-bold);
    color: var(--color-sub2);
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
}

.timeline-title {
    font-family: var(--font-base);
    font-size: 1.25rem;
    font-weight: var(--font-weight-bold);
    color: var(--color-sub1);
    margin-bottom: 0.25rem;
}

.timeline-description {
    font-family: var(--font-base);
    font-size: 0.95rem;
    font-weight: var(--font-weight-regular);
    color: var(--color-sub2);
    line-height: 1.6;
}
```

- [ ] **Step 7: Rewrite `Career.js` to use `buildTimelineItems` and add the photo**

Replace the full contents of `yayoi_exe/src/pages/Career.js` with:

```jsx
import React from 'react';
import '../assets/styles/career.css';
import educationData from '../data/education.json';
import Timeline from '../components/career/Timeline';
import PhotoFrame from '../components/PhotoFrame';
import { buildTimelineItems } from '../components/career/timelineData';

const Career = () => {
    const timelineItems = buildTimelineItems(educationData);

    return (
        <div className="career-container">
            <section className="career-timeline">
                <h2 className="career-heading">経歴</h2>
                <Timeline items={timelineItems} />
            </section>
            <div className="career-photo">
                <PhotoFrame />
            </div>
        </div>
    );
};

export default Career;
```

- [ ] **Step 8: Replace `career.css`**

Replace the full contents of `yayoi_exe/src/assets/styles/career.css` with:

```css
.career-container {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 4rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
}

.career-timeline {
    flex: 1 1 auto;
    max-width: 640px;
}

.career-heading {
    font-family: var(--font-base);
    font-weight: var(--font-weight-bold);
    font-size: 2rem;
    color: var(--color-sub1);
    margin-bottom: 2rem;
}

.career-photo {
    flex: 0 0 auto;
}
```

- [ ] **Step 9: Verify the app builds**

```bash
cd yayoi_exe && npm run build
```

Expected: `Compiled successfully.`

- [ ] **Step 10: Manual check**

```bash
cd yayoi_exe && npm start
```

Open `http://localhost:3000/career`. Confirm: 4 timeline rows appear newest-first (楽天グループ株式会社 at the top with an accent-colored dot, the rest with gray dots), each row fades/slides in, and the accent circle placeholder appears on the right.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "Rebuild Career page: reverse-chronological single timeline, drop duplicate education-card list"
```

---

### Task 8: Restyle the Projects page and swap the link icon

**Files:**
- Modify: `yayoi_exe/src/components/ProjectCard.js`
- Modify: `yayoi_exe/src/assets/styles/projects.css`
- Modify: `yayoi_exe/src/assets/styles/projectCard.css`

**Interfaces:**
- Produces: `ProjectCard` rendering a Material Symbols `open_in_new` icon next to the "View Link" label instead of a plain text link.
- Consumes: `.material-symbols-outlined` utility from Task 2, `--color-accent`/`--color-accent-soft`/`--color-sub1`/`--color-sub2`/`--font-base`/`--font-weight-*` from Task 2. `Projects.js` and `src/data/projects.json` are unchanged.

- [ ] **Step 1: Add the icon to `ProjectCard.js`**

In `yayoi_exe/src/components/ProjectCard.js`, replace the `project-links` block with:

```jsx
            {/* プロジェクトリンク */}
            {project.webLink && ( // webLink が空なら表示しない
                <div className="project-links">
                    <a
                        href={project.webLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button"
                    >
                        View Link
                        <span className="material-symbols-outlined" aria-hidden="true">
                            open_in_new
                        </span>
                    </a>
                </div>
            )}
```

- [ ] **Step 2: Replace `projects.css`**

Replace the full contents of `yayoi_exe/src/assets/styles/projects.css` with:

```css
.projects-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
}

.page-title {
    font-family: var(--font-base);
    font-weight: var(--font-weight-bold);
    font-size: 2.5rem;
    color: var(--color-sub1);
    margin-bottom: 2rem;
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
}
```

- [ ] **Step 3: Replace `projectCard.css`**

Replace the full contents of `yayoi_exe/src/assets/styles/projectCard.css` with:

```css
.project-card {
    background-color: var(--color-main);
    border: 1px solid var(--color-sub2);
    border-radius: 12px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.project-thumbnail {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-radius: 8px;
}

.project-name {
    font-family: var(--font-base);
    font-weight: var(--font-weight-bold);
    font-size: 1.25rem;
    color: var(--color-sub1);
}

.project-description {
    font-family: var(--font-base);
    font-weight: var(--font-weight-regular);
    font-size: 0.95rem;
    color: var(--color-sub2);
    line-height: 1.5;
}

.project-tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.tech-badge {
    font-family: var(--font-base);
    font-size: 0.75rem;
    font-weight: var(--font-weight-bold);
    color: var(--color-sub1);
    background-color: var(--color-accent-soft);
    padding: 0.25rem 0.6rem;
    border-radius: 999px;
}

.project-links {
    margin-top: auto;
}

.button {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    color: var(--color-sub1);
    font-family: var(--font-base);
    font-weight: var(--font-weight-bold);
    text-decoration: none;
}

.button .material-symbols-outlined {
    font-size: 1.1rem;
}
```

- [ ] **Step 4: Verify the app builds**

```bash
cd yayoi_exe && npm run build
```

Expected: `Compiled successfully.`

- [ ] **Step 5: Manual check**

```bash
cd yayoi_exe && npm start
```

Open `http://localhost:3000/projects`. Confirm: 3 project cards in a grid, each with a thumbnail, tech-stack pills in the soft-accent color, and a "View Link" row with an external-link icon.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Restyle Projects page and cards with new tokens and Material icon"
```

---

### Task 9: Full-site verification and dead-code sweep

**Files:**
- None expected (verification only). If the checks below turn up leftovers, delete/fix them in this task.

**Interfaces:**
- Consumes: everything from Tasks 1-8.

- [ ] **Step 1: Confirm no `@media` queries remain**

```bash
cd yayoi_exe && grep -rn "@media" src
```

Expected: no output. If any file still has a `@media` block, remove it (keep the PC/desktop-oriented rule as the unconditional style).

- [ ] **Step 2: Confirm no leftover references to deleted design tokens**

```bash
cd yayoi_exe && grep -rn "palette-\|color-surface\|color-text-on-light\|color-tab-active\|color-dot-grid\|shadow-" src
```

Expected: no output. Any hit means a CSS file was missed in Tasks 5-8 and still points at a token that no longer exists in `global.css`.

- [ ] **Step 3: Confirm no orphaned imports of deleted files**

```bash
cd yayoi_exe && grep -rln "CodeFrameWindow\|IntroCodeFrame\|IntroCodeContent\|ContactForm\|EducationCard\|TwoColumnLayout\|components/Footer" src
```

Expected: no output.

- [ ] **Step 4: Run the full test suite**

```bash
cd yayoi_exe && CI=true npm test
```

Expected: all tests pass (the `timelineData` suite from Task 7).

- [ ] **Step 5: Run the production build**

```bash
cd yayoi_exe && npm run build
```

Expected: `Compiled successfully.` with no warnings about missing modules.

- [ ] **Step 6: Full manual walkthrough**

```bash
cd yayoi_exe && npm start
```

Visit `/`, `/career`, `/projects` in order via the header tabs. Confirm across all three: background is `#FAFAF7`, headings use Space Grotesk Bold (Japanese text — none should appear in these three pages' UI copy — would use M PLUS 1), no dark/old-palette colors flash anywhere, no console errors, and navigating `/about` or `/contact` directly shows React Router's "no match" (there is no catch-all route, so confirm those paths no longer render a page).

- [ ] **Step 7: Commit any final fixes**

If Steps 1-3 surfaced anything to clean up:

```bash
git add -A
git commit -m "Final cleanup: remove remaining media queries/dead tokens/orphaned imports"
```

If nothing needed fixing, no commit is needed for this task.
