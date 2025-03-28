import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiArrowUp, FiArrowDown, FiChevronRight } from "react-icons/fi";

const ReferralDashboard = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/refer/data");
        setCustomers(res.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">Welcome back</h1>
          <p className="text-gray-600 mt-2">
            Here's an overview of your referral campaign performance
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {[
            { title: "Total Referrals", value: "1,234", icon: <FiArrowUp className="text-green-500 mr-1" /> },
            { title: "Conversion Rate", value: "23.5%", icon: <FiArrowDown className="text-red-500 mr-1" /> },
            { title: "Revenue Impact", value: "$12,345", icon: <FiArrowDown className="text-red-500 mr-1" /> },
            { title: "Active Campaigns", value: "3", icon: <FiArrowUp className="text-green-500 mr-1" /> },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="font-semibold text-gray-700 mb-4">{stat.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Vs last month</span>
                <div className="flex items-center">
                  {stat.icon}
                  <span className="font-bold text-2xl">{stat.value}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Referrals */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-sm mb-8"
        >
          <h3 className="font-semibold text-gray-700 mb-4">Recent Referrals</h3>
          <div className="space-y-4">
            {customers.map((item, index) => (
              <motion.div key={index} whileHover={{ scale: 1.02 }}>
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-500 text-sm">{item.gmail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Assistant Section */}
      
      </div>
    </div>
  );
};

export default ReferralDashboard;
