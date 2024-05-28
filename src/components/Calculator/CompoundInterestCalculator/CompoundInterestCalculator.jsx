import React, { useState, useEffect } from 'react';
import './CompoundInterestCalculator.css';

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState('100000');
  const [annualInterestRate, setAnnualInterestRate] = useState('8');
  const [timesCompounded, setTimesCompounded] = useState('4');
  const [years, setYears] = useState('5');
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (principal && annualInterestRate && timesCompounded && years) {
      calculateCompoundInterest();
    }
  }, [principal, annualInterestRate, timesCompounded, years]);

  const calculateCompoundInterest = () => {
    const P = parseFloat(principal);
    const r = parseFloat(annualInterestRate) / 100;
    const n = parseFloat(timesCompounded);
    const t = parseFloat(years);

    const amount = P * Math.pow(1 + r / n, n * t);
    const interest = amount - P;

    setResults({
      amount: amount.toFixed(2),
      interest: interest.toFixed(2)
    });
  };

  return (
    <div className="compound-interest-calculator">
      <h1>Compound Interest Calculator</h1>
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
            Times Compounded Per Year:
            <input
              type="number"
              value={timesCompounded}
              onChange={(e) => setTimesCompounded(e.target.value)}
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
          <h2>Future Value: ₹{results.amount}</h2>
          <h2>Interest Earned: ₹{results.interest}</h2>
        </div>
      )}
    </div>
  );
};

export default CompoundInterestCalculator;
