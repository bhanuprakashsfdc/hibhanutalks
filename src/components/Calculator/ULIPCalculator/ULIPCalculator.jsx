import React, { useState, useEffect } from 'react';
import './ULIPCalculator.css';

const ULIPCalculator = () => {
  const [investmentAmount, setInvestmentAmount] = useState('10000');
  const [paymentFrequency, setPaymentFrequency] = useState('Monthly');
  const [investmentPeriod, setInvestmentPeriod] = useState('20 Years');
  const [withdrawalPeriod, setWithdrawalPeriod] = useState('20 Years');
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (investmentAmount && investmentPeriod && withdrawalPeriod) {
      calculateULIP();
    }
  }, [investmentAmount, paymentFrequency, investmentPeriod, withdrawalPeriod]);

  const calculateULIP = () => {
    // Placeholder logic for ULIP calculation
    const paymentFrequencyMultiplier = paymentFrequency === 'Monthly' ? 12 : 1;
    const totalInvestment = (parseFloat(investmentAmount) * paymentFrequencyMultiplier) * parseInt(investmentPeriod);
    const maturityAmount = totalInvestment * 2; // Simplified formula for demonstration

    setResults({
      totalInvestment: totalInvestment.toFixed(2),
      maturityAmount: maturityAmount.toFixed(2),
      lifeCover: (totalInvestment * 0.5).toFixed(2), // Assuming 50% of total investment as life cover
      taxSavings: (totalInvestment * 0.15).toFixed(2) // Assuming 15% of total investment as tax savings
    });
  };

  return (
    <div className="ulip-calculator">
      <h1>ULIP Calculator</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>
            Investment Amount (Inc GST):
            <input
              type="number"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              required
            />
          </label>
          <select value={paymentFrequency} onChange={(e) => setPaymentFrequency(e.target.value)}>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
        <div className="form-group">
          <label>
            Pay For:
            <select value={investmentPeriod} onChange={(e) => setInvestmentPeriod(e.target.value)}>
              <option value="10 Years">10 Years</option>
              <option value="15 Years">15 Years</option>
              <option value="20 Years">20 Years</option>
              <option value="25 Years">25 Years</option>
              <option value="30 Years">30 Years</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Withdrawal After:
            <select value={withdrawalPeriod} onChange={(e) => setWithdrawalPeriod(e.target.value)}>
              <option value="10 Years">10 Years</option>
              <option value="15 Years">15 Years</option>
              <option value="20 Years">20 Years</option>
              <option value="25 Years">25 Years</option>
              <option value="30 Years">30 Years</option>
            </select>
          </label>
        </div>
      </form>
      {results && (
        <div className="result">
          <h2>You pay ₹{results.totalInvestment} till {withdrawalPeriod}</h2>
          <h2>You get ₹{results.maturityAmount} Maturity amount if you had invested {investmentPeriod} ago</h2>
          <div className="additional-info">
            <div>
              <h3>₹{results.lifeCover}</h3>
              <p>Life Cover Till {withdrawalPeriod}</p>
            </div>
            <div>
              <h3>26.41% <sup>p.a</sup></h3>
              <p>Nifty Alpha 50</p>
            </div>
            <div>
              <h3>₹{results.taxSavings}</h3>
              <p>Tax Savings</p>
            </div>
          </div>
          <button>Check Eligibility</button>
        </div>
      )}
    </div>
  );
};

export default ULIPCalculator;
