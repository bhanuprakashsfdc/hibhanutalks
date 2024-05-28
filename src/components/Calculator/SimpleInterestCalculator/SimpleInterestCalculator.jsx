import React, { useState, useEffect } from 'react';
import './SimpleInterestCalculator.css';

const SimpleInterestCalculator = () => {
  const [principal, setPrincipal] = useState('10000');
  const [rateOfInterest, setRateOfInterest] = useState('5');
  const [timePeriod, setTimePeriod] = useState('1');
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (principal && rateOfInterest && timePeriod) {
      calculateSimpleInterest();
    }
  }, [principal, rateOfInterest, timePeriod]);

  const calculateSimpleInterest = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rateOfInterest) / 100;
    const t = parseFloat(timePeriod);

    const interest = P * r * t;
    const totalAmount = P + interest;

    setResults({
      interest: interest.toFixed(2),
      totalAmount: totalAmount.toFixed(2)
    });
  };

  return (
    <div className="simple-interest-calculator">
      <h1>Simple Interest Calculator</h1>
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
            Rate of Interest (% per annum):
            <input
              type="number"
              value={rateOfInterest}
              onChange={(e) => setRateOfInterest(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Time Period (years):
            <input
              type="number"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              required
            />
          </label>
        </div>
      </form>
      {results && (
        <div className="result">
          <h2>Interest: ₹{results.interest}</h2>
          <h2>Total Amount: ₹{results.totalAmount}</h2>
        </div>
      )}
    </div>
  );
};

export default SimpleInterestCalculator;
