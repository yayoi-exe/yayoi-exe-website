import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/styles/header.css';

const tabs = [
    { path: '/', label: 'Home.html' },
    { path: '/about', label: 'About.css' },
    { path: '/projects', label: 'Projects.js' },
    // { path: '/skills', label: 'Skills.js' },
    { path: '/contact', label: 'Contact.js' }
];

const Header = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('');

    useEffect(() => {
        const matchedTab = tabs.find(tab => tab.path === location.pathname);
        if (matchedTab) {
            setActiveTab(matchedTab.path);
        } else {
            setActiveTab('');
        }
    }, [location]);

    return (
        <header className="header-tabs">
            <div className="tab-title">Yayoi-exe</div>
            <div className="nav-tabs">
                {tabs.map((tab) => (
                    <Link
                        key={tab.path}
                        to={tab.path}
                        className={`tab ${activeTab === tab.path ? 'active' : ''}`}
                        draggable="false"
                        aria-current={activeTab === tab.path ? 'page' : undefined}
                    >
                        {tab.label}
                    </Link>
                ))}
            </div>
        </header>
    );
};

export default Header;
