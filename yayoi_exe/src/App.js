import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Main from "./pages/Main";
import About from "./pages/About";
import './app.css';
import Contact from './pages/Contact';
import Projects from './pages/Projects';

function App() {
    return (
        <BrowserRouter>
            <div className="app-container">
                <Header />
                <div>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/projects" element={<Projects />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </BrowserRouter >
    );
}

export default App;
