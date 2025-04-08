import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp, FiUser, FiGift, FiShare2, FiCopy } from "react-icons/fi";
import { FaTrophy, FaRegSmileWink } from "react-icons/fa";
import { RiCoinsLine } from "react-icons/ri";
import { BsStars } from "react-icons/bs";
import { useAuth } from '../context/Contectapi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cardHover = {
  hover: { 
    y: -5,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 }
  }
};

const pulse = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const UserDashboard = () => {
  const { userEmail } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://newbackend-jvbs.onrender.com/refer/data/${userEmail}`);
        const transformedData = {
          ...response.data,
          name: response.data.name || 'User',
          referralCount: response.data.referralCount || 0,
          rewards: response.data.rewards || 0,
          referralCode: response.data.referralCode || 'N/A',
          referredBy: response.data.referredBy || null
        };
        setUserData(transformedData);
      } catch (err) {
        console.error("API Error:", err);
        setError(err.response?.data?.message || err.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userEmail]);

  const copyToClipboard = () => {
    if (!userData?.referralCode) {
      toast.warning('No referral code available');
      return;
    }
    const referralLink = `${window.location.origin}/register`;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Registration link copied to clipboard!');
  };

  const shareReferralCode = async () => {
    if (!userData?.referralCode) {
      toast.warning('No referral code available');
      return;
    }

    try {
      const baseUrl = window.location.origin;
      const shareMessage = `${userData.name || 'Your friend'} invites you to join and earn rewards!\n\n✨ Benefits you'll get:\n- Special sign-up bonus\n- Exclusive deals and offers\n- Early access to new features\n\nUse this coupon code during registration:\n🎁 Coupon Code: ${userData.referralCode}\n\nJoin now: ${baseUrl}/register`;
      
      const shareData = {
        title: `${userData.name || 'Your friend'} invites you!`,
        text: shareMessage,
        url: `${baseUrl}/register`,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers without Web Share API
        navigator.clipboard.writeText(shareMessage);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success('Referral message copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
      // Fallback if sharing is cancelled
      const fallbackMessage = `Use my coupon code ${userData.referralCode} at ${window.location.origin}/register`;
      navigator.clipboard.writeText(fallbackMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Referral message copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 p-8 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-16 w-16 rounded-full border-4 border-blue-500 border-t-transparent"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 p-8 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-6 rounded-2xl shadow-xl text-red-500 max-w-md text-center"
        >
          <h2 className="text-xl font-bold mb-2">Oops!</h2>
          <p>{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mb-10 text-center sm:text-left"
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Welcome back, {userData?.name.split(" ")[0]}!
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Your referral dashboard at a glance
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Referral Code Card */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            whileHover="hover"
            variants={cardHover}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Your Code</h3>
                  <div className="mt-2 flex items-center">
                    <motion.p 
                      className="text-2xl font-bold text-gray-900 font-mono"
                      initial={{ x: -10 }}
                      animate={{ x: 0 }}
                    >
                      {userData?.referralCode}
                    </motion.p>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={copyToClipboard}
                      className="ml-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                    >
                      <FiCopy />
                    </motion.button>
                  </div>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                  <FiShare2 size={24} />
                </div>
              </div>
              <AnimatePresence>
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-3 text-sm text-green-600 flex items-center"
                  >
                    <span>Copied to clipboard!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
              <button 
                onClick={shareReferralCode}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center"
              >
                Share your code <FiShare2 className="ml-1" />
              </button>
            </div>
          </motion.div>

          {/* Referrals Card */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            whileHover="hover"
            variants={cardHover}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Referrals</h3>
                  <div className="mt-2 flex items-center">
                    <motion.p 
                      className="text-2xl font-bold text-gray-900"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                    >
                      {userData?.referralCount}
                    </motion.p>
                    <motion.div
                      animate={userData?.referralCount > 0 ? "pulse" : ""}
                      variants={pulse}
                      className="ml-3 flex items-center text-green-500"
                    >
                      <FiArrowUp className="mr-1" />
                      <span className="text-sm font-medium">+{userData?.referralCount * 20}%</span>
                    </motion.div>
                  </div>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
                  <FiUser size={24} />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
              <button className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center">
                View referrals <FiArrowUp className="ml-1 transform rotate-90" />
              </button>
            </div>
          </motion.div>

          {/* Rewards Card */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            whileHover="hover"
            variants={cardHover}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Your Rewards</h3>
                  <div className="mt-2 flex items-center">
                    <motion.p 
                      className="text-2xl font-bold text-gray-900"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                    >
                      ${userData?.rewards || 0}
                    </motion.p>
                    <motion.div
                      animate={userData?.rewards > 0 ? "pulse" : ""}
                      variants={pulse}
                      className="ml-3 flex items-center text-yellow-500"
                    >
                      <RiCoinsLine className="mr-1" />
                      <span className="text-sm font-medium">{userData?.rewards} coins</span>
                    </motion.div>
                  </div>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg text-yellow-600">
                  <FiGift size={24} />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
              <button className="text-sm font-medium text-yellow-600 hover:text-yellow-700 flex items-center">
                Redeem rewards <FiGift className="ml-1" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
                  <FiUser />
                </span>
                Your Profile Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Full Name</p>
                    <p className="text-lg font-medium text-gray-900 mt-1">{userData?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email Address</p>
                    <p className="text-lg font-medium text-gray-900 mt-1">{userData?.email}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Referred By</p>
                    <p className="text-lg font-medium text-gray-900 mt-1">
                      {userData?.referredBy || "No one (you're the first!)"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Member Since</p>
                    <p className="text-lg font-medium text-gray-900 mt-1">January 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Achievement Card */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1 }}
            className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl shadow-md overflow-hidden border border-yellow-200"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <span className="bg-yellow-100 text-yellow-600 p-2 rounded-lg mr-3">
                    <FaTrophy />
                  </span>
                  Your Achievements
                </h3>
                <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
                  Level 1
                </div>
              </div>

              {userData?.referralCount > 0 ? (
                <>
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mb-6"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Referral Progress</span>
                      <span className="text-sm font-bold text-gray-900">
                        {userData.referralCount}/10
                      </span>
                    </div>
                    <div className="w-full bg-yellow-300 rounded-full h-2.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(userData.referralCount / 10) * 100}%` }}
                        transition={{ duration: 1, delay: 1.4 }}
                        className="bg-yellow-600 h-2.5 rounded-full"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center">
                      <div className="bg-white p-2 rounded-lg mr-3">
                        <BsStars className="text-yellow-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Referral Expert</p>
                        <p className="text-sm text-gray-600">
                          {10 - userData.referralCount} more to unlock
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center opacity-50">
                      <div className="bg-white p-2 rounded-lg mr-3">
                        <RiCoinsLine className="text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Top Referrer</p>
                        <p className="text-sm text-gray-600">50 referrals needed</p>
                      </div>
                    </div>
                  </motion.div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="text-center py-8"
                >
                  <div className="bg-white bg-opacity-50 rounded-full p-4 inline-block mb-4">
                    <FaRegSmileWink className="text-yellow-500 text-3xl" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">No achievements yet</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Start referring friends to unlock achievements
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={shareReferralCode}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Share Your Code
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.2 }}
          className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8 text-center">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="text-2xl font-bold text-white mb-3"
            >
              Ready to boost your rewards?
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="text-blue-100 mb-6 max-w-2xl mx-auto"
            >
              Share your unique coupon code with friends and earn amazing rewards for every successful referral.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={shareReferralCode}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold shadow-md flex items-center"
              >
                <FiShare2 className="mr-2" /> Share Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyToClipboard}
                className="bg-blue-700 bg-opacity-50 hover:bg-opacity-70 text-white px-6 py-3 rounded-lg font-medium flex items-center"
              >
                <FiCopy className="mr-2" /> Copy Registration Link
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;