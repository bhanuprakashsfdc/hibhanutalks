import React from 'react';
import { Link } from 'react-router-dom';
import { calculatorData } from '../../data/calculatorData';
import './Sidebar.css';

const Sidebar = () => (
  <div className="sidebar">
    <h2>Calculators</h2>
    <ul>
      {calculatorData.map(calc => (
        <li key={calc.id}>
          <Link to={`/calculator/${calc.slug}`}>{calc.title}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Sidebar;
