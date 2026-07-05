import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/Main';
import About from './pages/About';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import Career from './pages/Career';
import './app.css';

function App() {
    return (
        <BrowserRouter>
            <div className="app-container">
                <Header className="header" />
                <div className="main">
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/career" element={<Career />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/projects" element={<Projects />} />
                    </Routes>
                </div>
                <Footer className="footer" />
            </div>
        </BrowserRouter>
    );
}

export default App;
