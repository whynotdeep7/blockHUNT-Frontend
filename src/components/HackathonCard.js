import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const HackathonCard = ({ hackathon, user, isOrganizer, onFund, onEnd }) => {
  useEffect(() => {
    console.log('HackathonCard received hackathon:', hackathon);
  }, [hackathon]);

  const actualStatus = hackathon.manually_ended ? 'ended' : hackathon.status;
  const canFund = isOrganizer && actualStatus === 'active' && hackathon.funded_amount === 0;
  const canEnd = isOrganizer && actualStatus === 'active' && !hackathon.manually_ended;

  return (
    <div className="card mb-4">
      <h5 className="text-xl font-semibold">{hackathon.title}</h5>
      <p className="mb-2">{hackathon.description}</p>
      <p className="mb-1"><strong>Start Date:</strong> {new Date(hackathon.start_date).toLocaleDateString()}</p>
      <p className="mb-1"><strong>End Date:</strong> {new Date(hackathon.end_date).toLocaleDateString()}</p>
      <p className="mb-1"><strong>Prize Pool:</strong> {hackathon.prize_pool} ETH</p>
      <p className="mb-1"><strong>Participants:</strong> {hackathon.participant_count || 0}</p>
      <p className="mb-1"><strong>Submissions:</strong> {hackathon.submission_count || 0}</p>
      <p className="mb-2">
        <strong>Status:</strong>{' '}
        <span className={`badge ${
          actualStatus === 'active' ? 'bg-success' : actualStatus === 'ended' ? 'bg-danger' : 'bg-secondary'
        }`}>
          {hackathon.manually_ended ? 'ENDED' : actualStatus ? actualStatus.toUpperCase() : 'UNKNOWN'}
        </span>
      </p>
      {hackathon.funded_amount > 0 && (
        <p className="mb-2"><strong>Funded:</strong> {hackathon.funded_amount} ETH on {new Date(hackathon.funded_at).toLocaleString()}</p>
      )}
      <div className="flex gap-3">
        <Link to={`/hackathons/${hackathon.id}`} className="btn btn-primary">View Details</Link>
        {isOrganizer && (
          <>
            {canFund && (
              <button className="btn btn-success" onClick={() => onFund(hackathon.id)}>
                Fund Hackathon
              </button>
            )}
            {canEnd && (
              <button className="btn btn-danger" onClick={() => onEnd(hackathon.id)}>
                End Hackathon
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HackathonCard;