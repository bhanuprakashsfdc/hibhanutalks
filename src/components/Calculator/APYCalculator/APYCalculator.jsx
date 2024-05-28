import React, { useState, useEffect } from 'react';
import './APYCalculator.css';

const APYCalculator = () => {
  const [age, setAge] = useState('25');
  const [monthlyPension, setMonthlyPension] = useState('1000');
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (age && monthlyPension) {
      calculateAPY();
    }
  }, [age, monthlyPension]);

  const calculateAPY = () => {
    const ageInt = parseInt(age);
    const pension = parseInt(monthlyPension);

    // Dummy logic for illustration purposes
    let monthlyContribution;
    if (pension === 1000) {
      monthlyContribution = 42; // Example value
    } else if (pension === 2000) {
      monthlyContribution = 84; // Example value
    } else if (pension === 3000) {
      monthlyContribution = 126; // Example value
    } else if (pension === 4000) {
      monthlyContribution = 168; // Example value
    } else if (pension === 5000) {
      monthlyContribution = 210; // Example value
    } else {
      monthlyContribution = 0; // Default value if pension amount does not match
    }

    setResults({
      monthlyContribution: monthlyContribution.toFixed(2),
    });
  };

  return (
    <div className="apy-calculator">
      <h1>APY Calculator</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>
            Age:
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Monthly Pension (₹):
            <select
              value={monthlyPension}
              onChange={(e) => setMonthlyPension(e.target.value)}
              required
            >
              <option value="1000">1000</option>
              <option value="2000">2000</option>
              <option value="3000">3000</option>
              <option value="4000">4000</option>
              <option value="5000">5000</option>
            </select>
          </label>
        </div>
      </form>
      {results && (
        <div className="result">
          <h2>Monthly Contribution: ₹{results.monthlyContribution}</h2>
        </div>
      )}
    </div>
  );
};

export default APYCalculator;
