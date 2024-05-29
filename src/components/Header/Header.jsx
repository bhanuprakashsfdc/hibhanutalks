import React from 'react';
import './Header.css';
const Header = () => (
<header className="header">
    <h1>HiBhanuTalks.com</h1>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/calculators">Calculators</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>
);

export default Header;
