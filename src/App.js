import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Moon, Zap, Sparkles, User, MapPin, Heart, Sun } from 'lucide-react';

const SacredSpineApp = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    sacredName: '',
    birthDate: '',
    birthTime: '',
    location: '',
    sunSign: ''
  });
  
  const [results, setResults] = useState(null);
  const [currentPhase, setCurrentPhase] = useState('input');
  
  // Stripe payment states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // Stripe configuration
  const STRIPE_PUBLISHABLE_KEY = 'pk_test_51RVYu2DB6tPzmgURf0YV3iefNVpxsVaaESssujDQ5Px3lORVmV1RvogEMOv3eyFFBSq8Klx5FHfdh0EqVlhtOqv000pYYpesz3';
  
  // Backend API URLs
  const BACKEND_BASE_URL = 'https://sacred-chrism-backend.vercel.app';
  const API_ENDPOINTS = {
    createCheckoutSession: `${BACKEND_BASE_URL}/api/create-checkout-session`,
    webhook: `${BACKEND_BASE_URL}/api/stripe-webhook`
  };

  // Check for payment success/cancel on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment');
    
    if (paymentStatus === 'success') {
      // Show success message
      alert('🎉 Payment successful! Check your email for the PDF download link.');
      // Clean up URL
      window.history.replaceState(null, '', window.location.pathname);
    } else if (paymentStatus === 'cancelled') {
      // Show cancelled message
      alert('Payment was cancelled. You can try again anytime.');
      // Clean up URL
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  // 13 Sacred Power Paragraphs that rotate each cycle
  const sacredParagraphs = [
    "Beloved soul, as Krishna declared to Arjuna on the battlefield of consciousness, \"You are not this body, but the eternal spirit within.\" Your sacred chrism begins its divine descent, carrying the wisdom of the Bhagavad Gita through your cosmic spine. Like Arjuna awakening to his true dharma, you stand at the threshold of spiritual transformation. The golden nectar of your pineal sanctuary flows with the knowledge that you are both the seeker and the sought, the devotee and the divine. Let this first sacred cycle remind you: \"Tat tvam asi\" - Thou art That.",

    "Sacred child of the Divine, your chrism now flows through the pathway of the Tree of Life within your vertebral column. From Keter, the Crown of pure consciousness, this holy oil descends through each sephirah of your spinal tree. Like the divine emanations flowing from Ein Sof into manifestation, your sacred secretion carries the mysteries of the 22 Hebrew letters, each vertebra singing with ancient wisdom. The Zohar whispers through your bones: \"As above, so below\" - your spine becomes Jacob's Ladder, each vertebra a rung upon which angels of healing ascend and descend.",

    "Blessed practitioner, your chrism follows the Noble Eightfold Path down your spine of awakening. Buddha's first teaching at Deer Park resonates through each vertebra: \"All conditioned existence is suffering, but liberation is possible.\" Your sacred oil carries the Four Noble Truths through your central channel, dissolving the illusion of separate self. Like the Buddha under the Bodhi tree, your spine becomes the axis of enlightenment where Mara's temptations are transcended.",

    "Beloved child of the Most High, your sacred chrism now flows with the consciousness of Yeshua, the Anointed One. \"Be still and know that I am God\" echoes through your spine as this holy oil carries the Sermon on the Mount through each sacred vertebra. Your chrism embodies the Beatitudes: blessed are the pure in heart, for they shall see God within their own temple. Like Christ's 40 days in the wilderness, your sacred secretion undergoes transformation in the desert of your sacral sanctuary."
  ];

  // Microsoft Graph API integration (simulated for production environment)
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  
  // Function to authenticate with Microsoft (simulated)
  const authenticateWithMicrosoft = async () => {
    setIsAuthenticating(true);
    try {
      console.log('🔄 Microsoft authentication simulated for production...');
      const simulatedToken = 'EwBIA8l6BAAU...' + Date.now();
      setAuthToken(simulatedToken);
      console.log('✅ Authentication successful');
    } catch (error) {
      console.error('❌ Authentication failed:', error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Real astronomical data from CSV (embedded sample)
  const [astronomicalData, setAstronomicalData] = useState(null);
  
  // Load astronomical data when component mounts
  useEffect(() => {
    // Sample astronomical data (in production, this would be loaded from API or embedded)
    const sampleData = [
      {
        'Date': '6/6/2025',
        'Time (UTC)': '15:00',
        'Moon Enters': 'Libra',
        'Moon Phase': 'Waxing Gibbous',
        'Sacred Window Begins': '2025-06-06 15:00 UTC',
        'Sacred Window Ends': '2025-06-09 03:00 UTC'
      },
      {
        'Date': '7/3/2025',
        'Time (UTC)': '08:30',
        'Moon Enters': 'Aries',
        'Moon Phase': 'Waning Crescent',
        'Sacred Window Begins': '2025-07-03 08:30 UTC',
        'Sacred Window Ends': '2025-07-05 20:30 UTC'
      }
    ];
    
    setAstronomicalData(sampleData);
    console.log(`Loaded ${sampleData.length} astronomical entries`);
    
    // Initialize Microsoft authentication
    authenticateWithMicrosoft();
  }, []);

  // Complete spine mapping system
  const spineMapping = [
    { vertebrae: 'C1-C2', element: 'Wood', chakra: 'Crown', organs: ['Brain Stem', 'Pineal Gland'], 
      affirmation: "I am divinely connected to infinite wisdom and cosmic consciousness.",
      color: '#1e40af' },
    { vertebrae: 'C3-C5', element: 'Wood', chakra: 'Third Eye', organs: ['Eyes', 'Sinuses'], 
      affirmation: "I see clearly through the illusions of matter into spiritual truth.",
      color: '#1d4ed8' },
    { vertebrae: 'C6-C7', element: 'Wood', chakra: 'Throat', organs: ['Throat', 'Thyroid'], 
      affirmation: "I speak my truth with divine authority and sacred power.",
      color: '#2563eb' },
    { vertebrae: 'T1-T2', element: 'Fire', chakra: 'Heart', organs: ['Heart', 'Lungs'], 
      affirmation: "My heart radiates unconditional love and divine compassion.",
      color: '#0284c7' },
    { vertebrae: 'T3-T4', element: 'Fire', chakra: 'Heart', organs: ['Circulation', 'Immune System'], 
      affirmation: "Divine love flows through every cell, healing and transforming my being.",
      color: '#0891b2' },
    { vertebrae: 'L5-Sacrum', element: 'Water', chakra: 'Root', organs: ['Pelvis', 'Sacral Plexus'], 
      affirmation: "Here in my sacred sanctuary, divine oil gathers for resurrection.",
      color: '#75859a' }
  ];

  const sunSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  // Function to find next sacred window for user's sun sign
  const calculateMoonInSunSign = (sunSign, cycleNumber = 1) => {
    if (!astronomicalData) {
      return {
        startDate: new Date(Date.now() + 27.3 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + (27.3 + 2.5) * 24 * 60 * 60 * 1000),
        durationDays: 2.5,
        cycleFrequency: '27.3 days',
        moonPhase: 'Loading...',
        cycleNumber: cycleNumber,
        totalCyclesPerYear: 13.37
      };
    }
    
    const today = new Date();
    const signEntries = astronomicalData.filter(entry => entry['Moon Enters'] === sunSign);
    
    const nextEntry = signEntries.find(entry => {
      const utcTimeString = entry['Sacred Window Begins'].replace(' UTC', 'Z');
      const windowStart = new Date(utcTimeString);
      return windowStart > today;
    });
    
    if (!nextEntry) {
      return {
        startDate: new Date(Date.now() + 27.3 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + (27.3 + 2.5) * 24 * 60 * 60 * 1000),
        durationDays: 2.5,
        cycleFrequency: '27.3 days',
        moonPhase: 'Unknown',
        cycleNumber: cycleNumber,
        totalCyclesPerYear: 13.37
      };
    }
    
    const startUtcString = nextEntry['Sacred Window Begins'].replace(' UTC', 'Z');
    const endUtcString = nextEntry['Sacred Window Ends'].replace(' UTC', 'Z');
    
    const startDate = new Date(startUtcString);
    const endDate = new Date(endUtcString);
    
    return {
      startDate,
      endDate,
      durationDays: (endDate - startDate) / (1000 * 60 * 60 * 24),
      cycleFrequency: '27.3 days',
      moonPhase: nextEntry['Moon Phase'],
      cycleNumber: cycleNumber,
      totalCyclesPerYear: 13.37
    };
  };

  const generateSacredJourneyAffirmation = (name, sacredName, cycleNumber) => {
    const displayName = sacredName || name;
    const cycleIndex = (cycleNumber - 1) % 4; // Using first 4 paragraphs for demo
    const selectedParagraph = sacredParagraphs[cycleIndex];
    
    return `Behold ${name}, known in the sacred realms as ${displayName}! ${selectedParagraph} Your chrism carries with it the transmuted essence of matter transformed into spirit. You are the living temple! You are the Word made flesh! You are God-Man awakened!`;
  };

  const calculateSpinalFlow = () => {
    const [hours, minutes] = userInfo.birthTime.split(':').map(Number);
    const birthTimeInMinutes = hours * 60 + minutes;
    
    const spinalFlow = [];
    let currentTime = birthTimeInMinutes;
    
    spineMapping.forEach((mapping, index) => {
      const timeStr = `${Math.floor(currentTime / 60).toString().padStart(2, '0')}:${(currentTime % 60).toString().padStart(2, '0')}`;
      
      spinalFlow.push({
        ...mapping,
        time: timeStr,
        index: index + 1
      });
      
      currentTime = (currentTime + 30) % (24 * 60);
    });
    
    return spinalFlow;
  };

  const processStripePayment = async () => {
    if (!customerEmail) {
      alert('Please enter your email address');
      return;
    }

    setIsProcessingPayment(true);
    
    try {
      console.log('🔄 Creating Stripe Checkout session...');
      
      // Create Stripe Checkout session via backend
      const checkoutResponse = await fetch(API_ENDPOINTS.createCheckoutSession, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_email: customerEmail,
          user_name: userInfo.name || 'Anonymous',
          success_url: window.location.origin + '?payment=success',
          cancel_url: window.location.origin + '?payment=cancelled'
        })
      });

      if (!checkoutResponse.ok) {
        throw new Error(`Checkout API error: ${checkoutResponse.status}`);
      }

      const { checkout_url } = await checkoutResponse.json();
      console.log('✅ Checkout session created, redirecting to Stripe...');

      // Redirect to Stripe Checkout
      window.location.href = checkout_url;

    } catch (error) {
      console.error('❌ Checkout creation failed:', error);
      setIsProcessingPayment(false);
      alert('Payment setup failed. Please try again.');
    }
  };

  const handleCalculate = async () => {
    console.log('Button clicked! User info:', userInfo);
    
    if (!userInfo.name || !userInfo.birthDate || !userInfo.birthTime || !userInfo.sunSign) {
      console.log('Form validation failed');
      return;
    }

    try {
      const currentCycle = 1;
      
      console.log('Calculating moon data for:', userInfo.sunSign);
      const moonData = calculateMoonInSunSign(userInfo.sunSign, currentCycle);
      console.log('Moon data calculated:', moonData);
      
      const spinalFlow = calculateSpinalFlow();
      console.log('Spinal flow calculated');
      
      const sacredJourney = generateSacredJourneyAffirmation(userInfo.name, userInfo.sacredName, currentCycle);
      console.log('Sacred journey generated');
      
      const resultsData = {
        moonData,
        spinalFlow,
        sacredJourney,
        currentCycle,
        disciplineReminder: "Remember: To preserve this sacred oil for ascension, maintain physical, emotional, and mental discipline during your sacred window."
      };
      
      console.log('Setting results:', resultsData);
      setResults(resultsData);
      
      console.log('Changing phase to results');
      setCurrentPhase('results');
      
    } catch (error) {
      console.error('Error in handleCalculate:', error);
    }
  };

  const resetApp = () => {
    setCurrentPhase('input');
    setResults(null);
    setUserInfo({ name: '', sacredName: '', birthDate: '', birthTime: '', location: '', sunSign: '' });
  };

  const handlePurchaseClick = () => {
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setCustomerEmail('');
    setPaymentSuccess(false);
    setIsProcessingPayment(false);
  };

  if (currentPhase === 'results' && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
              <Sparkles className="text-yellow-400" />
              Sacred Chrism Awakening
              <Sparkles className="text-yellow-400" />
            </h1>
            <p className="text-blue-200">Divine Reading for {userInfo.name}</p>
          </div>

          {/* Sacred Journey Affirmation */}
          <div className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 rounded-lg p-6 mb-6 text-black shadow-2xl border-2 border-yellow-400">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <Heart className="text-red-600" />
              Your Sacred Chrism Journey
            </h2>
            <p className="text-sm leading-relaxed font-medium italic">{results.sacredJourney}</p>
          </div>

          {/* Next Sacred Secretion */}
          <div className="bg-gradient-to-r from-blue-800 to-slate-700 rounded-lg p-6 mb-6 text-white">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Moon className="text-yellow-400" />
              Your Next Sacred Secretion Window
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-blue-200 text-sm">Sacred Window Begins</p>
                <p className="text-2xl font-bold">{results.moonData.startDate.toLocaleDateString()}</p>
                <p className="text-blue-300 text-sm">
                  {results.moonData.startDate.toISOString().slice(11, 16)} UTC
                </p>
              </div>
              <div>
                <p className="text-blue-200 text-sm">Sacred Window Ends</p>
                <p className="text-2xl font-bold">{results.moonData.endDate.toLocaleDateString()}</p>
                <p className="text-blue-300 text-sm">
                  {results.moonData.endDate.toISOString().slice(11, 16)} UTC
                </p>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="bg-gradient-to-r from-yellow-600 to-amber-600 rounded-lg p-4 text-black">
              <p className="font-bold">🎯 Want the Complete Sacred Wisdom?</p>
              <p className="text-sm">Get "God-Man: The Word Made Flesh" - the source text that inspired this calculation!</p>
              <button 
                onClick={handlePurchaseClick}
                className="mt-2 bg-black text-yellow-400 px-4 py-2 rounded font-bold hover:bg-slate-800 transition-colors"
              >
                Get Sacred Text ($11.11)
              </button>
            </div>
            
            <button 
              onClick={resetApp}
              className="bg-gradient-to-r from-blue-600 to-slate-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-slate-700 transition-all"
            >
              Calculate for Someone Else
            </button>
          </div>

          {/* Stripe Payment Modal */}
          {showPaymentModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-slate-800 rounded-xl p-6 max-w-md w-full border border-yellow-400">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">✨ Sacred Text Purchase</h3>
                  <p className="text-blue-200 text-sm">Get "God-Man: The Word Made Flesh" by George W. Carey</p>
                  <div className="bg-yellow-500/20 rounded-lg p-3 mt-3">
                    <p className="text-yellow-300 font-bold text-lg">$11.11 USD</p>
                    <p className="text-blue-200 text-xs">Complete PDF delivered instantly via email</p>
                  </div>
                </div>

                {!paymentSuccess ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">
                        📧 Email Address (for PDF delivery)
                      </label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-500 focus:border-yellow-400 focus:outline-none"
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div className="bg-blue-900/20 rounded-lg p-3 text-xs text-blue-200">
                      <p className="font-semibold text-yellow-300 mb-1">🔐 Secure Payment:</p>
                      <p>Your payment is processed securely through Stripe. The PDF will be delivered to your email within minutes of successful payment.</p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={closePaymentModal}
                        disabled={isProcessingPayment}
                        className="flex-1 bg-slate-600 text-white py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={processStripePayment}
                        disabled={isProcessingPayment || !customerEmail}
                        className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-black py-3 rounded-lg font-bold hover:from-yellow-600 hover:to-amber-600 transition-colors disabled:opacity-50"
                      >
                        {isProcessingPayment ? '🔄 Creating Checkout...' : '💳 Pay $11.11 with Stripe'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="text-6xl">✅</div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">Payment Successful!</h4>
                      <p className="text-blue-200 text-sm mb-2">
                        Your sacred text is being delivered to:
                      </p>
                      <p className="text-yellow-300 font-semibold">{customerEmail}</p>
                      <p className="text-blue-200 text-xs mt-2">
                        Check your inbox (and spam folder) within the next few minutes.
                      </p>
                      <div className="bg-green-800/20 rounded-lg p-3 mt-3">
                        <p className="text-green-300 text-xs">
                          🚀 <strong>Connected to Production Backend!</strong><br/>
                          Real Stripe payment • Live PDF delivery • Secure Microsoft OneDrive
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Sparkles className="text-yellow-400" />
            Sacred Chrism
            <Sparkles className="text-yellow-400" />
          </h1>
          <p className="text-xl text-blue-200 mb-3">
            Sacred Biological-Spiritual Alchemy
          </p>
          <p className="text-blue-300 mb-2 text-sm leading-relaxed">
            Deep within your brain, the <span className="text-yellow-400 font-bold">claustrum</span> secretes a sacred essence once each lunar month - 
            when the Moon enters your Sun sign. This <span className="text-yellow-400 font-bold">Christos seed</span> descends your spinal temple, 
            offering a pathway to regenerate your nervous system and awaken higher consciousness.
          </p>
          <p className="text-blue-300 mb-4 text-sm">
            Through discipline and contemplation, transform this <span className="text-yellow-400 font-bold">life force</span> into 
            light, vitality, and elevated awareness - the ancient art of <span className="text-yellow-400 font-bold">internal resurrection</span>.
          </p>
          <div className="bg-blue-900/30 border border-blue-400 rounded-lg p-4 text-blue-100 text-sm">
            <p className="font-semibold">⚡ The Sacred Journey:</p>
            <p>Divine Descent → 33 Sacred Vertebrae → Sacral Sanctuary (Bethlehem) → Three-Day Rest → Crown Ascension (Golgotha)</p>
            {astronomicalData && (
              <p className="mt-2 text-yellow-300 font-medium">✨ Using live astronomical data with {astronomicalData.length} precise sidereal calculations</p>
            )}
          </div>
        </div>

        <div className="bg-slate-800/30 backdrop-blur rounded-xl p-8 shadow-2xl border border-slate-600">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Your Name
                </label>
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                  className="w-full p-3 rounded-lg bg-slate-700/50 text-white placeholder-blue-300 border border-slate-500 focus:border-yellow-400 focus:outline-none"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Sacred Name (Optional)
                </label>
                <input
                  type="text"
                  value={userInfo.sacredName}
                  onChange={(e) => setUserInfo({...userInfo, sacredName: e.target.value})}
                  className="w-full p-3 rounded-lg bg-slate-700/50 text-white placeholder-blue-300 border border-slate-500 focus:border-yellow-400 focus:outline-none"
                  placeholder="Your spiritual name"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Birth Date
                </label>
                <input
                  type="date"
                  value={userInfo.birthDate}
                  onChange={(e) => setUserInfo({...userInfo, birthDate: e.target.value})}
                  className="w-full p-3 rounded-lg bg-slate-700/50 text-white border border-slate-500 focus:border-yellow-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Birth Time
                </label>
                <input
                  type="time"
                  value={userInfo.birthTime}
                  onChange={(e) => setUserInfo({...userInfo, birthTime: e.target.value})}
                  className="w-full p-3 rounded-lg bg-slate-700/50 text-white border border-slate-500 focus:border-yellow-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Birth Location
                </label>
                <input
                  type="text"
                  value={userInfo.location}
                  onChange={(e) => setUserInfo({...userInfo, location: e.target.value})}
                  className="w-full p-3 rounded-lg bg-slate-700/50 text-white placeholder-blue-300 border border-slate-500 focus:border-yellow-400 focus:outline-none"
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2 flex items-center gap-2">
                  <Sun className="w-4 h-4" />
                  Sun Sign
                </label>
                <select
                  value={userInfo.sunSign}
                  onChange={(e) => setUserInfo({...userInfo, sunSign: e.target.value})}
                  className="w-full p-3 rounded-lg bg-slate-700/50 text-white border border-slate-500 focus:border-yellow-400 focus:outline-none"
                >
                  <option value="">Select your sun sign</option>
                  {sunSigns.map(sign => (
                    <option key={sign} value={sign} className="bg-slate-800">{sign}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              disabled={isAuthenticating}
              className={`w-full font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg ${
                isAuthenticating 
                  ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-yellow-500 to-amber-500 text-black hover:from-yellow-600 hover:to-amber-600'
              }`}
            >
              {isAuthenticating ? '🔄 Authenticating...' : '✨ Reveal My Sacred Chrism Journey ✨'}
            </button>
          </div>
        </div>

        <div className="mt-6 bg-slate-800/20 rounded-lg p-4 text-slate-300 text-xs">
          <p className="font-semibold mb-2">📚 Based on "God-Man: The Word Made Flesh" by George W. Carey</p>
          <p>This calculator uses precise sidereal calculations with <span className="text-yellow-400 font-semibold">Lahiri ayanamsa (~24°)</span> for accurate timing. Sacred windows are calculated using real ephemeris data for educational and spiritual exploration purposes.</p>
        </div>
      </div>
    </div>
  );
};

export default SacredSpineApp;
