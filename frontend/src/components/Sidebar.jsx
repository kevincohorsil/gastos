import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdListAlt, MdAccountBalance, MdGroup } from 'react-icons/md';

const Sidebar = () => {
  return (
    <>
      {/* Sidebar de escritorio */}
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

      {/* Barra de navegación inferior para móvil */}
      <nav className="mobile-bottom-nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'mobile-nav-item active' : 'mobile-nav-item')}>
          <MdDashboard className="mobile-nav-icon" />
          <span>Inicio</span>
        </NavLink>
        <NavLink to="/transactions" className={({ isActive }) => (isActive ? 'mobile-nav-item active' : 'mobile-nav-item')}>
          <MdListAlt className="mobile-nav-icon" />
          <span>Transac.</span>
        </NavLink>
        <NavLink to="/activities" className={({ isActive }) => (isActive ? 'mobile-nav-item active' : 'mobile-nav-item')}>
          <MdListAlt className="mobile-nav-icon" />
          <span>Actividad</span>
        </NavLink>
        <NavLink to="/bank-accounts" className={({ isActive }) => (isActive ? 'mobile-nav-item active' : 'mobile-nav-item')}>
          <MdAccountBalance className="mobile-nav-icon" />
          <span>Bancos</span>
        </NavLink>
        <NavLink to="/partners" className={({ isActive }) => (isActive ? 'mobile-nav-item active' : 'mobile-nav-item')}>
          <MdGroup className="mobile-nav-icon" />
          <span>Socios</span>
        </NavLink>
      </nav>
    </>
  );
};

export default Sidebar;
