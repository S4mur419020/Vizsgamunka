import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ShoeProvider } from "./context/ShoeContext";
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
import AdminSidebar from "./Components/admin/AdminSidebar";
import AdminContents from "./Components/admin/AdminContents";
import Users from "./Pages/AdminPages/Users";
import Statistics from "./Pages/AdminPages/Statistic";
import SettingsPage from "./Pages/AccountPage";


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