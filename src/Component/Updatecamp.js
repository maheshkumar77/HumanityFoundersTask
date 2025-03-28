import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const AnalyticsPage = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [campaignData, setCampaignData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching campaign data for ID:', campaignId);
    
    if (!campaignId) {
      setError('No campaign ID provided in URL');
      setLoading(false);
      return;
    }
    
    const fetchCampaignData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/campaign/${campaignId}`);
        setCampaignData(response.data);
        setLoading(false);
      } catch (err) {
        setError(`Failed to load campaign data: ${err.message}`);
        setLoading(false);
      }
    };

    fetchCampaignData();
  }, [campaignId]);

  const handleUpdate = () => {
    navigate(`/updates/${campaignId}`);
  };

  const handleChange = () => {
    navigate(`/change/${campaignId}`);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
      ></motion.div>
    </div>
  );

  if (error) return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center min-h-screen"
    >
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error: {error}
      </div>
    </motion.div>
  );

  if (!campaignData) return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center justify-center min-h-screen"
    >
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
        No campaign data found
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Header Section */}
      <header className="mb-8">
        <motion.h1 
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="text-3xl font-bold text-gray-800"
        >
          {campaignData.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600"
        >
          {campaignData.aboutCampaign}
        </motion.p>
      </header>

      {/* Campaign Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Campaign Period */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h3 className="text-gray-600 font-medium mb-2">Campaign Period</h3>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Start:</span> {new Date(campaignData.startDate).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">End:</span> {new Date(campaignData.endDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              {new Date() > new Date(campaignData.endDate) ? 'Ended' : 'Active'}
            </p>
          </div>
        </motion.div>

        {/* Reward Information */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h3 className="text-gray-600 font-medium mb-2">Reward Details</h3>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Type:</span> {campaignData.rewardType}
            </p>
            <p>
              <span className="font-semibold">Format:</span> {campaignData.rewardFormat}
            </p>
            {campaignData.discountValue && (
              <p>
                <span className="font-semibold">Value:</span> {campaignData.discountValue}%
              </p>
            )}
          </div>
        </motion.div>

        {/* Campaign Status */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h3 className="text-gray-600 font-medium mb-2">Campaign Status</h3>
          <div className="flex items-center">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              campaignData.status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {campaignData.status}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            ID: {campaignData._id}
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Campaign Message */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-lg shadow p-6 lg:w-1/3"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Campaign Message</h3>
          <div className="bg-blue-50 text-blue-800 p-4 rounded-lg mb-4">
            {campaignData.campaignMessage}
          </div>
          
          <div className="space-y-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUpdate}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Edit Campaign
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              Share Campaign
            </motion.button>
          </div>
        </motion.div>

        {/* Campaign Summary */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-lg shadow p-6 lg:w-2/3"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Campaign Summary</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">About this campaign</h4>
              <p className="text-gray-600">{campaignData.aboutCampaign}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Reward Type</h4>
                <p className="text-gray-600">{campaignData.rewardType}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Reward Value</h4>
                <p className="text-gray-600">
                  {campaignData.rewardFormat === 'Percentage' 
                    ? `${campaignData.discountValue}%` 
                    : `$${campaignData.discountValue}`}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Start Date</h4>
                <p className="text-gray-600">{new Date(campaignData.startDate).toLocaleDateString()}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">End Date</h4>
                <p className="text-gray-600">{new Date(campaignData.endDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow p-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleChange}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            Edit Campaign
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleChange}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            Duplicate Campaign
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleChange}
            className="px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-lg transition"
          >
            Pause Campaign
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleChange}
            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition"
          >
            End Campaign
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnalyticsPage;