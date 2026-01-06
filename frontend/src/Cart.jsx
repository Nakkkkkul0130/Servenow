import React, { useState, useEffect } from 'react';

const Cart = ({ cartItems, onUpdateCart, onBackToMenu, onCheckout, orderDetails }) => {
  const [address, setAddress] = useState(orderDetails?.address || '');
  const [phone, setPhone] = useState(orderDetails?.phone || '');
  const [liveTotal, setLiveTotal] = useState(orderDetails?.total || 0);
  const [changeTimer, setChangeTimer] = useState(120); // 2 minutes
  const [canMakeChanges, setCanMakeChanges] = useState(true);

  // Live tracking countdown
  useEffect(() => {
    if (orderDetails && changeTimer > 0) {
      const timer = setInterval(() => {
        setChangeTimer(prev => {
          if (prev <= 1) {
            setCanMakeChanges(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [orderDetails, changeTimer]);

  // Update live total when cart changes
  useEffect(() => {
    if (orderDetails) {
      const additionalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      setLiveTotal(orderDetails.total + additionalAmount);
    }
  }, [cartItems, orderDetails]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  // No delivery fee for additional orders if there's already a placed order
  const deliveryFee = orderDetails ? 0 : (subtotal > 200 ? 0 : 40);
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
      <div className="bg-white shadow-sm p-4 lg:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToMenu}
              className="text-gray-600 hover:text-gray-800 text-sm lg:text-base"
            >
              ← Back
            </button>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800">🛒 Your Cart</h1>
          </div>
          
          {/* Live Tracking Display */}
          {orderDetails && (
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 rounded-lg px-3 lg:px-4 py-2 lg:py-3">
                <p className="text-xs lg:text-sm text-green-700">Live Total</p>
                <p className="font-bold text-green-800 text-sm lg:text-base">₹{liveTotal}</p>
              </div>
              <div className={`rounded-lg px-3 lg:px-4 py-2 lg:py-3 ${canMakeChanges ? 'bg-orange-100' : 'bg-red-100'}`}>
                <p className={`text-xs lg:text-sm ${canMakeChanges ? 'text-orange-700' : 'text-red-700'}`}>
                  {canMakeChanges ? 'Changes allowed' : 'Changes locked'}
                </p>
                <p className={`font-bold text-sm lg:text-base ${canMakeChanges ? 'text-orange-800' : 'text-red-800'}`}>
                  {formatTime(changeTimer)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-6 lg:space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Cart Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-4 lg:p-6">
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <h2 className="font-bold text-gray-800 text-lg lg:text-xl">Order Items</h2>
                {orderDetails && (
                  <div className="text-sm lg:text-base text-blue-600 font-medium">
                    📍 Live Order Tracking
                  </div>
                )}
              </div>
          
          {/* Original Order Items (if exists) */}
          {orderDetails && (
            <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-sm font-bold text-green-700 mb-2">✓ Original Order (Confirmed)</h3>
              <div className="text-sm text-green-600">
                <p>Order #{orderDetails.orderId} - ₹{orderDetails.total}</p>
                <p className="text-xs">Being prepared by kitchen</p>
              </div>
            </div>
          )}
          
          {/* Additional Items */}
          {cartItems.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-bold text-orange-700 mb-2">
                {orderDetails ? '🎆 Additional Items' : 'Cart Items'}
              </h3>
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
                        disabled={!canMakeChanges}
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold disabled:bg-gray-100 disabled:text-gray-400"
                      >
                        -
                      </button>
                      <span className="font-bold">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateCart(item.id, 1)}
                        disabled={!canMakeChanges}
                        className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold disabled:bg-gray-400"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-bold text-gray-800 w-16 text-right">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!canMakeChanges && (
            <div className="bg-red-50 rounded-xl p-4 text-center border border-red-200">
              <p className="text-red-700 font-bold">⏰ Time's up! No more changes allowed</p>
              <p className="text-red-600 text-sm">Your order is being prepared</p>
            </div>
          )}
        </div>

        </div>

        {/* Sidebar - Delivery Details & Bill Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-4 lg:p-6">
            <h2 className="font-bold text-gray-800 mb-4 text-lg lg:text-xl">📍 Delivery Details</h2>
            {orderDetails && (
              <p className="text-sm lg:text-base text-green-600 mb-3">✓ Using previous delivery details</p>
            )}
            <div className="space-y-3 lg:space-y-4">
              <input
                type="text"
                placeholder="Delivery Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm lg:text-base"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm lg:text-base"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 lg:p-6">
            <h2 className="font-bold text-gray-800 mb-4 text-lg lg:text-xl">💰 Bill Summary</h2>
            <div className="space-y-2 lg:space-y-3">
              {orderDetails && (
                <>
                  <div className="flex justify-between text-green-600 text-sm lg:text-base">
                    <span>Original Order</span>
                    <span className="font-medium">₹{orderDetails.total}</span>
                  </div>
                  {cartItems.length > 0 && (
                    <div className="flex justify-between text-orange-600 text-sm lg:text-base">
                      <span>Additional Items</span>
                      <span className="font-medium">₹{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between text-lg lg:text-xl font-bold text-blue-600">
                    <span>Live Total</span>
                    <span>₹{liveTotal}</span>
                  </div>
                </>
              )}
              
              {!orderDetails && (
                <>
                  <div className="flex justify-between text-sm lg:text-base">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm lg:text-base">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className={`font-medium ${deliveryFee === 0 ? 'text-green-600' : ''}`}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  {deliveryFee === 0 && orderDetails && (
                    <p className="text-xs lg:text-sm text-green-600">🎆 No extra delivery charge for additional items</p>
                  )}
                  {deliveryFee === 0 && !orderDetails && (
                    <p className="text-xs lg:text-sm text-green-600">🎉 Free delivery on orders above ₹200</p>
                  )}
                  <div className="border-t pt-2 flex justify-between text-lg lg:text-xl font-bold">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 lg:py-6 rounded-xl font-bold text-lg lg:text-xl hover:shadow-lg transition-all transform hover:scale-105"
          >
            🚀 Place Order - ₹{orderDetails ? liveTotal : total}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;