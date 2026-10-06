import React, { useState } from 'react';
import BookingModal from './BookingModal';

const RestaurantCard = ({ restaurant }) => {
  const [showModal, setShowModal] = useState(false);

  const name = restaurant.restaurantName || restaurant["Restaurant Name"];
  const address = restaurant.address || restaurant["Address"];
  const city = restaurant.city || restaurant["City"];
  const state = restaurant.state || restaurant["State"];
  const rating = restaurant.rating || restaurant["Overall Rating"] || 4.0;

  return (
    <div className="restaurant-card">
      <div className="restaurant-icon-box">
        <span className="restaurant-icon">🏪</span>
      </div>
      <div className="restaurant-info">
        {/* Exact requirement: Use <h3> tag to display the restaurant names */}
        <h3>{name}</h3>
        <p className="restaurant-location-text">{address}, {city}, {state}</p>
        <p className="fee-badge"><strong>FREE</strong> $500 Registration fee</p>
        <div className="rating-pill">👍 {rating}</div>
      </div>
      <div className="restaurant-action">
        <span className="available-text">Available Today</span>
        {/* Exact requirement: "Book FREE Reservation" */}
        <button
          className="btn-primary book-btn"
          onClick={() => setShowModal(true)}
        >
          Book FREE Reservation
        </button>
      </div>

      {showModal && (
        <BookingModal
          restaurant={restaurant}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default RestaurantCard;