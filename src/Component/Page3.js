import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import { FaTrophy } from "react-icons/fa";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ReferralDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [totalReferrals, setTotalReferrals] = useState(0);
  const [topReferrer, setTopReferrer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerRes = await axios.get("http://localhost:5000/refer/data");
        setCustomers(customerRes.data);

        const total = customerRes.data.reduce((acc, user) => acc + (user.referralCount || 0), 0);
        setTotalReferrals(total);

        const topUser = customerRes.data.reduce((top, user) => 
          user.referralCount > (top?.referralCount || 0) ? user : top, null);
        setTopReferrer(topUser);

        const campaignRes = await axios.get("http://localhost:5000/campaign/data");
        setCampaigns(campaignRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Welcome Back!</h1>
          <p className="text-gray-600 mt-2">Here's an overview of your referral campaign performance.</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[
            { title: "Total Referrals", value: totalReferrals, icon: <FiArrowUp className="text-green-500" /> },
            { title: "Conversion Rate", value: "20%", icon: <FiArrowDown className="text-red-500" /> },
            { title: "Revenue Impact", value: "$0.0", icon: <FiArrowDown className="text-red-500" /> },
            { title: "Active Campaigns", value: campaigns.length, icon: <FiArrowUp className="text-green-500" /> },
          ].map((stat, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow-lg flex justify-between items-center">
              <h3 className="font-semibold text-gray-700">{stat.title}</h3>
              <div className="flex items-center space-x-2">
                {stat.icon}
                <span className="font-bold text-2xl">{stat.value}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Referrals */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h3 className="font-semibold text-gray-700 mb-4">Recent Referrals</h3>
          <div className="space-y-4">
            {customers.length > 0 ? (
              customers.map((item, index) => (
                <motion.div key={index} whileHover={{ scale: 1.02 }}>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-gray-500 text-sm">{item.email}</p>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">No referrals yet.</p>
            )}
          </div>
        </motion.div>

        {/* Top Referrer */}
        {topReferrer && (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="bg-gradient-to-r from-yellow-100 to-yellow-300 p-6 rounded-xl shadow-lg flex items-center space-x-4">
            <FaTrophy className="text-yellow-600 text-4xl" />
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">🏆 Top Referrer</h3>
              <p className="text-gray-900 font-medium">{topReferrer.name}</p>
              <p className="text-gray-600 text-sm">Referrals: {topReferrer.referralCount}</p>
              <p className="text-gray-600 text-sm">Referral Code: {topReferrer.referralCode}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ReferralDashboard;
