import React, { useState } from 'react';
import GenericCalculator from '../GenericCalculator/GenericCalculator';

const calculateLumpsum = (principal, rate, time) => {
  const P = parseFloat(principal);
  const r = parseFloat(rate) / 100;
  const t = parseFloat(time);

  const FV = P * Math.pow(1 + r, t);
  const totalInvested = P;
  const estReturns = FV - totalInvested;

  const breakdown = [];
  let startingAmount = P;
  for (let i = 1; i <= t; i++) {
    const investedAmount = i === 1 ? P : 0;
    const interestGenerated = startingAmount * r;
    const amount = startingAmount + interestGenerated;

    breakdown.push({
      year: i,
      startingAmount: startingAmount.toFixed(2),
      investedAmount: investedAmount.toFixed(2),
      interestGenerated: interestGenerated.toFixed(2),
      amount: amount.toFixed(2)
    });

    startingAmount = amount;
  }

  return {
    futureValue: FV.toFixed(2),
    totalInvestment: totalInvested.toFixed(2),
    estimatedReturns: estReturns.toFixed(2),
    yearlyBreakdown: breakdown
  };
};

const LumpsumCalculator = () => {
  const [input1, setInput1] = useState('100000');
  const [input2, setInput2] = useState('12');
  const [input3, setInput3] = useState('10');
  const [results, setResults] = useState(null);

  return (
    <GenericCalculator
      title="Lumpsum Calculator"
      description="Calculate returns for lumpsum investments to achieve your financial goals"
      calculate={calculateLumpsum}
      labels={{ input1: "Principal Amount", input2: "Rate of Interest (Annual)", input3: "Time Period (Years)" }}
      input1={input1}
      setInput1={setInput1}
      input2={input2}
      setInput2={setInput2}
      input3={input3}
      setInput3={setInput3}
      results={results}
      setResults={setResults}
    />
  );
};

export default LumpsumCalculator;
