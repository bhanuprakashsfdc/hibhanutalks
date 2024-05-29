import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Layout from './components/Layout/Layout';
import CalculatorDetail from './components/Calculator/CalculatorDetail/CalculatorDetail';
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
import EMICalculator from './components/Calculator/EMICalculator/EMICalculator';
import CarLoanEMICalculator from './components/Calculator/CarLoanEMICalculator/CarLoanEMICalculator';
import HomeLoanEMICalculator from './components/Calculator/HomeLoanEMICalculator/HomeLoanEMICalculator';
import SimpleInterestCalculator from './components/Calculator/SimpleInterestCalculator/SimpleInterestCalculator';
import CompoundInterestCalculator from './components/Calculator/CompoundInterestCalculator/CompoundInterestCalculator';
import NSCCalculator from './components/Calculator/NSCCalculator/NSCCalculator';
import StepUpSIPCalculator from './components/Calculator/StepUpSIPCalculator/StepUpSIPCalculator';
import IncomeTaxCalculator from './components/Calculator/IncomeTaxCalculator/IncomeTaxCalculator';
import GratuityCalculator from './components/Calculator/GratuityCalculator/GratuityCalculator';
import APYCalculator from './components/Calculator/APYCalculator/APYCalculator';
import CAGRCalculator from './components/Calculator/CAGRCalculator/CAGRCalculator';
import GSTCalculator from './components/Calculator/GSTCalculator/GSTCalculator';
import BrokerageCalculator from './components/Calculator/BrokerageCalculator/BrokerageCalculator';
import MarginCalculator from './components/Calculator/MarginCalculator/MarginCalculator';
import TDSCalculator from './components/Calculator/TDSCalculator/TDSCalculator';
import SalaryCalculator from './components/Calculator/SalaryCalculator/SalaryCalculator';
import InflationCalculator from './components/Calculator/InflationCalculator/InflationCalculator';
import ULIPCalculator from './components/Calculator/ULIPCalculator/ULIPCalculator';
import './App.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Router>
    <Layout>
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
      <Route path="/calculator/emi-calculator" element={<EMICalculator />} />
      <Route path="/calculator/car-loan-emi-calculator" element={<CarLoanEMICalculator />} />
      <Route path="/calculator/home-loan-emi-calculator" element={<HomeLoanEMICalculator />} />
      <Route path="/calculator/simple-interest-calculator" element={<SimpleInterestCalculator />} />
      <Route path="/calculator/compound-interest-calculator" element={<CompoundInterestCalculator />} />
      <Route path="/calculator/nsc-calculator" element={<NSCCalculator />} />
      <Route path="/calculator/step-up-sip-calculator" element={<StepUpSIPCalculator />} />
      <Route path="/calculator/income-tax-calculator" element={<IncomeTaxCalculator />} />
      <Route path="/calculator/gratuity-calculator" element={<GratuityCalculator />} />
      <Route path="/calculator/apy-calculator" element={<APYCalculator />} />
      <Route path="/calculator/cagr-calculator" element={<CAGRCalculator />} /> 
      <Route path="/calculator/gst-calculator" element={<GSTCalculator />} />
      <Route path="/calculator/brokerage-calculator" element={<BrokerageCalculator />} /> 
      <Route path="/calculator/margin-calculator" element={<MarginCalculator />} />
      <Route path="/calculator/tds-calculator" element={<TDSCalculator />} />
      <Route path="/calculator/salary-calculator" element={<SalaryCalculator />} />
      <Route path="/calculator/inflation-calculator" element={<InflationCalculator />} />
      <Route path="/calculator/ulip-calculator" element={<ULIPCalculator />} />

    </Routes>
    </Layout>
  </Router>
);