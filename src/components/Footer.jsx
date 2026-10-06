import React from 'react';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="brand-logo footer-logo">
            <span className="logo-icon">🍽️</span>
            <span className="logo-text">Restaurant</span>
          </div>
          <div className="social-icons">
            <span>🌐</span>
            <span>🐦</span>
            <span>▶️</span>
            <span>📸</span>
          </div>
        </div>
        <div className="footer-links-grid">
          <ul>
            <li>About Our Restaurant</li>
            <li>Menu</li>
            <li>Photo Gallery</li>
            <li>Contact Us</li>
          </ul>
          <ul>
            <li>Reservations</li>
            <li>Special Events</li>
            <li>Private Dining</li>
            <li>Customer Support</li>
          </ul>
          <ul>
            <li>Our Cuisine</li>
            <li>Wine List</li>
            <li>Chef's Special</li>
            <li>Loyalty Program</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright ©2026 FineDining.com. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;