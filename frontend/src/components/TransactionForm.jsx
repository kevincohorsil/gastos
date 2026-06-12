import React, { useState } from 'react';
import useStore from '../hooks/useStore';
import { createTransaction } from '../api/transactions';

const TransactionForm = ({ onClose }) => {
  const { fetchTransactions, fetchSummary, activities, fetchActivities, partners, fetchPartners, bankAccounts, fetchBankAccounts } = useStore();
  const [formData, setFormData] = useState({
    type: 'INGRESO',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    clientOrSupplier: '',
    activityId: '',
    bankAccountId: '',
    partnerId: ''
  });
  const [file, setFile] = useState(null);
  
  React.useEffect(() => {
    fetchActivities();
    fetchPartners();
    fetchBankAccounts();
  }, [fetchActivities, fetchPartners, fetchBankAccounts]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (file) {
      data.append('receipt', file);
    }

    try {
      await createTransaction(data);
      fetchTransactions();
      fetchSummary();
      onClose();
    } catch (err) {
      setError('Error al crear transacción. Verifique los datos.');
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Registrar Transacción</h2>
      {error && <div className="alert error">{error}</div>}
      <form onSubmit={handleSubmit} className="custom-form">
        <div className="form-row">
          <div className="form-group">
            <label>Tipo</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="INGRESO">Ingreso</option>
              <option value="GASTO">Gasto</option>
              <option value="APORTACION">Aportación de Socio</option>
              <option value="RETIRO_SOCIO">Retiro de Socio</option>
              <option value="TRANSFERENCIA">Transferencia</option>
            </select>
          </div>
          <div className="form-group">
            <label>Cuenta Bancaria *</label>
            <select name="bankAccountId" required value={formData.bankAccountId} onChange={handleChange}>
              <option value="">-- Seleccionar Cuenta --</option>
              {bankAccounts.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        {(formData.type === 'APORTACION' || formData.type === 'RETIRO_SOCIO') && (
          <div className="form-group">
            <label>Socio *</label>
            <select name="partnerId" required value={formData.partnerId} onChange={handleChange}>
              <option value="">-- Seleccionar Socio --</option>
              {partners.filter(p => p.status === 'ACTIVO').map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label>Monto</label>
            <input type="number" step="0.01" name="amount" required value={formData.amount} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Fecha</label>
            <input type="date" name="date" required value={formData.date} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <input type="text" name="description" required value={formData.description} onChange={handleChange} />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Categoría</label>
            <input type="text" name="category" required value={formData.category} onChange={handleChange} placeholder="Ej. Ventas, Insumos" />
          </div>
          <div className="form-group">
            <label>Cliente / Proveedor</label>
            <input type="text" name="clientOrSupplier" value={formData.clientOrSupplier} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label>Actividad / Evento (Opcional)</label>
          <select name="activityId" value={formData.activityId} onChange={handleChange}>
            <option value="">-- Ninguna --</option>
            {activities.filter(a => a.status === 'ACTIVO').map(act => (
              <option key={act.id} value={act.id}>{act.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Comprobante (Opcional)</label>
          <input type="file" onChange={handleFileChange} accept="image/*,.pdf" />
        </div>
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
