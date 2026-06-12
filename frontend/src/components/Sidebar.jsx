import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdListAlt, MdAccountBalance, MdGroup } from 'react-icons/md';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>SnackTrack</h2>
        <p>Ventas y Gastos</p>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <MdDashboard /> Dashboard
        </NavLink>
        <NavLink to="/transactions" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <MdListAlt /> Transacciones
        </NavLink>
        <NavLink to="/activities" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <MdListAlt /> Actividades
        </NavLink>
        <NavLink to="/bank-accounts" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <MdAccountBalance /> Bancos
        </NavLink>
        <NavLink to="/partners" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <MdGroup /> Socios
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
