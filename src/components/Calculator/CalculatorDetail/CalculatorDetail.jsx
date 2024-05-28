import React from 'react';
import { useParams } from 'react-router-dom';
import { calculatorData } from '../../../data/calculatorData';

const CalculatorDetail = () => {
  const { slug } = useParams();
  const calculator = calculatorData.find(calc => calc.slug === slug);

  if (!calculator) {
    return <h2>Calculator not found</h2>;
  }

  return (
    <div>
      <h1>{calculator.title}</h1>
      <img src={calculator.image} alt={calculator.title} />
      <p>{calculator.description}</p>
      <div>{calculator.content}</div>
    </div>
  );
};

export default CalculatorDetail;
