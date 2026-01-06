import React, { useState } from 'react';

const Cart = ({ cartItems, onUpdateCart, onBackToMenu, onCheckout, orderDetails }) => {
  const [address, setAddress] = useState(orderDetails?.address || '');
  const [phone, setPhone] = useState(orderDetails?.phone || '');

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 200 ? 0 : 40;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (!address || !phone) {
      alert('Please fill in delivery address and phone number');
      return;
    }
    onCheckout({ address, phone, total });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some delicious items to get started!</p>
          <button
            onClick={onBackToMenu}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition-all"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm p-4">
        <div className="max-w-2xl mx-auto flex items-center space-x-4">
          <button
            onClick={onBackToMenu}
            className="text-gray-600 hover:text-gray-800"
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold text-gray-800">🛒 Your Cart</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="font-bold text-gray-800 mb-4">Order Items</h2>
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{item.image}</span>
                <div>
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">₹{item.price} each</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onUpdateCart(item.id, -1)}
                    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="font-bold">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateCart(item.id, 1)}
                    className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
                <p className="font-bold text-gray-800 w-16 text-right">₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="font-bold text-gray-800 mb-4">📍 Delivery Details</h2>
          {orderDetails && (
            <p className="text-sm text-green-600 mb-3">✓ Using previous delivery details</p>
          )}
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="font-bold text-gray-800 mb-4">💰 Bill Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Fee</span>
              <span className={`font-medium ${deliveryFee === 0 ? 'text-green-600' : ''}`}>
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </span>
            </div>
            {deliveryFee === 0 && (
              <p className="text-xs text-green-600">🎉 Free delivery on orders above ₹200</p>
            )}
            <div className="border-t pt-2 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all transform hover:scale-105"
        >
          🚀 Place Order - ₹{total}
        </button>
      </div>
    </div>
  );
};

export default Cart;