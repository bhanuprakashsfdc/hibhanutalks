import React, { useState, useEffect } from 'react';
import './IncomeTaxCalculator.css';

const IncomeTaxCalculator = () => {
  const [annualIncome, setAnnualIncome] = useState('500000');
  const [results, setResults] = useState(null);

  const taxSlabs = [
    { limit: 250000, rate: 0 },
    { limit: 500000, rate: 5 },
    { limit: 1000000, rate: 20 },
    { limit: Infinity, rate: 30 },
  ];

  useEffect(() => {
    if (annualIncome) {
      calculateIncomeTax();
    }
  }, [annualIncome]);

  const calculateIncomeTax = () => {
    let taxableIncome = parseFloat(annualIncome);
    let taxPayable = 0;

    for (let i = 0; i < taxSlabs.length; i++) {
      const slab = taxSlabs[i];
      if (taxableIncome > slab.limit) {
        taxPayable += ((Math.min(taxableIncome, taxSlabs[i + 1]?.limit || Infinity) - slab.limit) * slab.rate) / 100;
      } else {
        break;
      }
    }

    setResults({
      taxPayable: taxPayable.toFixed(2),
    });
  };

  return (
    <div className="income-tax-calculator">
      <h1>Income Tax Calculator</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>
            Annual Income:
            <input
              type="number"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(e.target.value)}
              required
            />
          </label>
        </div>
      </form>
      {results && (
        <div className="result">
          <h2>Tax Payable: ₹{results.taxPayable}</h2>
        </div>
      )}
    </div>
  );
};

export default IncomeTaxCalculator;
