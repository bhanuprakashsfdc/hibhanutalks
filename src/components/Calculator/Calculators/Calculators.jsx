import React from 'react';
import { Link } from 'react-router-dom';
import { calculatorData } from '../../../data/calculatorData';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPiggyBank, 
  faCoins, 
  faMoneyBillWave, 
  faChartLine, 
  faChild, 
  faLock, 
  faUserLock, 
  faUniversity, 
  faCalendarAlt, 
  faClipboardCheck, 
  faHome, 
  faUserTie, 
  faCalculator, 
  faCar, 
  faHouseUser, 
  faPercent, 
  faSuperscript, 
  faCertificate, 
  faChartArea, 
  faFileInvoiceDollar, 
  faHandHoldingUsd, 
  faReceipt, 
  faBalanceScale, 
  faBriefcase, 
  faPercentage, 
  faMoneyCheckAlt, 
  faShieldAlt 
} from '@fortawesome/free-solid-svg-icons';
const iconMapping = {
  faPiggyBank: faPiggyBank,
  faCoins: faCoins,
  faMoneyBillWave: faMoneyBillWave,
  faChartLine: faChartLine,
  faChild: faChild,
  faLock: faLock,
  faUserLock: faUserLock,
  faUniversity: faUniversity,
  faCalendarAlt: faCalendarAlt,
  faClipboardCheck: faClipboardCheck,
  faHome: faHome,
  faUserTie: faUserTie,
  faCalculator: faCalculator,
  faCar: faCar,
  faHouseUser: faHouseUser,
  faPercent: faPercent,
  faSuperscript: faSuperscript,
  faCertificate: faCertificate,
  faChartArea: faChartArea,
  faFileInvoiceDollar: faFileInvoiceDollar,
  faHandHoldingUsd: faHandHoldingUsd,
  faReceipt: faReceipt,
  faBalanceScale: faBalanceScale,
  faBriefcase: faBriefcase,
  faPercentage: faPercentage,
  faMoneyCheckAlt: faMoneyCheckAlt,
  faShieldAlt: faShieldAlt
};


const Calculators = () => (
  <main>
    <div className="breadcrumb">Home &gt; Calculators</div>
        <h1>Calculators</h1>
        <div className="calculators-grid">
          {calculatorData.map((calc) => (
            <Link to={`/calculator/${calc.slug}`}>
            <div className="calculator-card" key={calc.id}>
              <h2>{calc.title}</h2>
              <p>{calc.description}</p>
              <FontAwesomeIcon icon={iconMapping[calc.icon]} className="fa-duotone icon" bounce size='2x'/>
            </div>
            </Link>
          ))}
      </div>
  </main>
);

export default Calculators;
