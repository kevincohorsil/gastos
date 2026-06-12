import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/auth/login`,
        { username, password }
      );
      if (res.data.success) {
        localStorage.setItem('auth_token', res.data.data.token);
        localStorage.setItem('auth_user', res.data.data.username);
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: "'Inter', 'Segoe UI', sans-serif"
    }}>
      <div style={{
        background: 'rgba(30, 41, 59, 0.9)',
        border: '1px solid #334155',
        borderRadius: '20px',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(79,70,229,0.1)',
        backdropFilter: 'blur(12px)'
      }}>
        {/* Logo / Brand */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '64px', height: '64px',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            borderRadius: '18px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.25rem',
            fontSize: '1.85rem',
            boxShadow: '0 8px 24px rgba(79,70,229,0.4)'
          }}>💰</div>
          <h1 style={{
            color: '#f8fafc',
            fontSize: '1.6rem',
            fontWeight: 700,
            margin: 0,
            letterSpacing: '-0.02em'
          }}>SnackTrack</h1>
          <p style={{
            color: '#64748b',
            fontSize: '0.875rem',
            marginTop: '0.4rem',
            letterSpacing: '0.01em'
          }}>Ventas & Gastos · Panel de administración</p>
        </div>

        <form onSubmit={handleSubmit} autoComplete="off">
          <div style={{ marginBottom: '1.1rem' }}>
            <label style={{
              display: 'block',
              color: '#94a3b8',
              fontSize: '0.8rem',
              marginBottom: '0.5rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>Usuario</label>
            <input
              id="login-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid #334155',
                borderRadius: '10px',
                color: '#f8fafc',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
              onBlur={(e) => e.target.style.borderColor = '#334155'}
            />
          </div>

          <div style={{ marginBottom: '1.75rem' }}>
            <label style={{
              display: 'block',
              color: '#94a3b8',
              fontSize: '0.8rem',
              marginBottom: '0.5rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>Contraseña</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid #334155',
                borderRadius: '10px',
                color: '#f8fafc',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
              onBlur={(e) => e.target.style.borderColor = '#334155'}
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              borderRadius: '10px',
              padding: '0.8rem 1rem',
              marginBottom: '1.25rem',
              color: '#f87171',
              fontSize: '0.875rem',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              ⚠️ {error}
            </div>
          )}

          <button
            id="login-submit"
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.9rem',
              background: loading
                ? 'rgba(79,70,229,0.4)'
                : 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              letterSpacing: '0.02em',
              boxShadow: loading ? 'none' : '0 4px 15px rgba(79,70,229,0.35)'
            }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span style={{
                  width: '16px', height: '16px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTop: '2px solid #fff',
                  borderRadius: '50%',
                  display: 'inline-block',
                  animation: 'spin 0.8s linear infinite'
                }} />
                Iniciando sesión...
              </span>
            ) : 'Iniciar Sesión'}
          </button>
        </form>

        <p style={{
          textAlign: 'center',
          color: '#475569',
          fontSize: '0.75rem',
          marginTop: '1.5rem',
          marginBottom: 0
        }}>
          © 2026 SnackTrack · Acceso restringido
        </p>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Login;
