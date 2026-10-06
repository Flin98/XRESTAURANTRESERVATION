import React, { useEffect, useState } from 'react';

const MyBookings = () => {
  const [bookings, setBookings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('bookings')) || [];
    } catch {
      return [];
    }
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadBookings = () => {
      try {
        setBookings(JSON.parse(localStorage.getItem('bookings')) || []);
      } catch {
        setBookings([]);
      }
    };
    window.addEventListener('storage', loadBookings);
    const interval = setInterval(loadBookings, 500);
    return () => {
      window.removeEventListener('storage', loadBookings);
      clearInterval(interval);
    };
  }, []);

  const filteredBookings = bookings.filter((b) =>
    (b.restaurantName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="my-bookings-page">
      <div className="bookings-header-banner">
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
            filteredBookings.map((b, idx) => (
              <div key={b.id || idx} className="booking-card">
                <div className="booking-icon">🏪</div>
                <div className="booking-details">
                  <h3>{b.restaurantName}</h3>
                  <p className="booking-loc">{b.address}, {b.city}, {b.state}</p>
                  <p className="fee-badge"><strong>FREE</strong> Registration fee</p>
                  <div className="rating-pill">👍 {b.rating || 4}</div>
                </div>
                <div className="booking-badges">
                  <span className="time-badge">{b.bookingTime}</span>
                  <span className="date-badge">{b.bookingDate}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;