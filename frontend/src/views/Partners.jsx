import React, { useEffect, useState } from 'react';
import useStore from '../hooks/useStore';
import { createPartner, updatePartner, deletePartner } from '../api/partners';

const Partners = () => {
  const { partners, fetchPartners } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', status: 'ACTIVO' });

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPartner(formData);
      setFormData({ name: '', email: '', phone: '', status: 'ACTIVO' });
      setShowForm(false);
      fetchPartners();
    } catch (error) {
      console.error('Error saving partner', error);
      alert('Error al guardar el socio');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar socio?')) {
      try {
        await deletePartner(id);
        fetchPartners();
      } catch (error) {
        console.error('Error deleting', error);
        alert('Error al eliminar socio');
      }
    }
  };

  return (
    <div className="partners-view">
      <header className="page-header">
        <h1>Socios y Aportaciones</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Nuevo Socio'}
        </button>
      </header>

      {showForm && (
        <div className="form-card card">
          <h3>Registrar Socio</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre del Socio *</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Teléfono</label>
              <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-success">Guardar</button>
          </form>
        </div>
      )}

      <div className="partners-list card mt-4">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Total Aportado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {partners.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.email}</td>
                <td><span className={`status-badge ${p.status.toLowerCase()}`}>{p.status}</span></td>
                <td className="amount positive">L {parseFloat(p.totalContributions || 0).toLocaleString()}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
            {partners.length === 0 && (
              <tr><td colSpan="6" className="text-center">No hay socios registrados.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Partners;
