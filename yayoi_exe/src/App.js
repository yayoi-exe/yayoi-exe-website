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
