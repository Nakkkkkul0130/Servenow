import React, { useState } from 'react';
import LoginSignup from './LoginSignup';
import Menu from './Menu';
import Cart from './Cart';
import ThankYouPage from './ThankYouPage';
import OrderTracking from './OrderTracking';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [customerOrders, setCustomerOrders] = useState(0); // Track customer order count
  const [placedOrderItems, setPlacedOrderItems] = useState([]); // Store original order items

  const handleLogin = (userData) => {
    setUser(userData);
    // Simulate existing customer with random order count
    const existingOrders = Math.floor(Math.random() * 8); // 0-7 orders
    setCustomerOrders(existingOrders);
    setCurrentPage('menu');
  };

  const handleAddToCart = (item, quantity) => {
    setCartItems(prev => {
      const existingItem = prev.find(ci => ci.id === item.id);
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity <= 0) {
          return prev.filter(ci => ci.id !== item.id);
        }
        return prev.map(ci => 
          ci.id === item.id ? { ...ci, quantity: newQuantity } : ci
        );
      } else if (quantity > 0) {
        return [...prev, { ...item, quantity }];
      }
      return prev;
    });
  };

  const handleUpdateCart = (itemId, quantityChange) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === itemId) {
          const newQuantity = item.quantity + quantityChange;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const handleCheckout = (details) => {
    const orderId = 100000 + Math.floor(Math.random() * 900000);
    const newOrderCount = customerOrders + 1;
    setCustomerOrders(newOrderCount);
    
    // Calculate total including original order if exists
    const originalTotal = orderDetails ? orderDetails.total : 0;
    const additionalTotal = details.total;
    const finalTotal = originalTotal + additionalTotal;
    
    // Store the original order items if this is the first order
    if (!orderDetails) {
      setPlacedOrderItems([...cartItems]);
    }
    
    setOrderDetails({ 
      ...details, 
      orderId, 
      orderCount: newOrderCount, 
      isVipEligible: newOrderCount >= 3,
      total: finalTotal,
      originalTotal: orderDetails ? orderDetails.total : details.total,
      additionalTotal: orderDetails ? details.total : 0
    });
    
    setCurrentPage('thankyou');
    setCartItems([]); // Clear cart after order
  };

  const handleBackToMenu = () => {
    setCurrentPage('menu');
  };

  if (currentPage === 'login') {
    return <LoginSignup onLogin={handleLogin} />;
  }

  if (currentPage === 'menu') {
    return (
      <Menu 
        user={user}
        onAddToCart={handleAddToCart}
        cartItems={cartItems}
        onViewCart={() => setCurrentPage('cart')}
      />
    );
  }

  if (currentPage === 'cart') {
    return (
      <Cart 
        cartItems={cartItems}
        onUpdateCart={handleUpdateCart}
        onBackToMenu={handleBackToMenu}
        onCheckout={handleCheckout}
        orderDetails={orderDetails}
      />
    );
  }

  if (currentPage === 'thankyou') {
    return <ThankYouPage orderDetails={orderDetails} onBackToMenu={handleBackToMenu} onAddToCart={handleAddToCart} cartItems={cartItems} onViewCart={() => setCurrentPage('cart')} placedOrderItems={placedOrderItems} onTrackOrder={() => setCurrentPage('tracking')} />;
  }

  if (currentPage === 'tracking') {
    return <OrderTracking orderDetails={orderDetails} onBackToThankYou={() => setCurrentPage('thankyou')} />;
  }

  return null;
}

export default App;