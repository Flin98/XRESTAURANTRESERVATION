import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingModal = ({ restaurant, onClose }) => {
  const navigate = useNavigate();

  // Generate 7 days starting from today
  const dates = Array.from({ length: 8 }).map((_, index) => {
    const d = new Date();
    d.setDate(d.getDate() + index);
    return {
      dateObj: d,
      dateString: d.toISOString().split('T')[0],
      displayDay: index === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' }),
      displayDate: d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
      fullDateFormatted: d.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })
    };
  });

  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedSlot, setSelectedSlot] = useState('');

  const slots = {
    Morning: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
    Afternoon: ['12:00 PM', '12:30 PM', '01:30 PM', '02:00 PM'],
    Evening: ['06:00 PM', '06:30 PM', '07:00 PM', '08:00 PM']
  };

  const handleConfirm = () => {
    if (!selectedSlot) {
      alert('Please choose a time slot.');
      return;
    }

    const newBooking = {
      id: Date.now(),
      restaurantName: restaurant.restaurantName || restaurant["Restaurant Name"],
      address: restaurant.address || restaurant["Address"],
      city: restaurant.city || restaurant["City"],
      state: restaurant.state || restaurant["State"],
      rating: restaurant.rating || restaurant["Overall Rating"] || 4,
      bookingDate: selectedDate.fullDateFormatted,
      bookingTime: selectedSlot,
      createdAt: new Date().toISOString()
    };

    const currentBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    currentBookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(currentBookings));

    onClose();
    navigate('/my-bookings');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Reserve at {restaurant.restaurantName || restaurant["Restaurant Name"]}</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="calendar-strip">
          {dates.map((d) => (
            <button
              key={d.dateString}
              type="button"
              className={`date-chip ${selectedDate.dateString === d.dateString ? 'active' : ''}`}
              onClick={() => setSelectedDate(d)}
            >
              <span>{d.displayDay}</span>
              <small>{d.displayDate}</small>
            </button>
          ))}
        </div>

        {/* Exact requirement: Text Display for Time of Day using <p> tag */}
        <div className="time-slots-container">
          <div className="slot-group">
            <p>Today</p>
          </div>

          <div className="slot-group">
            <p>Morning</p>
            <div className="slots-grid">
              {slots.Morning.map((time) => (
                <button
                  type="button"
                  key={time}
                  className={`slot-btn ${selectedSlot === time ? 'selected' : ''}`}
                  onClick={() => setSelectedSlot(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="slot-group">
            <p>Afternoon</p>
            <div className="slots-grid">
              {slots.Afternoon.map((time) => (
                <button
                  type="button"
                  key={time}
                  className={`slot-btn ${selectedSlot === time ? 'selected' : ''}`}
                  onClick={() => setSelectedSlot(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="slot-group">
            <p>Evening</p>
            <div className="slots-grid">
              {slots.Evening.map((time) => (
                <button
                  type="button"
                  key={time}
                  className={`slot-btn ${selectedSlot === time ? 'selected' : ''}`}
                  onClick={() => setSelectedSlot(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleConfirm}>Confirm Booking</button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;