import React, { useState, useEffect } from 'react';
import HackathonCard from '../components/HackathonCard';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const HackathonsPage = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // For filtering hackathons
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchHackathons = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/hackathons');
        // Sort hackathons - active ones first
        const sortedHackathons = response.data.sort((a, b) => {
          // If a is active and b is not, a comes first
          if (a.status === 'active' && b.status !== 'active') return -1;
          // If b is active and a is not, b comes first
          if (b.status === 'active' && a.status !== 'active') return 1;
          // Otherwise, maintain original order
          return 0;
        });
        setHackathons(sortedHackathons);
      } catch (err) {
        console.error('Fetch hackathons error:', err);
        toast.error('Failed to load hackathons');
      } finally {
        setLoading(false);
      }
    };
    fetchHackathons();
  }, []);

  // Make sure any modifications to hackathons maintain the sorting
  const updateHackathon = (id, updates) => {
    const updatedHackathons = hackathons.map(h => 
      h.id === id ? { ...h, ...updates } : h
    );
    
    // Re-sort after updating to maintain active-first order
    const sortedUpdatedHackathons = updatedHackathons.sort((a, b) => {
      if (a.status === 'active' && b.status !== 'active') return -1;
      if (b.status === 'active' && a.status !== 'active') return 1;
      return 0;
    });
    
    setHackathons(sortedUpdatedHackathons);
  };

  // Filter displayed hackathons
  const filteredHackathons = filter === 'all' 
    ? hackathons 
    : hackathons.filter(h => h.status === filter);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      scale: 1.03,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="relative w-24 h-24">
          <div className="absolute border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent rounded-full w-24 h-24 animate-spin"></div>
          <div className="absolute border-4 border-t-transparent border-r-blue-400 border-b-transparent border-l-transparent rounded-full w-20 h-20 top-2 left-2 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
          <div className="absolute border-4 border-t-transparent border-r-transparent border-b-blue-300 border-l-transparent rounded-full w-16 h-16 top-4 left-4 animate-spin" style={{ animationDuration: '1.5s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Animated header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          BlockHunt Hackathons
        </h1>
        <p className="text-gray-600 mt-2">Discover and participate in blockchain hackathons</p>
      </motion.div>

      {/* Filter buttons */}
      <motion.div 
        className="flex justify-center mb-8 space-x-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <button 
          className={`px-5 py-2 rounded-full transition-all duration-300 ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-800 hover:bg-gray-400'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`px-5 py-2 rounded-full transition-all duration-300 ${filter === 'active' ? 'bg-green-600 text-white' : 'bg-gray-800 hover:bg-gray-400'}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={`px-5 py-2 rounded-full transition-all duration-300 ${filter === 'ended' ? 'bg-red-600 text-white' : 'bg-gray-800 hover:bg-gray-400'}`}
          onClick={() => setFilter('ended')}
        >
          Ended
        </button>
      </motion.div>

      {/* Grid layout for hackathons */}
      {filteredHackathons.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-20"
        >
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-500 text-xl">No hackathons available in this category.</p>
        </motion.div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredHackathons.map((hackathon) => (
            <motion.div 
              key={hackathon.id}
              variants={cardVariants}
              whileHover="hover"
              className="h-full"
            >
              <HackathonCard
                hackathon={hackathon}
                user={user}
                isOrganizer={user?.role === 'organizer' && user?.id === hackathon.organizer_id}
                onFund={(id) => {
                  updateHackathon(id, {
                    funded_amount: hackathon.prize_pool,
                    funded_at: new Date().toISOString()
                  });
                }}
                onEnd={(id) => {
                  updateHackathon(id, {
                    status: 'ended',
                    manually_ended: true,
                    manually_ended_at: new Date().toISOString()
                  });
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default HackathonsPage;