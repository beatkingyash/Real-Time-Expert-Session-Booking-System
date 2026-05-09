import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import { io } from 'socket.io-client';

// Create socket connection only once
const socket = io('http://localhost:5000', {
  transports: ['websocket'],
});

function ExpertDetail() {
  const { id } = useParams();
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch expert details
  const fetchExpert = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get(`/experts/${id}`);
      setExpert(res.data);
      setError('');
    } catch (err) {
      console.error('Error fetching expert details:', err);
      setError('Failed to load expert details.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchExpert();

    // Listen for slot booking updates
    const handleSlotBooked = (data) => {
      if (data.expertId === id) {
        fetchExpert();
      }
    };

    socket.on('slotBooked', handleSlotBooked);

    return () => {
      socket.off('slotBooked', handleSlotBooked);
    };
  }, [id, fetchExpert]);

  if (loading) return <p>Loading expert details...</p>;
  if (error) return <p>{error}</p>;
  if (!expert) return <p>No expert found.</p>;

  return (
    <div className="expert-detail">
      <h2>{expert.name}</h2>
      <p>{expert.bio}</p>

      <h3>Available Slots</h3>

      {expert.availableSlots && expert.availableSlots.length > 0 ? (
        expert.availableSlots.map((day) => (
          <div key={day.date} className="day-slot">
            <h4>{day.date}</h4>

            {day.slots && day.slots.length > 0 ? (
              day.slots.map((slot) => (
                <button
                  key={slot}
                  className="slot-button"
                  style={{
                    margin: '5px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                  }}
                >
                  {slot}
                </button>
              ))
            ) : (
              <p>No slots available</p>
            )}
          </div>
        ))
      ) : (
        <p>No available slots.</p>
      )}
    </div>
  );
}

export default ExpertDetail;