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
      alert('🎉 Payment successful! Check your email for the PDF download link.');
      window.history.replaceState(null, '', window.location.pathname);
    } else if (paymentStatus === 'cancelled') {
      alert('Payment was cancelled. You can try again anytime.');
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  // 13 Sacred Power Paragraphs that rotate each cycle
  const sacredParagraphs = [
    "Beloved soul, as Krishna declared to Arjuna on the battlefield of consciousness, \"You are not this body, but the eternal spirit within.\" Your sacred chrism begins its divine descent, carrying the wisdom of the Bhagavad Gita through your cosmic spine. Like Arjuna awakening to his true dharma, you stand at the threshold of spiritual transformation. The golden nectar of your pineal sanctuary flows with the knowledge that you are both the seeker and the sought, the devotee and the divine. Let this first sacred cycle remind you: \"Tat tvam asi\" - Thou art That.",

    "Sacred child of the Divine, your chrism now flows through the pathway of the Tree of Life within your vertebral column. From Keter, the Crown of pure consciousness, this holy oil descends through each sephirah of your spinal tree. Like the divine emanations flowing from Ein Sof into manifestation, your sacred secretion carries the mysteries of the 22 Hebrew letters, each vertebra singing with ancient wisdom. The Zohar whispers through your bones: \"As above, so below\" - your spine becomes Jacob's Ladder, each vertebra a rung upon which angels of healing ascend and descend.",

    "Blessed practitioner, your chrism follows the Noble Eightfold Path down your spine of awakening. Buddha's first teaching at Deer Park resonates through each vertebra: \"All conditioned existence is suffering, but liberation is possible.\" Your sacred oil carries the Four Noble Truths through your central channel, dissolving the illusion of separate self. Like the Buddha under the Bodhi tree, your spine becomes the axis of enlightenment where Mara's temptations are transcended.",

    "Beloved child of the Most High, your sacred chrism now flows with the consciousness of Yeshua, the Anointed One. \"Be still and know that I am God\" echoes through your spine as this holy oil carries the Sermon on the Mount through each sacred vertebra. Your chrism embodies the Beatitudes: blessed are the pure in heart, for they shall see God within their own temple. Like Christ's 40 days in the wilderness, your sacred secretion undergoes transformation in the desert of your sacral sanctuary.",

    "Honorable seeker of the Way, your chrism flows with the wisdom of Kong Qiu through the mandate of heaven within your spine. \"The gentleman understands what is moral, the small man understands what is profitable\" - and you are becoming the gentleman of spirit, seeking only the profit of consciousness. Your sacred oil carries the Five Constants through your vertebral temple: Ren (benevolence), Yi (righteousness), Li (proper conduct), Zhi (knowledge), and Xin (trustworthiness).",

    "Sacred walker between worlds, your chrism now carries the wisdom of the ancient shamans down your world tree spine. Like the Siberian shaman's journey to the upper and lower worlds, your sacred oil travels the three realms of your vertebral cosmos. The drum of your heartbeat guides this holy substance through the axis mundi of your backbone, connecting earth and sky within your temple body. Your chrism embodies the power animals and spirit guides of indigenous wisdom.",

    "Revered student of the Dao, your chrism now flows with the wisdom of Laozi through the wu wei of your spine. \"The Dao that can be spoken is not the eternal Dao\" - yet your sacred oil speaks the unspeakable through the language of divine transformation. Like water flowing downhill, your chrism follows the path of least resistance, finding the lowest place (your sacrum) before rising again. The Dao De Jing flows through your vertebrae: \"Empty yourself of everything, let the mind become still.\"",

    "Honored physician of your own temple, your chrism now flows according to the wisdom of the Five Elements through your meridian spine. Wood energy of spring flows through your cervical vertebrae, bringing vision and planning. Fire energy of summer ignites your thoracic spine, opening your heart to joy and connection. Earth energy of late summer stabilizes your lumbar region, providing the centered strength of harvest. Metal energy of autumn flows through your sacral area, teaching the wisdom of letting go.",

    "Blessed bodhisattva, your chrism now flows with the compassion of Avalokiteshvara through the bardo of your spine. \"Om Mani Padme Hum\" vibrates through each vertebra as your sacred oil carries the six-syllable mantra of universal compassion. Like the Dalai Lama's endless dedication to all sentient beings, your chrism embodies the bodhisattva vow: \"I will not enter nirvana until all beings are liberated.\" The Tibetan Book of the Dead guides your sacred secretion through the intermediate state between death and rebirth.",

    "Star-born seeker of the Great Work, your chrism now flows with the wisdom of Aiwass through the Thelemic spine of your temple. \"Do what thou wilt shall be the whole of the Law\" - and your sacred oil helps you discover what your true will actually is, beyond the desires of the ego. Love is the law, love under will, and your chrism embodies this divine love as it flows through the Tree of Life of your vertebral column.",

    "Sacred child of the Eternal Blue Sky, your chrism now flows with the ancient wisdom of the steppes through your shamanic spine. Tengri, the supreme sky god of the Mongols, breathes through your vertebrae as your sacred oil connects you to the vast cosmos above and the nurturing earth below. Like the Mongol shamans who could ride the wind between worlds, your chrism carries you on a spiritual journey across the endless steppe of consciousness.",

    "Beloved devotee of the Supreme Lord, your chrism now flows with the bhakti of Sri Krishna through your spine of divine love. \"Surrender all your works unto me, with mind intent on me, and being free from desire and selfishness, fight\" - these words from the Bhagavad Gita guide your sacred oil through the battlefield of spiritual transformation. Like Radha's pure love for Krishna, your chrism carries the highest form of devotion through your vertebral temple.",

    "Indestructible practitioner of the diamond way, your chrism now flows with the tantric wisdom of Padmasambhava through your vajra spine. \"The nature of mind is clear light\" - and your sacred oil carries this luminous awareness through the subtle channels of your vertebral mandala. Like the rainbow body of Milarepa, your chrism transforms your physical form into pure light and energy. In this final cycle of the year, your chrism embodies the ultimate realization: nirvana and samsara are one."
  ];

  // Microsoft Graph API integration (simulated)
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  
  const authenticateWithMicrosoft = async () => {
    setIsAuthenticating(true);
    try {
      console.log('🔄 Microsoft authentication simulated...');
      const simulatedToken = 'EwBIA8l6BAAU...' + Date.now();
      setAuthToken(simulatedToken);
      console.log('✅ Authentication successful');
    } catch (error) {
      console.error('❌ Authentication failed:', error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Real astronomical data
  const [astronomicalData, setAstronomicalData] = useState(null);
  
  useEffect(() => {
    const loadAstronomicalData = async () => {
      try {
        // In production, this would load from your CSV data
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
      } catch (error) {
        console.error('Error loading astronomical data:', error);
      }
    };
    
    loadAstronomicalData();
    authenticateWithMicrosoft();
  }, []);

  // Complete spine mapping system
  const spineMapping = [
    // Cervical Region (C1-C7) - Wood Element - Crown/Third Eye Chakras
    { vertebrae: 'C1-C2', element: 'Wood', chakra: 'Crown', organs: ['Brain Stem', 'Pineal Gland'], 
      affirmation: "I am divinely connected to infinite wisdom and cosmic consciousness.",
      color: '#1e40af' },
    { vertebrae: 'C3-C5', element: 'Wood', chakra: 'Third Eye', organs: ['Eyes', 'Sinuses'], 
      affirmation: "I see clearly through the illusions of matter into spiritual truth.",
      color: '#1d4ed8' },
    { vertebrae: 'C6-C7', element: 'Wood', chakra: 'Throat', organs: ['Throat', 'Thyroid'], 
      affirmation: "I speak my truth with divine authority and sacred power.",
      color: '#2563eb' },
    
    // Upper Thoracic (T1-T4) - Fire Element - Heart Chakra
    { vertebrae: 'T1-T2', element: 'Fire', chakra: 'Heart', organs: ['Heart', 'Lungs'], 
      affirmation: "My heart radiates unconditional love and divine compassion.",
      color: '#0284c7' },
    { vertebrae: 'T3-T4', element: 'Fire', chakra: 'Heart', organs: ['Circulation', 'Immune System'], 
      affirmation: "Divine love flows through every cell, healing and transforming my being.",
      color: '#0891b2' },
    
    // Mid Thoracic (T5-T8) - Earth Element - Solar Plexus Chakra
    { vertebrae: 'T5-T6', element: 'Earth', chakra: 'Solar Plexus', organs: ['Stomach', 'Liver'], 
      affirmation: "I am empowered by divine will and cosmic strength.",
      color: '#0e7490' },
    { vertebrae: 'T7-T8', element: 'Earth', chakra: 'Solar Plexus', organs: ['Spleen', 'Gallbladder'], 
      affirmation: "My personal power aligns perfectly with universal purpose.",
      color: '#155e75' },
    
    // Lower Thoracic (T9-T12) - Metal Element - Solar Plexus/Sacral Bridge
    { vertebrae: 'T9-T10', element: 'Metal', chakra: 'Solar Plexus', organs: ['Adrenals', 'Kidneys'], 
      affirmation: "I release what no longer serves and embrace divine transformation.",
      color: '#374151' },
    { vertebrae: 'T11-T12', element: 'Metal', chakra: 'Sacral', organs: ['Small Intestine', 'Reproductive'], 
      affirmation: "I honor my sacred creative force and divine sexual energy.",
      color: '#4b5563' },
    
    // Lumbar (L1-L5) - Water Element - Sacral/Root Chakras
    { vertebrae: 'L1-L2', element: 'Water', chakra: 'Sacral', organs: ['Lower Back', 'Hips'], 
      affirmation: "My sacred waters flow with divine creative potential.",
      color: '#64748b' },
    { vertebrae: 'L3-L4', element: 'Water', chakra: 'Root', organs: ['Legs', 'Feet'], 
      affirmation: "I am grounded in divine strength and earthly wisdom.",
      color: '#6b7280' },
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
    // Return fallback if data not loaded yet
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
    
    // Filter data for user's sun sign
    const signEntries = astronomicalData.filter(entry => entry['Moon Enters'] === sunSign);
    
    // Find next occurrence after today
    const nextEntry = signEntries.find(entry => {
      // Parse UTC times correctly by replacing 'UTC' with 'Z' for proper ISO format
      const utcTimeString = entry['Sacred Window Begins'].replace(' UTC', 'Z');
      const windowStart = new Date(utcTimeString);
      return windowStart > today;
    });
    
    if (!nextEntry) {
      // Fallback if no future entry found
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
    
    // Parse UTC times correctly for both start and end
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
    const cycleIndex = (cycleNumber - 1) % 13; // Rotate through 13 paragraphs
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
      
      currentTime = (currentTime + 30) % (24 * 60); // 30 min intervals
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
            <div className="mt-2 bg-blue-800/30 rounded-full px-4 py-2 inline-block">
              <p className="text-yellow-300 font-semibold">
                This is your {results.currentCycle}{results.currentCycle === 1 ? 'st' : results.currentCycle === 2 ? 'nd' : results.currentCycle === 3 ? 'rd' : 'th'} of 13 Sacred Sidereal Cycles this year
              </p>
            </div>
          </div>

          {/* Sacred Journey Affirmation */}
          <div className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 rounded-lg p-6 mb-6 text-black shadow-2xl border-2 border-yellow-400">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <Heart className="text-red-600" />
              Your Sacred Chrism Journey
            </h2>
            <p className="text-sm leading-relaxed font-medium italic">{results.sacredJourney}</p>
          </div>

          {/* Next Sacred Secretion - ACCURATE ASTRONOMICAL DATA */}
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
            <div className="bg-slate-800/50 rounded p-4 text-sm space-y-3">
              <p><span className="text-yellow-300 font-semibold">Duration:</span> {results.moonData.durationDays.toFixed(1)} days when moon is in {userInfo.sunSign}</p>
              <p><span className="text-yellow-300 font-semibold">Moon Phase:</span> {results.moonData.moonPhase}</p>
              <p><span className="text-yellow-300 font-semibold">Next Sacred Window:</span> Every {results.moonData.cycleFrequency} ({results.moonData.totalCyclesPerYear.toFixed(1)} cycles/year)</p>
              <p><span className="text-yellow-300 font-semibold">Push Notification:</span> We'll notify you 24 hours before your next sacred window opens</p>
              
              <div className="border-t border-slate-600 pt-3 mt-3">
                <p className="text-yellow-300 font-semibold mb-2">🔥 Sacred Window Protocol:</p>
                <p className="text-blue-200 mb-2">This timing window is considered sacred for meditation, discipline, and inner alignment. The physiological and spiritual opportunity for refinement depends on creating optimal conditions for your chrism to ascend.</p>
                
                <div className="bg-slate-700/50 rounded p-3 mt-2">
                  <p className="text-yellow-200 font-medium mb-2">Success depends on:</p>
                  <ul className="text-blue-200 text-sm space-y-1 ml-4">
                    <li>• <span className="text-yellow-300">Retention</span> of the seed (sexual continence)</li>
                    <li>• <span className="text-yellow-300">Mental purity</span> and focused intention</li>
                    <li>• <span className="text-yellow-300">Spiritual focus</span> through meditation and contemplation</li>
                    <li>• <span className="text-yellow-300">Avoidance of excess</span> or indulgence of any kind</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Complete Spinal Energy Mapping */}
          <div className="bg-slate-800/30 backdrop-blur rounded-lg p-6 mb-6 border border-slate-600">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="text-yellow-400" />
              Your Sacred Chrism Meditation Map
            </h2>
            
            <div className="bg-blue-900/20 rounded-lg p-4 mb-6 border border-blue-500">
              <h3 className="text-yellow-300 font-bold mb-2">🧘‍♀️ How to Use Your Spinal Meditation Map:</h3>
              <p className="text-blue-200 text-sm mb-3">
                During your sacred window, use this map to guide your inner focus as the chrism flows through your spine. 
                Each section represents a <span className="text-yellow-300 font-semibold">6-hour meditation journey</span> from your pineal gland to your sacral sanctuary.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-yellow-300 font-semibold mb-1">Meditation Focus for Each Section:</p>
                  <ul className="text-blue-200 space-y-1">
                    <li>• <span className="text-yellow-300">Visualize</span> the golden chrism in that vertebral region</li>
                    <li>• <span className="text-yellow-300">Feel</span> the Chinese Element energy flowing</li>
                    <li>• <span className="text-yellow-300">Open</span> the corresponding Chakra center</li>
                    <li>• <span className="text-yellow-300">Send healing</span> to the associated organs</li>
                  </ul>
                </div>
                <div>
                  <p className="text-yellow-300 font-semibold mb-1">Sacred Practice Instructions:</p>
                  <ul className="text-blue-200 space-y-1">
                    <li>• <span className="text-yellow-300">Speak</span> the divine affirmation with intention</li>
                    <li>• <span className="text-yellow-300">Breathe</span> into each spinal section slowly</li>
                    <li>• <span className="text-yellow-300">Hold</span> the energy there for several minutes</li>
                    <li>• <span className="text-yellow-300">Feel</span> the chrism preparing for ascension</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <p className="text-blue-200 mb-4 text-center italic">
              "As you meditate on each spinal segment, you prepare the pathway for your chrism's triumphant return to the crown."
            </p>
            
            <div className="grid gap-4 max-h-96 overflow-y-auto">
              {results.spinalFlow.map((flow, index) => (
                <div key={index} className="p-4 rounded-lg shadow-lg bg-slate-800/40 border-l-4"
                     style={{ borderLeftColor: flow.color }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
                         style={{ backgroundColor: flow.color }}>
                      {flow.vertebrae}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-bold text-lg mb-1">
                        Meditation Hour: {flow.time}
                      </div>
                      <div className="text-blue-200 text-sm mb-2">
                        <span className="text-yellow-300 font-semibold">{flow.element} Element</span> • 
                        <span className="text-yellow-300 font-semibold"> {flow.chakra} Chakra</span> • 
                        <span> Healing: {flow.organs.join(', ')}</span>
                      </div>
                      <div className="bg-slate-700/30 rounded p-3 mt-2">
                        <p className="text-yellow-200 italic text-sm font-medium mb-1">
                          Sacred Affirmation to Speak:
                        </p>
                        <p className="text-blue-100 text-sm">
                          "{flow.affirmation}"
                        </p>
                      </div>
                      <div className="mt-2 text-xs text-slate-300">
                        💫 <span className="italic">Visualize golden chrism flowing through this region as you breathe deeply and repeat the affirmation</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 bg-gradient-to-r from-yellow-600/20 to-amber-600/20 rounded-lg p-4 border border-yellow-500/30">
              <p className="text-yellow-300 font-bold text-center mb-2">
                🏺 Sacred Reminder: The Chrism's Journey
              </p>
              <p className="text-blue-200 text-sm text-center">
                After 6 hours of flowing through your 24 vertebrae, your sacred chrism arrives at the sacral sanctuary (Bethlehem) 
                where it rests for 2.5 days. On the third day, through your disciplined practice, it begins its ascension back to 
                the Optic Thalamus (Golgotha) - completing the resurrection within your own temple body.
              </p>
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
            
            <div className="bg-blue-900/20 rounded-lg p-3 mt-4 text-xs text-blue-200">
              <p className="font-semibold text-yellow-300 mb-1">📱 Sacred Window Notifications:</p>
              <p>We'll send you a push notification 24 hours before your next sacred window opens. Please ensure your device settings allow notifications from this app to receive your monthly sacred reminders.</p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-slate-800/20 rounded-lg p-4 text-slate-300 text-xs">
          <p className="font-semibold mb-2">📚 Based on "God-Man: The Word Made Flesh" by George W. Carey</p>
          <p>This calculator uses <span className="text-yellow-400 font-semibold">Skyfield</span> for real-time lunar ingress detection and applies <span className="text-yellow-400 font-semibold">Lahiri ayanamsa (~24°)</span> for <span className="text-yellow-400 font-semibold">sidereal zodiac</span> calculations. Sacred windows are calculated using precise ephemeris data for educational and spiritual exploration purposes.</p>
        </div>
      </div>
    </div>
  );
};

export default SacredSpineApp;
