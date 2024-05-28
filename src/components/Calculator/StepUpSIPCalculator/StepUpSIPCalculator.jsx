import React, { useState, useEffect } from 'react';
import './StepUpSIPCalculator.css';

const StepUpSIPCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState('1000');
  const [annualIncrease, setAnnualIncrease] = useState('10');
  const [annualInterestRate, setAnnualInterestRate] = useState('12');
  const [years, setYears] = useState('10');
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (initialInvestment && annualIncrease && annualInterestRate && years) {
      calculateStepUpSIP();
    }
  }, [initialInvestment, annualIncrease, annualInterestRate, years]);

  const calculateStepUpSIP = () => {
    const P = parseFloat(initialInvestment);
    const increase = parseFloat(annualIncrease) / 100;
    const r = parseFloat(annualInterestRate) / 100 / 12;
    const t = parseFloat(years);

    let totalInvestment = 0;
    let maturityAmount = 0;

    for (let i = 0; i < t; i++) {
      const currentInvestment = P * Math.pow(1 + increase, i);
      totalInvestment += currentInvestment * 12;
      maturityAmount += currentInvestment * ((Math.pow(1 + r, 12 * (t - i)) - 1) / r) * (1 + r);
    }

    setResults({
      totalInvestment: totalInvestment.toFixed(2),
      maturityAmount: maturityAmount.toFixed(2),
      interestEarned: (maturityAmount - totalInvestment).toFixed(2)
    });
  };

  return (
    <div className="step-up-sip-calculator">
      <h1>Step-Up SIP Calculator</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>
            Initial Monthly Investment:
            <input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Annual Increase in Investment (%):
            <input
              type="number"
              value={annualIncrease}
              onChange={(e) => setAnnualIncrease(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Annual Interest Rate (%):
            <input
              type="number"
              value={annualInterestRate}
              onChange={(e) => setAnnualInterestRate(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Number of Years:
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              required
            />
          </label>
        </div>
      </form>
      {results && (
        <div className="result">
          <h2>Total Investment: ₹{results.totalInvestment}</h2>
          <h2>Maturity Amount: ₹{results.maturityAmount}</h2>
          <h2>Interest Earned: ₹{results.interestEarned}</h2>
        </div>
      )}
    </div>
  );
};

export default StepUpSIPCalculator;
