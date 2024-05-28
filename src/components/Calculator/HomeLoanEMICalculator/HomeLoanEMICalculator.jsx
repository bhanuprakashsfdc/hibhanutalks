import React, { useState, useEffect } from 'react';
import './HomeLoanEMICalculator.css';

const HomeLoanEMICalculator = () => {
  const [principal, setPrincipal] = useState('2000000');
  const [annualInterestRate, setAnnualInterestRate] = useState('8.5');
  const [loanTenure, setLoanTenure] = useState('20');
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (principal && annualInterestRate && loanTenure) {
      calculateEMI();
    }
  }, [principal, annualInterestRate, loanTenure]);

  const calculateEMI = () => {
    const P = parseFloat(principal);
    const r = parseFloat(annualInterestRate) / 100 / 12;
    const n = parseFloat(loanTenure) * 12;

    const EMI = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmountPayable = EMI * n;
    const totalInterestPayable = totalAmountPayable - P;

    const breakdown = [];
    let remainingPrincipal = P;
    for (let i = 1; i <= n; i++) {
      const interestComponent = remainingPrincipal * r;
      const principalComponent = EMI - interestComponent;
      remainingPrincipal -= principalComponent;

      if (i % 12 === 0 || i === n) {
        breakdown.push({
          year: Math.ceil(i / 12),
          interestPaid: (interestComponent * 12).toFixed(2),
          principalPaid: (principalComponent * 12).toFixed(2),
          balance: remainingPrincipal.toFixed(2)
        });
      }
    }

    setResults({
      EMI: EMI.toFixed(2),
      totalAmountPayable: totalAmountPayable.toFixed(2),
      totalInterestPayable: totalInterestPayable.toFixed(2),
      yearlyBreakdown: breakdown
    });
  };

  return (
    <div className="home-loan-emi-calculator">
      <h1>Home Loan EMI Calculator</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>
            Principal Loan Amount:
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
            Loan Tenure (Years):
            <input
              type="number"
              value={loanTenure}
              onChange={(e) => setLoanTenure(e.target.value)}
              required
            />
          </label>
        </div>
      </form>
      {results && (
        <div className="result">
          <h2>EMI: ₹{results.EMI}</h2>
          <h2>Total Amount Payable: ₹{results.totalAmountPayable}</h2>
          <h2>Total Interest Payable: ₹{results.totalInterestPayable}</h2>
        </div>
      )}
      {results && results.yearlyBreakdown && (
        <div className="breakdown">
          <h2>Yearly Breakdown</h2>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Interest Paid (₹)</th>
                <th>Principal Paid (₹)</th>
                <th>Remaining Balance (₹)</th>
              </tr>
            </thead>
            <tbody>
              {results.yearlyBreakdown.map((year, index) => (
                <tr key={index}>
                  <td>{year.year}</td>
                  <td>{year.interestPaid}</td>
                  <td>{year.principalPaid}</td>
                  <td>{year.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HomeLoanEMICalculator;
