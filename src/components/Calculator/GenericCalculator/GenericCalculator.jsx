import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './GenericCalculator.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const GenericCalculator = ({ title, description, calculate, labels, input1, setInput1, input2, setInput2, input3, setInput3, results, setResults }) => {

  useEffect(() => {
    if (input1 && input2 && input3) {
      const result = calculate(input1, input2, input3);
      setResults(result);
    }
  }, [input1, input2, input3, calculate]);

  const data = results ? {
    labels: ['Invested Amount', 'Estimated Returns'],
    datasets: [
      {
        data: [results.totalInvestment, results.estimatedReturns],
        backgroundColor: ['#4CAF50', '#FFCE56'],
        hoverBackgroundColor: ['#45a049', '#FFCE56']
      }
    ]
  } : null;

  return (
    <div className="generic-calculator">
      <h1>{title}</h1>
      <p>{description}</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>
            {labels.input1}:
            <input
              type="number"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            {labels.input2}:
            <input
              type="number"
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            {labels.input3}:
            <input
              type="number"
              value={input3}
              onChange={(e) => setInput3(e.target.value)}
              required
            />
          </label>
        </div>
      </form>
      {results && (
        <div className="result">
          <h2>Future Value: ₹{results.futureValue}</h2>
          <h3>Invested Amount: ₹{results.totalInvestment}</h3>
          <h3>Estimated Returns: ₹{results.estimatedReturns}</h3>
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

export default GenericCalculator;
