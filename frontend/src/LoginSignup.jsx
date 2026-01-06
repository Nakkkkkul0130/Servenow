import React, { useState } from 'react';

const LoginSignup = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login/signup
    onLogin({ name: formData.name || 'John Doe', email: formData.email });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200 to-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-200 to-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-red-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12 w-full max-w-md lg:max-w-lg xl:max-w-xl relative z-10 border border-white/20">
        {/* Header with enhanced styling */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="relative inline-block">
            <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent mb-3">
              🍽️ Servenow
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
          </div>
          <p className="text-gray-600 lg:text-xl font-medium">Delicious food delivered fast</p>
          <div className="flex items-center justify-center space-x-2 mt-3">
            <span className="text-yellow-500">⭐</span>
            <span className="text-sm lg:text-base text-gray-500 font-medium">4.9/5 from 10k+ happy customers</span>
          </div>
        </div>

        {/* Enhanced toggle buttons */}
        <div className="flex mb-8 bg-gray-100 rounded-2xl p-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 lg:py-4 px-6 rounded-xl font-bold text-sm lg:text-base transition-all duration-300 ${
              isLogin 
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            🔑 Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 lg:py-4 px-6 rounded-xl font-bold text-sm lg:text-base transition-all duration-300 ${
              !isLogin 
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            ✨ Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
          {!isLogin && (
            <div className="relative">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-4 lg:p-5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm lg:text-base transition-all duration-300 bg-gray-50 hover:bg-white"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <span className="text-gray-400">👤</span>
              </div>
            </div>
          )}
          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-4 lg:p-5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm lg:text-base transition-all duration-300 bg-gray-50 hover:bg-white"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <span className="text-gray-400">📧</span>
            </div>
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full p-4 lg:p-5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm lg:text-base transition-all duration-300 bg-gray-50 hover:bg-white"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <span className="text-gray-400">🔒</span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-4 lg:py-5 rounded-xl font-bold text-lg lg:text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10">
              {isLogin ? '🚀 Login & Start Ordering' : '✨ Sign Up & Get ₹100 Bonus'}
            </span>
          </button>
        </form>

        {/* Enhanced footer */}
        <div className="mt-8 text-center space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
            <p className="text-sm lg:text-base text-gray-600 font-medium">
              🎉 Demo Mode: Use any email/password to explore
            </p>
          </div>
          
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <span>🚚</span>
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>🎮</span>
              <span>Gaming Rewards</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>⚡</span>
              <span>30min Delivery</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default LoginSignup;