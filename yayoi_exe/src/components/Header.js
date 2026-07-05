import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/styles/header.css';

const tabs = [
    { path: '/', label: 'Home.html' },
    { path: '/about', label: 'About.css' },
    { path: '/career', label: 'Career.js' },
    { path: '/projects', label: 'Projects.cs' },
    // { path: '/skills', label: 'Skills.js' },
    { path: '/contact', label: 'Contact.py' },
];

const Header = () => {
    const location = useLocation();
    const tabRefs = useRef({});
    const [slider, setSlider] = useState({ left: 0, width: 0, ready: false });
    const [animate, setAnimate] = useState(false);

    const measure = () => {
        const el = tabRefs.current[location.pathname];
        if (el) {
            setSlider({ left: el.offsetLeft, width: el.offsetWidth, ready: true });
        } else {
            setSlider((prev) => ({ ...prev, ready: false }));
        }
    };

    // アクティブタブの位置・幅を計測してスライダーを合わせる
    useLayoutEffect(() => {
        measure();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    // 初回描画後にトランジションを有効化（初回の意図しないスライドを防ぐ）
    useEffect(() => {
        const id = requestAnimationFrame(() => setAnimate(true));
        return () => cancelAnimationFrame(id);
    }, []);

    // 画面リサイズ・フォント読み込み完了で再計測
    useEffect(() => {
        window.addEventListener('resize', measure);
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(measure);
        }
        return () => window.removeEventListener('resize', measure);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    return (
        <header className="header">
            <div className="tab-title">Yayoi-exe</div>
            <div className="nav-tabs">
                <span
                    className={`nav-tab-slider ${animate ? 'is-animated' : ''} ${slider.ready ? 'is-visible' : ''}`}
                    style={{
                        transform: `translateX(${slider.left}px)`,
                        width: `${slider.width}px`,
                    }}
                    aria-hidden="true"
                />
                {tabs.map((tab) => {
                    const isActive = tab.path === location.pathname;
                    return (
                        <Link
                            key={tab.path}
                            to={tab.path}
                            ref={(el) => {
                                tabRefs.current[tab.path] = el;
                            }}
                            className={`header-tab ${isActive ? 'active' : ''}`}
                            draggable="false"
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {tab.label}
                        </Link>
                    );
                })}
            </div>
        </header>
    );
};

export default Header;
