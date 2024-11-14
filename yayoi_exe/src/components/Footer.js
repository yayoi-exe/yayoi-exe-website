import React from 'react';
import '../assets/styles/footer.css'

const Footer = () => {
    return (
        <footer className="footer krona-one-regular">
            <p>&copy; {new Date().getFullYear()} Yayoi-exe. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
