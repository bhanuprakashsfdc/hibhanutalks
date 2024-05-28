import React, { useState, useEffect } from 'react';
import './SalaryCalculator.css';

const SalaryCalculator = () => {
  const [grossSalary, setGrossSalary] = useState('500000');
  const [taxDeductions, setTaxDeductions] = useState('50000');
  const [otherDeductions, setOtherDeductions] = useState('20000');
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (grossSalary && taxDeductions && otherDeductions) {
      calculateNetSalary();
    }
  }, [grossSalary, taxDeductions, otherDeductions]);

  const calculateNetSalary = () => {
    const gross = parseFloat(grossSalary);
    const tax = parseFloat(taxDeductions);
    const other = parseFloat(otherDeductions);

    const netSalary = gross - tax - other;

    setResults({
      netSalary: netSalary.toFixed(2),
    });
  };

  return (
    <div className="salary-calculator">
      <h1>Salary Calculator</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>
            Gross Salary (₹):
            <input
              type="number"
              value={grossSalary}
              onChange={(e) => setGrossSalary(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Tax Deductions (₹):
            <input
              type="number"
              value={taxDeductions}
              onChange={(e) => setTaxDeductions(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Other Deductions (₹):
            <input
              type="number"
              value={otherDeductions}
              onChange={(e) => setOtherDeductions(e.target.value)}
              required
            />
          </label>
        </div>
      </form>
      {results && (
        <div className="result">
          <h2>Net Salary: ₹{results.netSalary}</h2>
        </div>
      )}
    </div>
  );
};

export default SalaryCalculator;
