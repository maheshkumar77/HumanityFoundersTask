import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangeCampaign = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    aboutCampaign: '',
    startDate: '',
    endDate: '',
    rewardType: '',
    rewardFormat: '',
    discountValue: '',
    campaignMessage: '',
    status: ''
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/campaign/${campaignId}`);
        const data = response.data;
        
        setFormData({
          title: data.title || '',
          aboutCampaign: data.aboutCampaign || '',
          startDate: data.startDate ? data.startDate.split('T')[0] : '',
          endDate: data.endDate ? data.endDate.split('T')[0] : '',
          rewardType: data.rewardType || '',
          rewardFormat: data.rewardFormat || '',
          discountValue: data.discountValue || '',
          campaignMessage: data.campaignMessage || '',
          status: data.status || ''
        });
        setLoading(false);
      } catch (err) {
        toast.error('Failed to load campaign data');
        setLoading(false);
        navigate('/dashboard');
      }
    };

    fetchCampaignData();
  }, [campaignId, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 'active' : 'inactive') : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await axios.put(`http://localhost:5000/campaign/${campaignId}`, formData);
      toast.success('Campaign updated successfully!');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      toast.error('Failed to update campaign');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
        ></motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8"
    >
      <ToastContainer position="top-center" autoClose={3000} />
      
      <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Change Campaign</h1>
          <p className="mt-2 text-lg text-gray-600">Update your referral campaign details</p>
        </div>

        {/* Progress Steps */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                  ${step === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  {step}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm font-medium text-gray-500">
            <span>Campaign Basics</span>
            <span>Reward Setup</span>
            <span>Messaging</span>
            <span>Review</span>
          </div>
        </motion.div>

        <motion.form variants={itemVariants} onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
          {/* Campaign Basics */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Campaign Basics</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Campaign Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Summer Referral Special"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                  required
                />
              </div>

              <div>
                <label htmlFor="aboutCampaign" className="block text-sm font-medium text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="aboutCampaign"
                  name="aboutCampaign"
                  rows={3}
                  value={formData.aboutCampaign}
                  onChange={handleChange}
                  placeholder="Describe your campaign and its goals..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Campaign Duration <span className="text-red-500">*</span>
                </label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                      required
                    />
                    <span className="mx-2 text-gray-500">to</span>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="status"
                  name="status"
                  checked={formData.status === 'active'}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="status" className="ml-2 block text-sm text-gray-700">
                  Enable to activate the campaign immediately
                </label>
              </div>
            </div>
          </motion.div>

          {/* Reward Setup */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Reward Setup</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="rewardType" className="block text-sm font-medium text-gray-700">
                  Reward Type
                </label>
                <select
                  id="rewardType"
                  name="rewardType"
                  value={formData.rewardType}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                >
                  <option value="">Select Reward Type</option>
                  <option value="Discount">Discount</option>
                  <option value="Credit">Credit</option>
                  <option value="Gift">Gift</option>
                </select>
              </div>

              <div>
                <label htmlFor="rewardFormat" className="block text-sm font-medium text-gray-700">
                  Reward Format
                </label>
                <select
                  id="rewardFormat"
                  name="rewardFormat"
                  value={formData.rewardFormat}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                >
                  <option value="">Select Reward Format</option>
                  <option value="Percentage">Percentage</option>
                  <option value="Fixed Amount">Fixed Amount</option>
                </select>
              </div>

              <div>
                <label htmlFor="discountValue" className="block text-sm font-medium text-gray-700">
                  {formData.rewardFormat === 'Percentage' ? 'Discount Percentage' : 'Reward Amount'}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  {formData.rewardFormat === 'Percentage' ? (
                    <input
                      type="number"
                      id="discountValue"
                      name="discountValue"
                      value={formData.discountValue}
                      onChange={handleChange}
                      placeholder={formData.rewardFormat === 'Percentage' ? "e.g., 20 for 20%" : "e.g., 50 for $50"}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    />
                  ) : (
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        id="discountValue"
                        name="discountValue"
                        value={formData.discountValue}
                        onChange={handleChange}
                        placeholder="e.g., 50 for $50"
                        className="block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Messaging */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Messaging</h2>
            
            <div>
              <label htmlFor="campaignMessage" className="block text-sm font-medium text-gray-700">
                Campaign Message
              </label>
              <textarea
                id="campaignMessage"
                name="campaignMessage"
                rows={3}
                value={formData.campaignMessage}
                onChange={handleChange}
                placeholder="e.g., Use code SPRING20 to get 20% off!"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              />
            </div>
          </motion.div>

          {/* Form Actions */}
          <motion.div variants={itemVariants} className="flex justify-between pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back
            </button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={submitting}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${submitting ? 'opacity-70' : ''}`}
            >
              {submitting ? 'Updating...' : 'Update Campaign'}
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default ChangeCampaign;