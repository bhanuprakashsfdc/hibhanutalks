import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './RDCalculator.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const RDCalculator = () => {
  const [monthlyDeposit, setMonthlyDeposit] = useState('1000');
  const [rateOfInterest, setRateOfInterest] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (monthlyDeposit && rateOfInterest && timePeriod) {
      calculateRD();
    }
  }, [monthlyDeposit, rateOfInterest, timePeriod]);

  const calculateRD = () => {
    const P = parseFloat(monthlyDeposit);
    const r = parseFloat(rateOfInterest) / 100 / 12;
    const n = parseFloat(timePeriod) * 12;

    const FV = P * (Math.pow(1 + r, n) - 1) * (1 + r) / r;
    const totalInvested = P * n;
    const estReturns = FV - totalInvested;

    const breakdown = [];
    let startingAmount = 0;
    const monthlyInterestRate = r;
    for (let i = 1; i <= n; i++) {
      const interestGenerated = startingAmount * monthlyInterestRate;
      const amount = startingAmount + interestGenerated + P;
      if (i % 12 === 0 || i === n) {
        breakdown.push({
          year: Math.ceil(i / 12),
          startingAmount: startingAmount.toFixed(2),
          investedAmount: (P * 12).toFixed(2),
          interestGenerated: interestGenerated.toFixed(2),
          amount: amount.toFixed(2)
        });
      }
      startingAmount += P + interestGenerated;
    }

    setResults({
      futureValue: FV.toFixed(2),
      totalInvested: totalInvested.toFixed(2),
      estimatedReturns: estReturns.toFixed(2),
      yearlyBreakdown: breakdown
    });
  };

  const data = results ? {
    labels: ['Total Invested', 'Estimated Returns'],
    datasets: [
      {
        data: [results.totalInvested, results.estimatedReturns],
        backgroundColor: ['#4CAF50', '#FFCE56'],
        hoverBackgroundColor: ['#45a049', '#FFCE56']
      }
    ]
  } : null;

  return (
    <div className="rd-calculator">
      <h1>RD Calculator</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>
            Monthly Deposit:
            <input
              type="number"
              value={monthlyDeposit}
              onChange={(e) => setMonthlyDeposit(e.target.value)}
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
          <h2>Future Value: ₹{results.futureValue}</h2>
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
                <th>Invested Amount (₹)</th>
                <th>Interest Generated (₹)</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {results.yearlyBreakdown.map((year, index) => (
                <tr key={index}>
                  <td>{year.year}</td>
                  <td>{year.startingAmount}</td>
                  <td>{year.investedAmount}</td>
                  <td>{year.interestGenerated}</td>
                  <td>{year.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RDCalculator;
