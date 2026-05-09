import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

function ExpertList() {
  const [experts, setExperts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch experts from backend
  const fetchExperts = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/experts?search=${search}`);
      setExperts(res.data.experts || []);
      setError('');
    } catch (err) {
      console.error('Error fetching experts:', err);
      setError('Failed to load experts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, [search]);

  return (
    <div className="expert-list">
      <h2>Experts</h2>

      <input
        type="text"
        placeholder="Search expert"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: '8px',
          marginBottom: '20px',
          width: '250px',
        }}
      />

      {loading && <p>Loading experts...</p>}
      {error && <p>{error}</p>}

      {!loading && experts.length === 0 && <p>No experts found.</p>}

      {experts.map((expert) => (
        <div
          key={expert._id}
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            marginBottom: '15px',
            borderRadius: '8px',
          }}
        >
          <h3>{expert.name}</h3>
          <p>Category: {expert.category}</p>

          <Link
            to={`/expert/${expert._id}`}
            style={{
              color: 'blue',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ExpertList;