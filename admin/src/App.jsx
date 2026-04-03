import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import CategoriesPage from './pages/CategoriesPage';
import OrdersPage from './pages/OrdersPage';
import CustomersPage from './pages/CustomersPage';
import MessagesPage from './pages/MessagesPage';
import ProcessSettingsPage from './pages/ProcessSettingsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UsersPage from './pages/UsersPage';
import HeritageSettingsPage from './pages/HeritageSettingsPage';
import HomeSettingsPage from './pages/HomeSettingsPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="heritage" element={<HeritageSettingsPage />} />
            <Route path="home-settings" element={<HomeSettingsPage />} />
            <Route path="process-settings" element={<ProcessSettingsPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
