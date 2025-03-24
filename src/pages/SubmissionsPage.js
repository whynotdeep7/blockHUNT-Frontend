import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SubmissionTable from '../components/SubmissionTable';
import { toast } from 'react-toastify';

const SubmissionsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const hackathonResponse = await axios.get(`http://localhost:3000/api/hackathons/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Fetched hackathon data:', hackathonResponse.data);
      setHackathon(hackathonResponse.data);

      if (hackathonResponse.data.prizes_distributed) {
        setStep(4);
      } else if (hackathonResponse.data.winners && JSON.parse(hackathonResponse.data.winners).length > 0) {
        setStep(3);
      } else if (hackathonResponse.data.funded_amount > 0) {
        setStep(2);
      } else if (hackathonResponse.data.manually_ended) {
        setStep(1);
      } else {
        setStep(0);
      }

      const submissionsResponse = await axios.get(`http://localhost:3000/api/hackathons/${id}/submissions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmissions(submissionsResponse.data);
    } catch (error) {
      console.error('Fetch data error:', error);
      if (error.response?.status === 403) {
        toast.error('Session expired. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        toast.error('Failed to fetch data');
        navigate('/hackathons');
      }
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSetWinners = async () => {
    await fetchData();
  };

  const handleDistributePrizes = async () => {
    if (!hackathon.winners || JSON.parse(hackathon.winners).length === 0) {
      toast.error('Please select winners first');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:3000/api/hackathons/${id}/distribute`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`Prizes distributed! Transaction Hash: ${response.data.transactionHash}`);
      await fetchData();
    } catch (error) {
      console.error('Error distributing prizes:', error);
      toast.error(error.response?.data?.error || 'Failed to distribute prizes');
    } finally {
      setLoading(false);
    }
  };

  const goToHackathonDetails = () => {
    navigate(`/hackathons/${id}`);
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
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-6">
      <h2 className="text-2xl font-semibold mb-4">Submissions for {hackathon.title}</h2>

      <div className="alert alert-info mb-4">
        <h4 className="text-lg font-medium">Hackathon Prize Distribution Workflow</h4>
        <ol className="mb-0 space-y-2">
          <li className={hackathon.manually_ended ? "text-success" : ""}>
            End Hackathon {hackathon.manually_ended && "✓"}
          </li>
          <li className={hackathon.funded_amount > 0 ? "text-success" : ""}>
            Fund Hackathon {hackathon.funded_amount > 0 && "✓"}
            {hackathon.manually_ended && (hackathon.funded_amount === null || hackathon.funded_amount === 0) && !hackathon.prizes_distributed && (
              <button className="btn btn-primary ms-2" onClick={goToHackathonDetails}>
                Go to Details
              </button>
            )}
          </li>
          <li className={hackathon.winners && JSON.parse(hackathon.winners).length > 0 ? "text-success" : ""}>
            Select Winners {hackathon.winners && JSON.parse(hackathon.winners).length > 0 && "✓"}
          </li>
          <li className={hackathon.prizes_distributed ? "text-success" : ""}>
            Distribute Prizes {hackathon.prizes_distributed && "✓"}
          </li>
        </ol>
      </div>

      {step === 0 && (
        <div className="alert alert-warning">
          First, end the hackathon below.
        </div>
      )}
      {step === 1 && (
        <div className="alert alert-warning">
          The hackathon is ended. Next, fund the hackathon below.
        </div>
      )}
      {step === 2 && (
        <div className="alert alert-warning">
          The hackathon is funded. Now select winners from the submissions below.
        </div>
      )}
      {step === 3 && (
        <div className="alert alert-warning">
          Winners selected! Click "Distribute Prizes" to send ETH based on rankings (1st: 50%, 2nd: 30%, 3rd: 20%).
        </div>
      )}
      {step === 4 && (
        <div className="alert alert-success">
          Prizes have been distributed! The hackathon is complete.
        </div>
      )}

      <SubmissionTable
        submissions={submissions}
        hackathon={hackathon}
        onSetWinners={handleSetWinners}
        onDistributePrizes={handleDistributePrizes}
      />
    </div>
  );
};

export default SubmissionsPage;