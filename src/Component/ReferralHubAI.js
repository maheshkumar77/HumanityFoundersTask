import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ReferralHubAI = () => {
  const [messages, setMessages] = useState([
    { 
      text: "Welcome to ReferralHub AI! I'm your intelligent assistant here to help with all things referrals.", 
      sender: 'ai',
      typing: false
    },
    { 
      text: "I can help you with:\n- Creating and managing referral campaigns\n- Analyzing referral performance\n- Generating referral links\n- Tracking conversions\n\nHow can I assist you today?",
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
      "Hi there! Let's grow your network together. What do you need?",
      "Welcome back! Ready to boost your referrals?"
    ],
    referrals: {
      create: "To create a referral campaign, you'll need:\n1. Campaign name\n2. Reward structure\n3. Duration\n4. Target audience\n\nWould you like me to guide you through setting up a new campaign?",
      track: "Here's how to track referrals effectively:\n- Use unique referral codes\n- Monitor conversion rates\n- Set up automated follow-ups\n- Analyze which channels perform best\n\nI can help set up tracking for you.",
      optimize: "To optimize your referrals:\n1. Increase rewards for top referrers\n2. Simplify the sharing process\n3. Add social proof\n4. Run time-limited bonuses\n\nYour current conversion rate could improve by 20-30% with these tactics.",
      examples: "Successful referral campaign examples:\n1. Dropbox's 'Give 500MB, Get 500MB'\n2. Airbnb's travel credits\n3. Uber's free rides for both parties\n\nWant me to help design a similar program?"
    },
    campaigns: {
      create: "Let's create a campaign step-by-step:\n1. Name your campaign\n2. Set reward structure (fixed or percentage)\n3. Determine duration\n4. Create shareable assets\n\nWhere would you like to start?",
      analyze: "Your campaign analysis shows:\n- Average conversion: 35%\n- Top referrer: Jane D. (12 referrals)\n- Best performing channel: Email (42% conversion)\n\nWould you like detailed insights on any metric?",
      improve: "To improve campaign performance:\n1. A/B test your messaging\n2. Add urgency (limited-time offers)\n3. Segment your audience\n4. Follow up with inactive referrers\n\nI can generate specific recommendations for your current campaigns."
    },
    analytics: {
      basic: "Key referral metrics:\n- Total referrals: 128\n- Conversion rate: 34%\n- Avg. reward value: $25\n- ROI: 320%\n\nNeed any specific analysis?",
      advanced: "Advanced insights:\n1. Referrals from LinkedIn convert 28% higher\n2. Wednesday afternoons have peak sharing\n3. Video explanations increase conversions by 40%\n\nWant me to prepare a full report?"
    },
    help: "I specialize in:\n\n📊 Referral program setup\n🚀 Campaign optimization\n📈 Performance analytics\n🤝 Relationship tracking\n💡 Strategy recommendations\n\nWhat would you like to focus on?",
    default: "I'm trained specifically on referral marketing best practices. Could you clarify your question? I can help with:\n- Campaign setup\n- Performance tracking\n- Referral incentives\n- Conversion optimization"
  };

  // Background elements data
  const backgroundElements = [
    { id: 1, icon: '📈', size: 'w-16 h-16', position: 'top-10 left-10', animation: { y: [0, -20, 0], rotate: [0, 5, 0] } },
    { id: 2, icon: '🤝', size: 'w-20 h-20', position: 'bottom-20 right-20', animation: { scale: [1, 1.1, 1], rotate: [0, 10, 0] } },
    { id: 3, icon: '🚀', size: 'w-14 h-14', position: 'top-1/3 right-1/4', animation: { x: [0, 10, 0], y: [0, -10, 0] } },
    { id: 4, icon: '💡', size: 'w-12 h-12', position: 'bottom-1/4 left-1/3', animation: { opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] } },
    { id: 5, icon: '📊', size: 'w-18 h-18', position: 'top-1/4 right-1/5', animation: { rotate: [0, 15, 0], scale: [1, 1.05, 1] } }
  ];

  // Floating particles
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    position: {
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`
    },
    animation: {
      y: [0, (Math.random() - 0.5) * 100],
      x: [0, (Math.random() - 0.5) * 80],
      opacity: [0.3, 0.7, 0.3],
      scale: [1, 1.2, 1]
    },
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5
  }));

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate AI typing animation
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

  // AI response generator
  const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase().trim();
    
    if (/(hi|hello|hey)/.test(input)) return aiKnowledge.greetings[Math.floor(Math.random() * aiKnowledge.greetings.length)];
    if (/(create|start|make|set up).*(referral|program)/.test(input)) return aiKnowledge.referrals.create;
    if (/(track|monitor|follow).*(referral|program)/.test(input)) return aiKnowledge.referrals.track;
    if (/(improve|optimize|boost|increase).*(referral|conversion|rate)/.test(input)) return aiKnowledge.referrals.optimize;
    if (/(campaign|promotion).*(create|start|make)/.test(input)) return aiKnowledge.campaigns.create;
    if (/(analytics|data|stats|metrics|report|performance)/.test(input)) {
      return /(detailed|advanced|deep dive)/.test(input) ? aiKnowledge.analytics.advanced : aiKnowledge.analytics.basic;
    }
    if (/(help|support|what can you do)/.test(input)) return aiKnowledge.help;
    
    return aiKnowledge.default;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message with animation
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
    }, 500);
  };

  const handleQuickAction = (action) => {
    setInputMessage(action);
    setTimeout(() => document.getElementById('send-button')?.click(), 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6 overflow-hidden relative">
      {/* Animated background elements */}
      {backgroundElements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute ${element.size} ${element.position} flex items-center justify-center text-4xl opacity-10`}
          animate={element.animation}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {element.icon}
        </motion.div>
      ))}

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-blue-200 to-purple-200"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            top: particle.position.top,
            left: particle.position.left,
          }}
          animate={particle.animation}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Brand logo watermark */}
      <motion.div
        className="absolute bottom-4 right-4 text-gray-200 text-2xl font-bold opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 1, duration: 2 }}
      >
        ReferralHub
      </motion.div>

      {/* Main chat container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden relative z-10"
      >
        {/* Animated header with gradient pulse */}
        <motion.div 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0"
            animate={{ 
              opacity: [0, 0.3, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
          <div className="flex items-center justify-between relative z-10">
            <div>
              <motion.h1 
                className="text-2xl font-bold flex items-center"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.span 
                  className="inline-block mr-2"
                  animate={{ 
                    rotate: [0, 15, -5, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  🤖
                </motion.span>
                ReferralHub AI
              </motion.h1>
              <motion.h2 
                className="text-sm opacity-90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 0.4 }}
              >
                Your intelligent referral marketing assistant
              </motion.h2>
            </div>
            <motion.div 
              className="flex items-center space-x-2"
              animate={{ 
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity 
              }}
            >
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="text-xs">Online</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Messages container with scroll animation */}
        <motion.div 
          className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  type: 'spring',
                  stiffness: 500,
                  damping: 20
                }
              }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`max-w-xs md:max-w-md rounded-lg p-3 relative ${message.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none shadow-md' 
                  : 'bg-gray-200 text-gray-800 rounded-bl-none shadow-sm'}`}
              >
                {message.text.split('\n').map((paragraph, i) => (
                  <motion.p 
                    key={i} 
                    className={i > 0 ? 'mt-2' : ''}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
                {message.typing && (
                  <div className="absolute -bottom-2 left-0 flex space-x-1">
                    {[0, 0.2, 0.4].map((delay) => (
                      <motion.div
                        key={delay}
                        className="w-2 h-2 rounded-full bg-gray-400"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div 
              className="flex justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="bg-gray-200 text-gray-800 rounded-lg rounded-bl-none p-3 shadow-sm">
                <div className="flex space-x-1">
                  {[0, 0.2, 0.4].map((delay) => (
                    <motion.div
                      key={delay}
                      className="w-2 h-2 rounded-full bg-gray-500"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </motion.div>

        {/* Quick Actions with staggered animation */}
        <motion.div 
          className="border-t p-4 bg-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.h3 
            className="font-medium text-gray-700 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Quick Actions
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {['Create Campaign', 'Track Referrals', 'View Analytics', 'Get Tips'].map((action, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  y: -2
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleQuickAction(action)}
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md text-sm transition-colors"
              >
                {action}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Input form with enhanced animations */}
        <motion.form 
          onSubmit={handleSendMessage} 
          className="border-t p-4 bg-white flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <motion.div 
            className="flex-1"
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.995 }}
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about referral campaigns, analytics, or optimization..."
              className="w-full border border-gray-300 rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </motion.div>
          <motion.button
            id="send-button"
            type="submit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-r-lg transition-all flex items-center"
            disabled={isTyping}
          >
            {isTyping ? (
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex items-center"
              >
                <motion.span
                  className="mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  ⏳
                </motion.span>
                Sending...
              </motion.span>
            ) : (
              <>
                Send
                <motion.span 
                  className="ml-2"
                  animate={{ 
                    x: [0, 2, 0],
                    y: [0, -2, 0]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    repeatType: 'mirror'
                  }}
                >
                  ↗
                </motion.span>
              </>
            )}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default ReferralHubAI;