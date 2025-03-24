import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import SubmissionTable from '../components/SubmissionTable.js'; // Import the SubmissionTable component

const HackathonDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hackathon, setHackathon] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [submissions, setSubmissions] = useState([]); // Add state for submissions
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isOrganizer = user && user.role === 'organizer' && hackathon && user.id === hackathon.organizer_id;

  // Fetch hackathon, participants, and submissions data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const [hackathonResponse, participantsResponse, submissionsResponse] = await Promise.all([
        axios.get(`http://localhost:3000/api/hackathons/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`http://localhost:3000/api/hackathons/${id}/participants`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`http://localhost:3000/api/hackathons/${id}/submissions`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      console.log('Hackathon data loaded:', hackathonResponse.data);
      console.log('Participants data loaded:', participantsResponse.data);
      console.log('Submissions data loaded:', submissionsResponse.data);

      setHackathon(hackathonResponse.data);
      setParticipants(participantsResponse.data);
      setSubmissions(submissionsResponse.data);
    } catch (err) {
      console.error('Fetch data error:', err);
      toast.error('Failed to load hackathon details');
      navigate('/hackathons');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleJoin = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:3000/api/hackathons/${id}/join`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Joined hackathon successfully!');
      setParticipants([...participants, { id: user.id, email: user.email }]);
    } catch (error) {
      console.error('Join error:', error);
      toast.error('Failed to join hackathon: ' + (error.response?.data?.error || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:3000/api/hackathons/${id}/withdraw`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Withdrawn from hackathon successfully!');
      setParticipants(participants.filter(p => p.id !== user.id));
    } catch (error) {
      console.error('Withdraw error:', error);
      toast.error('Failed to withdraw: ' + (error.response?.data?.error || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleEndHackathon = async () => {
    console.log('Ending hackathon:', id);
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token missing');
      }

      let response;
      try {
        response = await axios.post(
          `http://localhost:3000/api/hackathons/${id}/end-only`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.log('First endpoint failed, trying alternative');
        response = await axios.post(
          `http://localhost:3000/api/hackathons/${id}/end`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      console.log('End hackathon response:', response.data);
      toast.success('Hackathon ended successfully!');

      // Update hackathon state
      setHackathon(prev => ({
        ...prev,
        status: 'ended',
        manually_ended: true,
        manually_ended_at: new Date().toISOString(),
      }));

      // Refresh data to ensure consistency
      await fetchData();
    } catch (error) {
      console.error('End hackathon error:', error);
      const errorMsg = error.response?.data?.error || error.message || 'Unknown error';
      toast.error('Failed to end hackathon: ' + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleFundHackathon = async () => {
    console.log('Funding hackathon:', id);
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token missing');
      }

      const amount = prompt('Enter funding amount in ETH:');
      if (!amount || isNaN(amount) || Number(amount) <= 0) {
        toast.error('Please enter a valid amount');
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `http://localhost:3000/api/hackathons/${id}/fund`,
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Fund hackathon response:', response.data);
      toast.success('Hackathon funded successfully!');

      // Update hackathon state
      setHackathon(prev => ({
        ...prev,
        funded_amount: parseFloat(amount),
        funded_at: new Date().toISOString(),
      }));

      // Refresh data to ensure consistency
      await fetchData();
    } catch (error) {
      console.error('Fund hackathon error:', error);
      const errorMsg = error.response?.data?.error || error.message || 'Unknown error';
      toast.error('Failed to fund hackathon: ' + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !hackathon) {
    return (
      <div className="text-center mt-6">
        <div className="spinner-border" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    );
  }

  if (!hackathon) {
    return null;
  }

  const isParticipant = participants.some(p => p.id === user?.id);
  const canSubmit = user && !isOrganizer && isParticipant && hackathon.status === 'active';
  const canFund = isOrganizer && hackathon.status === 'ended' && !hackathon.funded_amount;

  // Format dates for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Calculate time remaining or status message
  const getTimeStatus = () => {
    if (hackathon.status === 'ended') {
      return 'This hackathon has ended';
    }

    const endDate = new Date(hackathon.end_date);
    const now = new Date();

    if (now > endDate) {
      return 'Time is up! Awaiting results';
    }

    const timeRemaining = endDate - now;
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return `${days} days, ${hours} hours remaining`;
  };

  // Get status badge class
  const getStatusBadgeClass = () => {
    switch (hackathon.status) {
      case 'active':
        return 'bg-success';
      case 'ended':
        return 'bg-danger';
      case 'upcoming':
        return 'bg-warning';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="container mt-6">
      <div className="mb-4">
        <Link to="/hackathons" className="btn btn-outline-secondary">
          ← Back to Hackathons
        </Link>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h2 className="card-title text-2xl font-bold">{hackathon.title}</h2>
            <span className={`badge ${getStatusBadgeClass()} text-uppercase`}>
              {hackathon.status}
            </span>
          </div>

          <div className="row mb-4">
            <div className="col-md-8">
              <div className="mb-3">
                <h4 className="text-lg font-medium">Description</h4>
                <p>{hackathon.description}</p>
              </div>

              <div className="mb-3">
                <h4 className="text-lg font-medium">Requirements</h4>
                <p>{'No specific requirements provided.'}</p>
              </div>

              <div className="mb-3">
                <h4 className="text-lg font-medium">Judging Criteria</h4>
                <p>{hackathon.judging_criteria || 'Standard judging criteria apply.'}</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card bg-light">
                <div className="card-body">
                  <h4 className="card-title text-lg font-medium">Hackathon Details</h4>

                  <div className="mb-2">
                    <strong>Prize Pool:</strong> {hackathon.prize_pool || 0} ETH
                  </div>

                  {hackathon.funded_amount && (
                    <div className="mb-2">
                      <strong>Funded Amount:</strong> {hackathon.funded_amount} ETH
                      <div className="small text-muted">
                        Funded on {formatDate(hackathon.funded_at)}
                      </div>
                    </div>
                  )}

                  <div className="mb-2">
                    <strong>Start Date:</strong> {formatDate(hackathon.start_date)}
                  </div>

                  <div className="mb-2">
                    <strong>End Date:</strong> {formatDate(hackathon.end_date)}
                  </div>

                  <div className="mb-2">
                    <strong>Time Status:</strong> {getTimeStatus()}
                  </div>

                  <div className="mb-2">
                    <strong>Max Team Size:</strong> {hackathon.max_team_size || 4}
                  </div>

                  <div className="mb-2">
                    <strong>Technology Focus:</strong> {hackathon.technology_focus || 'Open'}
                  </div>

                  <div className="mb-2">
                    <strong>Participants:</strong> {participants.length} joined
                  </div>

                  {hackathon.website_url && (
                    <div className="mb-2">
                      <strong>Website:</strong>{' '}
                      <a href={hackathon.website_url} target="_blank" rel="noopener noreferrer">
                        {hackathon.website_url}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOrganizer && (
        <div className="card mb-4">
          <div className="card-body">
            <h4 className="card-title text-lg font-medium">Organizer Actions</h4>
            <div className="d-flex flex-wrap gap-3">
              {hackathon.status === 'active' && (
                <button
                  className="btn btn-danger"
                  onClick={handleEndHackathon}
                  disabled={loading}
                >
                  End Hackathon
                </button>
              )}
              {canFund && (
                <button
                  className="btn btn-success"
                  onClick={handleFundHackathon}
                  disabled={loading}
                >
                  Fund Hackathon
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="card mb-4">
        <div className="card-body">
          <h3 className="card-title text-lg font-medium">Participants ({participants.length})</h3>
          {participants.length === 0 ? (
            <p>No participants yet.</p>
          ) : (
            <ul className="list-group">
              {participants.map((participant) => (
                <li
                  key={participant.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {participant.email}
                  {participant.team_name && (
                    <span className="badge bg-info">Team: {participant.team_name}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {isOrganizer && (
        <div className="card mb-4">
          <div className="card-body">
            <h3 className="card-title text-lg font-medium">Submissions</h3>
            <SubmissionTable
              submissions={submissions}
              hackathon={hackathon}
              onSetWinners={fetchData} // Pass fetchData as onSetWinners to refresh data
            />
          </div>
        </div>
      )}

      {user && !isOrganizer && hackathon.status === 'active' && (
        <div className="card mb-4">
          <div className="card-body">
            <h4 className="card-title text-lg font-medium">Participant Actions</h4>
            <div className="d-flex flex-wrap gap-3">
              {isParticipant ? (
                <>
                  <button
                    className="btn btn-danger"
                    onClick={handleWithdraw}
                    disabled={loading}
                  >
                    Withdraw from Hackathon
                  </button>
                  {canSubmit && (
                    <Link to={`/hackathons/${id}/submit`} className="btn btn-primary">
                      Submit Project
                    </Link>
                  )}
                </>
              ) : (
                <button
                  className="btn btn-success"
                  onClick={handleJoin}
                  disabled={loading}
                >
                  Join Hackathon
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HackathonDetailsPage;