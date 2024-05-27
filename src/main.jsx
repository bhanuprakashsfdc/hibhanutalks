import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import CalculatorDetail from './components/CalculatorDetail/CalculatorDetail';
import SIPCalculator from './components/Calculator/SIPCalculator/SIPCalculator';
import './App.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/calculator/:slug" element={<CalculatorDetail />} />
      <Route path="/calculator/sip-calculator" element={<SIPCalculator />} />
    </Routes>
  </Router>
);