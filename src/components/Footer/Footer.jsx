import React from 'react';

const Footer = () => (
  <footer>
    <div className="footer-content">
      <div className="footer-section">
        <h3>Products</h3>
        <ul>
          <li><a href="#">Stocks</a></li>
          <li><a href="#">Mutual Funds</a></li>
          <li><a href="#">NFO</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>About Us</h3>
        <ul>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Help and Support</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="#">Calculators</a></li>
          <li><a href="#">Glossary</a></li>
          <li><a href="#">Open Demat Account</a></li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="social-media">
        <a href="#"><img src="icons/facebook.png" alt="Facebook" /></a>
        <a href="#"><img src="icons/twitter.png" alt="Twitter" /></a>
      </div>
      <div className="app-links">
        <a href="#"><img src="icons/app-store.png" alt="App Store" /></a>
        <a href="#"><img src="icons/google-play.png" alt="Google Play" /></a>
      </div>
    </div>
  </footer>
);

export default Footer;
