import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const SubmissionTable = ({ submissions, hackathon, onSetWinners }) => {
  const initializeWinners = useCallback(() => {
    if (!hackathon.winners) return [];

    if (Array.isArray(hackathon.winners)) {
      console.log('hackathon.winners is already an array:', hackathon.winners);
      return hackathon.winners.map(w => w.public_key).filter(key => key);
    }

    try {
      const parsedWinners = JSON.parse(hackathon.winners);
      console.log('Parsed hackathon.winners:', parsedWinners);
      if (Array.isArray(parsedWinners)) {
        return parsedWinners.map(w => w.public_key).filter(key => key);
      }
      return [];
    } catch (error) {
      console.error('Error parsing hackathon.winners:', error);
      return [];
    }
  }, [hackathon.winners]);

  const [selectedWinners, setSelectedWinners] = useState(initializeWinners());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSelectedWinners(initializeWinners());
  }, [hackathon, initializeWinners]);

  const handleWinnerSelect = (publicKey) => {
    if (selectedWinners.includes(publicKey)) {
      setSelectedWinners(selectedWinners.filter(w => w !== publicKey));
    } else if (selectedWinners.length < 3) {
      setSelectedWinners([...selectedWinners, publicKey]);
    } else {
      toast.error('You can select up to 3 winners only.');
    }
  };

  const handleEndHackathon = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:3000/api/hackathons/${hackathon.id}/end`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Hackathon ended! Transaction Hash: ${response.data.transactionHash}`);
      onSetWinners();
    } catch (error) {
      console.error('Error ending hackathon:', error);
      toast.error(error.response?.data?.error || 'Failed to end hackathon');
    } finally {
      setLoading(false);
    }
  };

  const handleFundHackathon = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const amount = prompt('Enter funding amount in ETH:');
      if (!amount || isNaN(amount) || Number(amount) <= 0) {
        toast.error('Please enter a valid amount');
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `http://localhost:3000/api/hackathons/${hackathon.id}/fund`,
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Hackathon funded! Transaction Hash: ${response.data.transactionHash}`);
      onSetWinners();
    } catch (error) {
      console.error('Error funding hackathon:', error);
      toast.error(error.response?.data?.error || 'Failed to fund hackathon');
    } finally {
      setLoading(false);
    }
  };

  const handleSetWinners = async () => {
    if (selectedWinners.length === 0) {
      toast.error('Please select at least one winner.');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:3000/api/hackathons/${hackathon.id}/set-winners`,
        { winners: selectedWinners },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Winners set! Transaction Hash: ${response.data.transactionHash}`);

      const updatedHackathonResponse = await axios.get(
        `http://localhost:3000/api/hackathons/${hackathon.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedHackathon = updatedHackathonResponse.data;

      onSetWinners(updatedHackathon);
      setSelectedWinners(initializeWinners());
    } catch (error) {
      console.error('Error setting winners:', error);
      toast.error(error.response?.data?.error || 'Failed to set winners');
    } finally {
      setLoading(false);
    }
  };

  const handleDistributePrizes = async () => {
    const winnersArray = initializeWinners();
    if (!winnersArray || winnersArray.length === 0) {
      toast.error('Please select winners first');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:3000/api/hackathons/${hackathon.id}/distribute`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { transactionHash, distributions } = response.data;
      const distributionMessage = distributions
        .map(d => `${d.winner}: ${d.amount} ETH`)
        .join('\n');
      toast.success(
        `Prizes distributed! Transaction Hash: ${transactionHash}\n\nDistributions:\n${distributionMessage}`,
        { autoClose: 10000 }
      );

      const updatedHackathonResponse = await axios.get(
        `http://localhost:3000/api/hackathons/${hackathon.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onSetWinners({ hackathon: updatedHackathonResponse.data });
    } catch (error) {
      console.error('Error distributing prizes:', error);
      toast.error(error.response?.data?.error || 'Failed to distribute prizes');
    } finally {
      setLoading(false);
    }
  };

  const fundedAmount = Number(hackathon.funded_amount) || 0;
  const winnersArray = initializeWinners();
  const safeSubmissions = Array.isArray(submissions) ? submissions : [];

  return (
    <div>
      {safeSubmissions.length === 0 ? (
        <p className="text-secondary">No submissions yet.</p>
      ) : (
        <>
          <p className="text-secondary">Found {safeSubmissions.length} submissions:</p>
          <table className="table">
            <thead>
              <tr>
                <th>Submitter</th>
                <th>Idea</th>
                <th>Description</th>
                <th>Public Key</th>
                <th>Teammates</th>
                <th>GitHub Link</th>
                <th>Select Winner</th>
              </tr>
            </thead>
            <tbody>
              {safeSubmissions.map((submission, index) => (
                <tr key={submission.id || index}>
                  <td>{submission.email || submission.submitter_email || 'N/A'}</td>
                  <td>{submission.idea || 'N/A'}</td>
                  <td>{submission.description || 'N/A'}</td>
                  <td>{submission.public_key || 'N/A'}</td>
                  <td>{submission.teammate_names || 'None'}</td>
                  <td>
                    {submission.github_link ? (
                      <a href={submission.github_link} target="_blank" rel="noopener noreferrer">GitHub</a>
                    ) : 'N/A'}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedWinners.includes(submission.public_key)}
                      onChange={() => handleWinnerSelect(submission.public_key)}
                      disabled={hackathon.prizes_distributed}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        {!hackathon.manually_ended && (
          <button
            className="btn btn-primary"
            onClick={handleEndHackathon}
            disabled={loading}
          >
            {loading ? 'Ending...' : 'End Hackathon'}
          </button>
        )}
        {hackathon.manually_ended && (fundedAmount === 0 || hackathon.funded_amount === null) && !hackathon.prizes_distributed && (
          <button
            className="btn btn-primary"
            onClick={handleFundHackathon}
            disabled={loading}
          >
            {loading ? 'Funding...' : 'Fund Hackathon'}
          </button>
        )}
        {hackathon.manually_ended && fundedAmount > 0 && !hackathon.prizes_distributed && (
          <button
            className="btn btn-primary"
            onClick={handleSetWinners}
            disabled={loading}
          >
            {loading ? 'Setting Winners...' : 'Set Winners'}
          </button>
        )}
        {hackathon.manually_ended && winnersArray.length > 0 && !hackathon.prizes_distributed && fundedAmount > 0 ? (
          <button
            className="btn btn-success"
            onClick={handleDistributePrizes}
            disabled={loading}
          >
            {loading ? 'Distributing...' : 'Distribute Prizes'}
          </button>
        ) : (
          <div className="alert alert-info">
            <p>Cannot distribute prizes. Check the following conditions:</p>
            <ul>
              <li>Manually Ended: {hackathon.manually_ended ? 'Yes' : 'No'}</li>
              <li>Winners Set: {winnersArray.length > 0 ? 'Yes' : 'No'}</li>
              <li>Prizes Distributed: {hackathon.prizes_distributed ? 'Yes' : 'No'}</li>
              <li>Funded Amount: {fundedAmount > 0 ? `${fundedAmount} ETH` : 'Not Funded'}</li>
            </ul>
          </div>
        )}
      </div>

      {winnersArray.length > 0 && (
        <div className="mt-4">
          <h4 className="text-lg font-medium">Winners:</h4>
          <ul className="list-group w-50">
            {winnersArray.map((winner, index) => (
              <li key={index} className="list-group-item">{winner}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SubmissionTable;