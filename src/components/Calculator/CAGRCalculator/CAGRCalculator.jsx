import React, { useState, useEffect } from 'react';
import './CAGRCalculator.css';

const CAGRCalculator = () => {
  const [initialValue, setInitialValue] = useState('10000');
  const [finalValue, setFinalValue] = useState('20000');
  const [years, setYears] = useState('5');
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (initialValue && finalValue && years) {
      calculateCAGR();
    }
  }, [initialValue, finalValue, years]);

  const calculateCAGR = () => {
    const initial = parseFloat(initialValue);
    const final = parseFloat(finalValue);
    const n = parseFloat(years);

    const cagr = ((Math.pow(final / initial, 1 / n) - 1) * 100).toFixed(2);

    setResults({
      cagr: cagr,
    });
  };

  return (
    <div className="cagr-calculator">
      <h1>CAGR Calculator</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>
            Initial Value:
            <input
              type="number"
              value={initialValue}
              onChange={(e) => setInitialValue(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Final Value:
            <input
              type="number"
              value={finalValue}
              onChange={(e) => setFinalValue(e.target.value)}
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
          <h2>CAGR: {results.cagr}%</h2>
        </div>
      )}
    </div>
  );
};

export default CAGRCalculator;
