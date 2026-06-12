import React, { useEffect, useState } from 'react';
import useStore from '../hooks/useStore';
import ActivityForm from '../components/ActivityForm';

const Activities = () => {
  const { activities, fetchActivities, removeActivity } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [expandedCards, setExpandedCards] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar esta actividad? Esto NO eliminará las transacciones asociadas, pero perderán su referencia.')) {
      removeActivity(id);
    }
  };

  const toggleCard = (id) => {
    setExpandedCards(prev => prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]);
  };

  const getBaseUrl = () => {
    return import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3000';
  };

  const isImage = (url) => {
    if (!url) return false;
    return /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(url);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('es-HN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getTransactionsWithBalance = (transactions) => {
    if (!transactions) return [];
    const reversed = [...transactions].reverse();
    let currentBalance = 0;
    const withBalance = reversed.map(t => {
      const amt = parseFloat(t.amount);
      if (t.type === 'INGRESO') currentBalance += amt;
      else currentBalance -= amt;
      return { ...t, runningBalance: currentBalance };
    });
    return withBalance.reverse();
  };

  const getProfitPercentage = (ingresos, gastos) => {
    const i = parseFloat(ingresos) || 0;
    const g = parseFloat(gastos) || 0;
    if (i === 0 && g === 0) return 0;
    if (g === 0) return 100;
    return ((i - g) / g) * 100;
  };

  return (
    <div className="transactions-page">
      <header className="page-header d-flex-between">
        <div>
          <h1>
            <span className="header-icon">📁</span>
            Actividades y Eventos
          </h1>
          <p>Supervisa los ingresos y gastos segmentados por evento</p>
        </div>
        <button className="btn-primary btn-glow" onClick={() => setShowForm(true)}>
          <span className="btn-icon-text">＋</span> Nueva Actividad
        </button>
      </header>

      {showForm && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowForm(false)}>×</button>
            <ActivityForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}

      <div className="activity-cards-grid">
        {activities.map(act => (
          <div className={`activity-card card ${act.balance >= 0 ? 'activity-positive' : 'activity-negative'}`} key={act.id}>
            {/* Card Header */}
            <div className="activity-card-header">
              <div className="activity-card-title">
                <h3>{act.name}</h3>
                <span className={`txn-badge ${act.status === 'ACTIVO' ? 'txn-badge-ingreso' : 'txn-badge-gasto'}`}>
                  {act.status}
                </span>
                {(() => {
                  const pct = getProfitPercentage(act.totalIngresos, act.totalGastos);
                  if (pct === 0 && !act.totalIngresos && !act.totalGastos) return null;
                  return (
                    <span className="txn-badge" style={{ background: pct >= 0 ? '#10b981' : '#ef4444', color: 'white', marginLeft: '0.5rem' }}>
                      {pct > 0 ? '+' : ''}{pct.toFixed(2)}% {pct >= 0 ? 'Ganancia' : 'Pérdida'}
                    </span>
                  );
                })()}
              </div>
              {act.description && (
                <p className="activity-card-desc">{act.description}</p>
              )}
            </div>

            {/* Financial Summary */}
            <div className="activity-summary">
              <div className="activity-summary-row">
                <span className="activity-summary-label">
                  <span className="activity-dot activity-dot-income"></span>
                  Ingresos
                </span>
                <span className="txn-amount-ingreso">+L {act.totalIngresos?.toLocaleString('es-HN', { minimumFractionDigits: 2 }) || '0.00'}</span>
              </div>
              <div className="activity-summary-row">
                <span className="activity-summary-label">
                  <span className="activity-dot activity-dot-expense"></span>
                  Gastos
                </span>
                <span className="txn-amount-gasto">-L {act.totalGastos?.toLocaleString('es-HN', { minimumFractionDigits: 2 }) || '0.00'}</span>
              </div>
              <div className="activity-summary-row">
                <span className="activity-summary-label">
                  <span className="activity-dot" style={{background: '#f59e0b', width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block', marginRight: '6px'}}></span>
                  Margen (%)
                </span>
                <span className={act.balance >= 0 ? 'txn-amount-ingreso' : 'txn-amount-gasto'}>
                  {(() => {
                    const pct = getProfitPercentage(act.totalIngresos, act.totalGastos);
                    return `${pct > 0 ? '+' : ''}${pct.toFixed(2)}%`;
                  })()}
                </span>
              </div>
              <div className="activity-summary-row activity-result">
                <span className="activity-summary-label">Resultado</span>
                <span className={`activity-result-value ${act.balance >= 0 ? 'txn-amount-ingreso' : 'txn-amount-gasto'}`}>
                  L {act.balance?.toLocaleString('es-HN', { minimumFractionDigits: 2 }) || '0.00'}
                </span>
              </div>
            </div>

            {/* Card Actions */}
            <div className="activity-card-actions">
              <button
                className="btn-secondary activity-toggle-btn"
                onClick={() => toggleCard(act.id)}
              >
                {expandedCards.includes(act.id) ? '▲ Ocultar Historial' : '▼ Ver Historial'}
              </button>
              <button className="btn-delete-txn" onClick={() => handleDelete(act.id)} title="Eliminar actividad">
                🗑️
              </button>
            </div>

            {/* Expanded Transaction History */}
            {expandedCards.includes(act.id) && act.transactions && (
              <div className="activity-history">
                <h4 className="activity-history-title">📋 Historial de Transacciones</h4>
                {act.transactions.length > 0 ? (
                  <div className="activity-history-list">
                    {getTransactionsWithBalance(act.transactions).map(t => (
                      <div key={t.id} className="history-item">
                        <div className="history-item-left">
                          {/* Receipt Image Preview */}
                          {t.receiptUrl && isImage(t.receiptUrl) ? (
                            <button
                              className="history-receipt-btn"
                              onClick={() => setPreviewImage(`${getBaseUrl()}${t.receiptUrl}`)}
                              title="Ver comprobante"
                            >
                              <img
                                src={`${getBaseUrl()}${t.receiptUrl}`}
                                alt="Comprobante"
                                className="history-receipt-thumb"
                              />
                              <span className="history-receipt-zoom">🔍</span>
                            </button>
                          ) : (
                            <div className={`history-type-icon ${t.type.toLowerCase()}`}>
                              {t.type === 'INGRESO' ? '↗' : '↘'}
                            </div>
                          )}

                          <div className="history-item-info">
                            <span className="history-item-desc">{t.description}</span>
                            <span className="history-item-meta">
                              {formatDate(t.date)}
                              {t.receiptUrl && !isImage(t.receiptUrl) && (
                                <a
                                  href={`${getBaseUrl()}${t.receiptUrl}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="receipt-doc-link"
                                  style={{ marginLeft: '0.5rem', fontSize: '0.7rem' }}
                                >
                                  📄 Doc
                                </a>
                              )}
                              {t.receiptUrl && isImage(t.receiptUrl) && (
                                <button
                                  className="history-view-img-link"
                                  onClick={() => setPreviewImage(`${getBaseUrl()}${t.receiptUrl}`)}
                                >
                                  🖼️ Ver imagen
                                </button>
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="history-item-right">
                          <span className={`history-item-amount ${t.type.toLowerCase()}`}>
                            {t.type === 'INGRESO' ? '+' : '-'}L {parseFloat(t.amount).toLocaleString('es-HN', { minimumFractionDigits: 2 })}
                          </span>
                          <span className="history-item-balance">
                            Saldo: L {t.runningBalance.toLocaleString('es-HN', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="history-empty">No hay transacciones aún para esta actividad.</p>
                )}
              </div>
            )}
          </div>
        ))}
        {activities.length === 0 && (
          <div className="txn-empty card" style={{ gridColumn: '1 / -1' }}>
            <div className="empty-icon">📂</div>
            <h3>No hay actividades registradas</h3>
            <p>Crea una nueva actividad para empezar a organizar tus transacciones.</p>
          </div>
        )}
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="image-preview-overlay" onClick={() => setPreviewImage(null)}>
          <div className="image-preview-modal" onClick={(e) => e.stopPropagation()}>
            <button className="image-preview-close" onClick={() => setPreviewImage(null)}>✕</button>
            <div className="image-preview-header">
              <h3>📋 Vista previa del comprobante</h3>
            </div>
            <div className="image-preview-body">
              <img src={previewImage} alt="Comprobante" />
            </div>
            <div className="image-preview-footer">
              <a
                href={previewImage}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Abrir en nueva pestaña
              </a>
              <button className="btn-secondary" onClick={() => setPreviewImage(null)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;
