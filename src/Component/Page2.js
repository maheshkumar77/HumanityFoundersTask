import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiArrowUp,
  FiArrowDown,
  FiChevronRight,
  FiUserPlus,
  FiSearch,
  FiFilter,
  FiX
} from "react-icons/fi";
import { FaWhatsapp, FaTelegram, FaInstagram, FaFacebook } from "react-icons/fa";
import { BsChatLeftText } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomersDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareMessage, setShareMessage] = useState("Join me on this amazing platform! Register here: ");
  const previousCount = 5;
  const navigate = useNavigate();
  const baseUrl = window.location.origin;

  const shareOptions = [
    { name: 'WhatsApp', icon: <FaWhatsapp className="text-green-500" size={24} />, color: 'bg-green-100' },
    { name: 'Facebook', icon: <FaFacebook className="text-blue-600" size={24} />, color: 'bg-blue-100' },
    { name: 'SMS', icon: <BsChatLeftText className="text-blue-500" size={24} />, color: 'bg-blue-100' },
    { name: 'Telegram', icon: <FaTelegram className="text-blue-400" size={24} />, color: 'bg-blue-50' },
    { name: 'Instagram', icon: <FaInstagram className="text-pink-500" size={24} />, color: 'bg-pink-100' }
  ];

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("https://newbackend-jvbs.onrender.com/refer/data");
        setCustomers(res.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
        toast.error("Failed to load customer data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const sendEmailInvites = async () => {
    try {
      alert("Mesage are send to Loyal Customer ");
      const registrationLink = `${baseUrl}/register`;
      const emailData = {
        subject: "Invitation to Join Our Exclusive Campaign",
        text: `Hello,\n\nYou've been invited to join our exclusive campaign! Sign up now to enjoy special benefits.\n\nRegister here: ${registrationLink}\n\nLooking forward to seeing you there!`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="color: #4a6baf;">You're Invited!</h2>
            <p>Hello,</p>
            <p>You've been invited to join our exclusive campaign! Sign up now to enjoy:</p>
            <ul>
              <li>Special sign-up bonuses</li>
              <li>Exclusive deals and offers</li>
              <li>Early access to new features</li>
            </ul>
            <div style="text-align: center; margin: 25px 0;">
              <a href="${registrationLink}" 
                 style="background-color: #4a6baf; color: white; padding: 12px 24px; 
                        text-decoration: none; border-radius: 4px; font-weight: bold;">
                Join Now
              </a>
            </div>
            <p>Or copy this link: ${registrationLink}</p>
            <p style="margin-top: 30px;">Looking forward to seeing you there!</p>
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
            <p style="font-size: 12px; color: #777;">
              If you didn't request this invitation, you can safely ignore this email.
            </p>
          </div>
        `
      };

      const response = await axios.post("https://newbackend-jvbs.onrender.com/send-email", emailData);
      toast.success("Invitation emails sent successfully!");
      setShowShareModal(false);
    } catch (error) {
      console.error("Error sending emails:", error);
      toast.error("Failed to send invitation emails");
    }
  };

  const handleShare = (platform) => {
    let url = '';
    const registerLink = `${baseUrl}/register`;
    const message = encodeURIComponent(`${shareMessage} ${registerLink}`);
    
    switch(platform) {
      case 'WhatsApp':
        url = `https://wa.me/?text=${message}`;
        break;
      case 'Facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(registerLink)}&quote=${message}`;
        break;
      case 'SMS':
        url = `sms:?body=${message}`;
        break;
      case 'Telegram':
        url = `https://t.me/share/url?url=${registerLink}&text=${shareMessage}`;
        break;
      case 'Instagram':
        url = `https://instagram.com`;
        break;
      default:
        break;
    }
    
    window.open(url, '_blank');
    setShowShareModal(false);
  };

  const copyToClipboard = () => {
    const registerLink = `${baseUrl}/register`;
    navigator.clipboard.writeText(registerLink);
    toast.success('Registration link copied to clipboard!');
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentCount = filteredCustomers.length;
  const newCustomers = Math.max(0, currentCount - previousCount);
  const conversionRate = previousCount
    ? ((newCustomers / previousCount) * 100).toFixed(2) + "%"
    : "N/A";

  const statusVariants = {
    Active: {
      bg: "bg-emerald-100",
      text: "text-emerald-800",
      icon: "🟢"
    },
    Inactive: {
      bg: "bg-amber-100",
      text: "text-amber-800",
      icon: "🟡"
    },
    default: {
      bg: "bg-gray-100",
      text: "text-gray-800",
      icon: "⚪"
    }
  };

  const getStatusStyle = (status) => {
    return statusVariants[status] || statusVariants.default;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Customer Referral Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Track and optimize your referral program performance
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            {
              title: "Total Customers",
              value: isLoading ? "..." : currentCount,
              icon: "👥",
              trend: null
            },
            {
              title: "New Customers",
              value: isLoading ? "..." : newCustomers,
              icon: "🆕",
              trend: newCustomers > 0 ? "up" : newCustomers < 0 ? "down" : "neutral"
            },
            {
              title: "Conversion Rate",
              value: isLoading ? "..." : conversionRate,
              icon: "📈",
              trend: newCustomers > 0 ? "up" : newCustomers < 0 ? "down" : "neutral"
            },
            {
              title: "Referral Revenue",
              value: isLoading ? "..." : "$---",
              icon: "💰",
              trend: "up"
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute -right-4 -bottom-4 text-7xl opacity-10">
                {stat.icon}
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">
                {stat.title}
              </h3>
              <div className="flex items-end justify-between">
                <span className="font-bold text-2xl md:text-3xl text-gray-800">
                  {stat.value}
                </span>
                {stat.trend && (
                  <span className={`flex items-center text-sm ${
                    stat.trend === "up" ? "text-emerald-600" :
                    stat.trend === "down" ? "text-rose-600" : "text-gray-500"
                  }`}>
                    {stat.trend === "up" ? <FiArrowUp className="mr-1" /> :
                     stat.trend === "down" ? <FiArrowDown className="mr-1" /> : null}
                    {stat.trend !== "neutral" && "vs last month"}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* AI Assistant Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:w-1/3 bg-gradient-to-br from-indigo-600 to-blue-600 p-6 rounded-xl shadow-lg text-white"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold mb-1">Referral AI Assistant</h2>
                <h3 className="font-medium opacity-90">Customer Growth</h3>
              </div>
              <div className="bg-white/20 p-2 rounded-lg">
                <span className="text-xl">🤖</span>
              </div>
            </div>
            <p className="mb-6 opacity-90">
              I've analyzed your customer data and found opportunities to increase referrals by 23%.
            </p>
            <div className="space-y-3">
              <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all border border-white/20"
                onClick={() => navigate('/adminpage/createref')}
              >
                <span>Generate referral links</span>
                <FiChevronRight />
              </motion.button>
              <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-between bg-white text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-all"
                onClick={sendEmailInvites}
              >
                <span>Invite customers</span>
                <FiUserPlus />
              </motion.button>
            </div>
          </motion.div>

          {/* Customer Table Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:w-2/3 bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-bold text-gray-800">Customer Referrals</h2>
              <div className="flex gap-3 w-full sm:w-auto">
                <div className="relative flex-grow sm:w-64">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700"
                >
                  <FiFilter />
                  <span className="hidden sm:inline">Filters</span>
                </motion.button>
              </div>
            </div>

            {isLoading ? (
              <div className="p-8 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredCustomers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-gray-500 bg-gray-50">
                      <th className="p-4 font-medium">Customer</th>
                      <th className="p-4 font-medium">Email</th>
                      <th className="p-4 font-medium">Referrals</th>
                      <th className="p-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map((customer, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="border-b hover:bg-gray-50"
                        whileHover={{ scale: 1.005 }}
                      >
                        <td className="p-4 font-medium">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                              {customer.name?.charAt(0) || "?"}
                            </div>
                            {customer.name || "Unknown"}
                          </div>
                        </td>
                        <td className="p-4 text-gray-600">
                          {customer.email || "N/A"}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <span className="font-medium">
                              {customer.referralCount || 0}
                            </span>
                            <span className="text-xs text-gray-500">refs</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">
                              {getStatusStyle(customer.status).icon}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                getStatusStyle(customer.status).bg
                              } ${getStatusStyle(customer.status).text}`}
                            >
                              {customer.status || "Inactive"}
                            </span>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 text-center"
              >
                <div className="max-w-md mx-auto">
                  <svg
                    className="mx-auto h-16 w-16 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    No customers found
                  </h3>
                  <p className="mt-2 text-gray-500">
                    {searchTerm
                      ? "No customers match your search criteria."
                      : "You currently have no customers in your referral program."}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Invite Friends</h3>
                <button 
                  onClick={() => setShowShareModal(false)} 
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="mb-4">
                  <label htmlFor="share-message" className="block text-sm font-medium text-gray-700 mb-1">
                    Custom Message
                  </label>
                  <textarea
                    id="share-message"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    rows="3"
                    value={shareMessage}
                    onChange={(e) => setShareMessage(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-5 gap-3">
                  {shareOptions.map((option) => (
                    <motion.button
                      key={option.name}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleShare(option.name)}
                      className={`flex flex-col items-center p-3 rounded-lg ${option.color} hover:opacity-90 transition-all`}
                    >
                      {option.icon}
                      <span className="mt-2 text-xs">{option.name}</span>
                    </motion.button>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Registration link:</p>
                  <div className="flex">
                    <input
                      type="text"
                      readOnly
                      value={`${baseUrl}/register`}
                      className="flex-1 p-2 border border-gray-300 rounded-l-lg text-sm truncate"
                    />
                    <button 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg text-sm"
                      onClick={copyToClipboard}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomersDashboard;