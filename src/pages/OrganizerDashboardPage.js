import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const OrganizerDashboardPage = () => {
  const [stats, setStats] = useState({
    hackathons: 0,
    participants: 0,
    submissions: 0,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = React.useMemo(() => JSON.parse(localStorage.getItem('user')), []);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please log in to view your dashboard');
          navigate('/login');
          return;
        }

        if (user?.role !== 'organizer') {
          toast.error('Only organizers can access this dashboard');
          navigate('/hackathons');
          return;
        }

        const response = await axios.get('http://localhost:3000/api/organizer/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(response.data);
      } catch (err) {
        console.error('Fetch stats error:', err);
        toast.error(err.response?.data?.error || 'Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [navigate, user]); 
  
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
      <h2 className="text-2xl font-semibold mb-4">Organizer Dashboard</h2>
      <p className="mb-4">Welcome, {user.email}!</p>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card text-center">
          <h5 className="text-lg font-medium mb-2">Hackathons Created</h5>
          <p className="text-xl">{stats.hackathons}</p>
        </div>
        <div className="card text-center">
          <h5 className="text-lg font-medium mb-2">Total Participants</h5>
          <p className="text-xl">{stats.participants}</p>
        </div>
        <div className="card text-center">
          <h5 className="text-lg font-medium mb-2">Total Submissions</h5>
          <p className="text-xl">{stats.submissions}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <Link to="/organizer-hackathons" className="btn btn-primary">
          View My Hackathons
        </Link>
        <Link to="/create-hackathon" className="btn btn-success">
          Create a New Hackathon
        </Link>
      </div>
    </div>
  );
};

export default OrganizerDashboardPage;