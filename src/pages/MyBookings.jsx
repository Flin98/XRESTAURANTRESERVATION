import React, { useEffect, useState } from 'react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(saved);
  }, []);

  const filteredBookings = bookings.filter((b) =>
    b.restaurantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="my-bookings-page">
      <div className="bookings-header-banner">
        {/* Exact requirement: <h1> tag as the parent element to display the "My Bookings" heading */}
        <h1>My Bookings</h1>
        <div className="filter-input-box">
          <input
            type="text"
            placeholder="Search By Restaurant"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn-primary">Search</button>
        </div>
      </div>

      <div className="bookings-content-area">
        <div className="bookings-list">
          {filteredBookings.length === 0 ? (
            <p className="no-bookings">No reservations found.</p>
          ) : (
            filteredBookings.map((b) => (
              <div key={b.id} className="booking-card">
                <div className="booking-icon">🏪</div>
                <div className="booking-details">
                  {/* Exact requirement: <h3> for restaurant name */}
                  <h3>{b.restaurantName}</h3>
                  <p className="booking-loc">{b.address}, {b.city}, {b.state}</p>
                  <p className="fee-badge"><strong>FREE</strong> Registration fee</p>
                  <div className="rating-pill">👍 {b.rating}</div>
                </div>
                <div className="booking-badges">
                  <span className="time-badge">{b.bookingTime}</span>
                  <span className="date-badge">{b.bookingDate}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="promo-sidebar">
          <div className="promo-box">
            <h3>ARE YOU HUNGRY?</h3>
            <h1>50% OFF</h1>
            <p>NOODLES • PIZZA • BURGER</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;