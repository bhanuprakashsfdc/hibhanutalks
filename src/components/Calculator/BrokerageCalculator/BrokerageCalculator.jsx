import React, { useState, useEffect } from 'react';
import './BrokerageCalculator.css';

const BrokerageCalculator = () => {
  const [tradingAmount, setTradingAmount] = useState('10000');
  const [brokerageRate, setBrokerageRate] = useState('0.5');
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (tradingAmount && brokerageRate) {
      calculateBrokerage();
    }
  }, [tradingAmount, brokerageRate]);

  const calculateBrokerage = () => {
    const amount = parseFloat(tradingAmount);
    const rate = parseFloat(brokerageRate);

    const brokerage = (amount * rate) / 100;
    const totalAmount = amount + brokerage;

    setResults({
      brokerage: brokerage.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
    });
  };

  return (
    <div className="brokerage-calculator">
      <h1>Brokerage Calculator</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>
            Trading Amount (₹):
            <input
              type="number"
              value={tradingAmount}
              onChange={(e) => setTradingAmount(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Brokerage Rate (%):
            <input
              type="number"
              value={brokerageRate}
              onChange={(e) => setBrokerageRate(e.target.value)}
              required
            />
          </label>
        </div>
      </form>
      {results && (
        <div className="result">
          <h2>Brokerage Fee: ₹{results.brokerage}</h2>
          <h2>Total Amount: ₹{results.totalAmount}</h2>
        </div>
      )}
    </div>
  );
};

export default BrokerageCalculator;
