import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './NPSCalculator.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const NPSCalculator = () => {
  const [monthlyContribution, setMonthlyContribution] = useState('1000');
  const [rateOfInterest, setRateOfInterest] = useState('9');
  const [contributionPeriod, setContributionPeriod] = useState('60');
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (monthlyContribution && rateOfInterest && contributionPeriod) {
      calculateNPS();
    }
  }, [monthlyContribution, rateOfInterest, contributionPeriod]);

  const calculateNPS = () => {
    const P = parseFloat(monthlyContribution);
    const r = parseFloat(rateOfInterest) / 100 / 12;
    const n = parseFloat(contributionPeriod) * 12;

    const FV = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalInvested = P * n;
    const estReturns = FV - totalInvested;

    const breakdown = [];
    let startingAmount = 0;
    const yearlyContribution = P * 12;
    for (let i = 1; i <= contributionPeriod; i++) {
      const interestGenerated = (startingAmount + yearlyContribution) * Math.pow(1 + r, 12) - (startingAmount + yearlyContribution);
      const amount = startingAmount + yearlyContribution + interestGenerated;

      breakdown.push({
        year: i,
        startingAmount: startingAmount.toFixed(2),
        investedAmount: yearlyContribution.toFixed(2),
        interestGenerated: interestGenerated.toFixed(2),
        amount: amount.toFixed(2)
      });

      startingAmount = amount;
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
    <div className="nps-calculator">
      <h1>NPS Calculator</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>
            Monthly Contribution:
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
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
            Contribution Period (Years):
            <input
              type="number"
              value={contributionPeriod}
              onChange={(e) => setContributionPeriod(e.target.value)}
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

export default NPSCalculator;
