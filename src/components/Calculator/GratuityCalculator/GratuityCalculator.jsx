import React, { useState, useEffect } from 'react';
import './GratuityCalculator.css';

const GratuityCalculator = () => {
  const [lastDrawnSalary, setLastDrawnSalary] = useState('50000');
  const [yearsOfService, setYearsOfService] = useState('10');
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (lastDrawnSalary && yearsOfService) {
      calculateGratuity();
    }
  }, [lastDrawnSalary, yearsOfService]);

  const calculateGratuity = () => {
    const salary = parseFloat(lastDrawnSalary);
    const years = parseFloat(yearsOfService);
    const gratuity = (salary * 15 * years) / 26;

    setResults({
      gratuity: gratuity.toFixed(2),
    });
  };

  return (
    <div className="gratuity-calculator">
      <h1>Gratuity Calculator</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>
            Last Drawn Salary:
            <input
              type="number"
              value={lastDrawnSalary}
              onChange={(e) => setLastDrawnSalary(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Years of Service:
            <input
              type="number"
              value={yearsOfService}
              onChange={(e) => setYearsOfService(e.target.value)}
              required
            />
          </label>
        </div>
      </form>
      {results && (
        <div className="result">
          <h2>Gratuity Amount: ₹{results.gratuity}</h2>
        </div>
      )}
    </div>
  );
};

export default GratuityCalculator;
