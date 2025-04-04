import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiLogIn } from 'react-icons/fi';

const HeroPage = () => {
  const navigate = useNavigate();

  const handleReferClick = () => {
    navigate('/register');
  };

  const handleLoginClick = () => {
    navigate('/adminlogin');
  };

  // Floating circles data
  const floatingCircles = [
    { size: 'w-32 h-32', color: 'bg-blue-200', position: 'top-20 left-20', delay: 0 },
    { size: 'w-40 h-40', color: 'bg-indigo-200', position: 'bottom-10 right-10', delay: 2 },
    { size: 'w-24 h-24', color: 'bg-purple-200', position: 'top-1/3 right-1/4', delay: 1 },
    { size: 'w-28 h-28', color: 'bg-pink-200', position: 'bottom-1/4 left-1/3', delay: 1.5 }
  ];

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2 + 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  // Button animation variants
  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 1 + i * 0.2,
        type: 'spring',
        stiffness: 300
      }
    }),
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 flex items-center justify-center p-6 overflow-hidden relative">
      {/* Floating animated circles */}
      {floatingCircles.map((circle, index) => (
        <motion.div
          key={index}
          className={`absolute ${circle.size} ${circle.color} ${circle.position} rounded-full opacity-20`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 8 + index * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: circle.delay
          }}
        />
      ))}

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Main content with staggered animations */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="space-y-6 mb-16"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-gray-800 mb-8"
            custom={0}
            variants={textVariants}
          >
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">My Shop</span>
          </motion.h1>
          
          <motion.div
            className="flex flex-col items-center space-y-4"
            custom={1}
            variants={textVariants}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <FiArrowRight className="text-blue-600" />
              </div>
              <p className="text-xl md:text-2xl text-gray-600">
                Refer and get rewarded
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <FiArrowRight className="text-indigo-600" />
              </div>
              <p className="text-xl md:text-2xl text-gray-600">
                Share with your family and friends
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <FiArrowRight className="text-purple-600" />
              </div>
              <p className="text-xl md:text-2xl text-gray-600">
                You get benefits too!
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Animated Buttons with icons */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-6"
          initial="hidden"
          animate="visible"
        >
          <motion.button
            onClick={handleReferClick}
            variants={buttonVariants}
            custom={0}
            whileHover="hover"
            whileTap="tap"
            className="group relative bg-white text-blue-600 font-bold py-4 px-8 rounded-full text-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Get Started <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </motion.button>
          
          <motion.button
            onClick={handleLoginClick}
            variants={buttonVariants}
            custom={1}
            whileHover="hover"
            whileTap="tap"
            className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Admin Login <FiLogIn className="ml-2 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
          </motion.button>
        </motion.div>

        {/* Decorative animated elements */}
        <motion.div
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-blue-100 opacity-10"
          animate={{
            x: [0, 20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-200 opacity-30"
          style={{
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 100],
            x: [0, (Math.random() - 0.5) * 50],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  );
};

export default HeroPage;