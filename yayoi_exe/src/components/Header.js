import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/styles/header.css';

const tabs = [
    { path: '/', label: 'Home.html' },
    { path: '/career', label: 'Career.js' },
    { path: '/projects', label: 'Projects.js' },
];

const Header = () => {
    const location = useLocation();

    return (
        <header className="header">
            <div className="tab-title">Yayoi-exe</div>
            <nav className="nav-tabs" aria-label="Primary">
                {tabs.map((tab) => {
                    const isActive = tab.path === location.pathname;
                    return (
                        <Link
                            key={tab.path}
                            to={tab.path}
                            className={`header-tab ${isActive ? 'active' : ''}`}
                            draggable="false"
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {isActive ? `<${tab.label}>` : tab.label}
                        </Link>
                    );
                })}
            </nav>
        </header>
    );
};

export default Header;
