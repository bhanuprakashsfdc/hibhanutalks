import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './PPFCalculator.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const PPFCalculator = () => {
  const [annualInvestment, setAnnualInvestment] = useState('100000');
  const [rateOfInterest, setRateOfInterest] = useState('7.1');
  const [investmentPeriod, setInvestmentPeriod] = useState('60');
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (annualInvestment && rateOfInterest && investmentPeriod) {
      calculatePPF();
    }
  }, [annualInvestment, rateOfInterest, investmentPeriod]);

  const calculatePPF = () => {
    const P = parseFloat(annualInvestment);
    const r = parseFloat(rateOfInterest) / 100;
    const n = parseFloat(investmentPeriod);

    let FV = 0;
    let totalInvested = 0;
    const breakdown = [];
    for (let i = 1; i <= n; i++) {
      FV = (FV + P) * (1 + r);
      totalInvested += P;
      breakdown.push({
        year: i,
        investedAmount: totalInvested.toFixed(2),
        interestGenerated: (FV - totalInvested).toFixed(2),
        amount: FV.toFixed(2)
      });
    }

    setResults({
      futureValue: FV.toFixed(2),
      totalInvested: totalInvested.toFixed(2),
      estimatedReturns: (FV - totalInvested).toFixed(2),
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
    <div className="ppf-calculator">
      <h1>PPF Calculator</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>
            Annual Investment:
            <input
              type="number"
              value={annualInvestment}
              onChange={(e) => setAnnualInvestment(e.target.value)}
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
            Investment Period (Years):
            <input
              type="number"
              value={investmentPeriod}
              onChange={(e) => setInvestmentPeriod(e.target.value)}
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
                <th>Invested Amount (₹)</th>
                <th>Interest Generated (₹)</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {results.yearlyBreakdown.map((year, index) => (
                <tr key={index}>
                  <td>{year.year}</td>
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

export default PPFCalculator;
