import React, { useState } from 'react';

const Menu = ({ user, onAddToCart, cartItems, onViewCart }) => {
  const menuItems = [
    { id: 1, name: 'Chicken Biryani', price: 299, image: '🍛', category: 'Main Course', rating: 4.5 },
    { id: 2, name: 'Margherita Pizza', price: 249, image: '🍕', category: 'Italian', rating: 4.3 },
    { id: 3, name: 'Butter Chicken', price: 279, image: '🍗', category: 'Main Course', rating: 4.6 },
    { id: 4, name: 'Veg Burger', price: 149, image: '🍔', category: 'Fast Food', rating: 4.2 },
    { id: 5, name: 'Masala Dosa', price: 129, image: '🥞', category: 'South Indian', rating: 4.4 },
    { id: 6, name: 'Chocolate Shake', price: 89, image: '🥤', category: 'Beverages', rating: 4.1 }
  ];

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Enhanced Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-white/20 p-4 lg:p-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <h1 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent">
                🍽️ Servenow
              </h1>
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg blur opacity-20"></div>
            </div>
            <div className="hidden lg:flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <span>🚚</span>
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>⚡</span>
                <span>30min Delivery</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>🎮</span>
                <span>Gaming Rewards</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm lg:text-base text-gray-600">Welcome back,</p>
              <p className="font-bold text-gray-800">{user.name}! 👋</p>
            </div>
            {cartCount > 0 && (
              <button
                onClick={onViewCart}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 lg:px-6 py-3 lg:py-4 rounded-xl font-bold flex items-center space-x-2 hover:shadow-xl transition-all transform hover:scale-105 text-sm lg:text-base relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center space-x-2">
                  <span>🛒 Cart ({cartCount})</span>
                  <span className="bg-white/20 px-2 py-1 rounded-lg">₹{cartTotal}</span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Enhanced Section Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent mb-4">
            🔥 Popular Items
          </h2>
          <p className="text-gray-600 lg:text-lg max-w-2xl mx-auto">
            Handpicked favorites loved by thousands of customers. Fresh, delicious, and delivered fast!
          </p>
          <div className="flex items-center justify-center space-x-6 mt-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <span>⭐</span>
              <span>4.8+ Rating</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>👨‍🍳</span>
              <span>Chef's Special</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>💯</span>
              <span>Fresh Daily</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {menuItems.map(item => {
            const cartItem = cartItems.find(ci => ci.id === item.id);
            return (
              <div key={item.id} className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl p-6 lg:p-8 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 border border-white/20 relative overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-red-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <div className="text-6xl lg:text-7xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {item.image}
                    </div>
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold mb-3 inline-block">
                      {item.category}
                    </div>
                    <h3 className="font-black text-gray-800 text-xl lg:text-2xl mb-2 group-hover:text-orange-600 transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.floor(item.rating) ? 'text-yellow-500' : 'text-gray-300'}>
                            ⭐
                          </span>
                        ))}
                      </div>
                      <span className="text-sm lg:text-base text-gray-600 font-medium">
                        {item.rating} (2.1k+ reviews)
                      </span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 mb-6">
                      <span className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                        ₹{item.price}
                      </span>
                      <span className="text-gray-400 line-through text-lg">₹{item.price + 50}</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    {cartItem ? (
                      <div className="flex items-center justify-center space-x-4 bg-orange-50 rounded-xl p-3">
                        <button
                          onClick={() => onAddToCart(item, -1)}
                          className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-full flex items-center justify-center font-bold text-xl lg:text-2xl hover:shadow-lg transition-all transform hover:scale-110"
                        >
                          -
                        </button>
                        <span className="font-black text-2xl lg:text-3xl text-orange-600 min-w-[3rem]">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onAddToCart(item, 1)}
                          className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center font-bold text-xl lg:text-2xl hover:shadow-lg transition-all transform hover:scale-110"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onAddToCart(item, 1)}
                        className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white px-6 py-4 lg:py-5 rounded-xl font-bold hover:shadow-2xl transition-all transform hover:scale-105 text-base lg:text-lg relative overflow-hidden group"
                      >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative z-10 flex items-center justify-center space-x-2">
                          <span>🛒 Add to Cart</span>
                          <span className="bg-white/20 px-2 py-1 rounded-lg text-sm">₹{item.price}</span>
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Menu;