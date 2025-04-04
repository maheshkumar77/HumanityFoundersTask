import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiShare2, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaWhatsapp, FaTelegram, FaInstagram } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { BsChatLeftText } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const ReferralCampaignsPage = () => {
  // Define shareOptions first
  const shareOptions = [
    { name: 'WhatsApp', icon: <FaWhatsapp className="text-green-500" size={24} />, color: 'bg-green-100' },
    { name: 'Email', icon: <HiOutlineMail className="text-gray-600" size={24} />, color: 'bg-gray-100' },
    { name: 'SMS', icon: <BsChatLeftText className="text-blue-500" size={24} />, color: 'bg-blue-100' },
    { name: 'Telegram', icon: <FaTelegram className="text-blue-400" size={24} />, color: 'bg-blue-50' },
    { name: 'Instagram', icon: <FaInstagram className="text-pink-500" size={24} />, color: 'bg-pink-100' }
  ];

  // State variables
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareMessage, setShareMessage] = useState('Check out this amazing referral program! Register here: ');
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedCampaign, setExpandedCampaign] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("https://newbackend-jvbs.onrender.com/campaign/data");
        setCampaigns(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching campaigns:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleShare = (platform) => {
    let url = '';
    const baseUrl = window.location.origin;
    const registerLink = `${baseUrl}/register`;
    const message = encodeURIComponent(`${shareMessage} ${registerLink}`);
    
    switch(platform) {
      case 'WhatsApp':
        url = `https://wa.me/?text=${message}`;
        break;
      case 'Email':
        url = `mailto:?body=${message}`;
        break;
      case 'SMS':
        url = `sms:?body=${message}`;
        break;
      case 'Telegram':
        url = `https://t.me/share/url?url=${registerLink}&text=${shareMessage}`;
        break;
      case 'Instagram':
        url = `https://instagram.com`;
        break;
      default:
        break;
    }
    
    window.open(url, '_blank');
    setShowShareModal(false);
  };

  const copyToClipboard = () => {
    const registerLink = `${window.location.origin}/register`;
    navigator.clipboard.writeText(registerLink);
    alert('Registration link copied to clipboard!');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateConversionRate = (campaign) => {
    return `${Math.floor(Math.random() * 30) + 10}%`;
  };

  const calculateROI = (campaign) => {
    return `${Math.floor(Math.random() * 200) + 50}%`;
  };

  const filteredCampaigns = campaigns
    .filter(campaign => {
      const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          campaign.aboutCampaign.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOption === 'newest') return new Date(b.startDate) - new Date(a.startDate);
      if (sortOption === 'oldest') return new Date(a.startDate) - new Date(b.startDate);
      if (sortOption === 'name') return a.title.localeCompare(b.title);
      return 0;
    });

  const toggleCampaignExpand = (id) => {
    setExpandedCampaign(expandedCampaign === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">Your Referral Campaigns</h1>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-2 gap-4">
            <p className="text-gray-600">
              {isLoading ? 'Loading...' : `${filteredCampaigns.length} Campaigns • ${campaigns.filter(c => c.status === 'active').length} Active`}
            </p>
            <Link to="/adminpage/integrations">
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3 rounded-lg shadow-md"
              >
                + Create Campaign
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4"
        >
          <div className="relative flex-1 w-full md:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Search campaigns..."
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <div className="relative">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-between w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <FiFilter className="mr-2 text-gray-600" />
                  <span>Filter & Sort</span>
                </div>
                {showFilters ? <FiChevronUp className="ml-2" /> : <FiChevronDown className="ml-2" />}
              </button>
              
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-10 overflow-hidden"
                  >
                    <div className="p-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="w-full border border-gray-300 rounded-md p-2 text-sm"
                        >
                          <option value="all">All Statuses</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="draft">Draft</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                        <select
                          value={sortOption}
                          onChange={(e) => setSortOption(e.target.value)}
                          className="w-full border border-gray-300 rounded-md p-2 text-sm"
                        >
                          <option value="newest">Newest First</option>
                          <option value="oldest">Oldest First</option>
                          <option value="name">Alphabetical</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Loading and Error States */}
        {isLoading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center h-64"
          >
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { 
                  repeat: Infinity, 
                  duration: 1.5, 
                  ease: "linear" 
                },
                scale: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1
                }
              }}
              className="rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
            ></motion.div>
          </motion.div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg shadow-sm"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Campaigns List */
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {filteredCampaigns.length > 0 ? (
              filteredCampaigns.map((campaign) => (
                <motion.div 
                  key={campaign._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.005 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">{campaign.title}</h2>
                        <p className="text-gray-500 text-sm mt-1">
                          {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {campaign.status === 'active' ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 animate-pulse">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Inactive
                          </span>
                        )}
                        <button 
                          onClick={() => toggleCampaignExpand(campaign._id)}
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          {expandedCampaign === campaign._id ? (
                            <FiChevronUp className="text-gray-500" />
                          ) : (
                            <FiChevronDown className="text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedCampaign === campaign._id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <p className="text-sm text-gray-500">Reward</p>
                              <p className="text-lg font-semibold">
                                {campaign.rewardType === 'Discount' 
                                  ? `${campaign.discountValue}${campaign.rewardFormat === 'Percentage' ? '%' : '$'} off`
                                  : campaign.rewardType}
                              </p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                              <p className="text-sm text-gray-500">Conversion</p>
                              <p className="text-lg font-semibold">{calculateConversionRate(campaign)}</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                              <p className="text-sm text-gray-500">ROI</p>
                              <p className="text-lg font-semibold">{calculateROI(campaign)}</p>
                            </div>
                          </div>

                          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                            <h3 className="text-sm font-medium text-blue-800 mb-2">About This Campaign</h3>
                            <p className="text-sm text-blue-800">{campaign.aboutCampaign}</p>
                          </div>

                          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Campaign Message</h3>
                            <p className="text-sm text-gray-700 italic">"{campaign.campaignMessage}"</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                      <div className="text-sm text-gray-600 flex-1">
                        <p>Registration link: <span className="text-blue-600">https://example.com/register</span></p>
                      </div>
                      <div className="flex gap-2">
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowShareModal(true)}
                          className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg shadow-md"
                        >
                          <FiShare2 className="mr-2" />
                          Share
                        </motion.button>
                        <Link to={`/campaigns/${campaign._id}`}>
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg shadow-sm"
                          >
                            View Details
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-sm p-8 text-center"
              >
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FiSearch className="text-gray-400 text-3xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No campaigns found</h3>
                <p className="text-gray-500">
                  {searchQuery ? 'Try adjusting your search or filter' : 'Create your first campaign to get started'}
                </p>
                <div className="mt-6">
                  <Link to="/adminpage/integrations">
                    <motion.button 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3 rounded-lg shadow-md"
                    >
                      + Create Campaign
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Share Registration Link</h3>
                <button 
                  onClick={() => setShowShareModal(false)} 
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Custom Message</label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                    value={shareMessage}
                    onChange={(e) => setShareMessage(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-5 gap-3">
                  {shareOptions.map((option) => (
                    <motion.button
                      key={option.name}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleShare(option.name)}
                      className={`flex flex-col items-center p-3 rounded-lg ${option.color} hover:opacity-90 transition-all`}
                    >
                      {option.icon}
                      <span className="mt-2 text-xs">{option.name}</span>
                    </motion.button>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Registration link:</p>
                  <div className="flex">
                    <input
                      type="text"
                      readOnly
                      value={`${window.location.origin}/register`}
                      className="flex-1 p-2 border border-gray-300 rounded-l-lg text-sm truncate"
                    />
                    <button 
                      onClick={copyToClipboard}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg text-sm"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReferralCampaignsPage;