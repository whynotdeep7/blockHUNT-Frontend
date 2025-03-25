import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import axios from 'axios';
import logo from '../logo.png';
import API_BASE_URL from '../api/config';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const [walletAddress, setWalletAddress] = useState(user?.wallet_address || '');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully!');
    navigate('/login');
  };

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
        '${API_BASE_URL}/api/connect-wallet',
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

  return (
    <nav className="sticky py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={logo} 
            alt="blockHUNT Logo" 
            className="h-10 w-10 mr-2" 
          />
          <Link to="/" className="text-2xl font-semibold text-primary">
            blockHUNT
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/hackathons" className="text-secondary hover:text-primary transition relative group">
            Hackathons
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
          {token && user && user.role === 'organizer' && (
            <>
              <Link to="/create-hackathon" className="text-secondary hover:text-primary transition relative group">
                Create Hackathon
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
              <Link to="/organizer-dashboard" className="text-secondary hover:text-primary transition relative group">
                Dashboard
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
              <Link to="/organizer-hackathons" className="text-secondary hover:text-primary transition relative group">
                My Hackathons
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            </>
          )}
          {token ? (
            <>
              {user.role === 'organizer' && !walletAddress && (
                <button className="btn btn-primary" onClick={handleConnectWallet}>
                  Connect Wallet
                </button>
              )}
              {user.role === 'organizer' && walletAddress && (
                <span className="badge bg-secondary text-sm">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </span>
              )}
              <Link to="/user-profile" className="text-secondary hover:text-primary transition relative group">
                Profile
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-secondary hover:text-primary transition relative group">
                Login
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;