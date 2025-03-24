import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = React.useMemo(() => JSON.parse(localStorage.getItem('user')), []);
  const [walletAddress, setWalletAddress] = useState(user?.wallet_address || '');

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please log in to view your submissions');
          navigate('/login');
          return;
        }
        
        if (!user) {
          toast.error('User information not found');
          navigate('/login');
          return;
        }
        
        const response = await axios.get('http://localhost:3000/api/user/submissions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubmissions(response.data);
      } catch (err) {
        console.error('Fetch submissions error:', err);
        toast.error(err.response?.data?.error || 'Failed to load submissions');
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, [navigate, user]); 

  const handleConnectWallet = async () => {
    try {
      if (!window.ethereum) {
        toast.error('Please install MetaMask to connect your wallet');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3000/api/connect-wallet',
        { wallet_address: address },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setWalletAddress(address);
      localStorage.setItem('user', JSON.stringify({ ...user, wallet_address: address }));
      toast.success('Wallet connected successfully!');
    } catch (err) {
      console.error('Connect wallet error:', err);
      toast.error('Failed to connect wallet');
    }
  };

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
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
      <div className="card mb-4">
        <h5 className="text-xl font-medium mb-2">{user.email}</h5>
        <p className="text-secondary mb-2"><strong>Role:</strong> {user.role}</p>
        {user.role === 'organizer' && (
          <div className="mb-3">
            <label className="text-secondary mb-2 block"><strong>Wallet Address:</strong></label>
            {walletAddress ? (
              <p className="text-secondary">{walletAddress}</p>
            ) : (
              <button
                className="btn btn-primary"
                onClick={handleConnectWallet}
              >
                Connect Wallet
              </button>
            )}
          </div>
        )}
      </div>
      <h3 className="text-lg font-medium mb-3">Your Submissions</h3>
      {submissions.length === 0 ? (
        <p className="text-secondary">You have not submitted any projects yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Hackathon</th>
              <th>Idea</th>
              <th>Description</th>
              <th>GitHub Link</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id}>
                <td>{submission.hackathon_title}</td>
                <td>{submission.idea}</td>
                <td>{submission.description}</td>
                <td>
                  {submission.github_link ? (
                    <a href={submission.github_link} target="_blank" rel="noopener noreferrer">
                      Link
                    </a>
                  ) : (
                    'N/A'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserProfilePage;