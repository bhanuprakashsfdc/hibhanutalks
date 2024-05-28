import React from 'react';
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

const LumpsumCalculator = () => (
  <GenericCalculator
    title="Lumpsum Calculator"
    description="Calculate returns for lumpsum investments to achieve your financial goals"
    calculate={calculateLumpsum}
  />
);

export default LumpsumCalculator;
