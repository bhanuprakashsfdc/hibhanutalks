import React from 'react';

const Header = () => (
  <header>
    <div className="logo">FinanceCalc</div>
    <input type="text" className="search-bar" placeholder="What are you looking for today?" />
    <button className="login-btn">Login/Register</button>
  </header>
);

export default Header;
