import React, { useEffect, useState } from 'react';
import useStore from '../hooks/useStore';
import { createBankAccount, deleteBankAccount } from '../api/bankAccounts';

const BankAccounts = () => {
  const { bankAccounts, fetchBankAccounts } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', accountNumber: '', bank: '', initialBalance: 0 });

  useEffect(() => {
    fetchBankAccounts();
  }, [fetchBankAccounts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBankAccount(formData);
      setFormData({ name: '', accountNumber: '', bank: '', initialBalance: 0 });
      setShowForm(false);
      fetchBankAccounts();
    } catch (error) {
      console.error('Error saving bank account', error);
      alert('Error al guardar la cuenta');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar cuenta bancaria?')) {
      try {
        await deleteBankAccount(id);
        fetchBankAccounts();
      } catch (error) {
        console.error('Error deleting', error);
        alert('Error al eliminar cuenta');
      }
    }
  };

  return (
    <div className="bank-accounts-view">
      <header className="page-header">
        <h1>Cuentas Bancarias</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Nueva Cuenta'}
        </button>
      </header>

      {showForm && (
        <div className="form-card card">
          <h3>Registrar Cuenta Bancaria</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre Interno (ej. Caja Chica, Bancomer Principal) *</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Banco</label>
              <input type="text" value={formData.bank} onChange={(e) => setFormData({ ...formData, bank: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Número de Cuenta</label>
              <input type="text" value={formData.accountNumber} onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Saldo Inicial (L)</label>
              <input type="number" step="0.01" required value={formData.initialBalance} onChange={(e) => setFormData({ ...formData, initialBalance: parseFloat(e.target.value) })} />
            </div>
            <button type="submit" className="btn btn-success">Guardar</button>
          </form>
        </div>
      )}

      <div className="accounts-grid mt-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {bankAccounts.map(acc => (
          <div key={acc.id} className="card bank-card">
            <h3>{acc.name}</h3>
            <p className="text-muted">{acc.bank} - {acc.accountNumber}</p>
            <div className="balance mt-3">
              <span className="label">Saldo Actual</span>
              <h2 className={acc.currentBalance >= 0 ? 'amount positive' : 'amount negative'}>
                L {parseFloat(acc.currentBalance || 0).toLocaleString()}
              </h2>
            </div>
            <div className="actions mt-3 text-right">
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(acc.id)}>Eliminar</button>
            </div>
          </div>
        ))}
        {bankAccounts.length === 0 && (
          <p className="empty-state">No hay cuentas registradas.</p>
        )}
      </div>
    </div>
  );
};

export default BankAccounts;
