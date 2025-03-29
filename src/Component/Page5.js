import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiCheck, FiZap } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const CreateCampaign = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    startDate: '',
    endDate: '',
    status: false,
    aiOptimization: false,
    message: '',
    rewardType: '',
    rewardFormat: '',
    discountValue: '',
    additionalNotes: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const durationOptions = [
    { value: '30', label: '30 Days', sublabel: '(Recommended)', endDate: 'Until Mar 21, 2025' },
    { value: '90', label: '90 Days', sublabel: '(Seasonal)', endDate: 'Until May 20, 2025' },
    { value: 'custom', label: 'Custom Dates', sublabel: 'Pick start & end dates' },
    { value: 'ongoing', label: 'Ongoing', sublabel: 'No end date' }
  ];

  const discountOptions = [
    { value: '15', label: '15% off', note: 'Balanced for repeat purchases' },
    { value: '20', label: '20% off', note: 'Most popular choice' },
    { value: '25', label: '25% off', note: 'High impact for premium' }
  ];

  const messageSuggestions = [
    "Share this exclusive offer with friends! They get 20% off their first purchase, and you earn a reward when they complete their transaction.",
    "Invite friends to try our service! They receive a special discount, and you get rewarded when they make their first purchase.",
    "Spread the word! Friends get a welcome discount, and you earn rewards for successful referrals."
  ];

  const additionalNoteOptions = [
    'Valid for first-time customers only',
    'Minimum purchase value of $50 required',
    'Cannot be combined with other offers',
    'Reward credited within 24 hours'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNoteToggle = (note) => {
    setFormData(prev => {
      const newNotes = prev.additionalNotes.includes(note)
        ? prev.additionalNotes.filter(n => n !== note)
        : [...prev.additionalNotes, note];
      return { ...prev, additionalNotes: newNotes };
    });
  };

  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, 4));
    setError(null);
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const campaignData = {
        title: formData.name,
        aboutCampaign: formData.description,
        duration: formData.duration,
        startDate: formData.startDate,
        endDate: formData.duration === 'ongoing' ? null : formData.endDate,
        rewardType: formData.rewardType,
        rewardFormat: formData.rewardFormat,
        discountValue: formData.discountValue,
        campaignMessage: formData.message,
        status: formData.status ? 'active' : 'inactive',
        additionalNotes: formData.additionalNotes,
        aiOptimization: formData.aiOptimization
      };

      const response = await axios.post(' http://localhost:5000/campaign', campaignData);
      
      if (response.status === 201) {
        setSuccess(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create campaign. Please try again.');
      console.error('Error creating campaign:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-bold"
          >
            Create New Campaign
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-blue-100"
          >
            Build your referral program in just a few steps
          </motion.p>
        </div>

        {/* Progress Steps */}
        <div className="px-6 pt-6">
          <div className="flex justify-between mb-8 relative">
            <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gray-200 -z-10 rounded-full"></div>
            <div 
              className="absolute top-1/2 left-0 h-1.5 bg-blue-500 -z-10 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${(step - 1) * 33.33}%` }}
            ></div>
            {[1, 2, 3, 4].map((num) => (
              <motion.div 
                key={num} 
                className="flex flex-col items-center"
                whileHover={{ scale: step >= num ? 1.1 : 1 }}
              >
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${step >= num ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-200 text-gray-400'} font-medium relative`}
                >
                  {step > num ? (
                    <FiCheck className="text-xl" />
                  ) : (
                    num
                  )}
                  {step === num && (
                    <motion.div 
                      className="absolute -bottom-1 w-3 h-3 bg-blue-500 rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </div>
                <div className={`text-xs mt-2 text-center font-medium ${step === num ? 'text-blue-600' : 'text-gray-500'}`}>
                  {num === 1 && 'Basics'}
                  {num === 2 && 'Rewards'}
                  {num === 3 && 'Message'}
                  {num === 4 && 'Review'}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiCheck className="text-green-500 text-3xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Campaign Created!</h2>
              <p className="text-gray-600 mb-6">Your referral campaign has been successfully launched.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={() => {
                  setStep(1);
                  setFormData({
                    name: '',
                    description: '',
                    duration: '',
                    startDate: '',
                    endDate: '',
                    status: false,
                    aiOptimization: false,
                    message: '',
                    rewardType: '',
                    rewardFormat: '',
                    discountValue: '',
                    additionalNotes: []
                  });
                  setSuccess(false);
                }}
              >
                Create Another Campaign
              </motion.button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200"
                >
                  {error}
                </motion.div>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  {/* Step 1: Campaign Basics */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <label className="block text-gray-700 mb-2 font-medium">
                          Campaign Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g., Summer Referral Special"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                          required
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label className="block text-gray-700 mb-2 font-medium">
                          Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="What's the purpose of this campaign?"
                          rows="4"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                          required
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <label className="block text-gray-700 mb-2 font-medium">
                          Campaign Duration <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {durationOptions.map((option) => (
                            <motion.div
                              key={option.value}
                              whileHover={{ y: -3 }}
                              onClick={() => setFormData(prev => ({ ...prev, duration: option.value }))}
                              className={`p-4 border rounded-lg cursor-pointer transition-all ${formData.duration === option.value ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-300 hover:bg-gray-50'}`}
                            >
                              <div className="font-medium flex items-center">
                                {formData.duration === option.value && (
                                  <FiCheck className="mr-2 text-blue-500" />
                                )}
                                {option.label}
                              </div>
                              <div className="text-sm text-gray-500 mt-1">{option.sublabel}</div>
                              {option.endDate && (
                                <div className="text-xs text-gray-500 mt-2">{option.endDate}</div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {formData.duration === 'custom' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          <div>
                            <label className="block text-gray-700 mb-2">Start Date</label>
                            <input
                              type="date"
                              name="startDate"
                              value={formData.startDate}
                              onChange={handleDateChange}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 mb-2">End Date (optional)</label>
                            <input
                              type="date"
                              name="endDate"
                              value={formData.endDate}
                              onChange={handleDateChange}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </motion.div>
                      )}

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <input
                          type="checkbox"
                          id="campaignStatus"
                          name="status"
                          checked={formData.status}
                          onChange={handleChange}
                          className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="campaignStatus" className="ml-3 text-gray-700">
                          <span className="font-medium">Activate campaign immediately</span>
                          <p className="text-sm text-gray-500">You can activate it later from the dashboard</p>
                        </label>
                      </motion.div>
                    </div>
                  )}

                  {/* Step 2: Reward Setup */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <label className="block text-gray-700 mb-3 font-medium">Reward Type</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {['instant', 'conversion'].map((type) => (
                            <motion.label
                              key={type}
                              whileHover={{ scale: 1.02 }}
                              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${formData.rewardType === type ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-300 hover:bg-gray-50'}`}
                            >
                              <input
                                type="radio"
                                name="rewardType"
                                value={type}
                                checked={formData.rewardType === type}
                                onChange={handleChange}
                                className="h-5 w-5 text-blue-600"
                                required
                              />
                              <div className="ml-3">
                                <div className="font-medium">
                                  {type === 'instant' ? 'Instant Reward' : 'Conversion-based'}
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                  {type === 'instant' ? 'Reward immediately after referral' : 'Reward when referral converts'}
                                </div>
                              </div>
                            </motion.label>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label className="block text-gray-700 mb-3 font-medium">Reward Format</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {['discount', 'cash'].map((format) => (
                            <motion.label
                              key={format}
                              whileHover={{ scale: 1.02 }}
                              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${formData.rewardFormat === format ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-300 hover:bg-gray-50'}`}
                            >
                              <input
                                type="radio"
                                name="rewardFormat"
                                value={format}
                                checked={formData.rewardFormat === format}
                                onChange={handleChange}
                                className="h-5 w-5 text-blue-600"
                                required
                              />
                              <div className="ml-3">
                                <div className="font-medium">
                                  {format === 'discount' ? 'Discount' : 'Cash Equivalent'}
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                  {format === 'discount' ? 'Percentage discount for referee' : 'Cash reward for referrer'}
                                </div>
                              </div>
                            </motion.label>
                          ))}
                        </div>
                      </motion.div>

                      {formData.rewardFormat === 'discount' && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <label className="block text-gray-700 mb-3 font-medium">Discount Value</label>
                          <div className="grid grid-cols-3 gap-3 mb-4">
                            {discountOptions.map((option) => (
                              <motion.div
                                key={option.value}
                                whileHover={{ y: -3 }}
                                onClick={() => setFormData(prev => ({ ...prev, discountValue: option.value }))}
                                className={`p-3 border rounded-lg cursor-pointer text-center transition-all ${formData.discountValue === option.value ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-300 hover:bg-gray-50'}`}
                              >
                                <div className="font-medium">{option.label}</div>
                                <div className="text-xs text-gray-500 mt-1">{option.note}</div>
                              </motion.div>
                            ))}
                          </div>
                          <div className="flex items-center">
                            <input
                              type="number"
                              name="discountValue"
                              value={formData.discountValue}
                              onChange={handleChange}
                              min="0"
                              max="100"
                              className="w-20 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="%"
                            />
                            <span className="ml-2 text-gray-500">discount</span>
                          </div>
                        </motion.div>
                      )}

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <label className="block text-gray-700 mb-3 font-medium">Additional Terms</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {additionalNoteOptions.map((note) => (
                            <motion.div
                              key={note}
                              whileHover={{ scale: 1.02 }}
                              onClick={() => handleNoteToggle(note)}
                              className={`p-3 border rounded-lg cursor-pointer transition-all ${formData.additionalNotes.includes(note) ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`}
                            >
                              <div className="flex items-center">
                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center mr-3 ${formData.additionalNotes.includes(note) ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-gray-300'}`}>
                                  {formData.additionalNotes.includes(note) && <FiCheck size={14} />}
                                </div>
                                <span>{note}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {/* Step 3: Messaging */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center p-4 bg-indigo-50 rounded-lg border border-indigo-100"
                      >
                        <input
                          type="checkbox"
                          id="aiOptimization"
                          name="aiOptimization"
                          checked={formData.aiOptimization}
                          onChange={handleChange}
                          className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="aiOptimization" className="ml-3">
                          <div className="font-medium text-indigo-800 flex items-center">
                            <FiZap className="mr-2" />
                            Enable AI Message Optimization
                          </div>
                          <p className="text-sm text-indigo-600 mt-1">
                            Let our AI optimize your message for higher conversion rates
                          </p>
                        </label>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label className="block text-gray-700 mb-3 font-medium">Message Suggestions</label>
                        <div className="space-y-3 mb-4">
                          {messageSuggestions.map((suggestion, index) => (
                            <motion.div
                              key={index}
                              whileHover={{ y: -3 }}
                              onClick={() => setFormData(prev => ({ ...prev, message: suggestion }))}
                              className={`p-4 border rounded-lg cursor-pointer transition-all ${formData.message === suggestion ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-300 hover:bg-gray-50'}`}
                            >
                              {suggestion}
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <label className="block text-gray-700 mb-2 font-medium">
                          Campaign Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Write your referral message here..."
                          rows="5"
                          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                          required
                        />
                      </motion.div>
                    </div>
                  )}

                  {/* Step 4: Review */}
                  {step === 4 && (
                    <div className="space-y-6">
                      <motion.h2 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xl font-bold text-gray-800 mb-6"
                      >
                        Review Your Campaign
                      </motion.h2>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gray-50 p-6 rounded-xl"
                      >
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Campaign Details</h3>
                        <div className="space-y-4">
                          <div className="flex">
                            <div className="w-1/3 text-gray-600">Name:</div>
                            <div className="w-2/3 font-medium">{formData.name || 'Not specified'}</div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3 text-gray-600">Status:</div>
                            <div className="w-2/3 font-medium">
                              {formData.status ? (
                                <span className="text-green-600">Active</span>
                              ) : (
                                <span className="text-gray-500">Inactive</span>
                              )}
                            </div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3 text-gray-600">Duration:</div>
                            <div className="w-2/3 font-medium">
                              {formData.duration === '30' && '30 Days'}
                              {formData.duration === '90' && '90 Days'}
                              {formData.duration === 'custom' && 'Custom Dates'}
                              {formData.duration === 'ongoing' && 'Ongoing'}
                            </div>
                          </div>
                          {formData.startDate && (
                            <div className="flex">
                              <div className="w-1/3 text-gray-600">Start Date:</div>
                              <div className="w-2/3 font-medium">{formData.startDate}</div>
                            </div>
                          )}
                          {formData.endDate && formData.duration === 'custom' && (
                            <div className="flex">
                              <div className="w-1/3 text-gray-600">End Date:</div>
                              <div className="w-2/3 font-medium">{formData.endDate}</div>
                            </div>
                          )}
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gray-50 p-6 rounded-xl"
                      >
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Reward Details</h3>
                        <div className="space-y-4">
                          <div className="flex">
                            <div className="w-1/3 text-gray-600">Type:</div>
                            <div className="w-2/3 font-medium capitalize">
                              {formData.rewardType || 'Not specified'}
                            </div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3 text-gray-600">Format:</div>
                            <div className="w-2/3 font-medium capitalize">
                              {formData.rewardFormat || 'Not specified'}
                            </div>
                          </div>
                          {formData.rewardFormat === 'discount' && (
                            <div className="flex">
                              <div className="w-1/3 text-gray-600">Discount Value:</div>
                              <div className="w-2/3 font-medium">
                                {formData.discountValue ? `${formData.discountValue}%` : 'Not specified'}
                              </div>
                            </div>
                          )}
                          {formData.additionalNotes.length > 0 && (
                            <div className="flex">
                              <div className="w-1/3 text-gray-600">Additional Terms:</div>
                              <div className="w-2/3">
                                <ul className="list-disc pl-5 space-y-1">
                                  {formData.additionalNotes.map((note, index) => (
                                    <li key={index} className="text-gray-700">{note}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gray-50 p-6 rounded-xl"
                      >
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Message Preview</h3>
                        <div className="p-4 bg-white rounded-lg border border-gray-200">
                          {formData.message || 'No message provided'}
                        </div>
                        {formData.aiOptimization && (
                          <div className="mt-3 text-sm text-indigo-600 flex items-center">
                            <FiZap className="mr-1" />
                            AI Optimization Enabled
                          </div>
                        )}
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 border-t pt-6">
                {step > 1 ? (
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    <FiChevronLeft className="mr-1" />
                    Back
                  </motion.button>
                ) : (
                  <div></div>
                )}

                {step < 4 ? (
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Continue
                    <FiChevronRight className="ml-1" />
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center px-8 py-3 ${isSubmitting ? 'bg-green-500' : 'bg-green-600'} text-white rounded-lg hover:bg-green-700 transition`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <FiCheck className="mr-1" />
                        Launch Campaign
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CreateCampaign;