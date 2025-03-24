import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HackathonCard from '../components/HackathonCard';
import axios from 'axios';
import { toast } from 'react-toastify';

const OrganizerHackathonsPage = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchHackathons = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:3000/api/organizer/hackathons', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHackathons(response.data);
      } catch (err) {
        console.error('Fetch hackathons error:', err);
        toast.error(err.response?.data?.error || 'Failed to load hackathons');
        navigate('/hackathons');
      } finally {
        setLoading(false);
      }
    };
    fetchHackathons();
  }, [navigate]);

  if (loading) {
    return (
      <div className="text-center mt-6">
        <div className="spinner-border" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-6">
      <h2 className="text-2xl font-semibold mb-4">My Hackathons</h2>
      {hackathons.length === 0 ? (
        <p className="text-secondary">You have not created any hackathons yet.</p>
      ) : (
        hackathons.map((hackathon) => (
          <HackathonCard
            key={hackathon.id}
            hackathon={hackathon}
            user={user}
            isOrganizer={true}
            onFund={(id) => {
              setHackathons(hackathons.map(h =>
                h.id === id ? { ...h, funded_amount: h.prize_pool, funded_at: new Date().toISOString() } : h
              ));
            }}
            onEnd={(id) => {
              setHackathons(hackathons.map(h =>
                h.id === id ? { ...h, status: 'ended', manually_ended: true, manually_ended_at: new Date().toISOString() } : h
              ));
            }}
          />
        ))
      )}
    </div>
  );
};

export default OrganizerHackathonsPage;