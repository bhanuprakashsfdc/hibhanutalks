import React, { useState, useEffect } from 'react';
import './InflationCalculator.css';

const InflationCalculator = () => {
  const [currentAmount, setCurrentAmount] = useState('10000');
  const [inflationRate, setInflationRate] = useState('5');
  const [years, setYears] = useState('10');
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (currentAmount && inflationRate && years) {
      calculateFutureValue();
    }
  }, [currentAmount, inflationRate, years]);

  const calculateFutureValue = () => {
    const amount = parseFloat(currentAmount);
    const rate = parseFloat(inflationRate) / 100;
    const numYears = parseInt(years, 10);

    const futureValue = amount * Math.pow(1 + rate, numYears);

    setResults({
      futureValue: futureValue.toFixed(2),
    });
  };

  return (
    <div className="inflation-calculator">
      <h1>Inflation Calculator</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>
            Current Amount (₹):
            <input
              type="number"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Annual Inflation Rate (%):
            <input
              type="number"
              value={inflationRate}
              onChange={(e) => setInflationRate(e.target.value)}
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
          <h2>Future Value: ₹{results.futureValue}</h2>
        </div>
      )}
    </div>
  );
};

export default InflationCalculator;
