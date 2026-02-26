import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
// JAVÍTVA: A képed alapján Auth.Context.js a fájlneved
import { AuthProvider } from "./context/Auth.Context"; 
import { CipoProvider } from "./context/CipoContext";
import { SettingsProvider } from "./context/SettingsContext";
import { TranslationProvider } from "./i18n/TranslationProvider";
import "./App.css";

import Layout from "./Pages/Layout";
import HomePage from "./Pages/HomePage";
import ProductListPage from "./Pages/ProductListPage";
import ProductDetailPage from "./Pages/ProductDetailPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import LoginPage from "./Pages/LoginPage";
import RegistrationPage from "./Pages/RegistrationPage";
import StoresPage from "./Pages/StoresPage";
import OrdersPage from "./Pages/OrderPage";
import AccountPage from "./Pages/AccountPage";
import DiscountsPage from "./Pages/DiscountPage";
import BenefitsPage from "./Pages/BenefitsPage";
import PasswordPage from "./Pages/PasswordPage";
import ProfilePage from "./Pages/ProfilePage";
import AddressesPage from "./Pages/AddressesPage";

function App() {
  // A routert a függvényen belül hagyjuk
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />, // Kiszettem a setIsLoggedIn-t
    },
    {
      path: "/register",
      element: <RegistrationPage />,
    },
    {
      path: "/",
      element: <Layout />, // Kiszettem a propokat
      children: [
        { index: true, element: <HomePage /> },
        { path: "products", element: <ProductListPage /> },
        { path: "products/:id", element: <ProductDetailPage /> },
        { path: "cart", element: <CartPage /> },
        { path: "checkout", element: <CheckoutPage /> },
        { path: "stores", element: <StoresPage /> },
        {
          path: "account",
          element: <AccountPage />,
          children: [
            { index: true, element: <ProfilePage /> },            
            { path: "profile", element: <ProfilePage /> },
            { path: "password", element: <PasswordPage /> },
            { path: "addresses", element: <AddressesPage /> },
            { path: "orders", element: <OrdersPage /> },
            { path: "discounts", element: <DiscountsPage /> },
            { path: "benefits", element: <BenefitsPage /> },
          ],
        }
      ],
    },
  ]);

  return (
    <AuthProvider>
      <CipoProvider>
        <SettingsProvider>
          <TranslationProvider>
            <RouterProvider router={router} />
          </TranslationProvider>
        </SettingsProvider>
      </CipoProvider>
    </AuthProvider>
  );
}

export default App;