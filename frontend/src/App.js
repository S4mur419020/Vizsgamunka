import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ShoeProvider } from "./context/ShoeContext";
import { SettingsProvider } from "./context/SettingsContext";
import { TranslationProvider } from "./i18n/TranslationProvider";
import { SizeProvider } from "./context/SizeContext";
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
import AccountPage from "./Pages/PublicPages/AccountPage";
import DiscountsPage from "./Pages/PublicPages/DiscountPage";
import BenefitsPage from "./Pages/PublicPages/BenefitsPage";
import PasswordPage from "./Pages/PublicPages/PasswordPage";
import ProfilePage from "./Pages/PublicPages/ProfilePage";
import AddressesPage from "./Pages/PublicPages/AddressesPage";
import SettingsPage from "./Pages/PublicPages/SettingsPage";
import ForgotPassword from "./Pages/PublicPages/ForgotPassword";
import ResetPasswordPage from "./Pages/PublicPages/ResetPasswordPage";


import AdminSidebar from "./Components/admin/AdminSidebar";
import AdminContents from "./Components/admin/AdminContents";
import Statistics from "./Pages/AdminPages/Statistic";
import AdminLogout from "./Pages/AdminPages/AdminLogout";
import ProtectedAdminPage from "./Pages/AdminPages/ProtectedAdminPage";
import AdminFeedbackPage from "./Pages/AdminPages/AdminFeedbackPage";
import AdminShoeEditPage from "./Pages/AdminPages/AdminShoeEditorPage";
import AdminDiscountsPage from "./Pages/AdminPages/AdminDiscountsPage";


const AdminShoes = lazy(() => import("./Pages/AdminPages/Admin"));
const Users = lazy(() => import("./Pages/AdminPages/Users"));
const OrdersPage = lazy(() => import("./Pages/PublicPages/OrderPage"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/admin",
      element: (
        <ProtectedAdminPage>
          <AdminContents sidebar={<AdminSidebar />} />
        </ProtectedAdminPage>
      ),
      children: [
        { index: true, element: <Navigate to="/admin/products" replace /> },
        { path: "feedbacks", element: <AdminFeedbackPage /> },
        { path: "products", element: <AdminShoes /> },
        { path: "orders", element: <OrdersPage /> },
        { path: "customers", element: <Users /> },
        { path: "discounts", element: <AdminDiscountsPage/> },
        { path: "settings", element: <SettingsPage /> },
        { path: "users", element: <Users /> },
        { path: "statistics", element: <Statistics /> },
        { path: "edit-shoe/:id", element: <AdminShoeEditPage /> },
        { path: "logout", element: <AdminLogout /> },
      ]
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
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/password-reset/:token",
      element: <ResetPasswordPage />,
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
        <SizeProvider>
          <SettingsProvider>
            <TranslationProvider>
              <Suspense fallback={<div className="loading-screen">Sneaker Webshop betöltése...</div>}>
                <RouterProvider router={router} />
              </Suspense>
            </TranslationProvider>
          </SettingsProvider>
        </SizeProvider>
      </ShoeProvider>
    </AuthProvider>
  );
}

export default App;