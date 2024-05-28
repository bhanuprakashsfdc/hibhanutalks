import React from 'react';
import { Link } from 'react-router-dom';
import { calculatorData } from '../../../data/calculatorData';

const Calculators = () => (
  <main>
<div className="breadcrumb">Home &gt; Calculators</div>
    <h1>Calculators</h1>
    <div className="calculators-grid">
      {calculatorData.map((calc) => (
        <div className="calculator-card" key={calc.id}>
          <h2>{calc.title}</h2>
          <p>{calc.description}</p>
          <img src={calc.image} alt={calc.title} />
          <Link to={`/calculator/${calc.slug}`}>Learn More</Link>
        </div>
      ))}
    </div>
  </main>
);

export default Calculators;
