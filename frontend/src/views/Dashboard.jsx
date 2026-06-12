import React, { useEffect } from 'react';
import useStore from '../hooks/useStore';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const Dashboard = () => {
  const { summary, fetchSummary, transactions, fetchTransactions, bankAccounts, fetchBankAccounts } = useStore();

  useEffect(() => {
    fetchSummary();
    fetchTransactions();
    fetchBankAccounts();
  }, [fetchSummary, fetchTransactions, fetchBankAccounts]);

  const dataPie = [
    { name: 'Ingresos', value: summary.totalIngresos },
    { name: 'Gastos', value: summary.totalGastos }
  ];
  const COLORS = ['#10b981', '#ef4444'];

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="dashboard">
      <header className="page-header">
        <h1>Dashboard Overview</h1>
        <p>Resumen financiero de ventas y gastos</p>
      </header>

      <div className="summary-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <div className="card income">
          <h3>Ingresos Operativos</h3>
          <p className="amount">L {(summary.totalIngresos || 0).toLocaleString()}</p>
        </div>
        <div className="card expense">
          <h3>Gastos Operativos</h3>
          <p className="amount">L {(summary.totalGastos || 0).toLocaleString()}</p>
        </div>
        <div className={`card balance ${summary.balance >= 0 ? 'positive' : 'negative'}`}>
          <h3>Balance Operativo</h3>
          <p className="amount">L {(summary.balance || 0).toLocaleString()}</p>
        </div>
        <div className="card" style={{ background: 'var(--card-bg)', borderLeft: '4px solid #3b82f6' }}>
          <h3>Capital Aportado</h3>
          <p className="amount" style={{ color: '#3b82f6' }}>L {(summary.totalAportaciones || 0).toLocaleString()}</p>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Distribución</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={dataPie} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {dataPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `L ${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="recent-transactions card">
          <h3>Transacciones Recientes</h3>
          <ul className="transaction-list">
            {recentTransactions.map(t => (
              <li key={t.id} className="transaction-item">
                <div className="t-info">
                  <span className="t-desc">{t.description}</span>
                  <span className="t-date">{t.date}</span>
                </div>
                <span className={`t-amount ${t.type.toLowerCase()}`}>
                  {(t.type === 'INGRESO' || t.type === 'APORTACION') ? '+' : '-'}L {parseFloat(t.amount).toLocaleString()}
                </span>
              </li>
            ))}
            {recentTransactions.length === 0 && <p className="empty-state">No hay transacciones.</p>}
          </ul>
        </div>
        
        <div className="bank-balances card">
          <h3>Saldo en Bancos</h3>
          <div className="balances-list" style={{ marginTop: '15px' }}>
            {bankAccounts.map(b => (
              <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
                <span>{b.name}</span>
                <strong className={b.currentBalance >= 0 ? 'positive' : 'negative'}>
                  L {parseFloat(b.currentBalance || 0).toLocaleString()}
                </strong>
              </div>
            ))}
            {bankAccounts.length === 0 && <p className="empty-state">No hay cuentas bancarias.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
