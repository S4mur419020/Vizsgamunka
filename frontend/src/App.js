import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ShoeProvider } from "./context/ShoeContext";
import { SettingsProvider } from "./context/SettingsContext";
import { TranslationProvider } from "./i18n/TranslationProvider";
import "./App.css";

import Layout from "./Pages/PublicPages/Layout";
import HomePage from "./Pages/PublicPages/HomePage";
import ProductListPage from "./Pages/PublicPages/ProductListPage";
import ProductDetailPage from "./Pages/PublicPages/ProductDetailPage";
import CartPage from "./Pages/PublicPages/CartPage";
import CheckoutPage from "./Pages/PublicPages/CheckoutPage";
import LoginPage from "./Pages/PublicPages/LoginPage";
import RegistrationPage from "./Pages/PublicPages/RegistrationPage";
import StoresPage from "./Pages/PublicPages/StoresPage";
import OrdersPage from "./Pages/PublicPages/OrderPage";
import AccountPage from "./Pages/PublicPages/AccountPage";
import DiscountsPage from "./Pages/PublicPages/DiscountPage";
import BenefitsPage from "./Pages/PublicPages/BenefitsPage";
import PasswordPage from "./Pages/PublicPages/PasswordPage";
import ProfilePage from "./Pages/PublicPages/ProfilePage";
import AddressesPage from "./Pages/PublicPages/AddressesPage";
import SettingsPage from "./Pages/PublicPages/SettingsPage"; 

import AdminSidebar from "./Components/admin/AdminSidebar";
import AdminContents from "./Components/admin/AdminContents";
import Users from "./Pages/AdminPages/Users";
import Statistics from "./Pages/AdminPages/Statistic";


function App() {
  const router = createBrowserRouter([
    {
      path: "/admin",
      element: <AdminContents sidebar={<AdminSidebar />} />,
      children: [
        { index: true, element: <Navigate to="products" /> },
        { path: "products", element: <ProductListPage /> },
        { path: "orders", element: <OrdersPage /> },  
        { path: "customers", element: <Users /> },   
        { path: "discounts", element: <DiscountsPage /> },
        { path: "settings", element: <SettingsPage /> },
        { path: "users", element: <Users /> },
        { path: "statistics", element: <Statistics /> },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegistrationPage />,
    },
    {
      path: "/",
      element: <Layout />,
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
      <ShoeProvider>
        <SettingsProvider>
          <TranslationProvider>
            <RouterProvider router={router} />
          </TranslationProvider>
        </SettingsProvider>
      </ShoeProvider>
    </AuthProvider>
  );
}

export default App;