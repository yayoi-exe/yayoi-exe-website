import React, { useLayoutEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import NodeMapBackground from './components/NodeMapBackground';
import Main from './pages/Main';
import Career from './pages/Career';
import Projects from './pages/Projects';
import { TAB_ORDER } from './routes';
import './app.css';

// 縦一枚帯: 上から Home → Career → Projects
// slide > 0 進む: 旧は上へ抜け、新は下から
// slide < 0 戻る: 旧は下へ流れ、新は上から
// 退場向きは AnimatePresence の custom で渡す（exit props はマウント時に固定されるため）
function getSlide(fromPath, toPath) {
    const from = TAB_ORDER.indexOf(fromPath);
    const to = TAB_ORDER.indexOf(toPath);
    if (from === -1 || to === -1) return 1;
    return to - from;
}

const pageVariants = {
    enter: (slide) => ({ y: `${slide * 100}%` }),
    center: { y: 0 },
    exit: (slide) => ({ y: `${-slide * 100}%` }),
};

function AnimatedRoutes() {
    const location = useLocation();
    const prevPathRef = useRef(location.pathname);
    const [{ displayLocation, slide }, setRoute] = useState({
        displayLocation: location,
        slide: 1,
    });

    useLayoutEffect(() => {
        const prevPath = prevPathRef.current;
        if (location.pathname === prevPath) return;

        prevPathRef.current = location.pathname;
        setRoute({
            displayLocation: location,
            slide: getSlide(prevPath, location.pathname),
        });
    }, [location]);

    return (
        <div className="main">
            <AnimatePresence mode="sync" custom={slide} initial={false}>
                <motion.div
                    key={displayLocation.key}
                    className="page-transition"
                    custom={slide}
                    variants={pageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                >
                    <Routes location={displayLocation}>
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
                <NodeMapBackground />
                <Header />
                <AnimatedRoutes />
            </div>
        </BrowserRouter>
    );
}

export default App;
