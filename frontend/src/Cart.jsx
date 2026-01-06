import React, { useState, useEffect } from 'react';

const Cart = ({ cartItems, onUpdateCart, onBackToMenu, onCheckout, orderDetails }) => {
  const [address, setAddress] = useState(orderDetails?.address || '');
  const [phone, setPhone] = useState(orderDetails?.phone || '');
  const [liveTotal, setLiveTotal] = useState(orderDetails?.total || 0);
  const [changeTimer, setChangeTimer] = useState(120);
  const [canMakeChanges, setCanMakeChanges] = useState(true);
  
  const [deliveryDetails, setDeliveryDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    landmark: '',
    city: '',
    pincode: '',
    deliveryType: 'standard'
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);

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

  useEffect(() => {
    if (orderDetails) {
      const additionalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const additionalDeliveryFee = deliveryDetails.deliveryType === 'express' ? 60 : 0;
      const additionalGst = Math.round((additionalAmount + additionalDeliveryFee) * 0.05);
      const additionalTotal = additionalAmount + additionalDeliveryFee + additionalGst - promoDiscount;
      setLiveTotal(orderDetails.total + additionalTotal);
    }
  }, [cartItems, orderDetails, deliveryDetails.deliveryType, promoDiscount]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = deliveryDetails.deliveryType === 'express' ? 60 : (orderDetails ? 0 : (subtotal > 200 ? 0 : 40));
  const platformFee = orderDetails ? 0 : 5; // No platform fee for additional orders
  const gst = Math.round((subtotal + deliveryFee) * 0.05);
  const total = subtotal + deliveryFee + platformFee + gst - promoDiscount;
  
  // Calculate final total including original order and discount
  const finalTotal = orderDetails ? (orderDetails.originalTotal || orderDetails.total) + total : total;

  const handlePromoCode = () => {
    if (promoCode === 'SAVE50') {
      setPromoDiscount(50);
    } else if (promoCode === 'FIRST100') {
      setPromoDiscount(100);
    } else {
      setPromoDiscount(0);
      alert('Invalid promo code');
    }
  };

  const handleCheckout = () => {
    if (!deliveryDetails.fullName || !deliveryDetails.phone || !deliveryDetails.address) {
      alert('Please fill in all required delivery details');
      return;
    }
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    onCheckout({ 
      deliveryDetails, 
      paymentMethod, 
      specialInstructions, 
      promoCode, 
      total,
      breakdown: { subtotal, deliveryFee, platformFee, gst, promoDiscount }
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 text-lg">Add some delicious items to get started!</p>
          <button
            onClick={onBackToMenu}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all transform hover:scale-105"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-white/20 p-4 lg:p-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToMenu}
              className="text-gray-600 hover:text-gray-800 text-lg font-medium"
            >
              ← Back to Menu
            </button>
            <h1 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
              🛒 Your Cart
            </h1>
          </div>
          
          {orderDetails && (
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 rounded-xl px-4 py-3">
                <p className="text-sm text-green-700">Live Total</p>
                <p className="font-bold text-green-800 text-lg">₹{liveTotal}</p>
              </div>
              <div className={`rounded-xl px-4 py-3 ${canMakeChanges ? 'bg-orange-100' : 'bg-red-100'}`}>
                <p className={`text-sm ${canMakeChanges ? 'text-orange-700' : 'text-red-700'}`}>
                  {canMakeChanges ? 'Changes allowed' : 'Changes locked'}
                </p>
                <p className={`font-bold ${canMakeChanges ? 'text-orange-800' : 'text-red-800'}`}>
                  {formatTime(changeTimer)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content - Full Width Layout */}
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Order Items Section - Full Width */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 lg:p-8 mb-8 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl lg:text-3xl font-black text-gray-800">Order Items</h2>
            {orderDetails && (
              <div className="text-blue-600 font-medium">
                📍 Live Order Tracking
              </div>
            )}
          </div>

          {/* Original Order Items */}
          {orderDetails && (
            <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200">
              <h3 className="font-bold text-green-700 mb-2">✓ Original Order (Confirmed)</h3>
              <div className="text-green-600">
                <p>Order #{orderDetails.orderId} - ₹{orderDetails.total}</p>
                <p className="text-sm">Being prepared by kitchen</p>
              </div>
            </div>
          )}

          {/* Cart Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {cartItems.map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-all">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">{item.image}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">₹{item.price} each</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onUpdateCart(item.id, -1)}
                      disabled={!canMakeChanges}
                      className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold disabled:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="font-bold text-lg min-w-[2rem] text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateCart(item.id, 1)}
                      disabled={!canMakeChanges}
                      className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold disabled:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-bold text-gray-800">₹{item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          {!canMakeChanges && (
            <div className="bg-red-50 rounded-xl p-4 text-center border border-red-200">
              <p className="text-red-700 font-bold">⏰ Time's up! No more changes allowed</p>
              <p className="text-red-600 text-sm">Your order is being prepared</p>
            </div>
          )}
        </div>

        {/* Checkout Section - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-6">
            {/* Delivery Details */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
              <h2 className="text-xl font-black text-gray-800 mb-6 flex items-center">
                📍 Delivery Details
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={deliveryDetails.fullName}
                    onChange={(e) => setDeliveryDetails({...deliveryDetails, fullName: e.target.value})}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 hover:bg-white transition-all"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={deliveryDetails.email}
                    onChange={(e) => setDeliveryDetails({...deliveryDetails, email: e.target.value})}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 hover:bg-white transition-all"
                    required
                  />
                </div>
                
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={deliveryDetails.phone}
                  onChange={(e) => setDeliveryDetails({...deliveryDetails, phone: e.target.value})}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 hover:bg-white transition-all"
                  required
                />
                
                <textarea
                  placeholder="Complete Address *"
                  value={deliveryDetails.address}
                  onChange={(e) => setDeliveryDetails({...deliveryDetails, address: e.target.value})}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 hover:bg-white transition-all h-20 resize-none"
                  required
                />
                
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Landmark"
                    value={deliveryDetails.landmark}
                    onChange={(e) => setDeliveryDetails({...deliveryDetails, landmark: e.target.value})}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 hover:bg-white transition-all"
                  />
                  <input
                    type="text"
                    placeholder="City *"
                    value={deliveryDetails.city}
                    onChange={(e) => setDeliveryDetails({...deliveryDetails, city: e.target.value})}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 hover:bg-white transition-all"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Pincode *"
                    value={deliveryDetails.pincode}
                    onChange={(e) => setDeliveryDetails({...deliveryDetails, pincode: e.target.value})}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 hover:bg-white transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
              <h2 className="text-xl font-black text-gray-800 mb-6 flex items-center">
                💳 Payment Method
              </h2>
              
              <div className="space-y-3">
                {[
                  { value: 'cod', icon: '💵', title: 'Cash on Delivery', desc: 'Pay when order arrives', badge: 'Popular' },
                  { value: 'upi', icon: '📱', title: 'UPI Payment', desc: 'PhonePe, GPay, Paytm', badge: 'Instant' },
                  { value: 'card', icon: '💳', title: 'Credit/Debit Card', desc: 'Visa, Mastercard, RuPay', badge: 'Secure' },
                  { value: 'wallet', icon: '👛', title: 'Digital Wallet', desc: 'Paytm, Amazon Pay', badge: 'Cashback' }
                ].map(method => (
                  <label key={method.value} className="flex items-center space-x-3 p-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-orange-300 transition-all">
                    <input
                      type="radio"
                      name="payment"
                      value={method.value}
                      checked={paymentMethod === method.value}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-orange-500"
                    />
                    <span className="text-xl">{method.icon}</span>
                    <div className="flex-1">
                      <span className="font-bold text-gray-800">{method.title}</span>
                      <p className="text-sm text-gray-600">{method.desc}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">{method.badge}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Summary & Actions */}
          <div className="space-y-6">
            {/* Promo Code */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl shadow-lg p-6 border border-green-200">
              <h3 className="font-bold text-gray-800 mb-4">🎫 Apply Promo Code</h3>
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={handlePromoCode}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Apply
                </button>
              </div>
              {promoDiscount > 0 && (
                <div className="mt-3 p-3 bg-green-100 rounded-lg border border-green-300">
                  <p className="text-green-800 font-medium">✓ Promo applied! You saved ₹{promoDiscount}</p>
                </div>
              )}
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-gray-700">🎉 Available Codes:</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setPromoCode('SAVE50')}
                    className="bg-white border-2 border-green-300 text-green-700 px-3 py-1 rounded-lg text-sm font-bold hover:bg-green-50 transition-all"
                  >
                    SAVE50 - ₹50 OFF
                  </button>
                  <button
                    onClick={() => setPromoCode('FIRST100')}
                    className="bg-white border-2 border-blue-300 text-blue-700 px-3 py-1 rounded-lg text-sm font-bold hover:bg-blue-50 transition-all"
                  >
                    FIRST100 - ₹100 OFF
                  </button>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  📝 Click on any code to auto-fill, then press Apply
                </p>
              </div>
            </div>

            {/* Bill Summary */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
              <h2 className="text-xl font-black text-gray-800 mb-6">💰 Bill Summary</h2>
              <div className="space-y-3">
                {orderDetails && (
                  <div className="flex justify-between text-green-600">
                    <span>Original Order</span>
                    <span className="font-medium">₹{orderDetails.originalTotal || orderDetails.total}</span>
                  </div>
                )}
                
                {subtotal > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{orderDetails ? 'Additional Items' : 'Item Total'}</span>
                      <span className="font-medium">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className={`font-medium ${deliveryFee === 0 ? 'text-green-600' : ''}`}>
                        {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                      </span>
                    </div>
                    {platformFee > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Platform Fee</span>
                        <span className="font-medium">₹{platformFee}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">GST (5%)</span>
                      <span className="font-medium">₹{gst}</span>
                    </div>
                    {promoDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Promo Discount</span>
                        <span className="font-medium">-₹{promoDiscount}</span>
                      </div>
                    )}
                  </>
                )}
                
                <div className="border-t pt-3 flex justify-between text-xl font-bold text-orange-600">
                  <span>Total Amount</span>
                  <span>₹{finalTotal}</span>
                </div>
                
                {subtotal > 0 && (
                  <div className="bg-green-50 rounded-lg p-3 mt-3">
                    <p className="text-xs text-green-700 text-center">
                      🎉 {orderDetails ? 'No extra platform fee for additional items!' : `You're saving ₹${50 + promoDiscount} on this order!`}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Special Instructions */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
              <h3 className="font-bold text-gray-800 mb-4">📝 Special Instructions</h3>
              <textarea
                placeholder="Any special requests? (Optional)"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 hover:bg-white transition-all h-20 resize-none"
              />
            </div>

            {/* Place Order Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-6 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-105 relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10">
                🚀 Place Order - ₹{finalTotal}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;