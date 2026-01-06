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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm p-4 lg:p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">🍽️ Servenow</h1>
            <p className="text-sm lg:text-base text-gray-600">Welcome, {user.name}!</p>
          </div>
          {cartCount > 0 && (
            <button
              onClick={onViewCart}
              className="bg-orange-500 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-medium flex items-center space-x-2 hover:bg-orange-600 transition-all text-sm lg:text-base"
            >
              <span>🛒 Cart ({cartCount})</span>
              <span>₹{cartTotal}</span>
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">🔥 Popular Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {menuItems.map(item => {
            const cartItem = cartItems.find(ci => ci.id === item.id);
            return (
              <div key={item.id} className="bg-white rounded-xl shadow-md p-4 lg:p-6 hover:shadow-lg transition-all">
                <div className="text-center mb-4">
                  <div className="text-5xl lg:text-6xl mb-3">{item.image}</div>
                  <h3 className="font-bold text-gray-800 text-lg lg:text-xl mb-1">{item.name}</h3>
                  <p className="text-sm lg:text-base text-gray-500 mb-2">{item.category}</p>
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm lg:text-base text-gray-600">{item.rating}</span>
                  </div>
                  <p className="font-bold text-xl lg:text-2xl text-gray-800 mb-4">₹{item.price}</p>
                </div>
                <div className="text-center">
                  {cartItem ? (
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        onClick={() => onAddToCart(item, -1)}
                        className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-lg lg:text-xl hover:bg-gray-300 transition-all"
                      >
                        -
                      </button>
                      <span className="font-bold text-lg lg:text-xl min-w-[2rem]">{cartItem.quantity}</span>
                      <button
                        onClick={() => onAddToCart(item, 1)}
                        className="w-10 h-10 lg:w-12 lg:h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg lg:text-xl hover:bg-orange-600 transition-all"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => onAddToCart(item, 1)}
                      className="w-full bg-orange-500 text-white px-6 py-3 lg:py-4 rounded-lg font-bold hover:bg-orange-600 transition-all transform hover:scale-105 text-sm lg:text-base"
                    >
                      Add to Cart
                    </button>
                  )}
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