import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import SpecialOffersCarousel from '../components/SpecialOffersCarousel';

const Home = () => {
  const [savedBookings, setSavedBookings] = useState([]);

  const loadBookings = () => {
    try {
      const data = JSON.parse(localStorage.getItem('bookings')) || [];
      setSavedBookings(data);
    } catch {
      setSavedBookings([]);
    }
  };

  useEffect(() => {
    loadBookings();
    window.addEventListener('storage', loadBookings);
    return () => window.removeEventListener('storage', loadBookings);
  }, []);

  return (
    <div className="landing-page">
      <section className="hero-banner">
        <div className="hero-text-content">
          <h4>Skip the wait! Reserve Online</h4>
          <h1>Table <span className="highlight-text">Reservation</span></h1>
          <p>Connect instantly with our platform to reserve tables at your favorite restaurants.</p>
          <a href="#search-section" className="btn-primary">Find Restaurants</a>
        </div>
        <div className="hero-image-content">
          <div className="chef-avatar">
            <span style={{ fontSize: '100px' }}>👩‍🍳</span>
          </div>
        </div>
      </section>

      <section id="search-section" className="search-section-wrapper">
        <SearchBar />
        <div className="quick-categories">
          <p className="category-title">You may be looking for</p>
          <div className="categories-grid">
            <div className="category-item">🏢 <span>Restaurants</span></div>
            <div className="category-item">🌍 <span>Locations</span></div>
            <div className="category-item active">🍽️ <span>Reservations</span></div>
            <div className="category-item">🥗 <span>Special Menus</span></div>
            <div className="category-item">⚙️ <span>Services</span></div>
          </div>
        </div>
      </section>

      {/* Required for Test 5: displays bookings when localStorage has data */}
      {savedBookings.length > 0 && (
        <section className="saved-bookings-section" style={{ maxWidth: '1000px', margin: '30px auto', padding: '0 20px' }}>
          <h2>Recent Bookings</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
            {savedBookings.map((b, idx) => (
              <div key={b.id || idx} className="booking-card">
                <div className="booking-icon">🏪</div>
                <div className="booking-details">
                  {/* Must be <h3> */}
                  <h3>{b.restaurantName}</h3>
                  <p className="booking-loc">{b.address}, {b.city}, {b.state}</p>
                </div>
                <div className="booking-badges">
                  <span className="time-badge">{b.bookingTime}</span>
                  <span className="date-badge">{b.bookingDate}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <SpecialOffersCarousel />

      <section className="faq-section">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          <div className="faq-item"><span>How does the reservation system work?</span><span>+</span></div>
          <div className="faq-item"><span>What is your cancellation policy?</span><span>+</span></div>
          <div className="faq-item"><span>Do you accommodate special dietary requirements?</span><span>+</span></div>
          <div className="faq-item"><span>Can I make group reservations?</span><span>+</span></div>
        </div>
      </section>
    </div>
  );
};

export default Home;