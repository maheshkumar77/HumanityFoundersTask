import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiHome, FiTrendingUp, FiUsers, FiMail, FiSettings, FiZap } from 'react-icons/fi';
import axios from 'axios';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [gmail, setGmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(" http://localhost:5000/admin/name");
        setName(res.data.name);
        setGmail(res.data.message); // Changed from res.message to res.data.message
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { path: "/adminpage/dashboard", name: "Dashboard", icon: <FiHome /> },
    { path: "/adminpage/campaigns", name: "Campaigns", icon: <FiTrendingUp /> },
    { path: "/adminpage/customers", name: "Customers", icon: <FiUsers /> },
    { path: "/adminpage/follow-ups", name: "Follow Ups", icon: <FiMail /> },
    { path: "/adminpage/integrations", name: "Integrations", icon: <FiSettings /> },
    { path: "/adminpage/ai", name: "Referral AI", icon: <FiZap /> }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <motion.button
          onClick={toggleMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed top-4 left-4 z-50 p-2 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg md:hidden"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </motion.button>
      )}

      {/* Overlay */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.aside
            initial={{ x: isMobile ? -300 : 0, opacity: isMobile ? 0 : 1 }}
            animate={{ 
              x: isMobile ? (isOpen ? 0 : -300) : 0,
              opacity: isMobile ? (isOpen ? 1 : 0) : 1
            }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`w-64 min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl fixed top-0 left-0 z-50 ${isMobile ? 'md:hidden' : ''}`}
          >
            <div className="p-6 h-full flex flex-col">
              {/* Logo/Brand */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mb-8 text-white text-center"
              >
                <motion.h1 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold flex items-center justify-center"
                >
                  <span className="bg-white text-blue-600 p-2 rounded-lg mr-2">
                    <FiZap />
                  </span>
                  ReferralHub
                </motion.h1>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-blue-100 text-sm mt-1"
                >
                  Admin Panel
                </motion.p>
              </motion.div>

              {/* Navigation */}
              <nav className="flex-1">
                <ul className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.path}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + index * 0.1, type: 'spring' }}
                    >
                      <NavLink 
                        to={item.path} 
                        onClick={() => isMobile && setIsOpen(false)}
                        className={({ isActive }) => 
                          `flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${isActive 
                            ? 'bg-white text-blue-600 shadow-lg' 
                            : 'text-white hover:bg-blue-400 hover:bg-opacity-30'}`
                        }
                      >
                        <span className="mr-3 text-lg">{item.icon}</span>
                        {item.name}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Footer/User Info */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-auto pt-4 border-t border-blue-400 border-opacity-30"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-white">
                      <FiUsers />
                    </div>
                    <div className="ml-3 animate-pulse">
                      <div className="h-4 w-24 bg-white bg-opacity-20 rounded mb-1"></div>
                      <div className="h-3 w-32 bg-white bg-opacity-20 rounded"></div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-white">
                      <FiUsers />
                    </div>
                    <div className="ml-3">
                      <p className="text-white font-medium">{name || 'Admin User'}</p>
                      <p className="text-blue-100 text-xs">{gmail || 'admin@referralhub.com'}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;