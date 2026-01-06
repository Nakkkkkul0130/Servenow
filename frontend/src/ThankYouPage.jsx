import React from 'react';

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        
        {/* Order Confirmation Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-100 rounded-full -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-orange-100 rounded-full -ml-8 -mb-8"></div>
          
          <div className="text-center relative z-10">
            {/* Success Animation */}
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-2">🎉 Thank You!</h1>
            <p className="text-lg text-gray-700 font-medium mb-2">Your order is confirmed!</p>
            <div className="bg-green-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-green-700 font-semibold">Order #SN12345</p>
              <p className="text-sm text-green-600">⏰ Arriving in 25-30 mins</p>
            </div>
            <p className="text-sm text-gray-500">We're preparing your delicious meal 👨‍🍳</p>
          </div>
        </div>

        {/* Add-on Items - More Attractive */}
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">🍹 Add More Treats</h3>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">FREE DELIVERY</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all cursor-pointer group">
              <div className="flex items-center">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mr-4 text-2xl shadow-md group-hover:scale-105 transition-transform">
                  🥤
                </div>
                <div>
                  <p className="font-bold text-gray-800">Chilled Drinks</p>
                  <p className="text-sm text-gray-500">Coke, Pepsi, Sprite</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-gray-800">₹40</p>
                <button className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-4 py-2 rounded-lg text-sm font-bold hover:shadow-lg transition-all transform hover:scale-105">
                  + ADD
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all cursor-pointer group">
              <div className="flex items-center">
                <div className="w-14 h-14 bg-gradient-to-r from-pink-400 to-purple-600 rounded-xl flex items-center justify-center mr-4 text-2xl shadow-md group-hover:scale-105 transition-transform">
                  🍰
                </div>
                <div>
                  <p className="font-bold text-gray-800">Sweet Desserts</p>
                  <p className="text-sm text-gray-500">Chocolate Cake, Ice Cream</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-gray-800">₹120</p>
                <button className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-4 py-2 rounded-lg text-sm font-bold hover:shadow-lg transition-all transform hover:scale-105">
                  + ADD
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Next Order Offer - Eye-catching */}
        <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 rounded-2xl p-6 mb-6 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -mr-12 -mt-12"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -ml-10 -mb-10"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black mb-1">🔥 ₹50 OFF</h3>
                <p className="text-lg font-semibold opacity-90">Next Order Special!</p>
                <p className="text-sm opacity-75">⏰ Valid only today</p>
              </div>
              <div className="text-right">
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <p className="text-xs opacity-75">Use Code:</p>
                  <p className="font-black text-lg">NEXT50</p>
                </div>
              </div>
            </div>
            <button className="w-full bg-white text-orange-600 font-bold py-3 rounded-xl mt-4 hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
              🎯 CLAIM OFFER
            </button>
          </div>
        </div>

        {/* Refer & Earn - Attractive */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">💰 Refer & Earn ₹100</h3>
            <p className="text-sm opacity-90 mb-4">Share Servenow with friends and earn ₹100 for each successful order! 🎁</p>
            <div className="flex space-x-3">
              <button className="flex-1 bg-white text-blue-600 font-bold py-3 rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105">
                📱 Share Now
              </button>
              <button className="flex-1 bg-white bg-opacity-20 text-white font-bold py-3 rounded-xl hover:bg-opacity-30 transition-all">
                📋 Copy Link
              </button>
            </div>
          </div>
        </div>

        {/* Track Order Button */}
        <div className="mt-6">
          <button className="w-full bg-gray-800 text-white font-bold py-4 rounded-2xl hover:bg-gray-700 transition-all transform hover:scale-105 shadow-lg">
            📍 Track Your Order
          </button>
        </div>

      </div>
    </div>
  );
};

export default ThankYouPage;