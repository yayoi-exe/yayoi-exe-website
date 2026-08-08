import React, { useCallback, useLayoutEffect, useRef, useState, forwardRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import Header from './components/Header';
import NodeMapBackground from './components/NodeMapBackground';
import Main from './pages/Main';
import Career from './pages/Career';
import Projects from './pages/Projects';
import { TAB_ORDER } from './routes';
import { PageTransitionProvider } from './context/PageTransitionContext';

const PAGE_TRANSITION = { duration: 0.7, ease: [0.32, 0.72, 0, 1] };

// 縦一枚帯: 上から Home → Career → Projects
// slide > 0 進む: 旧は上へ抜け、新は下から
// slide < 0 戻る: 旧は下へ流れ、新は上から
// 退場向きは AnimatePresence の custom で渡す（exit props はマウント時に固定されるため）
function getSlide(fromPath, toPath) {
    const from = TAB_ORDER.indexOf(fromPath);
    const to = TAB_ORDER.indexOf(toPath);
    if (from === -1 || to === -1) return 1;
    // 距離は常に 1 画面分。index 差（Home↔Projects=2）のままだと 200% 移動になり、
    // 途中で割り込まれると帯が噛み合わなく見える。
    return Math.sign(to - from) || 1;
}

const pageVariants = {
    enter: (slide) => ({ y: `${slide * 100}%` }),
    center: { y: 0 },
    exit: (slide) => ({ y: `${-slide * 100}%` }),
};

// ページインスタンスごとに isPageReady を持つ。
// AnimatePresence は直下の motion に ref が届く必要があるので forwardRef する。
const TransitionPage = forwardRef(function TransitionPage(
    { displayLocation, slide, transitionId, isInitialLoad, onEnterComplete },
    ref
) {
    const [isPageReady, setIsPageReady] = useState(isInitialLoad);

    return (
        <motion.div
            ref={ref}
            className="absolute inset-0 z-[1] flex flex-col overflow-x-hidden overflow-y-auto px-page-x py-page-y"
            custom={slide}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={PAGE_TRANSITION}
            onAnimationComplete={(definition) => {
                if (definition !== 'center') return;
                setIsPageReady(true);
                onEnterComplete(transitionId);
            }}
        >
            <PageTransitionProvider isPageReady={isPageReady}>
                <Routes location={displayLocation}>
                    <Route path="/" element={<Main />} />
                    <Route path="/career" element={<Career />} />
                    <Route path="/projects" element={<Projects />} />
                </Routes>
            </PageTransitionProvider>
        </motion.div>
    );
});

TransitionPage.propTypes = {
    displayLocation: PropTypes.object.isRequired,
    slide: PropTypes.number.isRequired,
    transitionId: PropTypes.number.isRequired,
    isInitialLoad: PropTypes.bool.isRequired,
    onEnterComplete: PropTypes.func.isRequired,
};

function AnimatedRoutes() {
    const location = useLocation();
    const prevPathRef = useRef(location.pathname);
    const isAnimatingRef = useRef(false);
    const pendingLocationRef = useRef(null);
    const transitionIdRef = useRef(0);
    const [{ displayLocation, slide, transitionId }, setRoute] = useState({
        displayLocation: location,
        slide: 1,
        transitionId: 0,
    });

    const commitRoute = useCallback((nextLocation) => {
        const prevPath = prevPathRef.current;
        if (nextLocation.pathname === prevPath) return;

        const nextId = transitionIdRef.current + 1;
        transitionIdRef.current = nextId;
        isAnimatingRef.current = true;
        prevPathRef.current = nextLocation.pathname;
        setRoute({
            displayLocation: nextLocation,
            slide: getSlide(prevPath, nextLocation.pathname),
            transitionId: nextId,
        });
    }, []);

    // 遷移アニメ完了後、連打で溜めた「最後の行き先」だけを反映する
    const flushPendingRoute = useCallback(() => {
        isAnimatingRef.current = false;
        const pending = pendingLocationRef.current;
        if (!pending) return;

        pendingLocationRef.current = null;
        if (pending.pathname === prevPathRef.current) return;
        commitRoute(pending);
    }, [commitRoute]);

    const handleEnterComplete = useCallback(
        (completedId) => {
            // 古いページの complete が遅れて来ても、現行 transition 以外は無視
            if (completedId !== transitionIdRef.current) return;
            flushPendingRoute();
        },
        [flushPendingRoute]
    );

    useLayoutEffect(() => {
        if (location.pathname === prevPathRef.current) return;

        // アニメ中の追加ナビは表示を切り替えず、最新の location だけ保持
        if (isAnimatingRef.current) {
            pendingLocationRef.current = location;
            return;
        }

        commitRoute(location);
    }, [location, commitRoute]);

    return (
        <AnimatePresence mode="sync" custom={slide} initial={false}>
            <TransitionPage
                key={displayLocation.pathname}
                displayLocation={displayLocation}
                slide={slide}
                transitionId={transitionId}
                isInitialLoad={transitionId === 0}
                onEnterComplete={handleEnterComplete}
            />
        </AnimatePresence>
    );
}

function App() {
    return (
        <BrowserRouter>
            <div className="relative flex h-dvh w-screen flex-col overflow-hidden bg-main">
                {/* ヘッダー下に canvas を置かない（毎フレーム clearRect されると帯がチカチカする） */}
                <div className="relative z-20 isolate shrink-0 bg-main">
                    <Header />
                </div>
                <div className="relative z-10 min-h-0 flex-1 overflow-hidden bg-main">
                    <NodeMapBackground />
                    <AnimatedRoutes />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
