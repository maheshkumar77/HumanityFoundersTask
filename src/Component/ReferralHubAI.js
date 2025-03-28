import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ReferralHubAI = () => {
  const [messages, setMessages] = useState([
    { text: "Welcome Back, John! Here's what happened while you were gone:", sender: 'ai' },
    { text: "- 3 New Referrals", sender: 'ai' },
    { text: "- 1 New Customer Sending Referrals", sender: 'ai' },
    { text: "- 'Summer Campaign' up 21% compared to other campaigns", sender: 'ai' },
    { text: "How can I help you today?", sender: 'ai' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  // AI responses
  const aiResponses = {
    'send referral': 'I can help you send a referral. Who would you like to refer?',
    'create campaign': 'Great! Let\'s create a new campaign. What would you like to name it?',
    'follow up': 'I can help with follow-ups. Which referral would you like to follow up on?',
    'view referrals': 'Here are your recent referrals: [List of referrals would appear here]',
    'default': 'I can help with referrals, campaigns, and follow-ups. What would you like to do?'
  };

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: inputMessage, sender: 'user' }]);
    setInputMessage('');

    // Simulate AI thinking
    setTimeout(() => {
      const lowerCaseMessage = inputMessage.toLowerCase();
      let aiResponse = aiResponses.default;

      // Check for keywords
      if (lowerCaseMessage.includes('send') || lowerCaseMessage.includes('referral')) {
        aiResponse = aiResponses['send referral'];
      } else if (lowerCaseMessage.includes('create') || lowerCaseMessage.includes('campaign')) {
        aiResponse = aiResponses['create campaign'];
      } else if (lowerCaseMessage.includes('follow') || lowerCaseMessage.includes('up')) {
        aiResponse = aiResponses['follow up'];
      } else if (lowerCaseMessage.includes('view') || lowerCaseMessage.includes('referral')) {
        aiResponse = aiResponses['view referrals'];
      }

      setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
    }, 1000);
  };

  const handleQuickAction = (action) => {
    setInputMessage(action);
    // Auto-send the quick action
    setTimeout(() => {
      document.getElementById('send-button').click();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold">ReferralHub</h1>
          <h2 className="text-lg">AI Assistant</h2>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md rounded-lg p-3 ${message.sender === 'user' 
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}
              >
                {message.text}
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="border-t p-4">
          <h3 className="font-medium text-gray-700 mb-2">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {['Send Referral', 'Create Campaign', 'Follow Up', 'View Referrals'].map((action, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleQuickAction(action)}
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md text-sm"
              >
                {action}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="border-t p-4 flex">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            id="send-button"
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReferralHubAI;