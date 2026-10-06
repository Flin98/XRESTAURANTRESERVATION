import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="site-header">
      <div className="top-banner">
        The platform allows you to reserve tables with ease across all top cities in the USA.
      </div>
      <nav className="navbar-container">
        <Link to="/" className="brand-logo">
          <span className="logo-icon">🍽️</span>
          <span className="logo-text">Restaurant</span>
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Find Restaurants</Link></li>
          <li><Link to="/">Locations</Link></li>
          <li><Link to="/">Reservations</Link></li>
          <li><Link to="/">Special Menus</Link></li>
          <li><Link to="/">Services</Link></li>
        </ul>
        <button 
          className="btn-primary my-bookings-btn" 
          onClick={() => navigate('/my-bookings')}
        >
          My Bookings
        </button>
      </nav>
    </header>
  );
};

export default Navbar;