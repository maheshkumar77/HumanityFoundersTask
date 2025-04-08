import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ReferralHubAI = () => {
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I'm your AI Business Assistant specializing in referral marketing and business growth strategies.", 
      sender: 'ai',
      typing: false
    },
    { 
      text: "I can help with:\n- Business strategy development\n- Referral program optimization\n- Marketing campaign analysis\n- Customer acquisition\n- Revenue growth tactics\n\nWhat would you like to discuss today?",
      sender: 'ai',
      typing: false 
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Comprehensive business knowledge base
  const businessKnowledge = {
    greetings: [
      "Hello! How can I assist with your business today?",
      "Hi there! Let's grow your business together. What do you need?",
      "Welcome back! Ready to optimize your business strategy?"
    ],
    strategy: {
      development: "To develop a strong business strategy:\n1. Define clear objectives\n2. Analyze market trends\n3. Identify competitive advantages\n4. Set measurable KPIs\n5. Create implementation roadmap\n\nWould you like me to help craft a strategy for your specific business?",
      execution: "Effective strategy execution requires:\n- Clear communication\n- Employee alignment\n- Regular progress reviews\n- Agile adjustments\n- Performance incentives\n\nYour current execution could improve by focusing on quarterly goal-setting.",
      innovation: "Innovation strategies that work:\n1. Customer co-creation\n2. Cross-industry inspiration\n3. Rapid prototyping\n4. Fail-fast mentality\n5. Innovation sprints\n\nI can suggest specific innovation approaches for your industry."
    },
    marketing: {
      referral: "Powerful referral marketing tactics:\n1. Tiered rewards system\n2. Social proof integration\n3. Automated referral tracking\n4. Personalized thank yous\n5. Referral contests\n\nYour current program could benefit from adding urgency elements.",
      digital: "Digital marketing essentials:\n- SEO optimized content\n- Data-driven ad targeting\n- Marketing automation\n- Conversion rate optimization\n- Omnichannel presence\n\nYour digital presence shows opportunities in video content.",
      branding: "Strong branding creates:\n1. 3-5x higher memorability\n2. 20-30% premium pricing power\n3. 50%+ higher customer loyalty\n\nLet's audit your current brand positioning."
    },
    sales: {
      funnel: "Sales funnel optimization:\n1. Top: Educational content (70% of buyers)\n2. Middle: Comparison tools (50% conversion boost)\n3. Bottom: Risk-reversal offers (35% lift)\n\nYour funnel could improve middle-stage nurturing.",
      techniques: "High-conversion sales techniques:\n- Consultative selling\n- Storytelling\n- Social proof\n- Scarcity triggers\n- Presumptive close\n\nI can recommend specific techniques for your product.",
      team: "Building a sales team:\n1. Hire for emotional intelligence\n2. Implement gamification\n3. Continuous training\n4. Clear metrics\n5. Career pathways\n\nYour team structure suggests adding specialization roles."
    },
    finance: {
      growth: "Financial growth strategies:\n1. Revenue diversification\n2. Cost optimization\n3. Strategic partnerships\n4. Investment in automation\n5. Data-driven decisions\n\nYour financials indicate opportunity in subscription models.",
      funding: "Funding options comparison:\n- Bootstrapping (full control)\n- Angel investors (expertise + capital)\n- Venture capital (rapid scaling)\n- Bank loans (predictable costs)\n\nWhich stage is your business at currently?",
      metrics: "Key financial metrics:\n- CAC (Customer Acquisition Cost)\n- LTV (Lifetime Value)\n- MRR/ARR (Recurring Revenue)\n- Gross Margin\n- Burn Rate\n\nYour metrics show strongest performance in customer retention."
    },
    operations: {
      efficiency: "Operational efficiency tactics:\n1. Process mapping\n2. Automation opportunities\n3. Lean methodology\n4. Continuous improvement\n5. Employee feedback loops\n\nYour operations could benefit from workflow automation.",
      scaling: "Scaling challenges to address:\n- Systems before growth\n- Culture preservation\n- Quality control\n- Cash flow management\n- Leadership development\n\nYour scaling plan should prioritize technology infrastructure.",
      remote: "Remote work best practices:\n- Async communication standards\n- Results-oriented culture\n- Virtual team building\n- Cybersecurity protocols\n- Flexible schedules\n\nYour remote policies could enhance with clearer OKRs."
    },
    help: "I specialize in:\n\n📈 Business strategy\n🤝 Referral marketing\n💰 Financial planning\n🛠 Operations optimization\n📊 Data-driven decisions\n\nWhat area would you like to focus on?",
    default: "I'm trained on comprehensive business knowledge. Could you clarify your question? I can help with:\n- Market analysis\n- Growth strategies\n- Operational efficiency\n- Financial planning\n- Team development"
  };

  // Business metrics visualization data
  const metricsData = {
    revenue: [12000, 15000, 18000, 21000, 25000, 29000],
    customers: [150, 180, 210, 250, 290, 340],
    referrals: [25, 30, 45, 60, 80, 110]
  };

  // Background elements with business icons
  const backgroundElements = [
    { id: 1, icon: '📈', size: 'w-16 h-16', position: 'top-10 left-10', animation: { y: [0, -20, 0], rotate: [0, 5, 0] } },
    { id: 2, icon: '💼', size: 'w-20 h-20', position: 'bottom-20 right-20', animation: { scale: [1, 1.1, 1], rotate: [0, 10, 0] } },
    { id: 3, icon: '🌐', size: 'w-14 h-14', position: 'top-1/3 right-1/4', animation: { x: [0, 10, 0], y: [0, -10, 0] } },
    { id: 4, icon: '💰', size: 'w-12 h-12', position: 'bottom-1/4 left-1/3', animation: { opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] } },
    { id: 5, icon: '🛠', size: 'w-18 h-18', position: 'top-1/4 right-1/5', animation: { rotate: [0, 15, 0], scale: [1, 1.05, 1] } }
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

  // AI response generator with business intelligence
  const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase().trim();
    
    // Greetings
    if (/(hi|hello|hey)/.test(input)) return businessKnowledge.greetings[Math.floor(Math.random() * businessKnowledge.greetings.length)];
    
    // Strategy topics
    if (/(strategy|plan|roadmap)/.test(input)) {
      if (/(develop|create|make)/.test(input)) return businessKnowledge.strategy.development;
      if (/(execute|implement|roll out)/.test(input)) return businessKnowledge.strategy.execution;
      if (/(innovate|innovation|new ideas)/.test(input)) return businessKnowledge.strategy.innovation;
      return businessKnowledge.strategy.development;
    }
    
    // Marketing topics
    if (/(market|brand|promot)/.test(input)) {
      if (/(referral|word of mouth)/.test(input)) return businessKnowledge.marketing.referral;
      if (/(digital|online|social media|seo)/.test(input)) return businessKnowledge.marketing.digital;
      if (/(brand|identity|positioning)/.test(input)) return businessKnowledge.marketing.branding;
      return businessKnowledge.marketing.digital;
    }
    
    // Sales topics
    if (/(sales|revenue|convert)/.test(input)) {
      if (/(funnel|pipeline)/.test(input)) return businessKnowledge.sales.funnel;
      if (/(technique|method|approach)/.test(input)) return businessKnowledge.sales.techniques;
      if (/(team|staff|rep)/.test(input)) return businessKnowledge.sales.team;
      return businessKnowledge.sales.funnel;
    }
    
    // Finance topics
    if (/(finance|money|revenue|profit)/.test(input)) {
      if (/(grow|increase|scale)/.test(input)) return businessKnowledge.finance.growth;
      if (/(fund|raise|invest)/.test(input)) return businessKnowledge.finance.funding;
      if (/(metric|kpi|measure)/.test(input)) return businessKnowledge.finance.metrics;
      return businessKnowledge.finance.growth;
    }
    
    // Operations topics
    if (/(operat|process|efficien|productiv)/.test(input)) {
      if (/(efficien|streamline|optimize)/.test(input)) return businessKnowledge.operations.efficiency;
      if (/(scale|grow|expand)/.test(input)) return businessKnowledge.operations.scaling;
      if (/(remote|work from home|wfh)/.test(input)) return businessKnowledge.operations.remote;
      return businessKnowledge.operations.efficiency;
    }
    
    if (/(help|support|what can you do)/.test(input)) return businessKnowledge.help;
    
    return businessKnowledge.default;
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
        BusinessAI
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
                Business AI Assistant
              </motion.h1>
              <motion.h2 
                className="text-sm opacity-90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 0.4 }}
              >
                Expert advice for business growth and referral marketing
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
            Quick Business Topics
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {['Growth Strategy', 'Referral Program', 'Sales Tips', 'Financial Advice'].map((action, index) => (
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
              placeholder="Ask about business strategy, marketing, operations, or finance..."
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
                Thinking...
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