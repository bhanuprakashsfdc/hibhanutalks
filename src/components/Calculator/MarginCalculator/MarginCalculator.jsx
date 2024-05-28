import React, { useState, useEffect } from 'react';
import './MarginCalculator.css';

const MarginCalculator = () => {
  const [orderValue, setOrderValue] = useState('10000');
  const [marginPercentage, setMarginPercentage] = useState('20');
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (orderValue && marginPercentage) {
      calculateMargin();
    }
  }, [orderValue, marginPercentage]);

  const calculateMargin = () => {
    const order = parseFloat(orderValue);
    const margin = parseFloat(marginPercentage);

    const marginRequired = (order * margin) / 100;

    setResults({
      marginRequired: marginRequired.toFixed(2),
    });
  };

  return (
    <div className="margin-calculator">
      <h1>Margin Calculator</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>
            Order Value (₹):
            <input
              type="number"
              value={orderValue}
              onChange={(e) => setOrderValue(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Margin Percentage (%):
            <input
              type="number"
              value={marginPercentage}
              onChange={(e) => setMarginPercentage(e.target.value)}
              required
            />
          </label>
        </div>
      </form>
      {results && (
        <div className="result">
          <h2>Margin Required: ₹{results.marginRequired}</h2>
        </div>
      )}
    </div>
  );
};

export default MarginCalculator;
