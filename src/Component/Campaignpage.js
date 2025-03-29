import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShare2, FiLogIn, FiCopy } from 'react-icons/fi';

const CampaignPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showShareOptions, setShowShareOptions] = useState({});
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Fetch campaign data
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(' http://localhost:5000/campaign/data');
        setCampaigns(response.data);
        // Initialize share options state for each campaign
        const shareStates = {};
        response.data.forEach(campaign => {
          shareStates[campaign._id] = false;
        });
        setShowShareOptions(shareStates);
      } catch (err) {
        setError('Failed to fetch campaign data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(' http://localhost:5000/login', loginForm);
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
      setError('');
    } catch (err) {
      setError('Invalid credentials');
      console.error(err);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  // Copy coupon code
  const copyCouponCode = (message) => {
    navigator.clipboard.writeText(message.split(' ').pop());
    alert('Coupon code copied!');
  };

  // Toggle share options for a specific campaign
  const toggleShareOptions = (campaignId) => {
    setShowShareOptions(prev => ({
      ...prev,
      [campaignId]: !prev[campaignId]
    }));
  };

  // Share campaign
  const shareCampaign = (platform, message) => {
    let url = '';
    
    switch(platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(message)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
        break;
      default:
        navigator.clipboard.writeText(message);
        alert('Message copied to clipboard!');
        return;
    }
    
    window.open(url, '_blank');
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-red-500">{error}</p>
    </div>
  );

  if (campaigns.length === 0) return (
    <div className="flex justify-center items-center h-screen">
      <p>No campaign data found</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Current Campaigns</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map(campaign => (
          <motion.div 
            key={campaign._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            {/* Campaign Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
              <h1 className="text-2xl font-bold">{campaign.title}</h1>
              <p className="mt-2">{campaign.aboutCampaign}</p>
            </div>

            {/* Campaign Details */}
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold mb-2">Campaign Details</h2>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Status:</span> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        campaign.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">Period:</span> 
                      <span className="ml-2">
                        {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">Reward:</span> 
                      <span className="ml-2">
                        {campaign.rewardType}: {campaign.discountValue}% {campaign.rewardFormat}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="font-medium text-blue-800 mb-2">Special Offer</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-md">{campaign.campaignMessage}</p>
                    <button 
                      onClick={() => copyCouponCode(campaign.campaignMessage)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                      title="Copy coupon code"
                    >
                      <FiCopy />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                {!isLoggedIn ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('login-modal').showModal()}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                  >
                    <FiLogIn size={16} /> Login to Refer
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/refer')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
                  >
                    Refer Friends
                  </motion.button>
                )}

                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleShareOptions(campaign._id)}
                    className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 text-sm"
                  >
                    <FiShare2 size={16} /> Share
                  </motion.button>

                  {showShareOptions[campaign._id] && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg p-2 z-10 w-32"
                    >
                      <button 
                        onClick={() => shareCampaign('whatsapp', campaign.campaignMessage)}
                        className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm"
                      >
                        WhatsApp
                      </button>
                      <button 
                        onClick={() => shareCampaign('facebook', campaign.campaignMessage)}
                        className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm"
                      >
                        Facebook
                      </button>
                      <button 
                        onClick={() => shareCampaign('twitter', campaign.campaignMessage)}
                        className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm"
                      >
                        Twitter
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Login Modal (same as before) */}
      <dialog id="login-modal" className="rounded-lg shadow-xl p-6">
        <form onSubmit={handleLogin} className="space-y-4">
          <h3 className="text-xl font-bold">Login</h3>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={loginForm.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => document.getElementById('login-modal').close()}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default CampaignPage;