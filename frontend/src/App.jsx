import React, { useState } from 'react';
import LoginSignup from './LoginSignup';
import Menu from './Menu';
import Cart from './Cart';
import ThankYouPage from './ThankYouPage';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
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
    const orderId = 'SN' + Date.now() + Math.floor(Math.random() * 1000);
    setOrderDetails({ ...details, orderId });
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
      />
    );
  }

  if (currentPage === 'thankyou') {
    return <ThankYouPage orderDetails={orderDetails} onBackToMenu={handleBackToMenu} />;
  }

  return null;
}

export default App;