import React, { useState, useEffect } from 'react';
import './TDSCalculator.css';

const TDSCalculator = () => {
  const [income, setIncome] = useState('500000');
  const [tdsRate, setTdsRate] = useState('10');
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (income && tdsRate) {
      calculateTDS();
    }
  }, [income, tdsRate]);

  const calculateTDS = () => {
    const incomeAmount = parseFloat(income);
    const rate = parseFloat(tdsRate);

    const tdsAmount = (incomeAmount * rate) / 100;

    setResults({
      tdsAmount: tdsAmount.toFixed(2),
    });
  };

  return (
    <div className="tds-calculator">
      <h1>TDS Calculator</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>
            Income (₹):
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            TDS Rate (%):
            <input
              type="number"
              value={tdsRate}
              onChange={(e) => setTdsRate(e.target.value)}
              required
            />
          </label>
        </div>
      </form>
      {results && (
        <div className="result">
          <h2>TDS Amount: ₹{results.tdsAmount}</h2>
        </div>
      )}
    </div>
  );
};

export default TDSCalculator;
