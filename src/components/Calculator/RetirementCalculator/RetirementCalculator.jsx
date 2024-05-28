import React, { useState, useEffect } from 'react';
import './RetirementCalculator.css';

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState('25');
  const [retirementAge, setRetirementAge] = useState('45');
  const [monthlyExpenses, setMonthlyExpenses] = useState('100000');
  const [inflationRate, setInflationRate] = useState('8');
  const [returnRate, setReturnRate] = useState('15');
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (currentAge && retirementAge && monthlyExpenses && inflationRate && returnRate) {
      calculateRetirement();
    }
  }, [currentAge, retirementAge, monthlyExpenses, inflationRate, returnRate]);

  const calculateRetirement = () => {
    const currentAgeInt = parseFloat(currentAge);
    const retirementAgeInt = parseFloat(retirementAge);
    const monthlyExpensesFloat = parseFloat(monthlyExpenses);
    const inflationRateFloat = parseFloat(inflationRate) / 100;
    const returnRateFloat = parseFloat(returnRate) / 100;

    const yearsToRetirement = retirementAgeInt - currentAgeInt;
    const inflatedExpenses = monthlyExpensesFloat * Math.pow(1 + inflationRateFloat, yearsToRetirement);

    const annualExpenses = inflatedExpenses * 12;
    const corpusNeeded = annualExpenses / returnRateFloat;

    setResults({
      inflatedExpenses: inflatedExpenses.toFixed(2),
      corpusNeeded: corpusNeeded.toFixed(2)
    });
  };

  return (
    <div className="retirement-calculator">
      <h1>Retirement Calculator</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>
            Current Age:
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Retirement Age:
            <input
              type="number"
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Monthly Expenses (₹):
            <input
              type="number"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Expected Inflation Rate (%):
            <input
              type="number"
              value={inflationRate}
              onChange={(e) => setInflationRate(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Expected Return Rate (%):
            <input
              type="number"
              value={returnRate}
              onChange={(e) => setReturnRate(e.target.value)}
              required
            />
          </label>
        </div>
      </form>
      {results && (
        <div className="result">
          <h2>Inflated Monthly Expenses at Retirement: ₹{results.inflatedExpenses}</h2>
          <h2>Corpus Needed at Retirement: ₹{results.corpusNeeded}</h2>
        </div>
      )}
    </div>
  );
};

export default RetirementCalculator;
