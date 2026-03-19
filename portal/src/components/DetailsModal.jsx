import React, { useState, useMemo } from 'react';
import '../App.css';

export default function DetailsModal({ open, onClose, data, t }) {
  const [tab, setTab] = useState('pretty');

  // data is expected to be { results: {...}, country, state, date }
  const parsed = useMemo(() => {
    if (!data) return null;
    const r = data.results || data;
    if (typeof r === 'string') {
      try { return JSON.parse(r); } catch (e) { return r; }
    }
    return r;
  }, [data]);

  const dimensions = useMemo(() => {
    if (!parsed) return [];
    const ds = parsed.dimensionsScore || parsed.scores || parsed.dimensions || null;
    if (!ds) return [];
    if (Array.isArray(ds)) return ds.map((v, i) => ({ label: v.label || `D${i+1}`, value: (typeof v.value === 'number' ? v.value : (typeof v === 'number' ? v : 0)) }));
    return Object.keys(ds).map(k => ({ label: k, value: (typeof ds[k] === 'number' ? ds[k] : (ds[k].value || 0)) }));
  }, [parsed]);

  const computeTotalPoints = (r) => {
    if (!r) return null;
    if (typeof r.totalPoints === 'number') return r.totalPoints;
    if (typeof r.totalPercentage === 'number') return Math.round((r.totalPercentage/100)*50);
    const ds = r.dimensionsScore || r.scores || null;
    if (!ds) return null;
    if (Array.isArray(ds)) {
      const vals = ds.map(v => (typeof v === 'number' ? v : (v.value || 0)));
      return Math.round(vals.reduce((a,b)=>a+b,0)/vals.length);
    }
    if (typeof ds === 'object') {
      const vals = Object.values(ds).map(v => (typeof v === 'number' ? v : (v.value || 0)));
      if (vals.length === 0) return null;
      return Math.round(vals.reduce((a,b)=>a+b,0)/vals.length);
    }
    return null;
  };

  const score = computeTotalPoints(parsed);

  if (!open) return null;

  const closeOnBg = (e) => { if (e.target === e.currentTarget) onClose?.(); };

  const formattedDate = data && data.date ? (new Date(data.date)).toLocaleString() : '';

  return (
    <div className="details-modal-overlay right" onMouseDown={closeOnBg}>
      <div className="details-modal right" role="dialog" aria-modal="true">
        <div className="modal-header">
          <div style={{ fontSize: 14, fontWeight: 700 }}>{(data?.country || '') + (data?.state ? (`, ${data.state}`) : '')}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{formattedDate}</div>
          </div>
        </div>

        <div className="modal-tabs">
          <button className={`tab ${tab==='pretty' ? 'active' : ''}`} onClick={() => setTab('pretty')}>{t('portal.pretty') || 'Pretty'}</button>
          <button className={`tab ${tab==='raw' ? 'active' : ''}`} onClick={() => setTab('raw')}>{t('portal.raw') || 'Raw'}</button>
        </div>

        <div className="modal-score" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ fontWeight: 900, fontSize: '2rem', textAlign: 'center', width: '100%' }}>{score !== null ? `${score}/50` : '—'}</div>
        </div>

        <div className="modal-content column">
          {tab === 'pretty' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="radar-full">
                <RadarChart data={dimensions} fullWidth />
              </div>
              <div className="meta">
                {parsed && parsed.levelKey && (
                  <div className="level-key-big">{parsed.levelKey}</div>
                )}

                <div className="weak-strong">
                  <div className="ws-cell">
                    <div className="ws-title">{t('portal.weakest') || 'Weakest'}</div>
                    <div className="ws-value">{parsed && parsed.lowestDimension ? parsed.lowestDimension : '—'}</div>
                  </div>
                  <div className="ws-cell">
                    <div className="ws-title">{t('portal.strongest') || 'Strongest'}</div>
                    <div className="ws-value">{parsed && parsed.strongestDimension ? parsed.strongestDimension : '—'}</div>
                  </div>
                </div>

                <div className="risk-row">
                  <div className="risk-gap">{parsed && (parsed.riskGap || parsed.riskGap === 0) ? (typeof parsed.riskGap === 'number' ? parsed.riskGap.toFixed(1) : parsed.riskGap) : '—'}</div>
                  <div className="risk-sep" aria-hidden />
                  <div className="risk-label">{parsed && parsed.riskLabel ? parsed.riskLabel : '—'}</div>
                </div>

                <div className="action-row">
                  <div className="action-title">{t('portal.recommended_action') || 'Action'}</div>
                  <div className="action-text">{parsed && parsed.action ? parsed.action : '—'}</div>
                </div>
              </div>
            </div>
          ) : (
            <pre
              className="raw-view"
              style={{
                textAlign: 'left',
                padding: '12px',
                overflowX: 'auto',
                background: '#001428',
                borderRadius: 6,
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}
            >
              {parsed ? JSON.stringify(parsed, null, 2) : '—'}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

function RadarChart({ data, fullWidth }) {
  const size = fullWidth ? 460 : 360;
  const cx = size / 2;
  const cy = size / 2;
  const radius = Math.max(80, Math.min(cx, cy) - 30);
  const count = Math.max(3, (data && data.length) || 0);

  const values = Array.from({ length: count }).map((_, i) => {
    const d = (data && data[i]);
    if (!d) return 0;
    const raw = (typeof d === 'number' ? d : (d.value ?? d.score ?? 0));
    const label = ((d && (d.label || d.name)) || '').toString().toLowerCase();
    const max = (label.includes('people') || label.includes('operations')) ? 5 : 10;
    const percent = (Number(raw || 0) / max) * 100;
    return Math.max(0, Math.min(100, percent));
  });

  // compute point coordinates array
  const pointsArr = values.map((v, i) => {
    const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
    const r = (v / 100) * radius;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return [x, y];
  });

  const points = pointsArr.map(p => `${p[0]},${p[1]}`).join(' ');

  const axes = Array.from({ length: count }).map((_, i) => {
    const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    return { x, y, label: (data && data[i] && (data[i].label || data[i].name)) || `D${i+1}`, value: values[i] || 0 };
  });

  return (
    <svg className="radar-svg" width="100%" height={fullWidth ? 360 : 300} viewBox={`0 0 ${size} ${size}`} preserveAspectRatio="xMidYMid meet">
      {[0.25,0.5,0.75,1].map((m, idx) => (
        <polygon key={idx} points={Array.from({ length: count }).map((_,i)=>{
          const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
          const r = radius * m;
          return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
        }).join(' ')} fill="none" stroke="#e2e8f0" strokeWidth="1" />
      ))}

      {axes.map((a, i) => (
        <g key={i}>
          <line x1={cx} y1={cy} x2={a.x} y2={a.y} stroke="#cbd5e1" strokeWidth="1" />
          <text x={a.x} y={a.y} fontSize="11" fill="#475569" textAnchor={a.x > cx ? 'start' : (a.x < cx ? 'end' : 'middle')} dy={a.y > cy ? 14 : -6}>{a.label}</text>
        </g>
      ))}

      <polygon points={points} fill="rgba(255,153,0,0.18)" stroke="#ff9900" strokeWidth="2" />

      {pointsArr.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={5} fill="#ff9900" />
      ))}
    </svg>
  );
}
