
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import { showToast } from './utils/toast';

import './App.css';
import DetailsModal from './components/DetailsModal';
import awsWhite from '../../eval/src/assets/AWS-white.png';

const API_BASE = 'https://showcase.elcilantro.site/api';

function App() {
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!sessionStorage.getItem('token'));

  const safeAreaStyle = {
    minHeight: '100vh',
    minWidth: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '50px 80px',
    boxSizing: 'border-box',
  };

  const [entries, setEntries] = useState([]);
  const [fromDate, setFromDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toISOString().slice(0,10);
  });
  const [lastFetch, setLastFetch] = useState(null);
  const [timeAgo, setTimeAgo] = useState('');
  const timerRef = useRef(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPayload, setModalPayload] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const fetchEntries = async (useDate) => {
    const dateStr = useDate || fromDate;
    let parsed = new Date(dateStr);
    if (isNaN(parsed)) parsed = new Date();
    const dateToken = parsed.toISOString().slice(0,10);

    setEntries([]);
    setIsSearching(true);

    try {
      const token = sessionStorage.getItem('token');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      const res = await fetch(`${API_BASE}/portal?from=${encodeURIComponent(dateToken)}`, { headers });
      if (res.status === 403) {
        handleLogout();
        showToast('Session expired', 'error');
        return;
      }
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      setEntries(Array.isArray(data) ? data : []);
      setLastFetch(new Date());
    } catch (err) {
      showToast('Failed to fetch entries', 'error');
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!lastFetch) return setTimeAgo('');
      const diff = Math.floor((Date.now() - lastFetch.getTime()) / 1000);
      if (diff < 60) setTimeAgo(`${diff}s`);
      else setTimeAgo(`${Math.floor(diff/60)}m`);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [lastFetch]);

  useEffect(() => {
    if (isLoggedIn) fetchEntries(fromDate);
  }, [isLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        sessionStorage.setItem('token', data.token);
        setIsLoggingIn(false);
        setIsLoggedIn(true);
      } else {
        setIsLoggingIn(false);
        showToast(data.message || 'Login failed', 'error');
      }
    } catch (err) {
      setIsLoggingIn(false);
      showToast('Network error', 'error');
    }
  };

  const sendLogout = async (token) => {
    if (!token) return;
    try {
      await fetch(`${API_BASE}/logout`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` }, keepalive: true });
    } catch (e) {
      // ignore errors
    }
  };

  const handleLogout = async () => {
    const token = sessionStorage.getItem('token');
    void sendLogout(token);
    sessionStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const currentLanguage = i18n.language || 'es';
  const changeLanguage = (lng) => i18n.changeLanguage(lng);
  const awsOrange = '#ff9900';

  const floatingStyle = isLoggedIn ? {
    position: 'fixed',
    top: '35px',
    left: '50%',
    transform: 'translateX(-50%)',
    opacity: 0.98,
    backdropFilter: 'blur(8px)',
    zIndex: 9999,
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    background: '#ffffff',
    padding: '8px 12px',
    borderRadius: '50px',
    boxShadow: '0 10px 50px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0'
  } : {
    position: 'fixed',
    bottom: '32px',
    right: '32px',
    opacity: 0.95,
    backdropFilter: 'blur(8px)',
    zIndex: 9999,
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    background: '#ffffff',
    padding: '8px 12px',
    borderRadius: '50px',
    boxShadow: '0 10px 50px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0'
  };

  const floatingControls = (
    <div className="no-print floating-controls" style={floatingStyle}>
      {isLoggedIn && (
        <button onClick={handleLogout} title={currentLanguage === 'es' ? 'Volver al inicio' : 'Return to Home'} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#edf2f7', color: '#4a5568', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: '800', fontSize: '0.95rem' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          {'Logout'}
        </button>
      )}
      <div style={{ display: 'flex', gap: '4px', borderLeft: isLoggedIn ? '2px solid #e2e8f0' : 'none', paddingLeft: isLoggedIn ? '8px' : '0' }}>
        <button onClick={() => changeLanguage('es')} style={{ padding: '8px 14px', background: currentLanguage === 'es' ? awsOrange : 'transparent', color: currentLanguage === 'es' ? '#ffffff' : '#a0aec0', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: '900', fontSize: '0.95rem' }}>ES</button>
        <button onClick={() => changeLanguage('en')} style={{ padding: '8px 14px', background: currentLanguage === 'en' ? awsOrange : 'transparent', color: currentLanguage === 'en' ? '#ffffff' : '#a0aec0', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: '900', fontSize: '0.95rem' }}>EN</button>
      </div>
    </div>
  );

  const exportEntriesCsv = () => {
    if (!entries || entries.length === 0) {
      showToast('error', 'No entries to export', 'No hay datos para exportar');
      return;
    }

    const rows = entries.map((row) => {
      const name = row.name || row.nombre || '';
      const organization = row.organization || row.organizacion || '';
      const email = row.email || row.correo || '';
      const phone = row.phone || row.telefono || '';
      const role = row.role || row.rol || '';
      const country = row.country || row.pais || '';
      const state = row.state || row.estado || '';
      const date = row.date || row.fecha || '';
      let rawResults = row.results || row.resultados || '';
      if (typeof rawResults === 'object') rawResults = JSON.stringify(rawResults);
      return { name, organization, email, phone, role, country, state, date, results: rawResults };
    });

    const headers = ['name','organization','email','phone','role','country','state','date','results'];
    const csvLines = [headers.join(',')];
    for (const r of rows) {
      const line = headers.map(h => `"${String(r[h] || '').replace(/"/g, '""')}"`).join(',');
      csvLines.push(line);
    }

    const csv = csvLines.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `entries-${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const onUnload = () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) return;
        fetch(`${API_BASE}/logout`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` }, keepalive: true });
      } catch (e) {
        // ignore
      }
    };
    window.addEventListener('beforeunload', onUnload);
    window.addEventListener('pagehide', onUnload);
    return () => {
      window.removeEventListener('beforeunload', onUnload);
      window.removeEventListener('pagehide', onUnload);
    };
  }, []);

  return (
    <div style={safeAreaStyle}>
      <div style={{ position: 'fixed', top: 48, left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
        <img src={awsWhite} alt="AWS" style={{ height: 'clamp(32px, 3.5vw, 64px)', objectFit: 'contain' }} />
      </div>
      {!isLoggedIn ? (
        <form onSubmit={handleLogin} className="main-card-container">
          <h2 className="form-title">{t('portal.title')}</h2>
          <div>
            <label className="input-label">
              {t('portal.username')}
            </label>
            <input
              type="text"
              name="username"
              className="input-field"
              maxLength={35}
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder={t('portal.username_placeholder')}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #e2e8f0', outline: 'none' }}
            />
          </div>
          <div>
            <label className="input-label">
              {t('portal.password')}
            </label>
            <input
              type="password"
              name="password"
              className="input-field"
              maxLength={35}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder={t('portal.password_placeholder')}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #e2e8f0', outline: 'none' }}
            />
          </div>
          <button type="submit" className={`primary-button ${isLoggingIn ? 'loading' : ''}`} disabled={isLoggingIn}>
            {isLoggingIn ? (
              <svg className="spinner" width="18" height="18" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeDasharray="31.4 31.4" />
              </svg>
            ) : t('portal.login')}
          </button>
        </form>
      ) : (
        <div style={{
          minHeight: '100vh',
          minWidth: '100vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'stretch',
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          <div className="full-card">
            <div className="topbar">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="entries-title">{t('portal.entries_since', { count: entries.length, date: fromDate })}</div>
                  <div className="control-separator" aria-hidden style={{ marginLeft: 8, marginRight: 8 }} />
                  <button className="export-button" title={t('portal.export_csv')} onClick={exportEntriesCsv} style={{ background: awsOrange, color: '#fff', border: 'none', padding: '8px 10px', borderRadius: 8, cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 0 }}>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    {t('portal.export_csv')}
                  </button>
                </div>
              <div className="controls">
                {lastFetch && <div className="updated-time control-updated">{t('portal.updated_since', { timeAgo })}</div>}
                <div className="control-separator" aria-hidden />
                <label style={{ fontWeight: 700, marginRight: 6 }}>{t('portal.from')}</label>
                <input className="date-input" type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
                <div className="control-separator" aria-hidden />
                <button className="refresh-button" title={t('portal.search')} onClick={() => fetchEntries(fromDate)} style={{ background: awsOrange, color: '#fff', border: 'none', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </button>
              </div>
            </div>

            <div className="table-scroll">
              <table className="results-table">
              <thead>
                <tr>
                  <th>{t('portal.table.name')}</th>
                  <th>{t('portal.table.organization')}</th>
                  <th>{t('portal.table.email')}</th>
                  <th>{t('portal.table.phone')}</th>
                  <th>{t('portal.table.role')}</th>
                  <th>{t('portal.table.country')}</th>
                  <th>{t('portal.table.state')}</th>
                  <th>{t('portal.table.date')}</th>
                  <th>{t('portal.table.results')}</th>
                </tr>
              </thead>
              <tbody>
                {isSearching ? (
                  <tr>
                    <td colSpan={9} style={{ textAlign: 'center', padding: '56px 0' }}>
                      <div className="big-loader" aria-hidden>
                        <svg width="64" height="64" viewBox="0 0 50 50" className="spinner-large"><circle cx="25" cy="25" r="20" strokeWidth="5" stroke="#cbd5e1" fill="none" strokeLinecap="round" strokeDasharray="31.4 31.4"></circle></svg>
                      </div>
                    </td>
                  </tr>
                ) : entries.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line></svg>
                        <div>{t('portal.no_entries') || '—'}</div>
                      </div>
                    </td>
                  </tr>
                ) : null}
                {entries.map((row, idx) => {
                  const name = row.name || row.nombre || '';
                  const organization = row.organization || row.organizacion || '';
                  const email = row.email || row.correo || '';
                  const phone = row.phone || row.telefono || '';
                  const role = row.role || row.rol || '';
                  const state = row.state || row.estado || '';
                  const country = row.country || row.pais || '';
                  const date = row.date || row.fecha || '';
                  let dateTop = '';
                  let dateBottom = '';
                  if (date) {
                    const pd = new Date(date);
                    if (!isNaN(pd)) {
                      dateTop = pd.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
                      dateBottom = pd.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', hour12: true });
                    }
                  }
                  let rawResults = row.results || row.resultados || '';
                  let resObj = rawResults;
                  if (typeof rawResults === 'string') {
                    try { resObj = JSON.parse(rawResults); } catch (e) { resObj = rawResults; }
                  }

                  return (
                    <tr key={idx} className={selectedRow === idx ? 'selected-row' : ''}>
                      <td>{name}</td>
                      <td>{organization}</td>
                      <td>{email}</td>
                      <td>{phone}</td>
                      <td>{role}</td>
                      <td>{country}</td>
                      <td>{state}</td>
                      <td>
                        <div className="date-cell">
                          <div className="date-top">{dateTop || date}</div>
                          <div className="date-bottom">{dateBottom}</div>
                        </div>
                      </td>
                      <td>
                        <div className="results-cell" style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                          <span className="total-points" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginRight: 6 }}>
                            { resObj.totalPoints !== null ? `${resObj.totalPoints}/50` : '—'}
                          </span>
                          <button
                            className="details-button"
                            style={{ background: '#23238e', color: '#fff', fontWeight: 700, padding: '6px 10px', borderRadius: 8, border: 'none', display: 'flex', alignItems: 'center' }}
                            onClick={() => { setSelectedRow(idx); setModalPayload({ results: resObj, country, state, date, name }); setModalOpen(true); }}
                            title={t('portal.view_details')}
                            aria-label={t('portal.view_details')}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <DetailsModal open={modalOpen} onClose={() => { setModalOpen(false); setSelectedRow(null); }} data={modalPayload} t={t} />
      {floatingControls}
    </div>
  );
}

export default App
