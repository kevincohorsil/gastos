import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Sidebar from './components/Sidebar';
import './index.css';

function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  return (
    <div className="app-container">
      {!isLoginPage && <Sidebar />}
      <main className="main-content">
        <AppRoutes />
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
