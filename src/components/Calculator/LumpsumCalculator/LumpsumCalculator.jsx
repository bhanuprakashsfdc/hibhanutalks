import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './LumpsumCalculator.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const LumpsumCalculator = () => {
  const [principal, setPrincipal] = useState('1000');
  const [rateOfInterest, setRateOfInterest] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (principal && rateOfInterest && timePeriod) {
      calculateLumpsum();
    }
  }, [principal, rateOfInterest, timePeriod]);

  const calculateLumpsum = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rateOfInterest) / 100;
    const t = parseFloat(timePeriod);

    const FV = P * Math.pow(1 + r, t);
    const totalInvested = P;
    const estReturns = FV - totalInvested;

    const breakdown = [];
    let startingAmount = P;
    for (let i = 1; i <= t; i++) {
      const interestGenerated = startingAmount * r;
      const amount = startingAmount + interestGenerated;

      breakdown.push({
        year: i,
        startingAmount: startingAmount.toFixed(2),
        investedAmount: (i === 1 ? P : 0).toFixed(2),
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
    <div className="lumpsum-calculator">
      <h1>Lumpsum Calculator</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>
            Principal Amount:
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

export default LumpsumCalculator;
