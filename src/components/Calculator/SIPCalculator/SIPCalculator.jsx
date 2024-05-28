import React, { useState } from 'react';
import GenericCalculator from '../GenericCalculator/GenericCalculator';

const calculateSIP = (monthlyInvestment, rateOfInterest, investmentPeriod) => {
  const P = parseFloat(monthlyInvestment);
  const r = parseFloat(rateOfInterest) / 100 / 12;
  const n = parseFloat(investmentPeriod) * 12;

  const FV = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const totalInvested = P * n;
  const estReturns = FV - totalInvested;

  const breakdown = [];
  let startingAmount = 0;
  const yearlyInvestment = P * 12;
  for (let i = 1; i <= investmentPeriod; i++) {
    const interestGenerated = (startingAmount + yearlyInvestment) * Math.pow(1 + r, 12) - (startingAmount + yearlyInvestment);
    const amount = startingAmount + yearlyInvestment + interestGenerated;

    breakdown.push({
      year: i,
      startingAmount: startingAmount.toFixed(2),
      investedAmount: yearlyInvestment.toFixed(2),
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

const SIPCalculator = () => {
  const [input1, setInput1] = useState('1000');
  const [input2, setInput2] = useState('12');
  const [input3, setInput3] = useState('10');
  const [results, setResults] = useState(null);

  return (
    <GenericCalculator
      title="SIP Calculator"
      description="Calculate how much you need to save or how much you will accumulate with your SIP"
      calculate={calculateSIP}
      labels={{ input1: "Monthly Investment", input2: "Rate of Interest (Annual)", input3: "Investment Period (Years)" }}
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

export default SIPCalculator;
