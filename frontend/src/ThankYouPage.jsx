import React, { useState, useEffect } from 'react';

const ThankYouPage = ({ orderDetails, onBackToMenu, onAddToCart, cartItems, onViewCart, placedOrderItems, onTrackOrder }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [revealedSecrets, setRevealedSecrets] = useState([]);
  const [countdown, setCountdown] = useState(120);
  const [addedItems, setAddedItems] = useState([]);
  const [gameStates, setGameStates] = useState({
    spinWheel: { spinning: false, result: null, spinsLeft: 3 },
    scratchCard: { scratched: [], revealed: false },
    memoryGame: { cards: [], flipped: [], matched: [], gameWon: false },
    quiz: { currentQ: 0, score: 0, completed: false }
  });
  const [totalEarnings, setTotalEarnings] = useState(0);

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

  const handleAddPremiumDrink = () => {
    const premiumDrink = { id: 101, name: 'Premium Drinks', price: 60, image: '🥤', category: 'Beverages' };
    onAddToCart(premiumDrink, 1);
    setAddedItems([...addedItems, 101]);
    setTimeout(() => {
      setAddedItems(addedItems.filter(id => id !== 101));
    }, 3000);
  };

  // Spin Wheel Game
  const spinWheel = () => {
    if (gameStates.spinWheel.spinsLeft <= 0) return;
    
    setGameStates(prev => ({
      ...prev,
      spinWheel: { ...prev.spinWheel, spinning: true }
    }));

    const prizes = [
      { text: '₹25 OFF', value: 25, color: 'text-yellow-600', weight: 15 },
      { text: 'Free Dessert', value: 120, color: 'text-pink-600', weight: 5 },
      { text: '₹50 OFF', value: 50, color: 'text-green-600', weight: 10 },
      { text: 'Try Again', value: 0, color: 'text-gray-600', weight: 40 },
      { text: '₹10 OFF', value: 10, color: 'text-blue-600', weight: 20 },
      { text: 'Try Again', value: 0, color: 'text-gray-600', weight: 10 }
    ];

    // Weighted random selection
    const totalWeight = prizes.reduce((sum, prize) => sum + prize.weight, 0);
    let random = Math.random() * totalWeight;
    let selectedPrize = prizes[0];
    
    for (const prize of prizes) {
      random -= prize.weight;
      if (random <= 0) {
        selectedPrize = prize;
        break;
      }
    }

    setTimeout(() => {
      setGameStates(prev => ({
        ...prev,
        spinWheel: {
          spinning: false,
          result: selectedPrize,
          spinsLeft: prev.spinWheel.spinsLeft - 1
        }
      }));
      setTotalEarnings(prev => prev + selectedPrize.value);
    }, 2000);
  };

  // Scratch Card Game
  const scratchCard = (index) => {
    const newScratched = [...gameStates.scratchCard.scratched, index];
    const prizes = [
      '₹10', '₹25', 'Try Again', '₹15', '₹50', 'Try Again', '₹20', 'Try Again', '₹30'
    ];
    
    setGameStates(prev => ({
      ...prev,
      scratchCard: {
        scratched: newScratched,
        revealed: newScratched.length >= 6,
        prizes: prizes
      }
    }));

    if (newScratched.length >= 6) {
      // Calculate actual winnings from revealed cards
      const revealedPrizes = newScratched.slice(0, 6).map(i => prizes[i]);
      const totalWinnings = revealedPrizes.reduce((sum, prize) => {
        const value = prize === 'Try Again' ? 0 : parseInt(prize.replace('₹', ''));
        return sum + value;
      }, 0);
      setTotalEarnings(prev => prev + totalWinnings);
    }
  };

  // Memory Game
  const initMemoryGame = () => {
    const emojis = ['🍕', '🍔', '🍟', '🥤', '🍰', '🍜'];
    const cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    setGameStates(prev => ({
      ...prev,
      memoryGame: { cards, flipped: [], matched: [], gameWon: false }
    }));
  };

  const flipCard = (index) => {
    const { flipped, matched, cards } = gameStates.memoryGame;
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setGameStates(prev => ({
      ...prev,
      memoryGame: { ...prev.memoryGame, flipped: newFlipped }
    }));

    if (newFlipped.length === 2) {
      setTimeout(() => {
        if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
          const newMatched = [...matched, ...newFlipped];
          const gameWon = newMatched.length === cards.length;
          setGameStates(prev => ({
            ...prev,
            memoryGame: {
              ...prev.memoryGame,
              flipped: [],
              matched: newMatched,
              gameWon
            }
          }));
          if (gameWon) setTotalEarnings(prev => prev + 100);
        } else {
          setGameStates(prev => ({
            ...prev,
            memoryGame: { ...prev.memoryGame, flipped: [] }
          }));
        }
      }, 1000);
    }
  };

  // Food Quiz
  const foodQuiz = [
    { q: "Which spice is known as 'Red Gold'?", options: ['Turmeric', 'Saffron', 'Paprika'], correct: 1 },
    { q: "What's the main ingredient in Hummus?", options: ['Lentils', 'Chickpeas', 'Beans'], correct: 1 },
    { q: "Which country invented Pizza?", options: ['Greece', 'Italy', 'France'], correct: 1 }
  ];

  const answerQuiz = (answerIndex) => {
    const { currentQ, score } = gameStates.quiz;
    const isCorrect = answerIndex === foodQuiz[currentQ].correct;
    const newScore = score + (isCorrect ? 50 : 0);
    
    if (currentQ < foodQuiz.length - 1) {
      setGameStates(prev => ({
        ...prev,
        quiz: { currentQ: currentQ + 1, score: newScore, completed: false }
      }));
    } else {
      setGameStates(prev => ({
        ...prev,
        quiz: { currentQ, score: newScore, completed: true }
      }));
      setTotalEarnings(prev => prev + newScore);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100">
      
      {/* Section 1: Gamified Order Confirmation */}
      {currentSection === 0 && (
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center relative overflow-hidden">
            {/* Floating celebration elements */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-2xl opacity-70"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `float ${2 + Math.random() * 3}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                >
                  {['🎉', '🎊', '✨', '🎈', '🎁', '🏆', '💎'][Math.floor(Math.random() * 7)]}
                </div>
              ))}
            </div>

            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 relative z-10">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <h1 className="text-5xl font-black text-gray-800 mb-4 relative z-10">🎉 Order Confirmed!</h1>
            <p className="text-xl text-gray-600 mb-8 relative z-10">Get ready for an amazing experience!</p>
            
            <div className="bg-green-50 rounded-2xl p-6 mb-8 relative z-10">
              <p className="text-lg font-bold text-green-700">Order #{orderDetails?.orderId || '123456'}</p>
              <p className="text-lg text-green-600">⏰ Arriving in 25-30 mins</p>
              {orderDetails && (
                <p className="text-lg text-green-600">💰 Total: ₹{orderDetails.total}</p>
              )}
              
              {/* Show Original Order Items */}
              {placedOrderItems && placedOrderItems.length > 0 && (
                <div className="mt-4 bg-white rounded-xl p-4">
                  <h4 className="font-bold text-gray-700 mb-2">Your Order:</h4>
                  <div className="space-y-2">
                    {placedOrderItems.map(item => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <span className="mr-2">{item.image}</span>
                          <span>{item.name}</span>
                        </div>
                        <span className="text-gray-600">x{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white mb-8 relative z-10">
              <h2 className="text-2xl font-bold mb-2">🎮 GAME ZONE UNLOCKED!</h2>
              <p className="text-lg mb-4">Play games while you wait & earn rewards!</p>
              <div className="flex items-center justify-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl">🎰</div>
                  <p className="text-sm">Spin Wheel</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl">🎫</div>
                  <p className="text-sm">Scratch Cards</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl">🧠</div>
                  <p className="text-sm">Memory Game</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl">🤔</div>
                  <p className="text-sm">Food Quiz</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setCurrentSection(1)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-6 px-8 rounded-2xl font-bold text-2xl hover:shadow-lg transition-all relative z-10"
            >
              🎮 START GAMING & EARN REWARDS
            </button>
            
            {/* Additional Items Section */}
            {cartItems.length > 0 && (
              <div className="mt-8 bg-orange-50 rounded-2xl p-6 border-2 border-orange-200 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-orange-700">🎆 Additional Items</h3>
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                      <div className="flex items-center">
                        <span className="text-xl mr-3">{item.image}</span>
                        <span className="font-medium text-gray-800">{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">x{item.quantity}</span>
                        <span className="font-bold text-gray-800">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={onViewCart}
                  className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-all"
                >
                  🛒 Place Additional Order (₹{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)})
                </button>
              </div>
            )}
            
            {/* People Also Loved Section */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 relative z-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">💖 People Also Loved</h3>
              <p className="text-gray-600 mb-6">Based on your order, here are some highly-rated favorites:</p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border border-yellow-200 hover:bg-yellow-100 transition-all">
                  <div className="flex items-center">
                    <span className="text-3xl mr-4">🍟</span>
                    <div>
                      <p className="font-bold text-gray-800 text-lg">Crispy French Fries</p>
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="flex text-yellow-500">
                          <span>★★★★★</span>
                        </div>
                        <span className="text-sm text-gray-600">4.8 (2.1k reviews)</span>
                      </div>
                      <p className="text-sm text-green-600 font-medium">🔥 95% customers reorder this</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl text-gray-800">₹99</p>
                    <button 
                      onClick={() => onAddToCart({ id: 102, name: 'Crispy French Fries', price: 99, image: '🍟', category: 'Sides' }, 1)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-yellow-600 transition-all transform hover:scale-105"
                    >
                      ADD NOW
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition-all">
                  <div className="flex items-center">
                    <span className="text-3xl mr-4">🍦</span>
                    <div>
                      <p className="font-bold text-gray-800 text-lg">Vanilla Ice Cream</p>
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="flex text-yellow-500">
                          <span>★★★★★</span>
                        </div>
                        <span className="text-sm text-gray-600">4.9 (1.8k reviews)</span>
                      </div>
                      <p className="text-sm text-green-600 font-medium">🏆 #1 Dessert this month</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl text-gray-800">₹149</p>
                    <button 
                      onClick={() => onAddToCart({ id: 103, name: 'Vanilla Ice Cream', price: 149, image: '🍦', category: 'Desserts' }, 1)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition-all transform hover:scale-105"
                    >
                      ADD NOW
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 transition-all">
                  <div className="flex items-center">
                    <span className="text-3xl mr-4">🥤</span>
                    <div>
                      <p className="font-bold text-gray-800 text-lg">Fresh Lemonade</p>
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="flex text-yellow-500">
                          <span>★★★★☆</span>
                        </div>
                        <span className="text-sm text-gray-600">4.7 (1.5k reviews)</span>
                      </div>
                      <p className="text-sm text-green-600 font-medium">✨ Perfect with your meal</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl text-gray-800">₹79</p>
                    <button 
                      onClick={() => onAddToCart({ id: 104, name: 'Fresh Lemonade', price: 79, image: '🥤', category: 'Beverages' }, 1)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600 transition-all transform hover:scale-105"
                    >
                      ADD NOW
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
                <div className="flex items-center justify-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-purple-600">📊</span>
                    <span className="text-purple-700 font-medium">Trending Now</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-purple-600">👥</span>
                    <span className="text-purple-700">2.3k people added these today</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-purple-600">🚚</span>
                    <span className="text-purple-700">FREE delivery on add-ons</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 2: Game Zone */}
      {currentSection === 1 && (
        <div className="min-h-screen p-8">
          <div className="max-w-6xl mx-auto">
            {/* Game Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-black text-gray-800 mb-4">🎮 SERVENOW GAME ZONE</h2>
              <div className="flex items-center justify-center space-x-8">
                <div className="bg-green-100 rounded-xl p-4">
                  <p className="text-sm text-green-700">Total Earnings</p>
                  <p className="text-2xl font-bold text-green-600">₹{totalEarnings}</p>
                </div>
                <div className="bg-red-100 rounded-xl p-4">
                  <p className="text-sm text-red-700">Time Left</p>
                  <p className="text-2xl font-bold text-red-600">{formatTime(countdown)}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Spin Wheel Game */}
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-center mb-6">🎰 Lucky Spin Wheel</h3>
                <div className="text-center">
                  <div className={`w-48 h-48 mx-auto mb-6 rounded-full border-8 border-yellow-400 flex items-center justify-center text-6xl ${gameStates.spinWheel.spinning ? 'animate-spin' : ''}`}>
                    🎯
                  </div>
                  <p className="text-lg mb-4">Spins Left: {gameStates.spinWheel.spinsLeft}</p>
                  {gameStates.spinWheel.result && (
                    <div className="bg-yellow-50 rounded-xl p-4 mb-4">
                      <p className="text-lg font-bold">You Won:</p>
                      <p className={`text-2xl font-black ${gameStates.spinWheel.result.color}`}>
                        {gameStates.spinWheel.result.text}
                      </p>
                    </div>
                  )}
                  <button
                    onClick={spinWheel}
                    disabled={gameStates.spinWheel.spinsLeft <= 0 || gameStates.spinWheel.spinning}
                    className="bg-yellow-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-yellow-600 disabled:bg-gray-400 transition-all"
                  >
                    {gameStates.spinWheel.spinning ? '🎰 SPINNING...' : '🎰 SPIN NOW'}
                  </button>
                </div>
              </div>

              {/* Scratch Card Game */}
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-center mb-6">🎫 Scratch & Win</h3>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      onClick={() => scratchCard(i)}
                      className={`w-16 h-16 rounded-lg flex items-center justify-center text-sm font-bold cursor-pointer transition-all ${
                        gameStates.scratchCard.scratched.includes(i)
                          ? 'bg-yellow-200 text-yellow-800'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    >
                      {gameStates.scratchCard.scratched.includes(i) 
                        ? (gameStates.scratchCard.prizes ? gameStates.scratchCard.prizes[i] : '₹50')
                        : '?'
                      }
                    </div>
                  ))}
                </div>
                <p className="text-center text-gray-600">Scratch 6 cards to reveal your prize!</p>
                {gameStates.scratchCard.revealed && (
                  <div className="bg-green-50 rounded-xl p-4 mt-4 text-center">
                    <p className="text-lg font-bold text-green-600">
                      🎉 Total winnings: ₹{gameStates.scratchCard.scratched.slice(0, 6).reduce((sum, i) => {
                        const prize = gameStates.scratchCard.prizes ? gameStates.scratchCard.prizes[i] : '₹0';
                        const value = prize === 'Try Again' ? 0 : parseInt(prize.replace('₹', ''));
                        return sum + value;
                      }, 0)}
                    </p>
                  </div>
                )}
              </div>

              {/* Memory Game */}
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-center mb-6">🧠 Food Memory Game</h3>
                {gameStates.memoryGame.cards.length === 0 ? (
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">Match food pairs to win ₹100!</p>
                    <button
                      onClick={initMemoryGame}
                      className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-all"
                    >
                      🎮 Start Game
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {gameStates.memoryGame.cards.map((card, i) => (
                        <div
                          key={i}
                          onClick={() => flipCard(i)}
                          className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl cursor-pointer transition-all ${
                            gameStates.memoryGame.flipped.includes(i) || gameStates.memoryGame.matched.includes(i)
                              ? 'bg-blue-200'
                              : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                        >
                          {gameStates.memoryGame.flipped.includes(i) || gameStates.memoryGame.matched.includes(i) ? card : '?'}
                        </div>
                      ))}
                    </div>
                    {gameStates.memoryGame.gameWon && (
                      <div className="bg-green-50 rounded-xl p-4 text-center">
                        <p className="text-lg font-bold text-green-600">🏆 You won ₹100!</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Food Quiz */}
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-center mb-6">🤔 Food Quiz Challenge</h3>
                {!gameStates.quiz.completed ? (
                  <div>
                    <div className="mb-6">
                      <p className="text-lg font-semibold mb-4">
                        Q{gameStates.quiz.currentQ + 1}: {foodQuiz[gameStates.quiz.currentQ].q}
                      </p>
                      <div className="space-y-2">
                        {foodQuiz[gameStates.quiz.currentQ].options.map((option, i) => (
                          <button
                            key={i}
                            onClick={() => answerQuiz(i)}
                            className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-all"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    <p className="text-center text-gray-600">Score: ₹{gameStates.quiz.score}</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600 mb-2">🎉 Quiz Complete!</p>
                    <p className="text-lg">Final Score: ₹{gameStates.quiz.score}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Premium Add-ons with Gaming Theme */}
            <div className="mt-12 bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-center mb-6">🎮 Gaming Rewards Store</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-3xl mr-4">🥤</span>
                      <div>
                        <p className="font-bold text-gray-800">Gaming Energy Drink</p>
                        <p className="text-sm text-gray-600">Boost your gaming performance!</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-800">₹60</p>
                      {addedItems.includes(101) ? (
                        <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-sm">
                          ✓ ADDED!
                        </div>
                      ) : (
                        <button 
                          onClick={handleAddPremiumDrink}
                          className="bg-purple-500 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-purple-600 transition-all"
                        >
                          🎮 ADD
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <div className="text-center mt-8">
              <button
                onClick={() => setCurrentSection(2)}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-6 px-12 rounded-2xl font-bold text-2xl hover:shadow-lg transition-all"
              >
                💰 Claim All Rewards (₹{totalEarnings})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section 3: Rewards & VIP */}
      {currentSection === 2 && (
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center">
            <div className="text-8xl mb-6">🏆</div>
            <h2 className="text-5xl font-black text-gray-800 mb-4">CONGRATULATIONS!</h2>
            <h3 className="text-2xl font-bold text-green-600 mb-8">You earned ₹{totalEarnings} in rewards!</h3>

            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 mb-8 text-white">
              <h3 className="text-2xl font-bold mb-4">🎮 GAMING CHAMPION STATUS</h3>
              <div className="grid grid-cols-2 gap-6 text-lg">
                <div className="flex items-center space-x-3">
                  <span>🎰</span>
                  <span>Spin Wheel Master</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span>🎫</span>
                  <span>Scratch Card Winner</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span>🧠</span>
                  <span>Memory Game Pro</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span>🤔</span>
                  <span>Food Quiz Expert</span>
                </div>
              </div>
            </div>

            {orderDetails?.isVipEligible && (
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 mb-8 text-white">
                <h3 className="text-2xl font-bold mb-4">👑 VIP GAMING STATUS UNLOCKED!</h3>
                <div className="space-y-2 text-lg">
                  <p>🎮 Exclusive gaming tournaments</p>
                  <p>🏆 Double reward points</p>
                  <p>🎁 Monthly gaming prizes</p>
                  <p>⚡ Priority game access</p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-6 rounded-2xl text-xl hover:shadow-lg transition-all">
                💳 Add ₹{totalEarnings} to Wallet
              </button>
              <button 
                onClick={onTrackOrder}
                className="w-full bg-gray-800 text-white font-bold py-4 rounded-2xl text-lg hover:bg-gray-700 transition-all"
              >
                📍 Track Your Order
              </button>
              <button 
                onClick={onBackToMenu}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 rounded-2xl text-lg hover:shadow-lg transition-all"
              >
                🍽️ Order Again & Play More Games
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Arrows */}
      <div className="fixed top-1/2 left-4 transform -translate-y-1/2">
        {currentSection > 0 && (
          <button
            onClick={() => setCurrentSection(currentSection - 1)}
            className="bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all"
          >
            ←
          </button>
        )}
      </div>
      
      <div className="fixed top-1/2 right-4 transform -translate-y-1/2">
        {currentSection < 2 && (
          <button
            onClick={() => setCurrentSection(currentSection + 1)}
            className="bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all"
          >
            →
          </button>
        )}
      </div>

      {/* Navigation Dots */}
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

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default ThankYouPage;