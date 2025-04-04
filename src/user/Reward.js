import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGift, FiUsers, FiAward, FiStar, FiShare2 } from 'react-icons/fi';
import { FaCoins, FaTrophy, FaWhatsapp, FaFacebook, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { RiCoupon2Line } from 'react-icons/ri';
import { useAuth } from '../context/Contectapi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RewardPage = () => {
  const { userEmail, userName } = useAuth();
  const [userData, setUserData] = useState(null);
  const [topReferrer, setTopReferrer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const baseUrl = window.location.origin;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch user data
        const userResponse = await axios.get(`https://newbackend-jvbs.onrender.com/refer/data/${userEmail}`);
        setUserData(userResponse.data);
        
        // Fetch top referrer data
        const allUsersResponse = await axios.get("https://newbackend-jvbs.onrender.com/refer/data");
        const topUser = allUsersResponse.data.reduce((top, user) => 
          user.referralCount > (top?.referralCount || 0) ? user : top, null);
        setTopReferrer(topUser);
        
      } catch (err) {
        const errorMessage = err.response?.data?.message || 
                            err.message || 
                            'Failed to fetch data';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userEmail]);

  const getShareMessage = () => {
    return `${userName || 'Your friend'} invites you to join and earn rewards!

✨ Benefits you'll get:
- Special sign-up bonus
- Exclusive deals and offers
- Early access to new features

Use this coupon code during registration:
🎁 Coupon Code: ${userData?.referralCode || 'YOUR_CODE'}

Join now: ${baseUrl}/register`;
  };

  const copyReferralCode = () => {
    if (!userData?.referralCode) {
      toast.warning('No referral code available');
      return;
    }
    
    navigator.clipboard.writeText(userData.referralCode);
    setCopied(true);
    toast.success('Referral code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const shareReferralLink = () => {
    if (!userData?.referralCode) {
      toast.warning('No referral code available');
      return;
    }
    
    const shareUrl = `${baseUrl}/register?ref=${userData.referralCode}`;
    
    if (navigator.share) {
      navigator.share({
        title: `${userName || 'Your friend'} invites you!`,
        text: getShareMessage(),
        url: shareUrl
      }).catch(() => {
        // Fallback if share is cancelled
        copyReferralCode();
      });
    } else {
      // Show custom share options
      setShowShareOptions(true);
    }
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp className="text-green-500 text-2xl" />,
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(getShareMessage())}`)
    },
    {
      name: 'Facebook',
      icon: <FaFacebook className="text-blue-600 text-2xl" />,
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${baseUrl}/register?ref=${userData?.referralCode}`)}&quote=${encodeURIComponent(getShareMessage())}`)
    },
    {
      name: 'Twitter',
      icon: <FaTwitter className="text-blue-400 text-2xl" />,
      action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareMessage())}`)
    },
    {
      name: 'Email',
      icon: <FaEnvelope className="text-red-500 text-2xl" />,
      action: () => window.open(`mailto:?subject=${encodeURIComponent(`${userName || 'Your friend'} invites you!`)}&body=${encodeURIComponent(getShareMessage())}`)
    },
    {
      name: 'Copy Link',
      icon: <FiShare2 className="text-gray-600 text-2xl" />,
      action: () => {
        navigator.clipboard.writeText(`${baseUrl}/register?ref=${userData?.referralCode}`);
        setCopied(true);
        toast.success('Link copied!');
        setTimeout(() => setCopied(false), 2000);
        setShowShareOptions(false);
      }
    },
    {
      name: 'Copy Message',
      icon: <FiShare2 className="text-gray-600 text-2xl" />,
      action: () => {
        navigator.clipboard.writeText(getShareMessage());
        setCopied(true);
        toast.success('Message copied!');
        setTimeout(() => setCopied(false), 2000);
        setShowShareOptions(false);
      }
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-6 rounded-xl shadow-lg text-red-500 max-w-md text-center"
        >
          <h2 className="text-xl font-bold mb-2">Error Loading Data</h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  // Safely handle missing user data
  const referralCount = userData?.referralCount || 0;
  const earnedCoins = referralCount * 50;
  const referralCode = userData?.referralCode || 'N/A';

  const milestones = [
    { referrals: 5, reward: 100, achieved: referralCount >= 5 },
    { referrals: 10, reward: 250, achieved: referralCount >= 10 },
    { referrals: 20, reward: 500, achieved: referralCount >= 20 },
    { referrals: 50, reward: 1500, achieved: referralCount >= 50 },
  ];

  const nextMilestone = milestones.find(m => !m.achieved) || milestones[milestones.length - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
            Your Rewards
          </h1>
          <p className="text-lg text-gray-600">
            {referralCount > 0
              ? `You've earned ${earnedCoins} coins so far!`
              : 'Start referring friends to earn rewards'}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard
            title="Total Referrals"
            value={referralCount}
            icon={<FiUsers className="text-blue-600" size={24} />}
            progress={(referralCount / 50) * 100}
            iconBg="bg-blue-100"
          />

          <StatCard
            title="Available Rewards"
            value={
              <span className="flex items-center">
                <FaCoins className="text-yellow-500 mr-1" /> {earnedCoins}
              </span>
            }
            subText={`$${(earnedCoins * 0.1).toFixed(2)} in cash value`}
            icon={<FiGift className="text-yellow-600" size={24} />}
            iconBg="bg-yellow-100"
          />

          <StatCard
            title="Next Milestone"
            value={`${Math.max(0, nextMilestone.referrals - referralCount)} more`}
            subText={`Earn ${nextMilestone.reward} coins`}
            icon={<FaTrophy className="text-purple-600" size={24} />}
            iconBg="bg-purple-100"
          />
        </div>

        {/* Top Referrer */}
        {topReferrer && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl p-6 mb-10 text-gray-800 shadow-lg border border-yellow-200"
          >
            <div className="flex items-center">
              <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg mr-4">
                <FaTrophy size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Top Referrer</h3>
                <p className="text-gray-700">
                  {topReferrer.name || 'User'} with {topReferrer.referralCount || 0} referral{topReferrer.referralCount !== 1 ? 's' : ''}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Referral Code: {topReferrer.referralCode || 'N/A'}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Milestones */}
        <MilestonesSection milestones={milestones} referralCount={referralCount} />

        {/* CTA Section */}
        <CTASection 
          referralCode={referralCode}
          onShare={shareReferralLink}
          onCopy={copyReferralCode}
          copied={copied}
        />

        {/* Share Options Modal */}
        <AnimatePresence>
          {showShareOptions && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setShowShareOptions(false)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-xl p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">Share Referral</h3>
                <div className="grid grid-cols-3 gap-4">
                  {shareOptions.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={option.action}
                      className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {option.icon}
                      <span className="mt-2 text-sm font-medium text-gray-700">{option.name}</span>
                    </motion.button>
                  ))}
                </div>
                <div className="mt-6">
                  <p className="text-sm text-gray-500 mb-2">Your referral message:</p>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="text-sm whitespace-pre-line">{getShareMessage()}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, subText, iconBg, progress }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className={`${iconBg} p-3 rounded-lg`}>
        {icon}
      </div>
    </div>
    {subText && <p className="mt-3 text-sm text-gray-500">{subText}</p>}
    {progress !== undefined && (
      <div className="mt-4 h-1 bg-gray-200 rounded-full">
        <motion.div
          className="h-1 bg-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1 }}
        />
      </div>
    )}
  </motion.div>
);

