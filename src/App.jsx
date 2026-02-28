import { useState } from 'react';
import { useTranslation } from 'react-i18next'; 
import logo from './assets/logo.png';
import onedataWhite from './assets/onedata-white.png';
import awsWhite from './assets/AWS-white.png';
import clusterLogo from './assets/cluster.png'; 
import fondo from './assets/fondo.jpg'; 
import './App.css'; 

export default function App() {
  const { t, i18n } = useTranslation(); 
  const currentLanguage = i18n.language;
  
  // EXTRAEMOS LAS PREGUNTAS DEL ARCHIVO JSON DEL IDIOMA SELECCIONADO
  const questions = t('questions', { returnObjects: true });

  const [hasStarted, setHasStarted] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nombre: '',
    organizacion: '',
    correo: '',
    telefono: '', 
    rol: '',   
    pais: '',    
    fecha: new Date().toISOString().split('T')[0]
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const oneDataDarkBlue = '#000'; 
  const oneDataBrightBlue = '#3533cd'; 
  const awsOrange = '#ff9900';
  const awsGray = '#808080';

  const darkFuturisticBackgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${fondo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed', 
    backgroundColor: oneDataDarkBlue, 
  };

  const lightFuturisticBackgroundStyle = {
    backgroundImage: `url(${fondo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed', 
    backgroundColor: oneDataDarkBlue, 
  };

  const topBarContainerStyle = {
    position: 'absolute',
    top: '4vh',
    left: '4vw',
    right: '4vw',
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'center', 
    zIndex: 10,
    pointerEvents: 'none' 
  };

  // --- FUNCIÓN PARA REINICIAR LA APP DESDE CUALQUIER PUNTO ---
  const handleResetApp = () => {
    // Si están a mitad del quiz, les pedimos confirmación
    if (hasStarted && !isFinished) {
      const confirmMsg = currentLanguage === 'es' 
        ? '¿Seguro que deseas volver al inicio? Perderás tu progreso actual.' 
        : 'Are you sure you want to return home? Your current progress will be lost.';
      if (!window.confirm(confirmMsg)) return;
    }
    
    // Reseteamos todos los estados a 0
    setAnswers({});
    setUserInfo({ nombre: '', organizacion: '', correo: '', telefono: '', rol: '', pais: '', fecha: new Date().toISOString().split('T')[0] });
    setIsFinished(false);
    setHasStarted(false);
    setCurrentQuestionIndex(0);
  };

  const handleSelect = (questionId, points) => {
    setAnswers({ ...answers, [questionId]: points });
  };
  const handleUserInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(currentQuestionIndex + 1);
    else setIsFinished(true);
  };
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const getCardStyleVariables = (level, isSelected) => {
    const palettes = {
      1: { base: '#64748b', bg: 'rgba(100, 116, 139, 0.05)', glow: 'rgba(100, 116, 139, 0.25)' }, 
      2: { base: '#0ea5e9', bg: 'rgba(14, 165, 233, 0.05)', glow: 'rgba(14, 165, 233, 0.25)' }, 
      3: { base: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.05)', glow: 'rgba(139, 92, 246, 0.25)' }, 
      4: { base: '#3533cd', bg: 'rgba(53, 51, 205, 0.06)', glow: 'rgba(53, 51, 205, 0.3)' },  
      5: { base: '#ff9900', bg: 'rgba(255, 153, 0, 0.06)', glow: 'rgba(255, 153, 0, 0.3)' }   
    };
    const palette = palettes[level] || palettes[1];
    return {
      '--card-bg': palette.bg,
      '--card-border': isSelected ? palette.base : palette.bg, 
      '--card-highlight': palette.base,
      '--card-glow': palette.glow,
    };
  };

  const calculateResults = () => {
    const totalPoints = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
    const maxPossiblePoints = 50;
    const totalPercentage = (totalPoints / maxPossiblePoints) * 100;

    const dimensionsScore = {
      Business: (answers.Q1 || 0) + (answers.Q2 || 0),
      People: answers.Q3 || 0,
      Governance: (answers.Q4 || 0) + (answers.Q5 || 0),
      Platform: (answers.Q6 || 0) + (answers.Q7 || 0),
      Security: (answers.Q8 || 0) + (answers.Q9 || 0),
      Operations: answers.Q10 || 0,
    };

    let classification = "";
    let action = "";
    let description = "";

    if (totalPercentage <= 40) { 
      classification = t('res.exploring.class');
      action = t('res.exploring.action');
      description = t('res.exploring.desc');
    } else if (totalPercentage <= 60) { 
      classification = t('res.adopting.class');
      action = t('res.adopting.action');
      description = t('res.adopting.desc');
    } else if (totalPercentage <= 80) { 
      classification = t('res.implementing.class');
      action = t('res.implementing.action');
      description = t('res.implementing.desc');
    } else { 
      classification = t('res.transforming.class');
      action = t('res.transforming.action');
      description = t('res.transforming.desc');
    }

    const cleanClassification = classification.replace(/[^a-zA-Z\s]/g, '').trim();
    return { totalPoints, totalPercentage, dimensionsScore, classification, cleanClassification, action, description };
  };

  // ==========================================
  // COMPONENTE FLOTANTE GLOBAL (IDIOMA + HOME)
  // ==========================================
  const floatingControls = (
    <div className="no-print" style={{ 
      position: 'fixed', 
      bottom: '4vh', 
      right: '4vw', 
      zIndex: 9999, 
      display: 'flex', 
      gap: '12px', 
      alignItems: 'center',
      background: '#ffffff',
      padding: '8px 12px',
      borderRadius: '50px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      border: '1px solid #e2e8f0'
    }}>
      
      {/* Botón Home (solo aparece si ya empezaron) */}
      {hasStarted && (
        <button 
          onClick={handleResetApp}
          title={currentLanguage === 'es' ? 'Volver al inicio' : 'Return to Home'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            background: '#edf2f7',
            color: '#4a5568',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            fontWeight: '800',
            fontSize: '0.95rem',
            transition: 'all 0.2s ease'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          {currentLanguage === 'es' ? 'Inicio' : 'Home'}
        </button>
      )}

      {/* Selector de Idiomas */}
      <div style={{ display: 'flex', gap: '4px', borderLeft: hasStarted ? '2px solid #e2e8f0' : 'none', paddingLeft: hasStarted ? '8px' : '0' }}>
        <button 
          onClick={() => changeLanguage('es')} 
          style={{ 
            padding: '8px 14px', 
            background: currentLanguage === 'es' ? awsOrange : 'transparent', 
            color: currentLanguage === 'es' ? '#ffffff' : '#a0aec0', 
            border: 'none', 
            borderRadius: '50px', 
            cursor: 'pointer', 
            fontWeight: '900', 
            fontSize: '0.95rem',
            transition: 'all 0.2s ease' 
          }}>
          ES
        </button>
        <button 
          onClick={() => changeLanguage('en')} 
          style={{ 
            padding: '8px 14px', 
            background: currentLanguage === 'en' ? awsOrange : 'transparent', 
            color: currentLanguage === 'en' ? '#ffffff' : '#a0aec0', 
            border: 'none', 
            borderRadius: '50px', 
            cursor: 'pointer', 
            fontWeight: '900', 
            fontSize: '0.95rem',
            transition: 'all 0.2s ease' 
          }}>
          EN
        </button>
      </div>
    </div>
  );

  // 1. PORTADA // 
  if (!hasStarted) {
    const isFormValid = userInfo.nombre.trim() !== '' && 
                        userInfo.organizacion.trim() !== '' && 
                        userInfo.correo.trim() !== '' &&
                        userInfo.telefono.trim() !== '' &&
                        userInfo.rol.trim() !== '' &&
                        userInfo.pais.trim() !== ''; 

    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexWrap: 'wrap', position: 'relative' }}>
        
        {/* Inyectamos nuestros controles flotantes */}
        {floatingControls}

        <div style={{ flex: '1 1 500px', ...darkFuturisticBackgroundStyle, padding: 'clamp(3rem, 6vh, 6rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
          <div style={topBarContainerStyle}>
            <img src={logo} alt="OneData" style={{ height: 'clamp(35px, 5.5vh, 60px)', objectFit: 'contain' }} />
            <img src={clusterLogo} alt="Cluster" style={{ height: 'clamp(40px, 6vh, 65px)', objectFit: 'contain', transform: 'scale(1.8)' }} />
            {}
            <img src={awsWhite} alt="AWS" style={{ height: 'clamp(35px, 5.5vh, 60px)', objectFit: 'contain', opacity: 0.95 }} /> 
          </div>

          <div style={{ marginTop: 'clamp(3rem, 6vh, 5rem)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> 
            <div style={{ maxWidth: '550px' }}>
              <h1 style={{ color: '#ffffff', fontSize: 'clamp(2.5rem, 5vh, 3.5rem)', fontWeight: '900', marginBottom: '1.5rem', lineHeight: '1.2', textAlign: 'left', letterSpacing: '-0.02em' }}>
                {t('title')}
              </h1>
              <p style={{ color: '#ffffff', fontSize: 'clamp(1.1rem, 2.2vh, 1.25rem)', lineHeight: '1.6', textAlign: 'left', marginBottom: '2.5rem', fontWeight: '400', opacity: '0.95' }}>
                {t('subtitle')}
              </p>
              <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: '2.5rem' }}></div>
              <p style={{ color: '#ffffff', fontSize: 'clamp(1.05rem, 2vh, 1.15rem)', marginBottom: '2rem', lineHeight: '1.6', textAlign: 'left', opacity: '0.95' }}>
                {t('desc')}
              </p>
              <p style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '1.5rem', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left' }}>
                {t('resultsInclude')}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left', color: '#ffffff' }}>
                <li style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: oneDataBrightBlue, marginTop: '0.5rem', flexShrink: 0, borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '1.05rem', lineHeight: '1.5', fontWeight: '500', color: '#ffffff' }}>{t('bullet1')}</span>
                </li>
                <li style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: oneDataBrightBlue, marginTop: '0.5rem', flexShrink: 0, borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '1.05rem', lineHeight: '1.5', fontWeight: '500', color: '#ffffff' }}>{t('bullet2')}</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: oneDataBrightBlue, marginTop: '0.5rem', flexShrink: 0, borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '1.05rem', lineHeight: '1.5', fontWeight: '500', color: '#ffffff' }}>{t('bullet3')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ flex: '1 1 450px', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ maxWidth: '550px', width: '100%', background: '#ffffff', padding: 'clamp(2.5rem, 4vh, 3.5rem)', borderRadius: '24px', boxShadow: '0 25px 50px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: oneDataDarkBlue, fontSize: 'clamp(1.6rem, 2.5vh, 2rem)', marginBottom: '0.5rem', fontWeight: '900', lineHeight: '1.1' }}>{t('formTitle')}</h2>
            <p style={{ color: '#1a202c', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.5', fontWeight: '500' }}>
              {t('formSub')}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '700', color: '#000', fontSize: '0.9rem' }}>{t('fName')}</label>
                  <input type="text" name="nombre" value={userInfo.nombre} onChange={handleUserInputChange} placeholder="Ej. Juan Pérez" style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #e2e8f0', fontSize: '0.95rem', boxSizing: 'border-box', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = oneDataBrightBlue} onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}/>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '700', color: '#000', fontSize: '0.9rem' }}>{t('fCompany')}</label>
                  <input type="text" name="organizacion" value={userInfo.organizacion} onChange={handleUserInputChange} placeholder="Ej. OneData" style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #e2e8f0', fontSize: '0.95rem', boxSizing: 'border-box', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = oneDataBrightBlue} onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '700', color: '#000', fontSize: '0.9rem' }}>{t('fEmail')}</label>
                  <input type="email" name="correo" value={userInfo.correo} onChange={handleUserInputChange} placeholder="juan@empresa.com" style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #e2e8f0', fontSize: '0.95rem', boxSizing: 'border-box', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = oneDataBrightBlue} onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '700', color: '#000', fontSize: '0.9rem' }}>{t('fPhone')}</label>
                  <input type="tel" name="telefono" value={userInfo.telefono} onChange={handleUserInputChange} placeholder="Ej. +52 555..." style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #e2e8f0', fontSize: '0.95rem', boxSizing: 'border-box', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = oneDataBrightBlue} onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '700', color: '#000', fontSize: '0.9rem' }}>{t('fRole')}</label>
                  <input type="text" name="rol" value={userInfo.rol} onChange={handleUserInputChange} placeholder="Ej. Director de TI" style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #e2e8f0', fontSize: '0.95rem', boxSizing: 'border-box', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = oneDataBrightBlue} onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '700', color: '#000', fontSize: '0.9rem' }}>{t('fCountry')}</label>
                  <select 
                    name="pais" 
                    value={userInfo.pais} 
                    onChange={handleUserInputChange} 
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #e2e8f0', fontSize: '0.95rem', boxSizing: 'border-box', outline: 'none', backgroundColor: '#fff', cursor: 'pointer' }}
                    onFocus={(e) => e.target.style.borderColor = oneDataBrightBlue} 
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  >
                    <option value="">{t('selectCountry')}</option>
                    <option value="Alemania">Alemania</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Brasil">Brasil</option>
                    <option value="Canadá">Canadá</option>
                    <option value="Chile">Chile</option>
                    <option value="Colombia">Colombia</option>
                    <option value="España">España</option>
                    <option value="USA">Estados Unidos</option>
                    <option value="México">México</option>
                    <option value="Perú">Perú</option>
                    <option value="Reino Unido">Reino Unido</option>
                    <option value="Otro">Otro / Other</option>
                  </select>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setHasStarted(true)}
              disabled={!isFormValid}
              style={{ 
                marginTop: '2.5rem', width: '100%', padding: '16px', 
                backgroundColor: isFormValid ? awsOrange : '#cbd5e0', 
                color: '#ffffff', border: 'none', borderRadius: '14px', 
                cursor: isFormValid ? 'pointer' : 'not-allowed',
                fontSize: '1.1rem', fontWeight: '800', transition: 'all 0.2s ease',
                boxShadow: isFormValid ? `0 10px 20px -5px ${awsOrange}66` : 'none',
                letterSpacing: '0.05em'
              }}
            >
              {t('btnStart')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. RESULTADOS // 
  if (isFinished) {
    const results = calculateResults();
    const circleDashArray = `${(results.totalPercentage * 113) / 100}, 113`;
    const scoreColor = results.totalPercentage > 80 ? '#48bb78' : results.totalPercentage > 60 ? oneDataBrightBlue : awsOrange;

    return (
      <div style={{ 
        minHeight: '100vh', width: '100vw', 
        ...lightFuturisticBackgroundStyle, 
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center', 
        padding: '14vh 3vw 5vh 3vw', boxSizing: 'border-box', position: 'relative'
      }}>
        
        {/* Controles flotantes */}
        {floatingControls}

        <div style={topBarContainerStyle} className="no-print">
          <img src={onedataWhite} alt="OneData" style={{ height: 'clamp(35px, 5.5vh, 60px)', objectFit: 'contain' }} />
          <img src={clusterLogo} alt="Cluster" style={{ height: 'clamp(40px, 6vh, 65px)', objectFit: 'contain', transform: 'scale(1.8)' }} />
          <img src={awsWhite} alt="AWS" style={{ height: 'clamp(35px, 5.5vh, 60px)', objectFit: 'contain', opacity: 0.95 }} />
        </div>

        <div style={{ 
          position: 'relative', zIndex: 1, maxWidth: '1400px', width: '100%', 
          minHeight: '85vh', height: 'auto', 
          background: '#ffffff', borderRadius: '24px', 
          boxShadow: '0 30px 70px rgba(0,0,0,0.5)', 
          boxSizing: 'border-box', overflow: 'hidden',
          display: 'flex', flexDirection: 'column'
        }}>
          
          <div style={{ padding: '2.5vh 4vw', borderBottom: '1px solid #eee', textAlign: 'center' }}>
             <h2 style={{ fontSize: '1.8rem', color: oneDataDarkBlue, fontWeight: '900', margin: 0 }}>{t('dashTitle')}</h2>
          </div>

          <div style={{ padding: '3vh 4vw', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            <div className="results-columns">
              
              <div className="results-sidebar">
                <div style={{ background: '#f8f9fa', padding: '1.2rem', borderRadius: '16px', borderLeft: `4px solid ${oneDataBrightBlue}`, flexShrink: 0 }}>
                  <h4 style={{ margin: '0 0 5px 0', color: oneDataDarkBlue, fontSize: '1rem' }}>{t('dashEvalOf')}</h4>
                  <p style={{ margin: '0 0 2px 0', fontSize: '1.1rem', fontWeight: 700, color: oneDataBrightBlue }}>{userInfo.nombre} <span style={{color: '#a0aec0', fontSize: '0.9rem', fontWeight: 'normal'}}>| {userInfo.rol}</span></p>
                  <p style={{ margin: 0, color: awsGray, fontSize: '0.9rem' }}>{userInfo.organizacion} | {userInfo.pais} | {userInfo.fecha}</p>
                </div>

                <div style={{ flexShrink: 0, textAlign: 'center' }}>
                  <h3 style={{ color: awsGray, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem', margin: '0 0 1vh 0' }}>{t('dashGlobalScore')}</h3>
                  <div className="score-gauge-container"> 
                    <svg viewBox="0 0 36 36" className="circular-chart">
                      <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="circle" strokeDasharray={circleDashArray} stroke={scoreColor} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div className="score-text-center">
                      <span style={{ display: 'block', fontSize: '2.2rem', fontWeight: 900, color: oneDataDarkBlue, lineHeight: 1 }}>{results.totalPoints}</span>
                      <span style={{ color: awsGray, fontSize: '0.9rem' }}>{t('dashOf')}</span>
                    </div>
                  </div>
                </div>

                <div className="classification-card">
                    <h2 style={{ color: awsOrange, fontSize: '1.3rem', fontWeight: '900', margin: '0 0 0.5rem 0', letterSpacing: '-0.5px' }}>{results.classification}</h2>
                    <p style={{ fontSize: '0.95rem', color: '#2d3748', lineHeight: '1.4', margin: 0 }}>
                      <strong>{t('dashFocus')}</strong><br/> {results.action}
                    </p>
                </div>

                <button 
                  className="no-print"
                  onClick={handleResetApp}
                  style={{ width: '100%', padding: '14px', backgroundColor: oneDataDarkBlue, color: '#ffffff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', flexShrink: 0 }}
                >
                  {t('btnNewEval')}
                </button>
              </div>

              <div className="results-main">
                <h3 style={{ fontSize: '1.2rem', color: oneDataDarkBlue, fontWeight: '800', margin: '0 0 2vh 0', textAlign: 'left' }}>{t('dashBreakdown')}</h3>
                
                <div className="dimensions-grid">
                  {Object.entries(results.dimensionsScore).map(([dimension, score]) => {
                    const maxScore = (dimension === 'People' || dimension === 'Operations') ? 5 : 10;
                    const percentage = (score / maxScore) * 100;
                    const icon = dimension === 'Business' ? '💼' : dimension === 'People' ? '👥' : dimension === 'Governance' ? '⚖️' : dimension === 'Platform' ? '🛠️' : dimension === 'Security' ? '🔒' : '⚙️';
                    
                    return (
                      <div key={dimension} className="dimension-card">
                        <div className="dimension-header">
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem' }}>
                            <span style={{ fontSize: '1.2rem' }}>{icon}</span> {dimension}
                          </span>
                          <span style={{ color: oneDataBrightBlue, fontWeight: 900 }}>{score} <span style={{color: '#cbd5e1', fontWeight: 400}}>/ {maxScore}</span></span>
                        </div>
                        <div className="dimension-body">
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem', color: awsGray, fontWeight: 600 }}>
                            <span>{t('dashProgress')}</span>
                            <span>{percentage.toFixed(0)}%</span>
                          </div>
                          <div style={{ height: '8px', backgroundColor: '#edf2f7', borderRadius: '4px', overflow: 'hidden' }}>
                            <div className="progress-bar-modern" style={{ width: `${percentage}%` }}></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }} className="no-print">
                   <button 
                      onClick={() => window.print()}
                      style={{ 
                        padding: '10px 20px', backgroundColor: oneDataBrightBlue, color: 'white', border: 'none', 
                        borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px',
                        boxShadow: '0 4px 10px rgba(53, 51, 205, 0.3)'
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                      {t('dashDownload')}
                    </button>
                </div>

              </div>
            </div>

            <div className="action-plan-section" style={{ borderTop: '2px solid #f0f4f8', paddingTop: '2rem' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '1.6rem' }}>📑</span>
                  <h3 style={{ fontSize: '1.4rem', color: oneDataDarkBlue, fontWeight: '900', margin: 0 }}>{t('planTitle')}</h3>
               </div>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                 
                 <div style={{ background: 'linear-gradient(to right, rgba(53, 51, 205, 0.04), transparent)', borderLeft: `5px solid ${oneDataBrightBlue}`, padding: '1.5rem', borderRadius: '0 12px 12px 0' }}>
                    <h4 style={{ color: oneDataBrightBlue, marginTop: 0, marginBottom: '0.6rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '800' }}>{t('planCurrent')}</h4>
                    <p style={{ margin: 0, color: '#2d3748', fontSize: '1.05rem', lineHeight: '1.6', textAlign: 'left' }}>{results.description}</p>
                 </div>

                 <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                    <h4 style={{ color: oneDataDarkBlue, marginTop: 0, marginBottom: '1.2rem', fontSize: '1.1rem', fontWeight: '800', textAlign: 'left' }}>
                       {t('planRec')}
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: '0', listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                      <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                         <div style={{ color: '#ffffff', backgroundColor: awsOrange, borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold', flexShrink: 0, marginTop: '2px' }}>✓</div>
                         <div style={{ color: '#4a5568', fontSize: '1rem', lineHeight: '1.5' }}><strong>{t('rec1Title')}</strong> {t('rec1Desc')}</div>
                      </li>
                      <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                         <div style={{ color: '#ffffff', backgroundColor: awsOrange, borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold', flexShrink: 0, marginTop: '2px' }}>✓</div>
                         <div style={{ color: '#4a5568', fontSize: '1rem', lineHeight: '1.5' }}>
                           <strong>{t('rec2Title')}</strong> {t('rec2Desc', { level: results.cleanClassification })}
                         </div>
                      </li>
                      <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                         <div style={{ color: '#ffffff', backgroundColor: awsOrange, borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold', flexShrink: 0, marginTop: '2px' }}>✓</div>
                         <div style={{ color: '#4a5568', fontSize: '1rem', lineHeight: '1.5' }}><strong>{t('rec3Title')}</strong> {t('rec3Desc')}</div>
                      </li>
                    </ul>
                 </div>

               </div>
            </div>
            
          </div>
        </div>
      </div>
    );
  }

  // 3. CUESTIONARIO // 
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isCurrentQuestionAnswered = answers[currentQuestion.id] !== undefined;

  return (
    <div style={{ 
      minHeight: '100vh', width: '100vw', 
      ...lightFuturisticBackgroundStyle, 
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center', 
      padding: '14vh 2vw 5vh 2vw', boxSizing: 'border-box', position: 'relative'
    }}>

      {/* Controles flotantes */}
      {floatingControls}

      <div style={topBarContainerStyle}>
        <img src={onedataWhite} alt="OneData" style={{ height: 'clamp(35px, 5.5vh, 60px)', objectFit: 'contain' }} />
        <img src={clusterLogo} alt="Cluster" style={{ height: 'clamp(40px, 6vh, 65px)', objectFit: 'contain', transform: 'scale(1.8)' }} />
        <img src={awsWhite} alt="AWS" style={{ height: 'clamp(35px, 5.5vh, 60px)', objectFit: 'contain', opacity: 0.95 }} />
      </div>

      <div style={{ 
        position: 'relative', zIndex: 1, maxWidth: '1500px', width: '100%', 
        minHeight: '85vh', height: 'auto', 
        background: '#ffffff', padding: '3rem 3vw', borderRadius: '24px', 
        boxShadow: '0 30px 70px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', boxSizing: 'border-box',
        gap: '2rem' 
      }}>
        
        <div key={currentQuestionIndex} style={{ flexShrink: 0, width: '100%', maxWidth: '1100px', alignSelf: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: awsGray, fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <span>{t('dimLabel')} <span style={{color: oneDataBrightBlue}}>{currentQuestion.dimension}</span></span>
            <span>{t('questionOf', { current: currentQuestionIndex + 1, total: questions.length })}</span>
          </div>

          <div style={{ width: '100%', height: '8px', backgroundColor: '#edf2f7', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{ width: `${progressPercentage}%`, height: '100%', backgroundColor: awsOrange, borderRadius: '999px', transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
          </div>
        </div>

        <div style={{ flexShrink: 0, textAlign: 'center' }}>
            <h2 key={`text-${currentQuestionIndex}`} className="question-text" style={{ color: oneDataDarkBlue, fontSize: '1.8rem', marginBottom: '1rem', fontWeight: '700', lineHeight: '1.3', maxWidth: '1000px', margin: '0 auto' }}>
              {currentQuestion.text}
            </h2>
            <p style={{ color: '#718096', margin: 0, fontSize: '1rem' }}>
              {t('selectOption')}
            </p>
        </div>
        
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'stretch', justifyContent: 'center', width: '100%' }}>
          <div className="options-container" key={`opts-${currentQuestionIndex}`}>
              {currentQuestion.options.map((opt) => {
                const isSelected = answers[currentQuestion.id] === opt.points;
                
                return (
                  <button 
                    key={opt.level}
                    onClick={() => handleSelect(currentQuestion.id, opt.points)}
                    className={`option-card ${isSelected ? 'selected' : ''}`}
                    style={getCardStyleVariables(opt.level, isSelected)}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <div style={{ fontWeight: 800, marginBottom: '0.8rem', color: oneDataDarkBlue, fontSize: '1.15rem', lineHeight: '1.2' }}>
                        {opt.title}
                      </div>
                      <div className="option-desc" style={{ color: '#2d3748', fontSize: '0.95rem', lineHeight: '1.4' }}>
                        {opt.desc}
                      </div>
                    </div>
                    <span className="option-label">
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
        </div>

        <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
            <button 
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                style={{ 
                    padding: '12px 30px', 
                    backgroundColor: currentQuestionIndex === 0 ? '#e2e8f0' : '#ffffff', 
                    color: currentQuestionIndex === 0 ? '#a0aec0' : awsGray, 
                    border: '1px solid #cbd5e1', borderRadius: '999px', 
                    cursor: currentQuestionIndex === 0 ? 'default' : 'pointer',
                    fontSize: '1rem', fontWeight: '600', transition: 'all 0.2s ease',
                    boxShadow: 'none'
                }}
            >
                {t('btnBack')}
            </button>
            
            <button 
                onClick={goToNextQuestion}
                disabled={!isCurrentQuestionAnswered}
                style={{ 
                    padding: '12px 30px', 
                    backgroundColor: !isCurrentQuestionAnswered ? '#e2e8f0' : awsOrange, 
                    color: !isCurrentQuestionAnswered ? '#a0aec0' : '#ffffff', 
                    border: 'none', borderRadius: '999px', 
                    cursor: !isCurrentQuestionAnswered ? 'default' : 'pointer',
                    fontSize: '1rem', fontWeight: '600', transition: 'all 0.2s ease',
                    boxShadow: !isCurrentQuestionAnswered ? 'none' : '0 4px 10px rgba(255,153,0,0.3)'
                }}
            >
                {currentQuestionIndex === questions.length - 1 ? t('btnResults') : t('btnNext')}
            </button>
        </div>

      </div>
    </div>
  );
}