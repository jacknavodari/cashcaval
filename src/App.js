import React, { useState } from 'react';
import './i18n/i18n.js';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar.js';
import Dashboard from './components/Dashboard.js';
import Expenses from './components/Expenses.js';
import Revenue from './components/Revenue.js';

function App() {
    const [currency, setCurrency] = useState('EUR'); // Default currency

    return (
        <Router>
            <Navbar setCurrency={setCurrency} currentCurrency={currency} />
            <div className="container mt-4 fade-in">
                <Routes>
                    <Route path="/" element={<Dashboard currency={currency} />} />
                    <Route path="/expenses" element={<Expenses currency={currency} />} />
                    <Route path="/revenue" element={<Revenue currency={currency} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;