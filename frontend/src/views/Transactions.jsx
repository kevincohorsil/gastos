import React, { useEffect, useState, useCallback, useMemo } from 'react';
import useStore from '../hooks/useStore';
import TransactionForm from '../components/TransactionForm';

const Transactions = () => {
  const { transactions, pagination, fetchTransactions, removeTransaction, loading, activities, fetchActivities } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Filtros
  const [filterType, setFilterType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce para búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const loadPage = useCallback((page = 1) => {
    const params = { page, limit: 10 };
    if (filterType) params.type = filterType;
    if (debouncedSearch) params.search = debouncedSearch;
    fetchTransactions(params);
  }, [fetchTransactions, filterType, debouncedSearch]);

  useEffect(() => {
    loadPage(1);
  }, [loadPage]);

  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar esta transacción?')) {
      removeTransaction(id);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    loadPage(pagination.page);
  };

  const getBaseUrl = () => {
    return import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3000';
  };

  const getFullReceiptUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${getBaseUrl()}${url}`;
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

  const formatAmount = (amount) => {
    return parseFloat(amount).toLocaleString('es-HN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Generate page numbers for pagination
  const pageNumbers = useMemo(() => {
    const { page, totalPages } = pagination;
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, page - 1);
      let end = Math.min(totalPages - 1, page + 1);

      if (page <= 3) { start = 2; end = 4; }
      if (page >= totalPages - 2) { start = totalPages - 3; end = totalPages - 1; }

      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  }, [pagination]);

  return (
    <div className="transactions-page">
      {/* Header */}
      <header className="page-header d-flex-between">
        <div>
          <h1>
            <span className="header-icon">📊</span>
            Transacciones
          </h1>
          <p>Historial completo de ingresos y gastos</p>
        </div>
        <button className="btn-primary btn-glow" onClick={() => setShowForm(true)}>
          <span className="btn-icon-text">＋</span> Nueva Transacción
        </button>
      </header>

      {/* Stats Bar */}
      <div className="txn-stats-bar">
        <div className="txn-stat-chip">
          <span className="stat-dot stat-dot-total"></span>
          <span className="stat-label">Total:</span>
          <span className="stat-value">{pagination.total}</span>
        </div>
        <div className="txn-stat-chip">
          <span className="stat-dot stat-dot-page"></span>
          <span className="stat-label">Página:</span>
          <span className="stat-value">{pagination.page} de {pagination.totalPages || 1}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="txn-filters card">
        <div className="txn-filters-inner">
          <div className="filter-group">
            <label htmlFor="txn-search">
              <span className="filter-icon">🔍</span> Buscar
            </label>
            <input
              id="txn-search"
              type="text"
              placeholder="Descripción, categoría o proveedor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="filter-input"
            />
          </div>
          <div className="filter-group">
            <label htmlFor="txn-type-filter">
              <span className="filter-icon">📋</span> Tipo
            </label>
            <select
              id="txn-type-filter"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="">Todos</option>
              <option value="INGRESO">Ingresos</option>
              <option value="GASTO">Gastos</option>
              <option value="APORTACION">Aportaciones</option>
              <option value="RETIRO_SOCIO">Retiros de Socios</option>
              <option value="TRANSFERENCIA">Transferencias</option>
            </select>
          </div>
          {(searchTerm || filterType) && (
            <button
              className="btn-clear-filters"
              onClick={() => { setSearchTerm(''); setFilterType(''); }}
            >
              ✕ Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Transaction List */}
      <div className="txn-list-container">
        {loading ? (
          <div className="txn-loading">
            <div className="spinner"></div>
            <p>Cargando transacciones...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="txn-empty card">
            <div className="empty-icon">📭</div>
            <h3>No se encontraron transacciones</h3>
            <p>Intenta con diferentes filtros o crea una nueva transacción.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="txn-table-wrapper card">
              <table className="txn-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Tipo</th>
                    <th>Descripción</th>
                    <th>Categoría</th>
                    <th>Actividad</th>
                    <th>Cuenta</th>
                    <th>Comprobante</th>
                    <th className="text-right">Monto</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t, idx) => (
                    <tr key={t.id} className="txn-row" style={{ animationDelay: `${idx * 0.04}s` }}>
                      <td>
                        <span className="txn-date">{formatDate(t.date)}</span>
                      </td>
                      <td>
                        <span className={`txn-badge txn-badge-${t.type.toLowerCase()}`}>
                          {t.type === 'INGRESO' || t.type === 'APORTACION' ? '↗' : '↘'} {t.type}
                        </span>
                      </td>
                      <td>
                        <div className="txn-desc-cell">
                          <span className="txn-desc">{t.description}</span>
                          {t.clientOrSupplier && (
                            <span className="txn-supplier">{t.clientOrSupplier}</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="txn-category">{t.category}</span>
                      </td>
                      <td>
                        <span className="txn-activity">
                          {t.activity ? t.activity.name : '—'}
                        </span>
                      </td>
                      <td>
                        <span className="txn-bank">
                          {t.bankAccount ? t.bankAccount.name : '—'}
                        </span>
                        {t.partner && (
                          <div style={{ fontSize: '0.8rem', color: '#666' }}>{t.partner.name}</div>
                        )}
                      </td>
                      <td>
                        {t.receiptUrl ? (
                          isImage(t.receiptUrl) ? (
                            <button
                              className="receipt-preview-btn"
                              onClick={() => setPreviewImage(getFullReceiptUrl(t.receiptUrl))}
                            >
                              <img
                                src={getFullReceiptUrl(t.receiptUrl)}
                                alt="Comprobante"
                                className="receipt-thumb"
                              />
                              <span className="receipt-zoom-icon">🔍</span>
                            </button>
                          ) : (
                            <a
                              href={getFullReceiptUrl(t.receiptUrl)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="receipt-doc-link"
                            >
                              📄 Ver Doc
                            </a>
                          )
                        ) : (
                          <span className="no-receipt">—</span>
                        )}
                      </td>
                      <td className="text-right">
                        <span className={`txn-amount txn-amount-${t.type.toLowerCase()}`}>
                          {(t.type === 'GASTO' || t.type === 'RETIRO_SOCIO') ? '-' : '+'} L {formatAmount(t.amount)}
                        </span>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn-delete-txn"
                          onClick={() => handleDelete(t.id)}
                          title="Eliminar transacción"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="txn-pagination">
                <button
                  className="page-btn page-btn-nav"
                  disabled={pagination.page <= 1}
                  onClick={() => loadPage(pagination.page - 1)}
                >
                  ← Anterior
                </button>

                <div className="page-numbers">
                  {pageNumbers.map((p, i) =>
                    p === '...' ? (
                      <span key={`ellipsis-${i}`} className="page-ellipsis">…</span>
                    ) : (
                      <button
                        key={p}
                        className={`page-btn page-btn-num ${p === pagination.page ? 'active' : ''}`}
                        onClick={() => loadPage(p)}
                      >
                        {p}
                      </button>
                    )
                  )}
                </div>

                <button
                  className="page-btn page-btn-nav"
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => loadPage(pagination.page + 1)}
                >
                  Siguiente →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal Nueva Transacción */}
      {showForm && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowForm(false)}>×</button>
            <TransactionForm onClose={handleFormClose} />
          </div>
        </div>
      )}

      {/* Modal Preview de Imagen */}
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

export default Transactions;
