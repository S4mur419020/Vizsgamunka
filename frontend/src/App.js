import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import HomePage from './Pages/HomePage';
import ProductListPage from './Pages/ProductListPage';
import ProductDetailPage from './Pages/ProductDetailPage';
import CartPage from './Pages/CartPage';
import CheckoutPage from './Pages/CheckoutPage';
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import Navigation from './Pages/Navigation';
import StoresPage from './Pages/StoresPage';
import SettingsPage from './Pages/SettingsPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<RegistrationPage />} />

        <Route path="/products" element={isLoggedIn ? <ProductListPage /> : <Navigate to="/login" />} />
        <Route path="/products/:id" element={isLoggedIn ? <ProductDetailPage /> : <Navigate to="/login" />} />
        <Route path="/cart" element={isLoggedIn ? <CartPage /> : <Navigate to="/login" />} />
        <Route path="/checkout" element={isLoggedIn ? <CheckoutPage /> : <Navigate to="/login" />} />
        <Route path="/settings" element={isLoggedIn ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path="/stores" element={isLoggedIn ? <StoresPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}


export default App;
