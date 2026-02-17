import React, { useState } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
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
import { SettingsProvider } from "./context/SettingsContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = createBrowserRouter([
    
    {
      path: "/login",
      element: <LoginPage setIsLoggedIn={setIsLoggedIn} />,
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

        {
          path: "products",
          element: isLoggedIn ? <ProductListPage /> : <Navigate to="/login" />,
        },
        {
          path: "products/:id",
          element: isLoggedIn ? <ProductDetailPage /> : <Navigate to="/login" />,
        },
        {
          path: "cart",
          element: isLoggedIn ? <CartPage /> : <Navigate to="/login" />,
        },
        {
          path: "checkout",
          element: isLoggedIn ? <CheckoutPage /> : <Navigate to="/login" />,
        },
        {
          path: "stores",
          element: isLoggedIn ? <StoresPage /> : <Navigate to="/login" />,
        },
      ],
    },
  ]);

  return (
    <SettingsProvider>
      <RouterProvider router={router} />
    </SettingsProvider>
  );
}

export default App;
