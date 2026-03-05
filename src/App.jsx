//import { brandConfig } from "./config/configCluster"
import { brandConfig } from "./config/configAWS"

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next'; 
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

import logo from './assets/logo.png'; 
import onedataWhite from './assets/onedata-white.png';
import awsWhite from './assets/AWS-white.png';
import clusterLogo from './assets/cluster.png'; 

import awsColor from './assets/awscolor.png';
import clusterColor from './assets/clustercolor.png';
import logoColor from './assets/logocolor.png';

// Importación correcta de la imagen para producción
import fondo from './assets/fondo.jpg'; 
import './App.css'; 

// VARIABLE GLOBAL DE BRANDING
const BRAND_VARIANT = "cluster"; // Cambiar a "aws" cuando se requiera

// NUEVO COMPONENTE REUTILIZABLE
const HeroLogos = ({ variant = "cluster", theme = "dark" }) => {
  return (
    <div className="hero-logos no-print">
      {variant === "cluster" && (
        <img src={clusterLogo} alt="Cluster" />
      )}
      {/* Condicionamos el logo de OneData para que contraste bien según el fondo */}
      <img src={theme === "light" ? logo : onedataWhite} alt="OneData" />
      <img src={awsWhite} alt="AWS" />
    </div>
  );
};

export default function App() {
  const { t, i18n } = useTranslation(); 
  const currentLanguage = i18n.language;
  
  const questions = t('questions', { returnObjects: true });

  const [hasStarted, setHasStarted] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nombre: '', organizacion: '', correo: '', telefono: '', rol: '', pais: '', fecha: new Date().toISOString().split('T')[0]
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [animateCharts, setAnimateCharts] = useState(false); 
  
  const questionRef = useRef(null);

  useEffect(() => {
    if (questionRef.current && hasStarted && !isFinished) {
      questionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [currentQuestionIndex, hasStarted, isFinished]);

  useEffect(() => {
    if (isFinished) {
      const timer = setTimeout(() => { setAnimateCharts(true); }, 200);
      return () => clearTimeout(timer);
    }
  }, [isFinished]);

  const oneDataDarkBlue = '#000'; 
  const oneDataBrightBlue = '#3533cd'; 
  const awsOrange = '#ff9900';
  const awsGray = '#808080';

  const tacticalOfferings = {
    Business: [
      { title: "AWS Machine Learning Solutions", link: "https://offerings.onedatasoftware.com/aws-machine-learning/", description: "Implementación de modelos predictivos y analítica avanzada para convertir datos en decisiones estratégicas." },
      { title: "AWS AI Agent Solutions", link: "https://offerings.onedatasoftware.com/aws-ai-agent/", description: "Automatización inteligente de procesos mediante agentes de IA." }
    ],
    Platform: [
      { title: "AWS Data Migration", link: "https://offerings.onedatasoftware.com/aws-data-migration/", description: "Migración segura y confiable de datos hacia infraestructura escalable en AWS." },
      { title: "CloudOps - OneData", link: "https://offerings.onedatasoftware.com/aws-cloud-ops-governance/", description: "Optimización y gobierno de infraestructura en la nube para soportar iniciativas de IA." }
    ],
    Security: [
      { title: "AWS Security Solutions", link: "https://offerings.onedatasoftware.com/aws-security/", description: "Protección integral de datos, identidades y cargas de trabajo en la nube." },
      { title: "CloudOps - Governance", link: "https://offerings.onedatasoftware.com/aws-cloud-ops-governance/", description: "Implementación de controles y marcos de seguridad operativa." }
    ],
    Operations: [
      { title: "CloudOps - Automation", link: "https://offerings.onedatasoftware.com/aws-cloud-ops-governance/", description: "Automatización y monitoreo continuo para escalar operaciones." },
      { title: "AWS AI Agent Solutions", link: "https://offerings.onedatasoftware.com/aws-ai-agent/", description: "Automatización inteligente de flujos operativos." }
    ],
    Governance: [
      { title: "AWS Security & Compliance", link: "https://offerings.onedatasoftware.com/aws-security/", description: "Implementación de marcos regulatorios y cumplimiento en entornos de IA." },
      { title: "CloudOps Governance", link: "https://offerings.onedatasoftware.com/aws-cloud-ops-governance/", description: "Gestión centralizada de infraestructura y control de costos." }
    ],
    People: [
      { title: "AWS AI Agent Enablement", link: "https://offerings.onedatasoftware.com/aws-ai-agent/", description: "Capacitación y adopción de IA para equipos internos." },
      { title: "AWS Machine Learning Advisory", link: "https://offerings.onedatasoftware.com/aws-machine-learning/", description: "Acompañamiento estratégico en implementación de analítica avanzada." }
    ]
  };

  const levelStrategicBoost = {
    exploring: [
      { title: "AWS Data Migration", link: "https://offerings.onedatasoftware.com/aws-data-migration/", description: "Modernización de infraestructura base para habilitar capacidades de IA." },
      { title: "AWS Security Solutions", link: "https://offerings.onedatasoftware.com/aws-security/", description: "Establecimiento de una postura de seguridad sólida desde el inicio." }
    ],
    adopting: [
      { title: "AWS Machine Learning Solutions", link: "https://offerings.onedatasoftware.com/aws-machine-learning/", description: "Implementación de primeros modelos predictivos y analítica avanzada." },
      { title: "CloudOps - Governance", link: "https://offerings.onedatasoftware.com/aws-cloud-ops-governance/", description: "Estructuración operativa para escalar iniciativas tecnológicas." }
    ],
    implementing: [
      { title: "AWS AI Agent Solutions", link: "https://offerings.onedatasoftware.com/aws-ai-agent/", description: "Automatización inteligente de procesos empresariales." },
      { title: "CloudOps - Automation", link: "https://offerings.onedatasoftware.com/aws-cloud-ops-governance/", description: "Optimización continua y control de costos en la nube." }
    ],
    transforming: [
      { title: "AWS AI Agent Solutions", link: "https://offerings.onedatasoftware.com/aws-ai-agent/", description: "Orquestación de sistemas autónomos impulsados por IA." },
      { title: "AWS IoT Solutions", link: "https://offerings.onedatasoftware.com/aws-iot-solutions/", description: "Integración del mundo físico con ecosistemas digitales avanzados." }
    ]
  };

  const darkFuturisticBackgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundColor: oneDataDarkBlue, 
  };

  const lightFuturisticBackgroundStyle = {
    backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundColor: oneDataDarkBlue, 
  };

  const handleResetApp = () => {
    if (hasStarted && !isFinished) {
      const confirmMsg = currentLanguage === 'es' ? '¿Seguro que deseas volver al inicio? Perderás tu progreso actual.' : 'Are you sure you want to return home? Your current progress will be lost.';
      if (!window.confirm(confirmMsg)) return;
    }
    setAnswers({}); setUserInfo({ nombre: '', organizacion: '', correo: '', telefono: '', rol: '', pais: '', fecha: new Date().toISOString().split('T')[0] });
    setIsFinished(false); setHasStarted(false); setCurrentQuestionIndex(0); setAnimateCharts(false); 
  };

  const handleSelect = (questionId, points) => { 
    setAnswers(prev => ({ ...prev, [questionId]: points })); 
  };

  const handleUserInputChange = (e) => { setUserInfo({ ...userInfo, [e.target.name]: e.target.value }); };
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) { setCurrentQuestionIndex(currentQuestionIndex + 1); } else { setIsFinished(true); }
  };
  const goToPreviousQuestion = () => { if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1); };
  const changeLanguage = (lng) => { i18n.changeLanguage(lng); };

  const getCardStyleVariables = (level, isSelected) => {
    const palettes = {
      1: { base: '#64748b', bg: 'rgba(100, 116, 139, 0.05)', glow: 'rgba(100, 116, 139, 0.25)' }, 
      2: { base: '#0ea5e9', bg: 'rgba(14, 165, 233, 0.05)', glow: 'rgba(14, 165, 233, 0.25)' }, 
      3: { base: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.05)', glow: 'rgba(139, 92, 246, 0.25)' }, 
      4: { base: '#3533cd', bg: 'rgba(53, 51, 205, 0.06)', glow: 'rgba(53, 51, 205, 0.3)' },  
      5: { base: '#ff9900', bg: 'rgba(255, 153, 0, 0.06)', glow: 'rgba(255, 153, 0, 0.3)' }   
    };
    const palette = palettes[level] || palettes[1];
    return { '--card-bg': palette.bg, '--card-border': isSelected ? palette.base : palette.bg, '--card-highlight': palette.base, '--card-glow': palette.glow, };
  };

  const calculateResults = () => {
    const totalPoints = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
    const totalPercentage = (totalPoints / 50) * 100;

    const dimensionsScore = {
      Business: (answers.Q1 || 0) + (answers.Q2 || 0),
      People: answers.Q3 || 0,
      Governance: (answers.Q4 || 0) + (answers.Q5 || 0),
      Platform: (answers.Q6 || 0) + (answers.Q7 || 0),
      Security: (answers.Q8 || 0) + (answers.Q9 || 0),
      Operations: answers.Q10 || 0,
    };

    const normalizedDimensions = {
      Business: dimensionsScore.Business / 10,
      People: dimensionsScore.People / 5,
      Governance: dimensionsScore.Governance / 10,
      Platform: dimensionsScore.Platform / 10,
      Security: dimensionsScore.Security / 10,
      Operations: dimensionsScore.Operations / 5,
    };

    const lowestDimension = Object.keys(normalizedDimensions).reduce(
      (lowest, current) => normalizedDimensions[current] < normalizedDimensions[lowest] ? current : lowest
    );

    const strongestDimension = Object.keys(normalizedDimensions).reduce(
      (highest, current) => normalizedDimensions[current] > normalizedDimensions[highest] ? current : highest
    );
    
    const riskGap = normalizedDimensions[strongestDimension] - normalizedDimensions[lowestDimension];

    let levelKey =
      totalPercentage <= 40 ? "exploring"
      : totalPercentage <= 60 ? "adopting"
      : totalPercentage <= 80 ? "implementing"
      : "transforming";

    return {
      totalPoints, totalPercentage, dimensionsScore, levelKey, levelData: t(`res.${levelKey}`, { returnObjects: true }), lowestDimension, strongestDimension, riskGap
    };
  };

  const floatingControls = (
    <div className="no-print floating-controls" style={{ position: 'fixed', bottom: '32px', opacity: 0.95, backdropFilter: 'blur(8px)', right: '32px', zIndex: 9999, display: 'flex', gap: '12px', alignItems: 'center', background: '#ffffff', padding: '8px 12px', borderRadius: '50px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', border: '1px solid #e2e8f0' }}>
      {hasStarted && (
        <button onClick={handleResetApp} title={currentLanguage === 'es' ? 'Volver al inicio' : 'Return to Home'} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#edf2f7', color: '#4a5568', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: '800', fontSize: '0.95rem' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          {currentLanguage === 'es' ? 'Inicio' : 'Home'}
        </button>
      )}
      <div style={{ display: 'flex', gap: '4px', borderLeft: hasStarted ? '2px solid #e2e8f0' : 'none', paddingLeft: hasStarted ? '8px' : '0' }}>
        <button onClick={() => changeLanguage('es')} style={{ padding: '8px 14px', background: currentLanguage === 'es' ? awsOrange : 'transparent', color: currentLanguage === 'es' ? '#ffffff' : '#a0aec0', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: '900', fontSize: '0.95rem' }}>ES</button>
        <button onClick={() => changeLanguage('en')} style={{ padding: '8px 14px', background: currentLanguage === 'en' ? awsOrange : 'transparent', color: currentLanguage === 'en' ? '#ffffff' : '#a0aec0', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: '900', fontSize: '0.95rem' }}>EN</button>
      </div>
    </div>
  );

  if (!hasStarted) {
    const isFormValid = userInfo.nombre.trim() !== '' && userInfo.organizacion.trim() !== '' && userInfo.correo.trim() !== '' && userInfo.telefono.trim() !== '' && userInfo.rol.trim() !== '' && userInfo.pais.trim() !== ''; 
    return (
      <div className="app-layout-wrapper" style={{ ...darkFuturisticBackgroundStyle }}>
        {floatingControls}
        
        {/* REEMPLAZO 1: LANDING PAGE */}
        <HeroLogos variant={BRAND_VARIANT} theme="dark" />

        <div className="main-content-flex hero-section">
          <div className="landing-container">
            
            <div className="landing-text-section"> 
              <h1 className="hero-title" style={{ color: '#ffffff', fontSize: 'clamp(2.5rem, 5vh, 3.5rem)', fontWeight: '900', marginBottom: '1.5rem', lineHeight: '1.2' }}>{t('title')}</h1>
              <p className="hero-description" style={{ color: '#ffffff', fontSize: 'clamp(1.1rem, 2.2vh, 1.25rem)', lineHeight: '1.5', marginBottom: '1.6rem', opacity: '0.95' }}>{t('subtitle')}</p>
              <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: '1.6rem' }}></div>
              <p className="hero-description" style={{ color: '#ffffff', fontSize: 'clamp(1.05rem, 2vh, 1.15rem)', marginBottom: '1.6rem', lineHeight: '1.5', opacity: '0.95' }}>{t('desc')}</p>
              <p style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '1.5rem', color: '#ffffff', textTransform: 'uppercase' }}>{t('resultsInclude')}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#ffffff' }}>
                <li style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'flex-start', gap: '15px' }}><div style={{ width: '8px', height: '8px', backgroundColor: oneDataBrightBlue, marginTop: '0.5rem', flexShrink: 0, borderRadius: '50%' }}></div><span style={{ fontSize: '1.05rem', lineHeight: '1.5', fontWeight: '500' }}>{t('bullet1')}</span></li>
                <li style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'flex-start', gap: '15px' }}><div style={{ width: '8px', height: '8px', backgroundColor: oneDataBrightBlue, marginTop: '0.5rem', flexShrink: 0, borderRadius: '50%' }}></div><span style={{ fontSize: '1.05rem', lineHeight: '1.5', fontWeight: '500' }}>{t('bullet2')}</span></li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}><div style={{ width: '8px', height: '8px', backgroundColor: oneDataBrightBlue, marginTop: '0.5rem', flexShrink: 0, borderRadius: '50%' }}></div><span style={{ fontSize: '1.05rem', lineHeight: '1.5', fontWeight: '500' }}>{t('bullet3')}</span></li>
              </ul>
            </div>

            <div className="main-card-container">
              <h2 style={{ color: oneDataDarkBlue, fontSize: 'clamp(1.6rem, 2.5vh, 2rem)', marginBottom: '0.5rem', fontWeight: '900' }}>{t('formTitle')}</h2>
              <p style={{ color: '#1a202c', fontSize: '0.95rem', marginBottom: '2rem' }}>{t('formSub')}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div className="form-grid">
                  <div><label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '700', fontSize: '0.9rem' }}>{t('fName')}</label><input type="text" name="nombre" value={userInfo.nombre} onChange={handleUserInputChange} placeholder="Ej. Juan Pérez" style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #e2e8f0', outline: 'none' }} /></div>
                  <div><label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '700', fontSize: '0.9rem' }}>{t('fCompany')}</label><input type="text" name="organizacion" value={userInfo.organizacion} onChange={handleUserInputChange} placeholder="Ej. OneData" style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #e2e8f0', outline: 'none' }} /></div>
                </div>
                <div className="form-grid">
                  <div><label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '700', fontSize: '0.9rem' }}>{t('fEmail')}</label><input type="email" name="correo" value={userInfo.correo} onChange={handleUserInputChange} placeholder="juan@empresa.com" style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #e2e8f0', outline: 'none' }} /></div>
                  <div><label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '700', fontSize: '0.9rem' }}>{t('fPhone')}</label><input type="tel" name="telefono" value={userInfo.telefono} onChange={handleUserInputChange} placeholder="Ej. +52 555..." style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #e2e8f0', outline: 'none' }} /></div>
                </div>
                <div className="form-grid">
                  <div><label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '700', fontSize: '0.9rem' }}>{t('fRole')}</label><input type="text" name="rol" value={userInfo.rol} onChange={handleUserInputChange} placeholder="Ej. Director de TI" style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #e2e8f0', outline: 'none' }} /></div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '700', fontSize: '0.9rem' }}>{t('fCountry')}</label>
                    <select name="pais" value={userInfo.pais} onChange={handleUserInputChange} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #e2e8f0', backgroundColor: '#fff', cursor: 'pointer' }}>
                      <option value="">{t('selectCountry')}</option><option value="Alemania">Alemania</option><option value="Argentina">Argentina</option><option value="Brasil">Brasil</option><option value="Canadá">Canadá</option><option value="Chile">Chile</option><option value="Colombia">Colombia</option><option value="España">España</option><option value="USA">Estados Unidos</option><option value="México">México</option><option value="Perú">Perú</option><option value="Reino Unido">Reino Unido</option><option value="Otro">Otro / Other</option>
                    </select>
                  </div>
                </div>
              </div>
              <button onClick={() => setHasStarted(true)} disabled={!isFormValid} style={{ marginTop: '2.5rem', width: '100%', padding: '16px', backgroundColor: isFormValid ? awsOrange : '#cbd5e0', color: '#ffffff', border: 'none', borderRadius: '14px', cursor: isFormValid ? 'pointer' : 'not-allowed', fontSize: '1.1rem', fontWeight: '800', boxShadow: isFormValid ? `0 10px 20px -5px ${awsOrange}66` : 'none' }}>
                {t('btnStart')}
              </button>
            </div>
            
          </div>
        </div>
      </div>
    );
  }

  if (isFinished) {
    const results = calculateResults();
    const riskLabel = results.riskGap > 0.5 ? { text: "Alto Desbalance", color: "#dc2626" } : results.riskGap > 0.3 ? { text: "Riesgo Moderado", color: "#ea580c" } : { text: "Madurez Equilibrada", color: "#16a34a" };
    const dimensionBased = tacticalOfferings[results.lowestDimension] || [];
    const levelBased = levelStrategicBoost[results.levelKey] || [];

    const combinedStrategic = [
      ...dimensionBased,
      ...levelBased.filter(levelItem => !dimensionBased.some(dimItem => dimItem.title === levelItem.title))
    ];

    const targetDashArray = (results.totalPercentage * 113) / 100;
    const circleDashArray = animateCharts ? `${targetDashArray}, 113` : `0, 113`;
    const scoreColor = results.totalPercentage < 40 ? "#ef4444" : results.totalPercentage < 70 ? "#f59e0b" : "#3533cd";

    const radarData = [
      { dimension: t('dimNames.Business'), value: (results.dimensionsScore.Business / 10) * 100 },
      { dimension: t('dimNames.People'), value: (results.dimensionsScore.People / 5) * 100 },
      { dimension: t('dimNames.Governance'), value: (results.dimensionsScore.Governance / 10) * 100 },
      { dimension: t('dimNames.Platform'), value: (results.dimensionsScore.Platform / 10) * 100 },
      { dimension: t('dimNames.Security'), value: (results.dimensionsScore.Security / 10) * 100 },
      { dimension: t('dimNames.Operations'), value: (results.dimensionsScore.Operations / 5) * 100 }
    ];

    return (
      <div className="app-layout-wrapper" style={{ ...lightFuturisticBackgroundStyle }}>
        {floatingControls}

        {/* REEMPLAZO 2: PÁGINA DE RESULTADOS (Theme light para asegurar contraste) */}
        <HeroLogos variant={BRAND_VARIANT} theme="light" />

        <div className="main-content-flex">
          <div className="results-page-wrapper">
            <div className="results-main-card">
              
              {/* ========================================================
                  VISTA EXCLUSIVA WEB (Oculta en PDF)
                  ======================================================== */}
              <div className="no-print print-content-padding" style={{ padding: '3vh 4vw', display: 'flex', flexDirection: 'column' }}>
                <div className="evaluation-header" style={{ marginBottom: '1.6rem' }}>
                  <div className="evaluation-info">
                    <h4 style={{ margin: '0 0 5px 0', color: '#64748b', fontSize: '0.85rem', textTransform: 'uppercase' }}>{t('dashEvalOf')}</h4>
                    <p style={{ margin: '0 0 4px 0', fontSize: '1.4rem', fontWeight: 800, color: oneDataDarkBlue }}>{userInfo.nombre}</p>
                    <p style={{ margin: 0, fontSize: '1rem', color: oneDataBrightBlue, fontWeight: 600 }}>{userInfo.rol} <span style={{color: '#94a3b8', fontWeight: 400}}>| {userInfo.organizacion}</span></p>
                    <p style={{ margin: '4px 0 0 0', color: awsGray, fontSize: '0.85rem' }}>{userInfo.pais} • {userInfo.fecha}</p>
                  </div>
                  <div className="evaluation-score">
                    <div className="score-gauge-container"> 
                      <svg viewBox="0 0 36 36" className="circular-chart">
                        <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="circle" strokeDasharray={circleDashArray} stroke={scoreColor} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <div className="score-text-center">
                        <span style={{ display: 'block', fontSize: '2.2rem', fontWeight: 900, color: oneDataDarkBlue, lineHeight: 1 }}>{results.totalPoints}</span>
                        <span style={{ color: awsGray, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>DE 50</span>
                      </div>
                    </div>
                  </div>
                  <div className="evaluation-focus">
                    <div className="classification-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1.5rem' }}>
                      <h2 style={{ color: scoreColor, fontSize: '1.4rem', fontWeight: '900', margin: '0 0 0.5rem 0' }}>{results.levelData.class}</h2>
                      <p style={{ fontSize: '0.9rem', color: '#2d3748', lineHeight: '1.5', margin: 0 }}><strong>{t('dashFocus')}:</strong> {results.levelData.action}</p>
                    </div>
                  </div>
                </div>

                <div className="radar-container">
                  <h3 style={{ fontSize: '1.2rem', color: oneDataDarkBlue, fontWeight: '800', marginBottom: '1rem', textAlign: 'center' }}>Mapa de Madurez en IA Generativa</h3>
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
                    <RadarChart width={500} height={320} cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="dimension" tick={{fill: '#475569', fontSize: 12, fontWeight: 600}} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{fill: '#94a3b8', fontSize: 10}} />
                      <Radar name="Madurez" dataKey="value" stroke={scoreColor} fill={scoreColor} fillOpacity={0.4} />
                    </RadarChart>
                  </div>
                </div>

                <div className="results-main" style={{ marginBottom: '1.6rem' }}>
                  <h3 style={{ fontSize: '1.2rem', color: oneDataDarkBlue, fontWeight: '800', margin: '0 0 1.2rem 0', textAlign: 'left' }}>{t('dashBreakdown')}</h3>
                  <div className="dimensions-grid">
                    {Object.entries(results.dimensionsScore).map(([dimension, score]) => {
                      const maxScore = (dimension === 'People' || dimension === 'Operations') ? 5 : 10;
                      const percentage = (score / maxScore) * 100;
                      const icon = dimension === 'Business' ? '💼' : dimension === 'People' ? '👥' : dimension === 'Governance' ? '⚖️' : dimension === 'Platform' ? '🛠️' : dimension === 'Security' ? '🔒' : '⚙️';
                      
                      const isStrongest = dimension === results.strongestDimension;
                      const isLowest = dimension === results.lowestDimension;

                      const dynamicBorder = isStrongest ? `2px solid ${oneDataBrightBlue}` : isLowest ? `2px solid ${awsOrange}` : '1px solid #e2e8f0';
                      const dynamicShadow = isStrongest ? `0 0 0 3px ${oneDataBrightBlue}20` : isLowest ? `0 0 0 3px ${awsOrange}20` : 'none';

                      return (
                        <div key={dimension} className="dimension-card" style={{ border: dynamicBorder, boxShadow: dynamicShadow }}>
                          <div className="dimension-header">
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: 700 }}>
                              <span style={{ fontSize: '1.2rem' }}>{icon}</span> {t(`dimNames.${dimension}`)}
                            </span>
                            <span style={{ color: oneDataBrightBlue, fontWeight: 900 }}>{score} <span style={{color: '#cbd5e1', fontWeight: 400}}>/ {maxScore}</span></span>
                          </div>
                          <div className="dimension-body">
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.8rem', color: awsGray, fontWeight: 700 }}>
                              <span>{t('dashProgress')}</span>
                              <span>{percentage.toFixed(0)}%</span>
                            </div>
                            <div style={{ height: '8px', backgroundColor: '#edf2f7', borderRadius: '4px', overflow: 'hidden' }}>
                              <div className="progress-bar-modern" style={{ width: animateCharts ? `${percentage}%` : '0%' }}></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ margin: '1.8rem 0', padding: '1.2rem 1.5rem', background: '#f8fafc', borderLeft: `4px solid ${riskLabel.color}`, borderRadius: '6px' }}>
                  <p style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#0f172a' }}>Nivel de equilibrio organizacional</p>
                  <p style={{ marginTop: '0.4rem', color: riskLabel.color, fontWeight: 700, margin: '0.4rem 0 0 0' }}>{riskLabel.text}</p>
                  <p style={{ marginTop: '0.6rem', color: '#334155', lineHeight: '1.6', margin: '0.6rem 0 0 0' }}>La diferencia entre las dimensiones evaluadas indica que existen áreas con niveles de madurez desiguales. Atender estas brechas permitirá una adopción más estable y estratégica de iniciativas de IA.</p>
                </div>

                <div style={{ background: '#f8fafc', borderLeft: '4px solid #3533cd', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.6rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1rem', color: '#0f172a' }}>Resumen Ejecutivo</h3>
                  <p style={{ marginBottom: '1rem', color: '#334155', lineHeight: '1.5' }}>La organización muestra un nivel sólido en <strong style={{ color: oneDataBrightBlue }}>{" "}{t(`dimNames.${results.strongestDimension}`)}</strong>, lo que refleja una base operativa bien establecida.</p>
                  <p style={{ marginBottom: '1rem', color: '#334155', lineHeight: '1.5' }}>La principal oportunidad de mejora se encuentra en <strong style={{ color: awsOrange }}>{" "}{t(`dimNames.${results.lowestDimension}`)}</strong>. Esta dimensión puede influir directamente en la capacidad de adoptar IA de manera efectiva.</p>
                  <p style={{ margin: 0, color: '#334155', lineHeight: '1.5' }}>Antes de ampliar las iniciativas de inteligencia artificial, se recomienda fortalecer esta área para reducir riesgos y asegurar una implementación sostenible.</p>
                </div>

                <div className="action-plan-section">
                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                      <span style={{ fontSize: '1.6rem' }}>📑</span>
                      <h3 style={{ fontSize: '1.4rem', color: oneDataDarkBlue, fontWeight: '900', margin: 0 }}>{t('planTitle')}</h3>
                   </div>

                   <div style={{ marginTop: '1.6rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.6rem' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1rem', color: '#0f172a' }}>Activación Estratégica Recomendada</h3>
                      <p style={{ marginBottom: '1rem', color: '#334155', lineHeight: '1.5' }}>Con base en los resultados obtenidos, se sugiere priorizar acciones en <strong style={{ color: oneDataBrightBlue }}>{" "}{t(`dimNames.${results.lowestDimension}`)}</strong>.</p>
                      <p style={{ marginBottom: '1.6rem', color: '#334155', lineHeight: '1.5' }}>Fortalecer esta dimensión permitirá consolidar la base necesaria para ampliar el uso de inteligencia artificial de manera estructurada y sostenible.</p>
                      <div className="recommendations-grid">
                        {combinedStrategic.map((offering, index) => (
                          <div key={index} className="recommendation-item">
                            <a href={offering.link} target="_blank" rel="noopener noreferrer" style={{ fontWeight: '700', color: '#1e3a8a', textDecoration: 'none', fontSize: '1rem' }}>{offering.title}</a>
                            <p style={{ marginTop: '0.4rem', margin: '0.4rem 0 0 0', color: '#475569', lineHeight: '1.5' }}>{offering.description}</p>
                          </div>
                        ))}
                      </div>
                   </div>

                   <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                     <div style={{ background: '#f8fafc', borderLeft: `4px solid ${oneDataBrightBlue}`, padding: '1.5rem', borderRadius: '0 8px 8px 0', borderTop: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
                        <h4 style={{ color: oneDataBrightBlue, marginTop: 0, marginBottom: '0.6rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '800' }}>DIAGNÓSTICO ACTUAL</h4>
                        <p style={{ margin: 0, color: '#2d3748', fontSize: '1.05rem', lineHeight: '1.5', textAlign: 'left' }}>{results.levelData.desc}</p>
                     </div>
                     <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                        <h4 style={{ color: oneDataDarkBlue, marginTop: 0, marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '800', textAlign: 'left' }}>{t('planRec')}</h4>
                        <ul style={{ margin: 0, paddingLeft: '0', listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                          {[1, 2, 3].map(num => {
                            const recLink = results.levelData[`rec${num}Link`];
                            const recTitle = results.levelData[`rec${num}Title`];
                            const recDesc = results.levelData[`rec${num}Desc`];
                            if (!recTitle) return null;
                            return (
                              <li key={num} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                 <div style={{ color: '#ffffff', backgroundColor: awsOrange, borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold', flexShrink: 0, marginTop: '2px' }}>✓</div>
                                 <div style={{ color: '#4a5568', fontSize: '1rem', lineHeight: '1.5' }}>
                                   {recLink ? ( <a href={recLink} target="_blank" rel="noopener noreferrer" className="print-link">{recTitle}</a> ) : ( <strong style={{ color: oneDataBrightBlue }}>{recTitle}</strong> )}
                                   {' '}{recDesc}
                                 </div>
                              </li>
                            );
                          })}
                        </ul>
                     </div>

                     <div style={{ marginTop: '1.6rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.2rem', color: '#0f172a' }}>Del diagnóstico a la implementación</h3>
                        <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>Próximos pasos recomendados</p>
                        <p style={{ marginBottom: '1rem', color: '#334155', lineHeight: '1.5' }}>Este diagnóstico ofrece una visión inicial del nivel de preparación de la organización para adoptar iniciativas de inteligencia artificial.</p>
                        <p style={{ marginBottom: '1rem', color: '#334155', lineHeight: '1.5' }}>El siguiente paso consiste en transformar estos hallazgos en una hoja de ruta clara que permita avanzar de forma estructurada hacia la implementación de soluciones basadas en IA.</p>
                        <p style={{ marginBottom: '1.5rem', color: '#334155', lineHeight: '1.5' }}>Nuestro equipo acompaña a organizaciones en la definición, diseño e implementación de estas iniciativas dentro de entornos cloud empresariales.</p>
                        <a href="mailto:contact@onedatasoftware.com" style={{ display: 'inline-block', padding: '10px 26px', backgroundColor: '#3533cd', color: '#ffffff', textDecoration: 'none', borderRadius: '6px', fontWeight: '600' }}>Contactar al equipo</a>
                     </div>
                   </div>
                </div>

                <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', paddingBottom: '2rem' }}>
                    <button onClick={handleResetApp} style={{ padding: '12px 30px', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', transition: '0.2s' }}>{t('btnNewEval')}</button>
                    <button onClick={() => window.print()} style={{ padding: '12px 35px', backgroundColor: oneDataBrightBlue, color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 15px rgba(53, 51, 205, 0.3)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                      {t('dashDownload')}
                    </button>
                </div>
              </div>
            
              {/* ========================================================
                  VISTA EXCLUSIVA PDF (Oculta en Web)
                  ======================================================== */}
              <div className="print-only-block" style={{ padding: '0 20px' }}>
                
                <div className="print-brand-strip print-only-block"></div>

                <div className="print-logos-header print-only-flex">
                  <img src={clusterColor} alt="Cluster" className="print-cluster-logo" />
                  <img src={logoColor} alt="OneData" className="print-onedata-logo" />
                  <img src={awsColor} alt="AWS" className="print-aws-logo" />
                </div>

                <div className="print-document-header print-avoid-break" style={{ marginBottom: '1.6rem' }}>
                  <div className="print-title-container">
                    <h1 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.3rem', marginTop: 0 }}>
                      Diagnóstico de Madurez en IA Generativa
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
                      Evaluación de Preparación para IA
                    </p>
                  </div>
                  <div style={{ marginTop: '1.5rem', marginBottom: '1.6rem' }}>
                    <p style={{ fontWeight: '600', color: '#0f172a', margin: '0 0 0.2rem 0', fontSize: '1.1rem' }}>{userInfo.nombre}</p>
                    <p style={{ color: '#64748b', margin: 0, fontSize: '0.95rem' }}>{userInfo.organizacion}</p>
                    <p style={{ marginTop: '0.4rem', fontSize: '0.85rem', color: '#94a3b8', margin: '0.4rem 0 0 0' }}>{userInfo.fecha}</p>
                  </div>
                </div>

                <div className="radar-container print-avoid-break">
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase', color: '#0f172a', marginBottom: '0.5rem', textAlign: 'center' }}>Mapa de Madurez</h3>
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <RadarChart width={500} height={300} cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="dimension" tick={{fill: '#475569', fontSize: 10, fontWeight: 600}} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{fill: '#94a3b8', fontSize: 8}} />
                      <Radar name="Madurez" dataKey="value" stroke={scoreColor} fill={scoreColor} fillOpacity={0.4} isAnimationActive={false} />
                    </RadarChart>
                  </div>
                </div>

                <div className="print-dimension-table print-avoid-break" style={{ marginBottom: '1.6rem' }}>
                  <div className="print-section-divider"></div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase', color: '#0f172a', marginBottom: '0.8rem' }}>Desglose de Dimensiones</h3>
                  <div className="print-title-accent"></div>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e2e8f0', marginTop: '1.2rem' }}>
                    <thead style={{ background: '#f8fafc', borderBottom: '2px solid #cbd5e1' }}>
                      <tr>
                        <th style={{ textAlign: 'left', padding: '10px 6px', color: '#475569', fontSize: '0.9rem', textTransform: 'uppercase' }}>Dimensión</th>
                        <th style={{ textAlign: 'center', padding: '10px 6px', color: '#475569', fontSize: '0.9rem', textTransform: 'uppercase' }}>Puntuación</th>
                        <th style={{ textAlign: 'right', padding: '10px 6px', color: '#475569', fontSize: '0.9rem', textTransform: 'uppercase' }}>Progreso</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(results.dimensionsScore).map(([dimension, score]) => {
                        const maxScore = dimension === 'People' || dimension === 'Operations' ? 5 : 10;
                        const percentage = ((score / maxScore) * 100).toFixed(0);
                        const isStrongest = dimension === results.strongestDimension;
                        const isLowest = dimension === results.lowestDimension;
                        return (
                          <tr key={dimension} style={{ borderBottom: '1px solid #e2e8f0' }}>
                            <td style={{ padding: '10px 6px', fontSize: '0.95rem', fontWeight: isStrongest || isLowest ? 'bold' : 'normal', color: isLowest ? awsOrange : isStrongest ? oneDataBrightBlue : '#1e293b' }}>
                              {t(`dimNames.${dimension}`)}
                              {isStrongest && <span style={{fontSize:'0.75rem', marginLeft:'8px', padding:'2px 6px', background:'#e0e7ff', borderRadius:'4px'}}>Fortaleza</span>}
                              {isLowest && <span style={{fontSize:'0.75rem', marginLeft:'8px', padding:'2px 6px', background:'#ffedd5', borderRadius:'4px'}}>Prioridad</span>}
                            </td>
                            <td style={{ padding: '10px 6px', textAlign: 'center', fontWeight: 'bold', color: '#334155' }}>{score} / {maxScore}</td>
                            <td style={{ padding: '10px 6px', textAlign: 'right', fontWeight: 'bold', color: '#334155' }}>{percentage}%</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="print-avoid-break">
                  <div className="print-section-divider"></div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase', color: '#0f172a', marginBottom: '0.8rem' }}>Resumen Ejecutivo</h3>
                  <div className="print-title-accent"></div>
                  <p style={{ marginBottom: '1rem', color: '#334155', lineHeight: '1.5' }}>La organización muestra un nivel sólido en <strong style={{ color: oneDataBrightBlue }}>{" "}{t(`dimNames.${results.strongestDimension}`)}</strong>, lo que refleja una base operativa bien establecida.</p>
                  <p style={{ marginBottom: '1rem', color: '#334155', lineHeight: '1.5' }}>La principal oportunidad de mejora se encuentra en <strong style={{ color: awsOrange }}>{" "}{t(`dimNames.${results.lowestDimension}`)}</strong>. Esta dimensión puede influir directamente en la capacidad de adoptar IA de manera efectiva.</p>
                  <p style={{ margin: 0, color: '#334155', lineHeight: '1.5' }}>Antes de ampliar las iniciativas de inteligencia artificial, se recomienda fortalecer esta área para reducir riesgos y asegurar una implementación sostenible.</p>
                </div>

                <div className="print-avoid-break" style={{ margin: '1.6rem 0', padding: '1.2rem 1.5rem', background: '#f8fafc', borderLeft: `4px solid ${riskLabel.color}`, borderRadius: '6px' }}>
                  <p style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#0f172a' }}>Nivel de equilibrio organizacional</p>
                  <p style={{ marginTop: '0.4rem', color: riskLabel.color, fontWeight: 700, margin: '0.4rem 0 0 0' }}>{riskLabel.text}</p>
                  <p style={{ marginTop: '0.6rem', color: '#334155', lineHeight: '1.5', margin: '0.6rem 0 0 0' }}>La diferencia entre las dimensiones evaluadas indica que existen áreas con niveles de madurez desiguales. Atender estas brechas permitirá una adopción más estable y estratégica de iniciativas de IA.</p>
                </div>

                <div className="print-avoid-break">
                   <div className="print-section-divider"></div>
                   <h3 style={{ fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase', color: '#0f172a', marginBottom: '0.8rem' }}>Diagnóstico de Madurez</h3>
                   <div className="print-title-accent"></div>
                   
                   <h4 style={{ color: '#0f172a', marginTop: 0, marginBottom: '0.6rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '800' }}>DIAGNÓSTICO ACTUAL</h4>
                   <p style={{ margin: '0 0 1.5rem 0', color: '#334155', fontSize: '1rem', lineHeight: '1.5', textAlign: 'left' }}>{results.levelData.desc}</p>

                   <h4 style={{ color: '#0f172a', marginTop: 0, marginBottom: '0.8rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '800' }}>Recomendaciones OneData + AWS</h4>
                   <ul style={{ margin: 0, paddingLeft: '0', listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                     {[1, 2, 3].map(num => {
                       const recLink = results.levelData[`rec${num}Link`];
                       const recTitle = results.levelData[`rec${num}Title`];
                       const recDesc = results.levelData[`rec${num}Desc`];
                       if (!recTitle) return null;
                       return (
                         <li key={num} className="print-avoid-break" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                            <div style={{ color: '#ffffff', backgroundColor: awsOrange, borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold', flexShrink: 0, marginTop: '3px' }}>✓</div>
                            <div style={{ color: '#334155', fontSize: '1rem', lineHeight: '1.5' }}>
                              {recLink ? ( <a href={recLink} target="_blank" rel="noopener noreferrer" className="print-link">{recTitle}</a> ) : ( <strong style={{ color: oneDataBrightBlue }}>{recTitle}</strong> )}
                              {' '}{recDesc}
                            </div>
                         </li>
                       );
                     })}
                   </ul>
                </div>

                <div className="print-avoid-break">
                  <div className="print-section-divider"></div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase', color: '#0f172a', marginBottom: '0.8rem' }}>Activación Estratégica Recomendada</h3>
                  <div className="print-title-accent"></div>
                  <p style={{ marginBottom: '1rem', color: '#334155', lineHeight: '1.5' }}>Con base en los resultados obtenidos, se sugiere priorizar acciones en <strong style={{ color: oneDataBrightBlue }}>{" "}{t(`dimNames.${results.lowestDimension}`)}</strong>.</p>
                  <p style={{ marginBottom: '1.6rem', color: '#334155', lineHeight: '1.5' }}>Fortalecer esta dimensión permitirá consolidar la base necesaria para ampliar el uso de inteligencia artificial de manera estructurada y sostenible.</p>
                  
                  <div className="recommendations-grid">
                    {combinedStrategic.map((offering, index) => (
                      <div key={index} className="recommendation-item print-avoid-break">
                        <a href={offering.link} target="_blank" rel="noopener noreferrer" className="print-link" style={{ fontWeight: '700', color: '#1e3a8a', textDecoration: 'none', fontSize: '1rem' }}>{offering.title}</a>
                        <p style={{ marginTop: '0.4rem', marginBottom: 0, color: '#475569', lineHeight: '1.5' }}>{offering.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="print-only-block print-avoid-break">
                  <div className="print-section-divider"></div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase', color: '#0f172a', marginBottom: '0.8rem' }}>Beneficios Estratégicos Incluidos</h3>
                  <div className="print-title-accent"></div>
                  <p style={{ fontSize: '0.95rem', color: '#475569', marginBottom: '1.6rem', marginTop: 0 }}>Como parte de esta evaluación estratégica, su organización puede acceder a los siguientes beneficios exclusivos:</p>
                  
                  <div className="benefits-list">
                    <div className="benefit-item print-avoid-break">
                      <strong>Prueba de Concepto (POC) en AWS</strong>
                      <p>Migración o implementación de IA en la nube con horas de acompañamiento estratégico por parte de nuestro equipo certificado.</p>
                    </div>
                    <div className="benefit-item print-avoid-break">
                      <strong>Créditos y Programas de Financiamiento AWS</strong>
                      <p>Nominación para acceder hasta $2,000 USD en créditos y programas de apoyo de AWS. *Aplican restricciones.*</p>
                    </div>
                    <div className="benefit-item print-avoid-break">
                      <strong>Capacitación Masiva en IA sobre AWS</strong>
                      <p>Formación estructurada para garantizar adopción, entendimiento y ejecución sólida de la IA dentro de su organización.</p>
                    </div>
                  </div>
                </div>
                
                <div className="print-avoid-break print-cta-block" style={{ marginBottom: '1.6rem' }}>
                  <div className="print-section-divider"></div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase', color: '#0f172a', marginBottom: '0.8rem' }}>Del diagnóstico a la implementación</h3>
                  <div className="print-title-accent"></div>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem', marginTop: '0.2rem' }}>Próximos pasos recomendados</p>
                  <p style={{ marginBottom: '1rem', color: '#334155', lineHeight: '1.5' }}>Este diagnóstico ofrece una visión inicial del nivel de preparación de la organización para adoptar iniciativas de inteligencia artificial.</p>
                  <p style={{ marginBottom: '1rem', color: '#334155', lineHeight: '1.5' }}>El siguiente paso consiste en transformar estos hallazgos en una hoja de ruta clara que permita avanzar de forma estructurada hacia la implementación de soluciones basadas en IA.</p>
                  <p style={{ marginBottom: '1.6rem', color: '#334155', lineHeight: '1.5' }}>Nuestro equipo acompaña a organizaciones en la definición, diseño e implementación de estas iniciativas dentro de entornos cloud empresariales.</p>
                  
                  <p className="pdf-contact print-only-block">
                    Para conocer cómo implementar estas iniciativas en su organización,<br/>
                    contacte a nuestro equipo en:<br/><br/>
                    <strong>contact@onedatasoftware.com</strong>
                  </p>
                </div>

                <div className="pdf-footer print-only-flex print-avoid-break">
                  <div style={{ flex: 1 }}>
                    <strong style={{ color: '#0f172a', fontSize: '12px' }}>Diagnóstico de Madurez en IA Generativa</strong><br/>
                    OneData + AWS
                  </div>
                  <div style={{ flex: 1, textAlign: 'center' }}>
                    <strong style={{ color: '#0f172a', fontSize: '12px' }}>Oficina México</strong><br/>
                    Av Armando Birlaín Shaffler No.2001<br/>
                    Centro Sur, Piso 14, Corporativo 2<br/>
                    Santiago de Querétaro, Qro, México
                  </div>
                  <div style={{ flex: 1, textAlign: 'right' }}>
                    <strong style={{ color: '#0f172a', fontSize: '12px' }}>Contacto Comercial</strong><br/>
                    +52 442 403 7629 | +52 446 144 3375<br/>
                    contact@onedatasoftware.com<br/><br/>
                    © {new Date().getFullYear()} OneData Software Solutions
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* 🔹 FOOTER WEB (NO SE IMPRIME) */}
        <footer className="main-footer no-print">
          <div className="footer-container">
            <div className="footer-column">
              <h4>Presencia Internacional</h4>
              <p>México · USA · Canadá · India · Sri Lanka</p>
            </div>
            <div className="footer-column">
              <h4>Oficina México</h4>
              <p>Av Armando Birlaín Shaffler No.2001</p>
              <p>Centro Sur, Piso 14, Corporativo 2</p>
              <p>Santiago de Querétaro, Qro, México</p>
            </div>
            <div className="footer-column">
              <h4>Contacto Comercial</h4>
              <p>+52 442 403 7629</p>
              <p>+52 446 144 3375</p>
              <p>contact@onedatasoftware.com</p>
            </div>
          </div>
          <div className="footer-bottom">
            © {new Date().getFullYear()} OneData Software Solutions. All Rights Reserved.
          </div>
        </footer>

      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
  const isCurrentQuestionAnswered = answers[currentQuestion.id] !== undefined;

  return (
    <div className="app-layout-wrapper">
      {floatingControls}
      <div className="main-content-flex hero-section" style={{ ...lightFuturisticBackgroundStyle }}>
        
        {/* REEMPLAZO 3: CUESTIONARIO (Theme dark para fondo oscuro) */}
        <HeroLogos variant={BRAND_VARIANT} theme="dark" />

        <div ref={questionRef} className="question-container">
          <div key={`prog-${currentQuestionIndex}`} style={{ flexShrink: 0, width: '100%', maxWidth: '1000px', alignSelf: 'center' }}>
            <div className="question-progress-header">
              <div className="dimension-label">
                DIMENSIÓN: <span>{t(`dimNames.${currentQuestion.dimension}`)}</span>
              </div>
              <div className="progress-center">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progressPercentage}%` }} />
                </div>
              </div>
              <div className="progress-percentage">
                {progressPercentage}%
              </div>
            </div>
            {progressPercentage === 100 && isCurrentQuestionAnswered && (
              <p className="generating">Generando diagnóstico...</p>
            )}
          </div>

          <div style={{ flexShrink: 0, textAlign: 'center' }}>
             <h2 key={`text-${currentQuestionIndex}`} className="question-text" style={{ color: oneDataDarkBlue, fontSize: 'clamp(1.5rem, 2.2vw, 1.9rem)', marginBottom: '1rem', fontWeight: '700', lineHeight: '1.25', maxWidth: '1000px', margin: '0 auto' }}>
               {currentQuestion.text}
             </h2>
             <p style={{ color: '#718096', margin: 0, fontSize: '1rem' }}>{t('selectOption')}</p>
          </div>
          
          <p className="mobile-swipe-hint no-print">Deslice para ver más opciones →</p>
          
          <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', width: '100%', minHeight: '380px' }}>
            <div className="options-container" key={`opts-${currentQuestionIndex}`}>
                {currentQuestion.options.map((opt) => {
                  const isSelected = answers[currentQuestion.id] === opt.points;
                  return (
                    <button key={opt.level} onClick={() => handleSelect(currentQuestion.id, opt.points)} className={`option-card ${isSelected ? 'selected' : ''}`} style={getCardStyleVariables(opt.level, isSelected)}>
                      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <div style={{ fontWeight: 800, marginBottom: '0.8rem', color: oneDataDarkBlue, fontSize: '1.15rem', lineHeight: '1.2' }}>{opt.title}</div>
                        <div className="option-desc" style={{ color: '#2d3748', fontSize: '0.95rem', lineHeight: '1.4' }}>{opt.desc}</div>
                      </div>
                      <span className="option-label">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
          </div>

          <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
              <button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0} style={{ padding: '12px 30px', backgroundColor: currentQuestionIndex === 0 ? '#e2e8f0' : '#ffffff', color: currentQuestionIndex === 0 ? '#a0aec0' : awsGray, border: '1px solid #cbd5e1', borderRadius: '999px', cursor: currentQuestionIndex === 0 ? 'default' : 'pointer', fontSize: '1rem', fontWeight: '600', transition: 'all 0.2s ease' }}>
                  {t('btnBack')}
              </button>
              <button onClick={goToNextQuestion} disabled={!isCurrentQuestionAnswered} style={{ padding: '12px 30px', backgroundColor: !isCurrentQuestionAnswered ? '#e2e8f0' : awsOrange, color: !isCurrentQuestionAnswered ? '#a0aec0' : '#ffffff', border: 'none', borderRadius: '999px', cursor: !isCurrentQuestionAnswered ? 'default' : 'pointer', fontSize: '1rem', fontWeight: '600', transition: 'all 0.2s ease', boxShadow: !isCurrentQuestionAnswered ? 'none' : '0 4px 10px rgba(255,153,0,0.3)' }}>
                  {currentQuestionIndex === questions.length - 1 ? "Ver resultados →" : "Continuar →"}
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}