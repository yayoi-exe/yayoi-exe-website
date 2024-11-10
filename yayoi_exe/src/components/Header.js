import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/header.css'

const Header = () => {
    return (
        <header className="header">
            <h1 className="title">Yayoi-exe</h1>
            <nav>
                <ul className="nav-list">
                    <li className="nav-item"><Link to="/" className="link-item">Home</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
