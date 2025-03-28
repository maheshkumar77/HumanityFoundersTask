import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import axios from 'axios';

const CreateCampaign = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '30',
    startDate: new Date(),
    endDate: null,
    status: false,
    aiOptimization: false,
    message: '',
    rewardType: 'instant',
    rewardFormat: 'discount',
    discountValue: '20',
    additionalNotes: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const durationOptions = [
    { value: '30', label: '30 Days (Recommended)', endDate: 'Until Mar 21, 2025' },
    { value: '90', label: '90 Days (Season)', endDate: 'Until May 20, 2025' },
    { value: 'custom', label: 'Pick start date\nPick end date (optional)', endDate: '' },
    { value: 'ongoing', label: 'No End Date\nOngoing campaign', endDate: '' }
  ];

  const discountOptions = [
    { value: '15', label: '15% off', note: 'Balanced for repeat purchases' },
    { value: '20', label: '20% off', note: 'Most popular for first-time customers' },
    { value: '25', label: '25% off', note: 'High impact for premium services' }
  ];

  const messageSuggestions = [
    "Share this exclusive offer with your friends! They'll get 20% off their first purchase, and you'll earn a $25 reward when they complete their transaction.",
    "Invite your friends to try our service! They'll receive a special newcomer discount, and you'll get rewarded when they make their first purchase.",
    "Share the love! Your friends get a special welcome discount, and you'll earn rewards for spreading the word."
  ];

  const additionalNoteOptions = [
    'Valid for first-time customers only',
    'Minimum purchase value of $50 required',
    'Cannot be combined with other offers',
    'Reward will be credited within 24 hours'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Prepare data for backend
      const campaignData = {
        title: formData.name,
        aboutCampaign: formData.description,
        startDate: formData.startDate,
        endDate: formData.duration === 'ongoing' ? null : formData.endDate,
        rewardType: formData.rewardType,
        rewardFormat: formData.rewardFormat,
        discountValue: parseInt(formData.discountValue),
        campaignMessage: formData.message,
        status: formData.status ? 'active' : 'inactive',
        additionalNotes: formData.additionalNotes
      };

      const response = await axios.post('http://localhost:5000/campaign', campaignData);
      
      if (response.status === 201) {
        alert('Campaign created successfully!');
        // Reset form or redirect as needed
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create campaign');
      console.error('Error creating campaign:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-[-20px] md:p-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Create New Campaign</h1>
        <p className="text-gray-600 mb-6">Create a new referral campaign in just a few steps.</p>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-blue-600 -z-10 transition-all duration-300" 
            style={{ width: `${(step - 1) * 33.33}%` }}
          ></div>
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} font-medium`}
              >
                {num}
              </div>
              <div className={`text-xs mt-2 text-center ${step === num ? 'font-medium text-blue-600' : 'text-gray-500'}`}>
                {num === 1 && 'Campaign Basics'}
                {num === 2 && 'Reward Setup'}
                {num === 3 && 'Messaging'}
                {num === 4 && 'Review'}
              </div>
            </div>
          ))}
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Form Content */}
        <form onSubmit={handleSubmit}>
          {/* Step 1: Campaign Basics */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">
                  Campaign Name <span className="text-red-500">*</span> 💬
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Summer Referral Special"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span> 💭
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your campaign and its goals..."
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Campaign Duration <span className="text-red-500">*</span> 💮
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {durationOptions.map((option) => (
                    <div 
                      key={option.value}
                      onClick={() => setFormData(prev => ({ ...prev, duration: option.value }))}
                      className={`p-4 border rounded-lg cursor-pointer ${formData.duration === option.value ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`}
                    >
                      <div className="font-medium">{option.label.split('\n')[0]}</div>
                      {option.label.split('\n')[1] && <div className="text-sm text-gray-500">{option.label.split('\n')[1]}</div>}
                      {option.endDate && <div className="text-sm text-gray-500 mt-1">{option.endDate}</div>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="campaignStatus"
                  name="status"
                  checked={formData.status}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="campaignStatus" className="ml-2 text-gray-700">
                  Enable to activate the campaign immediately
                </label>
              </div>
            </div>
          )}

          {/* Step 2: Reward Setup */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Reward Type <span className="text-red-500">*</span> ①</label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="rewardType"
                      value="instant"
                      checked={formData.rewardType === 'instant'}
                      onChange={handleChange}
                      className="h-5 w-5 text-blue-600"
                    />
                    <span>Instant Reward</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="rewardType"
                      value="conversion"
                      checked={formData.rewardType === 'conversion'}
                      onChange={handleChange}
                      className="h-5 w-5 text-blue-600"
                    />
                    <span>Conversion-based</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Reward Format <span className="text-red-500">*</span> ①</label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="rewardFormat"
                      value="discount"
                      checked={formData.rewardFormat === 'discount'}
                      onChange={handleChange}
                      className="h-5 w-5 text-blue-600"
                    />
                    <span>Discount</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="rewardFormat"
                      value="cash"
                      checked={formData.rewardFormat === 'cash'}
                      onChange={handleChange}
                      className="h-5 w-5 text-blue-600"
                    />
                    <span>Cash Equivalent</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Discount Value <span className="text-red-500">*</span> ①</label>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {discountOptions.map((option) => (
                    <div 
                      key={option.value}
                      onClick={() => setFormData(prev => ({ ...prev, discountValue: option.value }))}
                      className={`p-3 border rounded-lg cursor-pointer text-center ${formData.discountValue === option.value ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`}
                    >
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-gray-500 mt-1">{option.note}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="discountValue"
                    value={formData.discountValue}
                    onChange={handleChange}
                    className="w-20 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="ml-2">% e.g., 20</span>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Additional Notes ①</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {additionalNoteOptions.map((note) => (
                    <label key={note} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.additionalNotes.includes(note)}
                        onChange={() => handleNoteToggle(note)}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <span>{note}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Messaging */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="aiOptimization"
                  name="aiOptimization"
                  checked={formData.aiOptimization}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="aiOptimization" className="ml-2 text-gray-700">
                  Enable AI-powered message optimization
                </label>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Campaign Message <span className="text-red-500">*</span> ①</label>
                <div className="space-y-3 mb-4">
                  {messageSuggestions.map((suggestion, index) => (
                    <div 
                      key={index}
                      onClick={() => setFormData(prev => ({ ...prev, message: suggestion }))}
                      className={`p-4 border rounded-lg cursor-pointer ${formData.message === suggestion ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your campaign message..."
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Campaign Details</h2>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="w-1/3 text-gray-600">Name:</div>
                  <div className="w-2/3 font-medium">{formData.name || 'Not provided'}</div>
                </div>
                <div className="flex">
                  <div className="w-1/3 text-gray-600">Status:</div>
                  <div className="w-2/3 font-medium">{formData.status ? 'Active' : 'Inactive'}</div>
                </div>
                <div className="flex">
                  <div className="w-1/3 text-gray-600">Date Range:</div>
                  <div className="w-2/3 font-medium">
                    Starting {formData.startDate.toLocaleDateString()}
                    {formData.duration === 'custom' && formData.endDate && ` - ${formData.endDate.toLocaleDateString()}`}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/3 text-gray-600">Reward Type:</div>
                  <div className="w-2/3 font-medium">
                    {formData.rewardType === 'instant' ? 'Instant' : 'Conversion-based'}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/3 text-gray-600">Reward Format:</div>
                  <div className="w-2/3 font-medium">
                    {formData.rewardFormat === 'discount' ? 'Discount' : 'Cash Equivalent'}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/3 text-gray-600">Reward Value:</div>
                  <div className="w-2/3 font-medium">
                    {formData.discountValue}%
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Message Preview</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {formData.message || 'No message provided'}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                <FiChevronLeft className="mr-1" />
                Back
              </button>
            ) : (
              <div></div>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Next
                <FiChevronRight className="ml-1" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center px-6 py-2 ${isSubmitting ? 'bg-green-400' : 'bg-green-600'} text-white rounded-lg hover:bg-green-700 transition`}
              >
                {isSubmitting ? 'Submitting...' : 'Launch Campaign'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaign;