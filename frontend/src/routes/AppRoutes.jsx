import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../views/Dashboard';
import Transactions from '../views/Transactions';
import Activities from '../views/Activities';
import BankAccounts from '../views/BankAccounts';
import Partners from '../views/Partners';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/bank-accounts" element={<BankAccounts />} />
      <Route path="/partners" element={<Partners />} />
    </Routes>
  );
};

export default AppRoutes;
