import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import './assets/styles/app.css';

function App() {
	return (
		<BrowserRouter>
			<div className='app-container'>
				<Header />
				<Routes>
					<Route path="/" element={<Main />} />
				</Routes>
				<Footer className="footer" />
			</div>
		</BrowserRouter >
	);
}

export default App;
