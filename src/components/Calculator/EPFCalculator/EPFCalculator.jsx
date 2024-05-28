import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './EPFCalculator.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const EPFCalculator = () => {
  const [monthlySalary, setMonthlySalary] = useState('10000');
  const [employeeContributionRate, setEmployeeContributionRate] = useState('12');
  const [employerContributionRate, setEmployerContributionRate] = useState('3.67');
  const [rateOfInterest, setRateOfInterest] = useState('8.5');
  const [contributionPeriod, setContributionPeriod] = useState('20');
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (monthlySalary && employeeContributionRate && employerContributionRate && rateOfInterest && contributionPeriod) {
      calculateEPF();
    }
  }, [monthlySalary, employeeContributionRate, employerContributionRate, rateOfInterest, contributionPeriod]);

  const calculateEPF = () => {
    const salary = parseFloat(monthlySalary);
    const employeeRate = parseFloat(employeeContributionRate) / 100;
    const employerRate = parseFloat(employerContributionRate) / 100;
    const interestRate = parseFloat(rateOfInterest) / 100;
    const years = parseFloat(contributionPeriod);

    let totalEmployeeContribution = 0;
    let totalEmployerContribution = 0;
    let totalInterest = 0;
    let balance = 0;

    const breakdown = [];
    for (let i = 1; i <= years; i++) {
      const annualEmployeeContribution = salary * employeeRate * 12;
      const annualEmployerContribution = salary * employerRate * 12;
      const interestGenerated = (balance + annualEmployeeContribution + annualEmployerContribution) * interestRate;

      totalEmployeeContribution += annualEmployeeContribution;
      totalEmployerContribution += annualEmployerContribution;
      totalInterest += interestGenerated;

      balance += annualEmployeeContribution + annualEmployerContribution + interestGenerated;

      breakdown.push({
        year: i,
        employeeContribution: totalEmployeeContribution.toFixed(2),
        employerContribution: totalEmployerContribution.toFixed(2),
        interestGenerated: totalInterest.toFixed(2),
        amount: balance.toFixed(2)
      });
    }

    setResults({
      finalAmount: balance.toFixed(2),
      totalEmployeeContribution: totalEmployeeContribution.toFixed(2),
      totalEmployerContribution: totalEmployerContribution.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      yearlyBreakdown: breakdown
    });
  };

  const data = results ? {
    labels: ['Total Employee Contribution', 'Total Employer Contribution', 'Total Interest'],
    datasets: [
      {
        data: [results.totalEmployeeContribution, results.totalEmployerContribution, results.totalInterest],
        backgroundColor: ['#4CAF50', '#FFCE56', '#FF6384'],
        hoverBackgroundColor: ['#45a049', '#FFCE56', '#FF6384']
      }
    ]
  } : null;

  return (
    <div className="epf-calculator">
      <h1>EPF Calculator</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>
            Monthly Salary:
            <input
              type="number"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Employee Contribution Rate (%):
            <input
              type="number"
              value={employeeContributionRate}
              onChange={(e) => setEmployeeContributionRate(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Employer Contribution Rate (%):
            <input
              type="number"
              value={employerContributionRate}
              onChange={(e) => setEmployerContributionRate(e.target.value)}
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
                <th>Employee Contribution (₹)</th>
                <th>Employer Contribution (₹)</th>
                <th>Interest Generated (₹)</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {results.yearlyBreakdown.map((year, index) => (
                <tr key={index}>
                  <td>{year.year}</td>
                  <td>{year.employeeContribution}</td>
                  <td>{year.employerContribution}</td>
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

export default EPFCalculator;
