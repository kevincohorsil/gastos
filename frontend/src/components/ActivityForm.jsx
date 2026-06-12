import React, { useState } from 'react';
import useStore from '../hooks/useStore';
import { createActivity } from '../api/activities';

const ActivityForm = ({ onClose }) => {
  const { fetchActivities } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'ACTIVO',
    profitPercentage: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await createActivity(formData);
      fetchActivities();
      onClose();
    } catch (err) {
      setError('Error al crear la actividad.');
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Registrar Actividad / Evento</h2>
      {error && <div className="alert error">{error}</div>}
      <form onSubmit={handleSubmit} className="custom-form">
        <div className="form-group">
          <label>Nombre de la Actividad</label>
          <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Ej. Evento día de campo" />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Estado</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="ACTIVO">Activo</option>
            <option value="FINALIZADO">Finalizado</option>
          </select>
        </div>
        <div className="form-group">
          <label>Porcentaje de Ganancia (%)</label>
          <input type="number" step="0.01" min="0" max="100" name="profitPercentage" value={formData.profitPercentage} onChange={handleChange} placeholder="Ej. 15.00" />
        </div>
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default ActivityForm;