const MilestonesSection = ({ milestones, referralCount }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1 }}
    className="bg-white rounded-xl shadow-md p-6 mb-10 border border-gray-100"
  >
    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
      <RiCoupon2Line className="mr-2 text-purple-600" />
      Your Milestones
    </h2>
    <div className="space-y-6">
      {milestones.map((milestone, index) => (
        <motion.div
          key={index}
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.1 * index }}
          className="flex items-center"
        >
          <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
            milestone.achieved ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
          }`}>
            {milestone.achieved ? <FiStar /> : index + 1}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <p className={`font-medium ${
                milestone.achieved ? 'text-green-600' : 'text-gray-700'
              }`}>
                {milestone.referrals} Referrals
              </p>
              <p className="font-bold text-yellow-600 flex items-center">
                <FaCoins className="mr-1" /> {milestone.reward}
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full ${
                  milestone.achieved ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{
                  width: milestone.achieved 
                    ? '100%' 
                    : `${Math.min(100, (referralCount / milestone.referrals) * 100)}%`
                }}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const CTASection = ({ referralCode, onShare, onCopy, copied }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.4 }}
    className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-8 text-center text-white shadow-xl"
  >
    <h3 className="text-2xl font-bold mb-3">Ready to earn more?</h3>
    <p className="text-purple-100 mb-6 max-w-md mx-auto">
      Share your referral code with friends and earn 50 coins for each successful referral!
    </p>
    
    <div className="mb-4 bg-white bg-opacity-20 p-3 rounded-lg inline-block">
      <code className="font-mono text-lg font-bold">{referralCode}</code>
    </div>
    
    <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onShare}
        className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold shadow-md flex items-center"
      >
        <FiShare2 className="mr-2" /> Share Now
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onCopy}
        className="bg-purple-700 bg-opacity-50 hover:bg-opacity-70 text-white px-6 py-3 rounded-lg font-medium flex items-center"
      >
        Copy Referral Code
      </motion.button>
    </div>
    
    <AnimatePresence>
      {copied && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-3 text-sm text-yellow-300"
        >
          Code copied to clipboard!
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export default RewardPage;