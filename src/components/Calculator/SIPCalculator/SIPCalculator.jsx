import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './SIPCalculator.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState('10000');
  const [rateOfInterest, setRateOfInterest] = useState('15');
  const [investmentPeriod, setInvestmentPeriod] = useState('25');
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (monthlyInvestment && rateOfInterest && investmentPeriod) {
      calculateSIP();
    }
  }, [monthlyInvestment, rateOfInterest, investmentPeriod]);

  const calculateSIP = () => {
    const P = parseFloat(monthlyInvestment);
    const r = parseFloat(rateOfInterest) / 100 / 12;
    const n = parseFloat(investmentPeriod) * 12;

    const FV = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalInvested = P * n;
    const estReturns = FV - totalInvested;

    const breakdown = [];
    let startingAmount = 0;
    const yearlyInvestment = P * 12;
    for (let i = 1; i <= investmentPeriod; i++) {
      const interestGenerated = (startingAmount + yearlyInvestment) * Math.pow(1 + r, 12) - (startingAmount + yearlyInvestment);
      const amount = startingAmount + yearlyInvestment + interestGenerated;

      breakdown.push({
        year: i,
        startingAmount: startingAmount.toFixed(2),
        investedAmount: yearlyInvestment.toFixed(2),
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
    <div className="sip-calculator">
      <h1>SIP Calculator</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>
            Monthly Investment:
            <input
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(e.target.value)}
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

export default SIPCalculator;
