import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HeroPage = () => {
  const navigate = useNavigate();

  const handleReferClick = () => {
    navigate('/refer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Animated Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 mb-12"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Welcome to My Shop
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Refer and get rewarded
          </motion.p>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Share with your family and friends
          </motion.p>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            You get benefits too!
          </motion.p>
        </motion.div>

        {/* Animated Refer Button */}
        <motion.button
          onClick={handleReferClick}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: 'spring', stiffness: 300 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
          }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-blue-600 font-bold py-4 px-8 rounded-full text-lg shadow-md hover:shadow-lg transition-all"
        >
          Refer Now
        </motion.button>

        {/* Decorative animated elements */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 rounded-full bg-blue-200 opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-indigo-200 opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
    </div>
  );
};

export default HeroPage;