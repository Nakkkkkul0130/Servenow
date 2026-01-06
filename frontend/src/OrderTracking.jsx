import React, { useState, useEffect } from 'react';

const OrderTracking = ({ orderDetails, onBackToThankYou }) => {
  const [currentStatus, setCurrentStatus] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(25);

  const trackingSteps = [
    { status: 'Order Confirmed', icon: '✅', time: '0 min', completed: true },
    { status: 'Preparing Food', icon: '👨‍🍳', time: '5 min', completed: true },
    { status: 'Food Ready', icon: '🍽️', time: '20 min', completed: false },
    { status: 'Out for Delivery', icon: '🚚', time: '25 min', completed: false },
    { status: 'Delivered', icon: '🎉', time: '30 min', completed: false }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStatus(prev => {
        if (prev < trackingSteps.length - 1) {
          const newStatus = prev + 1;
          setEstimatedTime(30 - (newStatus * 6));
          return newStatus;
        }
        return prev;
      });
    }, 8000); // Update every 8 seconds for demo

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBackToThankYou}
              className="text-gray-600 hover:text-gray-800 flex items-center space-x-2"
            >
              <span>←</span>
              <span>Back</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-800">📍 Track Your Order</h1>
            <div></div>
          </div>

          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🚚</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Order #{orderDetails?.orderId}</h2>
            <p className="text-lg text-gray-600">Estimated delivery: {estimatedTime} minutes</p>
            {orderDetails && (
              <p className="text-lg text-green-600 font-semibold">Total: ₹{orderDetails.total}</p>
            )}
          </div>

          {/* Live Map Simulation */}
          <div className="bg-gray-100 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center h-48 bg-gradient-to-r from-blue-200 to-green-200 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-gradient-to-br from-blue-300 to-green-300"></div>
              </div>
              <div className="relative z-10 text-center">
                <div className="text-4xl mb-2 animate-bounce">📍</div>
                <p className="text-gray-700 font-semibold">Live Location Tracking</p>
                <p className="text-sm text-gray-600">Your order is on the way!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tracking Steps */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Order Progress</h3>
          
          <div className="space-y-6">
            {trackingSteps.map((step, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                  index <= currentStatus 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.icon}
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${
                    index <= currentStatus ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {step.status}
                  </p>
                  <p className="text-sm text-gray-500">{step.time}</p>
                </div>
                {index <= currentStatus && (
                  <div className="text-green-500 font-bold">✓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Delivery Details</h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📍</span>
              <div>
                <p className="font-semibold text-gray-800">Delivery Address</p>
                <p className="text-gray-600">{orderDetails?.address || 'Your delivery address'}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📞</span>
              <div>
                <p className="font-semibold text-gray-800">Contact Number</p>
                <p className="text-gray-600">{orderDetails?.phone || 'Your phone number'}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🚚</span>
              <div>
                <p className="font-semibold text-gray-800">Delivery Partner</p>
                <p className="text-gray-600">Raj Kumar • ⭐ 4.8 rating</p>
                <p className="text-sm text-green-600">📱 Call delivery partner</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>
          
          <div className="space-y-3 mb-6">
            {orderDetails?.items?.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{item.image}</span>
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-600">x{item.quantity}</span>
                  <span className="font-semibold ml-2">₹{item.price * item.quantity}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total Amount</span>
              <span className="text-green-600">₹{orderDetails?.total}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-4">
          <button className="w-full bg-green-500 text-white font-bold py-4 rounded-2xl hover:bg-green-600 transition-all">
            📞 Call Delivery Partner
          </button>
          <button className="w-full bg-red-500 text-white font-bold py-4 rounded-2xl hover:bg-red-600 transition-all">
            ❌ Cancel Order
          </button>
          <button 
            onClick={onBackToThankYou}
            className="w-full bg-gray-600 text-white font-bold py-4 rounded-2xl hover:bg-gray-700 transition-all"
          >
            🎮 Back to Games
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;