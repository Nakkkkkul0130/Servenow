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
      <div className="bg-white shadow-sm p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">🍽️ Servenow</h1>
            <p className="text-sm text-gray-600">Welcome, {user.name}!</p>
          </div>
          {cartCount > 0 && (
            <button
              onClick={onViewCart}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-orange-600 transition-all"
            >
              <span>🛒 Cart ({cartCount})</span>
              <span>₹{cartTotal}</span>
            </button>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🔥 Popular Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuItems.map(item => {
            const cartItem = cartItems.find(ci => ci.id === item.id);
            return (
              <div key={item.id} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{item.image}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm text-gray-600">{item.rating}</span>
                    </div>
                    <p className="font-bold text-lg text-gray-800 mt-2">₹{item.price}</p>
                  </div>
                  <div className="text-right">
                    {cartItem ? (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onAddToCart(item, -1)}
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold"
                        >
                          -
                        </button>
                        <span className="font-bold">{cartItem.quantity}</span>
                        <button
                          onClick={() => onAddToCart(item, 1)}
                          className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onAddToCart(item, 1)}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-all"
                      >
                        Add
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