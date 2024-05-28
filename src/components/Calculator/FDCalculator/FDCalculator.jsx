import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './FDCalculator.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const FDCalculator = () => {
  const [principal, setPrincipal] = useState('1000000');
  const [rateOfInterest, setRateOfInterest] = useState('6');
  const [timePeriod, setTimePeriod] = useState('5');
  const [compoundingFrequency, setCompoundingFrequency] = useState('4');
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (principal && rateOfInterest && timePeriod && compoundingFrequency) {
      calculateFD();
    }
  }, [principal, rateOfInterest, timePeriod, compoundingFrequency]);

  const calculateFD = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rateOfInterest) / 100;
    const t = parseFloat(timePeriod);
    const n = parseFloat(compoundingFrequency);

    const FV = P * Math.pow(1 + r / n, n * t);
    const totalInterest = FV - P;

    const breakdown = [];
    let amount = P;
    for (let i = 1; i <= t; i++) {
      const interestGenerated = amount * Math.pow(1 + r / n, n) - amount;
      amount += interestGenerated;
      breakdown.push({
        year: i,
        principal: P.toFixed(2),
        interestGenerated: interestGenerated.toFixed(2),
        amount: amount.toFixed(2)
      });
    }

    setResults({
      futureValue: FV.toFixed(2),
      totalPrincipal: P.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      yearlyBreakdown: breakdown
    });
  };

  const data = results ? {
    labels: ['Principal Amount', 'Total Interest'],
    datasets: [
      {
        data: [results.totalPrincipal, results.totalInterest],
        backgroundColor: ['#4CAF50', '#FFCE56'],
        hoverBackgroundColor: ['#45a049', '#FFCE56']
      }
    ]
  } : null;

  return (
    <div className="fd-calculator">
      <h1>FD Calculator</h1>
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
        <div className="form-group">
          <label>
            Compounding Frequency (Quarterly=4, Monthly=12):
            <input
              type="number"
              value={compoundingFrequency}
              onChange={(e) => setCompoundingFrequency(e.target.value)}
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
                <th>Principal (₹)</th>
                <th>Interest Generated (₹)</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {results.yearlyBreakdown.map((year, index) => (
                <tr key={index}>
                  <td>{year.year}</td>
                  <td>{year.principal}</td>
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

export default FDCalculator;
