import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShare2, FiUserPlus, FiGift, FiAward, FiCopy } from 'react-icons/fi';
import { FaWhatsapp, FaEnvelope, FaSms, FaRegSmileWink, FaRegLaughSquint } from 'react-icons/fa';
import { GiPartyPopper } from 'react-icons/gi';
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
  const [name, setName] = useState();
  const [code, setCode] = useState();
  const [celebrate, setCelebrate] = useState(false);
  const baseUrl = window.location.origin;

  // Confetti effect
  const Confetti = () => {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: -100,
              rotate: 0,
              opacity: 1
            }}
            animate={{
              y: window.innerHeight + 100,
              rotate: 360,
              opacity: 0
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 5,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              fontSize: `${Math.random() * 20 + 10}px`,
              color: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'][Math.floor(Math.random() * 5)]
            }}
          >
            {['🎉', '🎊', '✨', '🌟', '💎', '💰', '🎁'][Math.floor(Math.random() * 7)]}
          </motion.div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        if (!couponCode) {
          console.error("No coupon code available");
          setIsLoading(false);
          return;
        }
        
        setIsLoading(true);
        const response2 = await axios.get(`https://newbackend-jvbs.onrender.com/refer/data/${userEmail}`);
        setReferralCount(response2.data.referralCount || 0);
        setReward(response2.data.reward || 0);
        setName(response2.data.name || "Mahesh");
        setCode(response2.data.referralCode || "245cfcca");
        
        // Trigger celebration if new referrals
        if (response2.data.referralCount > referralCount) {
          setCelebrate(true);
          setTimeout(() => setCelebrate(false), 3000);
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
    const registrationLink = `${baseUrl}/register?ref=${code}`;
    
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${baseUrl}/register?ref=${code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp className="text-green-500 text-2xl" />,
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(getShareMessage())}`),
      hoverClass: "hover:bg-green-50"
    },
    {
      name: 'Email',
      icon: <FaEnvelope className="text-red-500 text-2xl" />,
      action: () => window.open(`mailto:?subject=${encodeURIComponent(`Join me! ${userName || 'Your friend'} sent you an invitation`)}&body=${encodeURIComponent(getShareMessage())}`),
      hoverClass: "hover:bg-red-50"
    },
    {
      name: 'SMS',
      icon: <FaSms className="text-blue-500 text-2xl" />,
      action: () => window.open(`sms:?body=${encodeURIComponent(getShareMessage())}`),
      hoverClass: "hover:bg-blue-50"
    },
    {
      name: 'Copy Link',
      icon: <FiCopy className="text-purple-500 text-2xl" />,
      action: copyToClipboard,
      hoverClass: "hover:bg-purple-50"
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-lg text-gray-600"
          >
            Loading your referral data...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6 relative overflow-hidden">
      {celebrate && <Confetti />}
      
      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-20 left-10 text-4xl opacity-10 text-blue-400"
        animate={{
          y: [0, 20, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <FiGift />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-1/4 right-5 text-5xl opacity-10 text-purple-400"
        animate={{
          y: [0, -20, 0],
          rotate: [0, -15, 15, 0]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <FaRegSmileWink />
      </motion.div>
      
      <motion.div 
        className="absolute top-1/3 right-20 text-3xl opacity-10 text-yellow-400"
        animate={{
          y: [0, 15, -15, 0],
          rotate: [0, 360, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <FaRegLaughSquint />
      </motion.div>

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-10"
        >
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.05 }}
          >
            <motion.h1
              className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-3"
              animate={{ 
                scale: [1, 1.05, 1],
                textShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 10px rgba(99, 102, 241, 0.5)", "0 0 0px rgba(0,0,0,0)"]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              Invite Friends & Earn Rewards!
            </motion.h1>
          </motion.div>
          
          <motion.p 
            className="text-lg text-gray-600 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Share your referral link and get amazing benefits
          </motion.p>
          
          <motion.div 
            className="bg-white/50 backdrop-blur-sm rounded-lg p-3 mb-4 shadow-sm"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <motion.div 
              className="overflow-hidden py-2" 
              style={{ whiteSpace: 'nowrap' }}
            >
              <motion.div
                animate={{ x: ['100%', '-100%'] }}
                transition={{ 
                  duration: 15, 
                  repeat: Infinity, 
                  ease: 'linear' 
                }}
                className="text-sm md:text-base font-medium text-indigo-700 inline-flex items-center"
              >
                <GiPartyPopper className="mr-2 text-yellow-500" />
                🚀 Refer your friends now and unlock exciting rewards! Keep sharing to earn more! 🎉
                <GiPartyPopper className="ml-2 text-yellow-500" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10">
          <motion.div 
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl shadow-lg p-5 md:p-6 border-l-4 border-blue-500 relative overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute -right-4 -top-4 text-8xl opacity-5 text-blue-300">
              <FiUserPlus />
            </div>
            <div className="flex items-center relative z-10">
              <motion.div 
                className="bg-blue-100 p-3 rounded-lg text-blue-600 mr-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <FiUserPlus size={24} />
              </motion.div>
              <div>
                <p className="text-sm text-gray-500">Your Referrals</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-800">{referralCount}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl shadow-lg p-5 md:p-6 border-l-4 border-yellow-500 relative overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute -right-4 -top-4 text-8xl opacity-5 text-yellow-300">
              <FiGift />
            </div>
            <div className="flex items-center relative z-10">
              <motion.div 
                className="bg-yellow-100 p-3 rounded-lg text-yellow-600 mr-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <FiGift size={24} />
              </motion.div>
              <div>
                <p className="text-sm text-gray-500">Your Reward</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-800">${reward.toFixed(2)}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-5 md:p-6 mb-8 md:mb-10 text-white shadow-lg relative overflow-hidden"
        >
          <div className="absolute -bottom-4 -right-4 text-8xl opacity-10">
            <FiAward />
          </div>
          <div className="flex items-center relative z-10">
            <motion.div 
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }} 
              transition={{ duration: 3, repeat: Infinity }} 
              className="bg-white bg-opacity-20 p-3 rounded-full mr-4"
            >
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
                  : `You've referred ${referralCount} friend${referralCount !== 1 ? 's' : ''}. Refer ${5 - Math.min(referralCount, 5)} more to unlock your next reward!`}
              </p>
            </div>
          </div>
        </motion.div>

        {referralCount > 0 && referredUsers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-md p-5 md:p-6 mb-8 md:mb-10 border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Friends You Referred</h3>
            <ul className="space-y-3">
              {referredUsers.map((user, index) => (
                <motion.li 
                  key={index} 
                  className="flex justify-between items-center border-b pb-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div>
                    <p className="text-gray-700 font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <span className="text-sm text-gray-400">{new Date(user.joinedAt).toLocaleDateString()}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-5 md:p-6 mb-8 md:mb-10 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Referral Link</h3>
          <div className="flex">
            <motion.div 
              className="flex-1 relative"
              whileHover={{ scale: 1.01 }}
            >
              <input
                type="text"
                readOnly
                value={`${baseUrl}/register?ref=${code}`}
                className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {copied && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute -top-8 right-0 bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                >
                  Copied!
                </motion.div>
              )}
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-r-lg flex items-center"
            >
              <FiShare2 className="mr-2" /> Share
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence>
          {showShareOptions && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-xl shadow-lg p-5 md:p-6 mb-8 md:mb-10 overflow-hidden"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Share via</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {shareOptions.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ 
                      scale: 1.05,
                      y: -3
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={option.action}
                    className={`flex flex-col items-center p-3 md:p-4 rounded-lg transition-all ${option.hoverClass} border border-gray-100`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                    >
                      {option.icon}
                    </motion.div>
                    <span className="mt-2 text-sm font-medium text-gray-700">{option.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 md:p-8 text-center text-white shadow-xl relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 text-9xl opacity-10">
            <GiPartyPopper />
          </div>
          <div className="relative z-10">
            <motion.h3 
              className="text-2xl font-bold mb-3"
              animate={{ 
                scale: [1, 1.03, 1],
                textShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 10px rgba(255,255,255,0.5)", "0 0 0px rgba(255,255,255,0)"]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity 
              }}
            >
              Join Our Referral Campaign!
            </motion.h3>
            <motion.p 
              className="text-purple-100 mb-6"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Refer 5 friends and get a special bonus reward! Limited time offer.
            </motion.p>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowShareOptions(true);
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: 'smooth'
                });
              }}
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold shadow-md flex items-center mx-auto"
            >
              <FiShare2 className="mr-2" /> Share Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FriendsPage;