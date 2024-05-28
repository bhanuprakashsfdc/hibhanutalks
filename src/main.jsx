import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import CalculatorDetail from './components/CalculatorDetail/CalculatorDetail';
import SIPCalculator from './components/Calculator/SIPCalculator/SIPCalculator';
import LumpsumCalculator from './components/Calculator/LumpsumCalculator/LumpsumCalculator';
import SWPCalculator from './components/Calculator/SWPCalculator/SWPCalculator';
import MFCalculator from './components/Calculator/MFCalculator/MFCalculator';
import SSYCalculator from './components/Calculator/SSYCalculator/SSYCalculator';
import PPFCalculator from './components/Calculator/PPFCalculator/PPFCalculator';
import EPFCalculator from './components/Calculator/EPFCalculator/EPFCalculator';
import FDCalculator from './components/Calculator/FDCalculator/FDCalculator';
import RDCalculator from './components/Calculator/RDCalculator/RDCalculator';
import NPSCalculator from './components/Calculator/NPSCalculator/NPSCalculator';
import HRACalculator from './components/Calculator/HRACalculator/HRACalculator';
import RetirementCalculator from './components/Calculator/RetirementCalculator/RetirementCalculator';

import './App.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/calculator" element={<App />} />
      <Route path="/calculator/:slug" element={<CalculatorDetail />} />
      <Route path="/calculator/sip-calculator" element={<SIPCalculator />} />
      <Route path="/calculator/lumpsum-calculator" element={<LumpsumCalculator />} />
      <Route path="/calculator/swp-calculator" element={<SWPCalculator />} />
      <Route path="/calculator/mf-calculator" element={<MFCalculator />} />
      <Route path="/calculator/ssy-calculator" element={<SSYCalculator />} />
      <Route path="/calculator/ppf-calculator" element={<PPFCalculator />} />
      <Route path="/calculator/epf-calculator" element={<EPFCalculator />} /> 
      <Route path="/calculator/fd-calculator" element={<FDCalculator />} />
      <Route path="/calculator/rd-calculator" element={<RDCalculator />} />
      <Route path="/calculator/nps-calculator" element={<NPSCalculator />} />
      <Route path="/calculator/hra-calculator" element={<HRACalculator />} />
      <Route path="/calculator/retirement-calculator" element={<RetirementCalculator />} />
    </Routes>
  </Router>
);