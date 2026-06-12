import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../views/Dashboard';
import Transactions from '../views/Transactions';
import Activities from '../views/Activities';
import BankAccounts from '../views/BankAccounts';
import Partners from '../views/Partners';
import Login from '../views/Login';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
      <Route path="/activities" element={<ProtectedRoute><Activities /></ProtectedRoute>} />
      <Route path="/bank-accounts" element={<ProtectedRoute><BankAccounts /></ProtectedRoute>} />
      <Route path="/partners" element={<ProtectedRoute><Partners /></ProtectedRoute>} />
    </Routes>
  );
};

export default AppRoutes;
