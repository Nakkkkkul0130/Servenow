import React, { useState, useEffect } from 'react';

const ThankYouPage = ({ orderDetails, onBackToMenu }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [revealedSecrets, setRevealedSecrets] = useState([]);
  const [countdown, setCountdown] = useState(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const revealSecret = (secretId) => {
    if (!revealedSecrets.includes(secretId)) {
      setRevealedSecrets([...revealedSecrets, secretId]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100">
      
      {/* Section 1: Order Confirmation */}
      {currentSection === 0 && (
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <h1 className="text-5xl font-black text-gray-800 mb-4">🎉 Order Confirmed!</h1>
            <p className="text-xl text-gray-600 mb-8">Your delicious meal is on its way</p>
            
            <div className="bg-green-50 rounded-2xl p-6 mb-8">
              <p className="text-lg font-bold text-green-700">Order #{orderDetails?.orderId || 'SN' + Date.now()}</p>
              <p className="text-lg text-green-600">⏰ Arriving in 25-30 mins</p>
              {orderDetails && (
                <p className="text-lg text-green-600">💰 Total: ₹{orderDetails.total}</p>
              )}
            </div>
            
            <button
              onClick={() => setCurrentSection(1)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-6 px-8 rounded-2xl font-bold text-2xl hover:shadow-lg transition-all"
            >
              🎁 Claim Your Exclusive Rewards
            </button>
            <p className="text-gray-500 mt-4 text-lg">3 special surprises waiting for you...</p>
          </div>
        </div>
      )}

      {/* Section 2: Mystery Rewards */}
      {currentSection === 1 && (
        <div className="min-h-screen p-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-gray-800 mb-4">🔮 Your Exclusive Rewards</h2>
              <p className="text-xl text-gray-600">Click each box to reveal your surprise</p>
              <div className="text-lg mt-4 bg-red-100 text-red-700 rounded-full px-6 py-2 inline-block font-bold">
                ⏰ Expires in: {formatTime(countdown)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              
              {/* Box 1: Add-ons */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                {!revealedSecrets.includes('box1') ? (
                  <div 
                    onClick={() => revealSecret('box1')}
                    className="p-8 text-center cursor-pointer hover:bg-gray-50 transition-all"
                  >
                    <div className="text-6xl mb-4">🎁</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Mystery Box #1</h3>
                    <p className="text-gray-600 mb-4">Exclusive Add-ons</p>
                    <div className="bg-purple-100 text-purple-700 rounded-xl p-4">
                      <p className="font-bold">🔥 Limited Time</p>
                      <p className="text-sm">Click to unlock</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-8">
                    <div className="text-center mb-6">
                      <div className="text-4xl mb-2">🍹</div>
                      <h3 className="text-xl font-bold text-purple-600">Premium Add-ons Unlocked!</h3>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">🥤</span>
                          <div>
                            <p className="font-bold text-gray-800">Premium Drinks</p>
                            <p className="text-sm text-gray-600">Fresh Juice, Smoothies</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-gray-800">₹60</p>
                          <button className="bg-purple-500 text-white px-4 py-2 rounded-lg font-bold text-sm">ADD</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Box 2: Discount */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                {!revealedSecrets.includes('box2') ? (
                  <div 
                    onClick={() => revealSecret('box2')}
                    className="p-8 text-center cursor-pointer hover:bg-gray-50 transition-all"
                  >
                    <div className="text-6xl mb-4">💰</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Mega Discount</h3>
                    <p className="text-gray-600 mb-4">Next Order Special</p>
                    <div className="bg-yellow-100 text-yellow-700 rounded-xl p-4">
                      <p className="font-bold">🎯 Worth ₹150</p>
                      <p className="text-sm">Tap to reveal code</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-8">
                    <div className="text-center mb-6">
                      <div className="text-4xl mb-2">🎆</div>
                      <h3 className="text-xl font-bold text-yellow-600">₹150 OFF Unlocked!</h3>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl p-6 text-center">
                      <p className="text-sm font-bold mb-1">Exclusive Code:</p>
                      <p className="text-2xl font-black mb-2">MEGA150</p>
                      <p className="text-xs mb-4">Valid for {formatTime(countdown)}</p>
                      <button className="w-full bg-white text-yellow-600 font-bold py-2 rounded-lg">
                        📱 SAVE CODE
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Box 3: Referral */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                {!revealedSecrets.includes('box3') ? (
                  <div 
                    onClick={() => revealSecret('box3')}
                    className="p-8 text-center cursor-pointer hover:bg-gray-50 transition-all"
                  >
                    <div className="text-6xl mb-4">🎯</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Secret Jackpot</h3>
                    <p className="text-gray-600 mb-4">Earn Big Money</p>
                    <div className="bg-green-100 text-green-700 rounded-xl p-4">
                      <p className="font-bold">💎 Up to ₹1500</p>
                      <p className="text-sm">Click to discover how</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-8">
                    <div className="text-center mb-6">
                      <div className="text-4xl mb-2">💎</div>
                      <h3 className="text-xl font-bold text-green-600">Referral Jackpot!</h3>
                    </div>
                    <div className="space-y-3 text-center">
                      <div className="bg-green-50 rounded-lg p-3">
                        <p className="font-bold text-lg text-gray-800">₹200 per referral</p>
                        <p className="text-sm text-gray-600">+ ₹100 bonus (first 5)</p>
                      </div>
                      <button className="w-full bg-green-500 text-white font-bold py-3 rounded-lg">
                        📱 Share & Earn
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {revealedSecrets.length >= 3 && (
              <div className="text-center">
                <button
                  onClick={() => setCurrentSection(2)}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-6 px-12 rounded-2xl font-bold text-2xl hover:shadow-lg transition-all"
                >
                  🎆 Unlock Final Surprise
                </button>
                <p className="text-gray-600 mt-4 text-lg">One more exclusive reward awaits...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Section 3: VIP Status */}
      {currentSection === 2 && (
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center">
            <div className="text-8xl mb-6">👑</div>
            <h2 className="text-5xl font-black text-gray-800 mb-4">VIP STATUS</h2>
            <h3 className="text-2xl font-bold text-purple-600 mb-8">UNLOCKED!</h3>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 mb-8">
              <div className="grid grid-cols-2 gap-6 text-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🚚</span>
                  <span className="font-bold text-gray-800">Free Delivery Forever</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💰</span>
                  <span className="font-bold text-gray-800">25% Off All Orders</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⚡</span>
                  <span className="font-bold text-gray-800">Priority Support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🍽️</span>
                  <span className="font-bold text-gray-800">Exclusive Menu</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-6 rounded-2xl text-xl hover:shadow-lg transition-all">
                👑 ACTIVATE VIP STATUS
              </button>
              <button className="w-full bg-gray-800 text-white font-bold py-4 rounded-2xl text-lg hover:bg-gray-700 transition-all">
                📍 Track Your Order
              </button>
              <button 
                onClick={onBackToMenu}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 rounded-2xl text-lg hover:shadow-lg transition-all"
              >
                🍽️ Order Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => setCurrentSection(index)}
            className={`w-4 h-4 rounded-full transition-all ${
              currentSection === index 
                ? 'bg-purple-600 scale-125' 
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ThankYouPage;