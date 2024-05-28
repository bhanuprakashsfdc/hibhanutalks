import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './SWPCalculator.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const SWPCalculator = () => {
    const [initialInvestment, setInitialInvestment] = useState('5000000');
    const [monthlyWithdrawal, setMonthlyWithdrawal] = useState('50000');
    const [rateOfInterest, setRateOfInterest] = useState('15');
    const [timePeriod, setTimePeriod] = useState('10');
    const [results, setResults] = useState(null);
  
    useEffect(() => {
      if (initialInvestment && monthlyWithdrawal && rateOfInterest && timePeriod) {
        calculateSWP();
      }
    }, [initialInvestment, monthlyWithdrawal, rateOfInterest, timePeriod]);
  
    const calculateSWP = () => {
      const P = parseFloat(initialInvestment);
      const W = parseFloat(monthlyWithdrawal);
      const r = parseFloat(rateOfInterest) / 100 / 12;
      const t = parseFloat(timePeriod) * 12; // Total months
  
      let amount = P;
      const breakdown = [];
      let totalInterestGenerated = 0;
      let totalWithdrawn = 0;
  
      for (let i = 1; i <= t; i++) {
        const interestGenerated = amount * r;
        totalInterestGenerated += interestGenerated;
        amount = amount + interestGenerated - W;
        totalWithdrawn += W;
        if (i % 12 === 0 || i === t) {
          breakdown.push({
            year: Math.ceil(i / 12),
            startingAmount: (amount + W - interestGenerated).toFixed(2),
            interestGenerated: (interestGenerated * 12).toFixed(2), // Aggregate interest for the year
            withdrawnAmount: (W * 12).toFixed(2), // Aggregate withdrawals for the year
            endingAmount: amount.toFixed(2)
          });
        }
      }
  
      setResults({
        finalAmount: amount.toFixed(2),
        totalInvested: initialInvestment,
        totalInterestGenerated: totalInterestGenerated.toFixed(2),
        totalWithdrawn: totalWithdrawn.toFixed(2),
        yearlyBreakdown: breakdown
      });
    };
  
    const data = results ? {
      labels: ['Final Amount', 'Total Interest Generated', 'Total Withdrawn'],
      datasets: [
        {
          data: [results.finalAmount, results.totalInterestGenerated, results.totalWithdrawn],
          backgroundColor: ['#4CAF50', '#FFCE56', '#FF6384'],
          hoverBackgroundColor: ['#45a049', '#FFCE56', '#FF6384']
        }
      ]
    } : null;

  return (
    <div className="swp-calculator">
      <h1>SWP Calculator</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>
            Initial Investment:
            <input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Monthly Withdrawal:
            <input
              type="number"
              value={monthlyWithdrawal}
              onChange={(e) => setMonthlyWithdrawal(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Rate of Interest (Annual):
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
            Time Period (Years):
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
          <h2>Final Amount: ₹{results.finalAmount}</h2>
          <Doughnut data={data} />
        </div>
      )}
      {results && results.yearlyBreakdown && (
        <div className="breakdown">
          <h2>Yearly Breakdown</h2>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Starting Amount (₹)</th>
                <th>Interest Generated (₹)</th>
                <th>Withdrawn Amount (₹)</th>
                <th>Ending Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {results.yearlyBreakdown.map((year, index) => (
                <tr key={index}>
                  <td>{year.year}</td>
                  <td>{year.startingAmount}</td>
                  <td>{year.interestGenerated}</td>
                  <td>{year.withdrawnAmount}</td>
                  <td>{year.endingAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SWPCalculator;
