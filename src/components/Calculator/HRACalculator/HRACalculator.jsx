import React, { useState, useEffect } from 'react';
import './HRACalculator.css';

const HRACalculator = () => {
  const [basicSalary, setBasicSalary] = useState('');
  const [hraReceived, setHraReceived] = useState('');
  const [rentPaid, setRentPaid] = useState('');
  const [metroCity, setMetroCity] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (basicSalary && hraReceived && rentPaid) {
      calculateHRA();
    }
  }, [basicSalary, hraReceived, rentPaid, metroCity]);

  const calculateHRA = () => {
    const basic = parseFloat(basicSalary);
    const hra = parseFloat(hraReceived);
    const rent = parseFloat(rentPaid);
    const metro = metroCity;

    const rentMinus10Percent = rent - (basic * 0.1);
    const actualHRAReceived = hra;
    const metroAllowance = metro ? basic * 0.5 : basic * 0.4;

    const hraExempt = Math.min(rentMinus10Percent, actualHRAReceived, metroAllowance);

    setResults({
      hraExempt: hraExempt.toFixed(2),
      taxableHRA: (hra - hraExempt).toFixed(2)
    });
  };

  return (
    <div className="hra-calculator">
      <h1>HRA Calculator</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>
            Basic Salary:
            <input
              type="number"
              value={basicSalary}
              onChange={(e) => setBasicSalary(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            HRA Received:
            <input
              type="number"
              value={hraReceived}
              onChange={(e) => setHraReceived(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Rent Paid:
            <input
              type="number"
              value={rentPaid}
              onChange={(e) => setRentPaid(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Metro City:
            <input
              type="checkbox"
              checked={metroCity}
              onChange={(e) => setMetroCity(e.target.checked)}
            />
          </label>
        </div>
      </form>
      {results && (
        <div className="result">
          <h2>HRA Exempt: ₹{results.hraExempt}</h2>
          <h2>Taxable HRA: ₹{results.taxableHRA}</h2>
        </div>
      )}
    </div>
  );
};

export default HRACalculator;
