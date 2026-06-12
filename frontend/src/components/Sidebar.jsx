import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdListAlt, MdAccountBalance, MdGroup, MdLogout } from 'react-icons/md';

const handleLogout = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
  window.location.href = '/login';
};

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
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
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

        <div style={{ marginTop: 'auto', padding: '1rem' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '0.6rem 1rem',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '8px',
              color: '#f87171',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              transition: 'all 0.3s'
            }}
          >
            <MdLogout /> Cerrar sesión
          </button>
        </div>
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
        <button
          onClick={handleLogout}
          className="mobile-nav-item"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#f87171',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            fontSize: 'inherit',
            padding: '0.25rem'
          }}
        >
          <MdLogout className="mobile-nav-icon" style={{ color: '#f87171' }} />
          <span style={{ fontSize: '0.65rem' }}>Salir</span>
        </button>
      </nav>
    </>
  );
};

export default Sidebar;
