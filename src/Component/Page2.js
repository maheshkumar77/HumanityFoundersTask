import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowUp,
  FiArrowDown,
  FiChevronRight,
  FiUserPlus,
} from "react-icons/fi";

const CustomersDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const previousCount = 5; // Assuming last month's count for demo

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

  const currentCount = customers.length;
  const newCustomers = Math.max(0, currentCount - previousCount);
  const conversionRate = previousCount
    ? ((newCustomers / previousCount) * 100).toFixed(2) + "%"
    : "N/A";

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Customers
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and monitor your customer referral activities.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            {
              title: "Total Customers",
              value: currentCount,
              icon: null,
            },
            {
              title: "New Customers",
              value: newCustomers,
              icon:
                newCustomers > 0 ? (
                  <FiArrowUp className="text-green-500 mr-1" />
                ) : (
                  <FiArrowDown className="text-red-500 mr-1" />
                ),
            },
            {
              title: "Average Conversion Rate",
              value: conversionRate,
              icon: <FiArrowUp className="text-green-500 mr-1" />,
            },
            {
              title: "Total Revenue Generated",
              value: "$23,900",
              icon: null,
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-4 rounded-lg shadow-sm"
            >
              <h3 className="text-gray-500 text-sm mb-2">{stat.title}</h3>
              <div className="flex items-end justify-between">
                <div className="flex items-center">
                  {stat.icon}
                  <span className="font-bold text-2xl">{stat.value}</span>
                </div>
                <div className="text-sm text-gray-500">vs last month</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* AI Assistant Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:w-1/3 bg-white p-6 rounded-lg shadow-sm"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Referral AI Assistant
            </h2>
            <h3 className="font-semibold text-gray-700 mb-4">
              Customers Support
            </h3>
            <p className="text-gray-600 mb-6">
              Looking at customer data? I can help you identify growth
              opportunities.
            </p>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-full flex items-center justify-between bg-blue-50 text-blue-600 p-4 rounded-lg mb-4 hover:bg-blue-100 transition"
            >
              <span>Invite a customer to join</span>
              <FiUserPlus />
            </motion.button>
          </motion.div>

          {/* Customer Table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:w-2/3 bg-white p-6 rounded-lg shadow-sm overflow-x-auto"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Customer Name
            </h2>
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-3">Customer Name</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Referral Count</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <motion.tr
                    key={index}
                    className="border-b hover:bg-gray-50"
                    whileHover={{ scale: 1.02 }}
                  >
                    <td className="py-4 font-medium">{customer.name}</td>
                    <td className="py-4">{customer.email || "N/A"}</td>
                    <td className="py-4">{customer.referralCount || 2}</td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          customer.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {customer.status || "Inactive"}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CustomersDashboard;
