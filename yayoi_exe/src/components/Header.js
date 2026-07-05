import React from 'react';
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

    return (
        <header className="header">
            <div className="tab-title">Yayoi-exe</div>
            <div className="nav-tabs">
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
                            {tab.label}
                        </Link>
                    );
                })}
            </div>
        </header>
    );
};

export default Header;
