import React, { useState, useEffect } from 'react';
import './GSTCalculator.css';

const GSTCalculator = () => {
  const [originalAmount, setOriginalAmount] = useState('1000');
  const [gstRate, setGstRate] = useState('18');
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (originalAmount && gstRate) {
      calculateGST();
    }
  }, [originalAmount, gstRate]);

  const calculateGST = () => {
    const amount = parseFloat(originalAmount);
    const rate = parseFloat(gstRate);

    const gstAmount = (amount * rate) / 100;
    const totalAmount = amount + gstAmount;

    setResults({
      gstAmount: gstAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
    });
  };

  return (
    <div className="gst-calculator">
      <h1>GST Calculator</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>
            Original Amount (₹):
            <input
              type="number"
              value={originalAmount}
              onChange={(e) => setOriginalAmount(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            GST Rate (%):
            <input
              type="number"
              value={gstRate}
              onChange={(e) => setGstRate(e.target.value)}
              required
            />
          </label>
        </div>
      </form>
      {results && (
        <div className="result">
          <h2>GST Amount: ₹{results.gstAmount}</h2>
          <h2>Total Amount: ₹{results.totalAmount}</h2>
        </div>
      )}
    </div>
  );
};

export default GSTCalculator;
