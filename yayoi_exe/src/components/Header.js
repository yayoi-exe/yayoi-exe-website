import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_TABS } from '../routes';
import '../assets/styles/header.css';

const Header = () => {
    const location = useLocation();

    return (
        <header className="header">
            <div className="tab-title">Yayoi-exe</div>
            <nav className="nav-tabs" aria-label="Primary">
                {NAV_TABS.map((tab) => {
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
