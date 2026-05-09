import React, { useState } from 'react';
import API from '../services/api';

function MyBookings() {
  const [email, setEmail] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch bookings by email
  const fetchBookings = async () => {
    if (!email) {
      setError('Please enter your email.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const res = await API.get(`/bookings?email=${email}`);
      setBookings(res.data || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to fetch bookings.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-bookings">
      <h2>My Bookings</h2>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: '8px',
          marginRight: '10px',
          width: '250px',
        }}
      />

      <button
        onClick={fetchBookings}
        style={{
          padding: '8px 15px',
          cursor: 'pointer',
        }}
      >
        Get Bookings
      </button>

      {loading && <p>Loading bookings...</p>}
      {error && <p>{error}</p>}

      {!loading && bookings.length === 0 && email && !error && (
        <p>No bookings found.</p>
      )}

      {bookings.map((booking) => (
        <div
          key={booking._id}
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            marginTop: '15px',
            borderRadius: '8px',
          }}
        >
          <p>
            <strong>Expert:</strong> {booking.expertId?.name || 'N/A'}
          </p>
          <p>
            <strong>Date:</strong> {booking.date}
          </p>
          <p>
            <strong>Status:</strong> {booking.status}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MyBookings;