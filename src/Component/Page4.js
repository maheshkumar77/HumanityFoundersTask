import React, { useEffect, useState } from 'react';
import { FiPlus, FiSearch, FiChevronDown } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ReferralCampaigns = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('date');
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get(" http://localhost:5000/campaign/data");
        setCampaigns(res.data);
      } catch (error) {
        setError("Error fetching campaign data");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  const activeCampaigns = campaigns.filter(campaign => campaign.status === 'active').length;

  const handleCreateCampaign = () => {
    navigate('/adminpage/integrations');
  };

  const handleViewAnalytics = (campaignId) => {
    navigate(`/adminpage/update/${campaignId}`);
  };

  const handleEditSettings = (campaignId) => {
    navigate(`/adminpage/update/${campaignId}`);
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    if (sortOption === 'date') {
      return new Date(b.startDate) - new Date(a.startDate);
    } else if (sortOption === 'name') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const cardHover = {
    scale: 1.02,
    boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
    transition: {
      duration: 0.3
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Your Referral Campaigns</h1>
            <p className="text-gray-600 mt-1">
              <span className="font-semibold text-blue-600">{campaigns.length}</span> Campaigns • 
              <span className="font-semibold text-green-600"> {activeCampaigns}</span> Active
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreateCampaign}
            className="mt-4 md:mt-0 flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg shadow-md transition-all"
          >
            <FiPlus className="mr-2" />
            Create Campaign
          </motion.button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-grow">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-200 pl-10 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none border border-gray-200 p-3 pr-8 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </motion.div>

        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded"
          >
            <p>{error}</p>
          </motion.div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 mb-8"
          >
            {sortedCampaigns.length > 0 ? (
              sortedCampaigns.map((campaign) => (
                <motion.div 
                  key={campaign._id}
                  variants={itemVariants}
                  whileHover={cardHover}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">{campaign.title}</h2>
                      <p className="text-gray-500">
                        {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`mt-2 md:mt-0 px-3 py-1 rounded-full text-sm font-medium ${
                      campaign.status === 'active' 
                        ? 'bg-green-100 text-green-800 animate-pulse' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-blue-600 text-sm font-medium">Reward Type</p>
                      <p className="font-bold text-lg text-blue-800">{campaign.rewardType}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-purple-600 text-sm font-medium">Reward Format</p>
                      <p className="font-bold text-lg text-purple-800">{campaign.rewardFormat}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-green-600 text-sm font-medium">Discount Value</p>
                      <p className="font-bold text-lg text-green-800">{campaign.discountValue}%</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-6 border border-blue-100">
                    <p className="text-blue-800 font-medium">{campaign.campaignMessage}</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleViewAnalytics(campaign._id)}
                      className="px-5 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm font-medium text-blue-700 transition-all shadow-sm"
                    >
                      View Analytics
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEditSettings(campaign._id)}
                      className="px-5 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-all shadow-sm"
                    >
                      Edit Settings
                    </motion.button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white p-8 rounded-xl shadow-sm text-center border border-gray-100"
              >
                <div className="max-w-md mx-auto">
                  <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No campaigns found</h3>
                  <p className="mt-2 text-gray-500">
                    {searchQuery ? 'No campaigns match your search.' : 'You currently have no campaigns.'}
                  </p>
                  <div className="mt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCreateCampaign}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                      Create New Campaign
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ReferralCampaigns;