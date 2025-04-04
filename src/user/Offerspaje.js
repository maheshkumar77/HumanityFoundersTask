import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGift, FiClock, FiPercent, FiCalendar, FiShare2 } from 'react-icons/fi';
import Confetti from 'react-confetti';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { useAuth } from '../context/Contectapi';

const OffersPage = () => {
   const { userEmail } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [celebrating, setCelebrating] = useState(false);
  const [claimedOffer, setClaimedOffer] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [formdata,setFormData]=useState({
    subject:"",
    text:"",
    email:userEmail,
  })

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('https://newbackend-jvbs.onrender.com/campaign/data');
        setCampaigns(response.data);
        setFormData({
          subject: response.data.title,
          text:response.data.aboutCampaign,
          email:userEmail,
        })
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCampaigns();

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sendMailtoUser= async ()=>{
 try{
  
  const response= await axios.post("https://newbackend-jvbs.onrender.com/user/sendmail", formatDate);
  console.log(response.data);
  alert(response)
 }catch(error){
 console.log(error);
 }
  }
  const handleClaimOffer = (campaign) => {
    setClaimedOffer(campaign);
    setCelebrating(true);
    sendMailtoUser();
    // Stop celebration after 5 seconds
    setTimeout(() => {
      setCelebrating(false);
    }, 5000);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p>Error loading offers: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Confetti Celebration */}
      <AnimatePresence>
        {celebrating && (
          <>
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              recycle={false}
              numberOfPieces={500}
              gravity={0.2}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="text-green-500 text-6xl mb-4"
                >
                  🎉
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Offer Claimed Successfully!
                </h3>
                <p className="text-gray-600 mb-6">
                  You've claimed {claimedOffer?.title || 'this offer'} and earned {claimedOffer?.discountValue}% off!
                </p>
                
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-2">Share with friends</h4>
                  <div className="flex justify-center space-x-4">
                    <FacebookShareButton
                      url={window.location.href}
                      quote={`I just claimed ${claimedOffer?.discountValue}% off at our store! Use code ${claimedOffer?.title} to get your discount too!`}
                    >
                      <div className="bg-blue-600 text-white p-2 rounded-full">
                        <FiShare2 size={20} />
                      </div>
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={window.location.href}
                      title={`Just got ${claimedOffer?.discountValue}% off with ${claimedOffer?.title}!`}
                    >
                      <div className="bg-blue-400 text-white p-2 rounded-full">
                        <FiShare2 size={20} />
                      </div>
                    </TwitterShareButton>
                    <WhatsappShareButton
                      url={window.location.href}
                      title={`Check out this ${claimedOffer?.discountValue}% discount I found! Use code ${claimedOffer?.title}`}
                    >
                      <div className="bg-green-500 text-white p-2 rounded-full">
                        <FiShare2 size={20} />
                      </div>
                    </WhatsappShareButton>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCelebrating(false)}
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg font-medium"
                >
                  Continue Shopping
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Current Offers & Campaigns
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Discover our latest promotions and special deals
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={campaign._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`bg-white rounded-xl shadow-md overflow-hidden border-l-4 ${
                campaign.status === 'active' ? 'border-green-500' : 'border-gray-300'
              }`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {campaign.title || 'Special Offer'}
                    </h2>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      campaign.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <FiGift size={20} />
                  </div>
                </div>

                <p className="mt-4 text-gray-600">{campaign.aboutCampaign || campaign.campaignMessage}</p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <FiCalendar className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">
                      {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FiPercent className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">
                      {campaign.discountValue}% {campaign.rewardFormat}
                    </span>
                  </div>
                </div>

                {campaign.status === 'active' && (
                  <div className="mt-6">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleClaimOffer(campaign)}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg font-medium"
                    >
                      Claim Offer
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {campaigns.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="bg-gray-100 p-6 rounded-lg inline-block">
              <FiGift className="text-gray-400 text-4xl mx-auto" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No current offers</h3>
            <p className="mt-1 text-gray-500">Check back later for new promotions!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OffersPage;