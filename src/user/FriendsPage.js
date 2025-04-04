import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShare2, FiUserPlus, FiGift, FiAward } from 'react-icons/fi';
import { FaWhatsapp, FaEnvelope, FaSms } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../context/Contectapi';

const FriendsPage = () => {
  const { userEmail, couponCode, userName } = useAuth();
  const [referralCount, setReferralCount] = useState(0);
  const [reward, setReward] = useState(0);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  const [referredUsers, setReferredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name,setName]=useState();
  const [code,setCode]=useState();
  const baseUrl = window.location.origin;

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        if (!couponCode) {
          console.error("No coupon code available");
          setIsLoading(false);
          return;
        }
        
        setIsLoading(true);
        const response = await axios.get(`https://newbackend-jvbs.onrender.com/refer/by-coupon/${couponCode}`);
        const response2=await axios.get(`https://newbackend-jvbs.onrender.com/refer/data/${userEmail}`);
        setReferralCount(response.data.referralCount || 20);
        setReward(response.data.reward || 89);
        setReferredUsers(response.data.referredUsers || []);
        setName(response2.data.name || "Mahesh");
        setCode(response2.data.referralCode ||"245cfcca" )

        if (response.data.referralCount > 1) {
          await axios.post('https://newbackend-jvbs.onrender.com/refer/send-celebration', {
            email: userEmail,
            name: userName,
            count: response.data.referralCount
          });
        }
      } catch (error) {
        console.error("Error fetching referral data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReferralData();
  }, [couponCode, userEmail, userName]);

  const getShareMessage = () => {
    const registrationLink = `${baseUrl}/register`;
    
    return `👋 ${name || 'Your friend'} invited you to join our community!

🌟 Get these exclusive benefits:
✅ Special sign-up bonus
✅ Early access to new features
✅ Personalized recommendations

💎 Use this referral code during registration:
   Coupon Code: ${code || '245cfcca'}

🔗 Join now: ${registrationLink}

See you inside!`;
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp className="text-green-500 text-2xl" />,
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(getShareMessage())}`)
    },
    {
      name: 'Email',
      icon: <FaEnvelope className="text-red-500 text-2xl" />,
      action: () => window.open(`mailto:?subject=${encodeURIComponent(`Join me! ${userName || 'Your friend'} sent you an invitation`)}&body=${encodeURIComponent(getShareMessage())}`)
    },
    {
      name: 'SMS',
      icon: <FaSms className="text-blue-500 text-2xl" />,
      action: () => window.open(`sms:?body=${encodeURIComponent(getShareMessage())}`)
    },
    {
      name: 'Copy Link',
      icon: <FiShare2 className="text-gray-600 text-2xl" />,
      action: () => {
        navigator.clipboard.writeText(getShareMessage());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading your referral data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.h1
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-3"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Invite Friends & Earn Rewards!
          </motion.h1>
          <p className="text-lg text-gray-600">
            Share your referral link and get amazing benefits
          </p>
          <motion.div className="overflow-hidden my-6" style={{ whiteSpace: 'nowrap' }}>
            <motion.div
              animate={{ x: ['100%', '-100%'] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="text-xl font-semibold text-indigo-700"
            >
              🚀 Refer your friends now and unlock exciting rewards! Keep sharing to earn more! 🎉
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <motion.div whileHover={{ scale: 1.03 }} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg text-blue-600 mr-4">
                <FiUserPlus size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Your Referrals</p>
                <p className="text-3xl font-bold text-gray-800">{referralCount}</p>
              </div>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg text-yellow-600 mr-4">
                <FiGift size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Your Reward</p>
                <p className="text-3xl font-bold text-gray-800">${reward.toFixed(2)}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 mb-10 text-white shadow-lg">
          <div className="flex items-center">
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
              <FiAward size={28} />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold mb-2">
                {referralCount === 0
                  ? "Start referring friends today!"
                  : referralCount < 5
                  ? "Keep going! You're on the right track!"
                  : "Amazing! You're a referral superstar!"}
              </h3>
              <p className="text-blue-100">
                {referralCount === 0
                  ? "You haven't referred any friends yet. Share your link now to start earning rewards!"
                  : `You've referred ${referralCount} friend${referralCount !== 1 ? 's' : ''}. Refer ${5 - referralCount} more to unlock your next reward!`}
              </p>
            </div>
          </div>
        </motion.div>

        {referralCount > 0 && referredUsers.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-10 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Friends You Referred</h3>
            <ul className="space-y-3">
              {referredUsers.map((user, index) => (
                <li key={index} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="text-gray-700 font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <span className="text-sm text-gray-400">{new Date(user.joinedAt).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="bg-white rounded-xl shadow-md p-6 mb-10 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Referral Link</h3>
          <div className="flex">
            <input
              type="text"
              readOnly
              value={`${baseUrl}/register?ref=${couponCode || 'YOUR_CODE'}`}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg flex items-center"
            >
              <FiShare2 className="mr-2" /> Share
            </motion.button>
          </div>
          <AnimatePresence>
            {copied && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-2 text-sm text-green-600">
                Link copied to clipboard!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {showShareOptions && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-white rounded-xl shadow-md p-6 mb-10 overflow-hidden">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Share via</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-8 text-center text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-3">Join Our Referral Campaign!</h3>
          <p className="text-purple-100 mb-6">Refer 5 friends and get a special bonus reward! Limited time offer.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowShareOptions(true)}
            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold shadow-md flex items-center mx-auto"
          >
            <FiShare2 className="mr-2" /> Share Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default FriendsPage;