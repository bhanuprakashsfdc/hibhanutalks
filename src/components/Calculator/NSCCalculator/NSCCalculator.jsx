import React, { useState, useEffect } from 'react';
import './NSCCalculator.css';

const NSCCalculator = () => {
  const [principal, setPrincipal] = useState('10000');
  const [annualInterestRate, setAnnualInterestRate] = useState('6.8');
  const [years, setYears] = useState('5');
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (principal && annualInterestRate && years) {
      calculateNSC();
    }
  }, [principal, annualInterestRate, years]);

  const calculateNSC = () => {
    const P = parseFloat(principal);
    const r = parseFloat(annualInterestRate) / 100;
    const t = parseFloat(years);

    const maturityAmount = P * Math.pow(1 + r / 1, t);
    const interestEarned = maturityAmount - P;

    setResults({
      maturityAmount: maturityAmount.toFixed(2),
      interestEarned: interestEarned.toFixed(2)
    });
  };

  return (
    <div className="nsc-calculator">
      <h1>NSC Calculator</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>
            Principal Amount:
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
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
          <h2>Maturity Amount: ₹{results.maturityAmount}</h2>
          <h2>Interest Earned: ₹{results.interestEarned}</h2>
        </div>
      )}
    </div>
  );
};

export default NSCCalculator;
