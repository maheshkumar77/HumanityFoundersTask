import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ReferralHubAI = () => {
  const [messages, setMessages] = useState([
    { 
      text: "Welcome back to ReferralHub AI! I'm your intelligent assistant here to help with all things referrals.", 
      sender: 'ai',
      typing: false
    },
    { 
      text: "Here's what's new since your last visit:",
      sender: 'ai',
      typing: false 
    },
    { 
      text: "🌟 3 new referrals waiting for your review",
      sender: 'ai',
      typing: false 
    },
    { 
      text: "📈 Your 'Summer Special' campaign is performing 21% better than others",
      sender: 'ai',
      typing: false 
    },
    { 
      text: "How can I assist you with your referral program today?",
      sender: 'ai',
      typing: false 
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Enhanced AI knowledge base
  const aiKnowledge = {
    greetings: [
      "Hello! How can I help with your referral program today?",
      "Hi there! What would you like to know about referrals?",
      "Welcome back! Ready to grow your network?"
    ],
    referrals: {
      create: "To create a new referral, I'll need: the contact's name, email, and what you're referring them for. Who would you like to refer?",
      view: "Here are your recent referrals:\n1. Sarah Johnson - Software Engineer (Pending)\n2. Mike's Auto Shop - New customer (Approved)\n3. Lisa Chen - Marketing Consultant (Follow-up needed)",
      followUp: "I can help with follow-ups. For which referral would you like a template?\n1. Sarah Johnson\n2. Mike's Auto Shop\n3. Lisa Chen",
      stats: "Your referral metrics:\n- Total referrals: 42\n- Conversion rate: 35%\n- Top referrer: Jane Smith (8 referrals)\n- Most successful campaign: Summer Special"
    },
    campaigns: {
      create: "Let's create a new campaign! What would you like to name it? I'll then guide you through setting rewards, duration, and messaging.",
      view: "Current active campaigns:\n1. Summer Special (ends Aug 31)\n2. New Client Bonus\n3. Holiday Giveaway",
      analyze: "Your 'Summer Special' campaign is performing exceptionally well with a 21% higher conversion rate than average. Would you like me to suggest similar strategies?"
    },
    help: "I can assist with:\n- Creating and managing referrals\n- Setting up referral campaigns\n- Analyzing performance metrics\n- Generating follow-up templates\n- Optimizing your referral strategy\nWhat would you like to do?",
    default: "I'm not sure I understand. Could you rephrase that? I can help with referrals, campaigns, analytics, and follow-ups."
  };

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate AI typing
  const simulateTyping = (response, callback) => {
    setIsTyping(true);
    let typedText = '';
    let i = 0;
    
    const typingInterval = setInterval(() => {
      if (i < response.length) {
        typedText += response.charAt(i);
        callback(typedText);
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 20);
  };

  const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase().trim();
    
    // Greetings
    if (/(hi|hello|hey)/.test(input)) {
      return aiKnowledge.greetings[Math.floor(Math.random() * aiKnowledge.greetings.length)];
    }
    
    // Referral actions
    if (/(send|create|make).*referral/.test(input)) {
      return aiKnowledge.referrals.create;
    }
    if (/(view|show|list).*referral/.test(input)) {
      return aiKnowledge.referrals.view;
    }
    if (/(follow|follow up|check).*referral/.test(input)) {
      return aiKnowledge.referrals.followUp;
    }
    if (/(stat|metric|performance)/.test(input)) {
      return aiKnowledge.referrals.stats;
    }
    
    // Campaign actions
    if (/(create|make|start).*campaign/.test(input)) {
      return aiKnowledge.campaigns.create;
    }
    if (/(view|show|list).*campaign/.test(input)) {
      return aiKnowledge.campaigns.view;
    }
    if (/(analyze|report|performance).*campaign/.test(input)) {
      return aiKnowledge.campaigns.analyze;
    }
    
    // Help
    if (/(help|support|what can you do)/.test(input)) {
      return aiKnowledge.help;
    }
    
    return aiKnowledge.default;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = { text: inputMessage, sender: 'user', typing: false };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Generate and add AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      setMessages(prev => [...prev, { text: '', sender: 'ai', typing: true }]);
      
      simulateTyping(aiResponse, (typedText) => {
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { 
            text: typedText, 
            sender: 'ai', 
            typing: typedText.length < aiResponse.length 
          };
          return newMessages;
        });
      });
    }, 800);
  };

  const handleQuickAction = (action) => {
    setInputMessage(action);
    // Auto-send the quick action
    setTimeout(() => {
      document.getElementById('send-button').click();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">ReferralHub AI</h1>
              <h2 className="text-sm opacity-90">Your intelligent referral assistant</h2>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-xs">Online</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md rounded-lg p-3 relative ${message.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}
              >
                {message.text}
                {message.typing && (
                  <div className="absolute -bottom-2 left-0 flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 rounded-lg rounded-bl-none p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="border-t p-4 bg-white">
          <h3 className="font-medium text-gray-700 mb-2">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {['Send Referral', 'Create Campaign', 'Follow Up', 'View Stats'].map((action, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleQuickAction(action)}
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md text-sm transition-colors"
              >
                {action}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="border-t p-4 bg-white flex items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about referrals, campaigns, or analytics..."
            className="flex-1 border border-gray-300 rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <motion.button
            id="send-button"
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-r-lg transition-colors"
            disabled={isTyping}
          >
            {isTyping ? '...' : 'Send'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ReferralHubAI;