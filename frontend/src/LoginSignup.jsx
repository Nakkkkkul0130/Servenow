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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md lg:max-w-lg xl:max-w-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">🍽️ Servenow</h1>
          <p className="text-gray-600 lg:text-lg">Delicious food delivered fast</p>
        </div>

        <div className="flex mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 lg:py-4 px-4 rounded-l-lg font-medium text-sm lg:text-base ${
              isLogin ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 lg:py-4 px-4 rounded-r-lg font-medium text-sm lg:text-base ${
              !isLogin ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm lg:text-base"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm lg:text-base"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm lg:text-base"
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 lg:py-4 rounded-lg font-bold hover:shadow-lg transition-all transform hover:scale-105 text-sm lg:text-base"
          >
            {isLogin ? '🚀 Login' : '✨ Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm lg:text-base text-gray-500">
            Demo: Use any email/password to continue
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;