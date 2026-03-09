//import { brandConfig } from "./config/configAWS";
import { brandConfig } from "./config/configCluster";

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next'; 
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

import logo from './assets/logo.png'; 
import onedataWhite from './assets/onedata-white.png';
import awsWhite from './assets/AWS-white.png';
import clusterLogo from './assets/cluster2.png'; 

import awsColor from './assets/awscolor.png';
import logoColor from './assets/logocolor.png';

import lbCluster from './assets/clusterblanco.png';
import fondo from './assets/fondo.jpg'; 
import './App.css'; 

// 💡 TIP PRO APLICADO: Agrupación de logos para evitar variables rotas
const assets = {
  cluster: clusterLogo,
  onedata: logoColor,
  aws: awsColor
};

const BRAND_VARIANT = brandConfig.showCluster ? "cluster" : "aws";

const HeroLogos = ({ variant = "cluster", theme = "dark" }) => {
  return (<div
    className="hero-logos no-print"
    style={{
      display: "grid",
      gridTemplateColumns: "1fr auto 1fr",
      alignItems: "center",
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px 24px"
    }}
  >

    {variant === "cluster" ? (
      <>
        {/* IZQUIERDA AWS */}
        <div style={{ justifySelf: "start" }}>
          <img
            src={awsWhite}
            alt="AWS"
            style={{
              height: "clamp(34px, 4.5vw, 52px)",
              maxWidth: "90px",
              objectFit: "contain"
            }}
          />
        </div>

        {/* CENTRO CLUSTER */}
        <div style={{ justifySelf: "center" }}>
          <img
            src={lbCluster}
            alt="Cluster"
            style={{ height: "clamp(40px, 5vw, 65px)", width: "auto" }}
          />
        </div>

        {/* DERECHA ONEDATA */}
        <div style={{ justifySelf: "end" }}>
          <img
            src={theme === "light" ? logo : onedataWhite}
            alt="OneData"
            style={{
              height: "clamp(32px, 4vw, 50px)",
              maxWidth: "260px",
              width: "100%",
              objectFit: "contain"
            }}
          />
        </div>
      </>
    ) : (
      <>
        {/* IZQUIERDA ONEDATA */}
        <div style={{ justifySelf: "start" }}>
          <img
            src={theme === "light" ? logo : onedataWhite}
            alt="OneData"
            style={{
              height: "clamp(32px, 4vw, 50px)",
              maxWidth: "260px",
              width: "100%",
              objectFit: "contain"
            }}
          />
        </div>

        {/* CENTRO vacío */}
        <div />

        {/* DERECHA AWS */}
        <div style={{ justifySelf: "end" }}>
          <img
            src={awsWhite}
            alt="AWS"
            style={{
              height: "clamp(34px, 4.5vw, 52px)",
              maxWidth: "90px",
              objectFit: "contain"
            }}
          />
        </div>
      </>
    )}

  </div>);
};

export default function App() {
  const { t, i18n } = useTranslation(); 
  const currentLanguage = i18n.language;
  
  // 🛡️ BLINDAJE 1: Asegurar que questions SIEMPRE sea un Array (evita crasheos de length si t() devuelve un string)
  const rawQuestions = t('questions', { returnObjects: true });
  const questions = Array.isArray(rawQuestions) ? rawQuestions : [];

  const [hasStarted, setHasStarted] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nombre: '', organizacion: '', correo: '', telefono: '', rol: '', pais: '', fecha: new Date().toISOString().split('T')[0]
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [animateCharts, setAnimateCharts] = useState(false); 
  
  const questionRef = useRef(null);

// ===============================
// VALIDACIONES DE FORMULARIO
// ===============================

const isValidEmail = (email) => {
  return email.includes("@") && email.length <= 50;
};

const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9]{1,15}$/;
  return phoneRegex.test(phone);
};

const isValidText = (text, max) => {
  const textRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
  return textRegex.test(text) && text.length <= max;
};



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
      { title: "AWS Machine Learning Solutions", link: "https://offerings.onedatasoftware.com/aws-machine-learning/", description: t('awsMlSolutionsBusinessDesc') },
      { title: "AWS AI Agent Solutions", link: "https://offerings.onedatasoftware.com/aws-ai-agent/", description: t('aiAgentBusinessDesc') }
    ],
    Platform: [
      { title: "AWS Data Migration", link: "https://offerings.onedatasoftware.com/aws-data-migration/", description: t('awsDataMigrationDesc') },
      { title: "CloudOps - OneData", link: "https://offerings.onedatasoftware.com/aws-cloud-ops-governance/", description: t('cloudOpsOneDataDesc') }
    ],
    Security: [
      { title: "AWS Security Solutions", link: "https://offerings.onedatasoftware.com/aws-security/", description: t('awsSecuritySolutionsDesc') },
      { title: "CloudOps - Governance", link: "https://offerings.onedatasoftware.com/aws-cloud-ops-governance/", description: t('cloudOpsSecurityDesc') }
    ],
    Operations: [
      { title: "CloudOps - Automation", link: "https://offerings.onedatasoftware.com/aws-cloud-ops-governance/", description: t('cloudOpsAutomationDesc') },
      { title: "AWS AI Agent Solutions", link: "https://offerings.onedatasoftware.com/aws-ai-agent/", description: t('aiAgentSolutionsDesc') }
    ],
    Governance: [
      { title: "AWS Security & Compliance", link: "https://offerings.onedatasoftware.com/aws-security/", description: t('awsSecurityComplianceDesc') },
      { title: "CloudOps Governance", link: "https://offerings.onedatasoftware.com/aws-cloud-ops-governance/", description: t('cloudOpsGovCostDesc') }
    ],
    People: [
      { title: "AWS AI Agent Enablement", link: "https://offerings.onedatasoftware.com/aws-ai-agent/", description: t('awsAgentEnablementDesc') },
      { title: "AWS Machine Learning Advisory", link: "https://offerings.onedatasoftware.com/aws-machine-learning/", description: t('awsMlAdvisoryDesc') }
    ]
  };

  const levelStrategicBoost = {
    exploring: [
      { title: "AWS Data Migration", link: "https://offerings.onedatasoftware.com/aws-data-migration/", description: t('awsDataMigrationExploreDesc') },
      { title: "AWS Security Solutions", link: "https://offerings.onedatasoftware.com/aws-security/", description: t('awsSecurityExploreDesc') }
    ],
    adopting: [
      { title: "AWS Machine Learning Solutions", link: "https://offerings.onedatasoftware.com/aws-machine-learning/", description: t('awsMlSolutionsDesc') },
      { title: "CloudOps - Governance", link: "https://offerings.onedatasoftware.com/aws-cloud-ops-governance/", description: t('cloudOpsGovernanceDesc') }
    ],
    implementing: [
      { title: "AWS AI Agent Solutions", link: "https://offerings.onedatasoftware.com/aws-ai-agent/", description: t('aiAutomationDesc') },
      { title: "CloudOps - Automation", link: "https://offerings.onedatasoftware.com/aws-cloud-ops-governance/", description: t('cloudOpsOptimizationDesc') }
    ],
    transforming: [
      { title: "AWS AI Agent Solutions", link: "https://offerings.onedatasoftware.com/aws-ai-agent/", description: t('aiAgentTransformDesc') },
      { title: "AWS IoT Solutions", link: "https://offerings.onedatasoftware.com/aws-iot-solutions/", description: t('awsIotTransformDesc') }
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

const handleUserInputChange = (e) => {
  const { name, value } = e.target;

  if (name === "telefono") {
    const onlyNumbers = value.replace(/\D/g, "");
    setUserInfo({ ...userInfo, [name]: onlyNumbers });
    return;
  }

  setUserInfo({ ...userInfo, [name]: value });
};

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

    const riskLabel = riskGap > 0.5 
      ? { text: t('riskHigh'), color: "#dc2626" } 
      : riskGap > 0.3 
      ? { text: t('riskModerate'), color: "#ea580c" } 
      : { text: t('riskBalanced'), color: "#16a34a" };

    let levelKey =
      totalPercentage <= 40 ? "exploring"
      : totalPercentage <= 60 ? "adopting"
      : totalPercentage <= 80 ? "implementing"
      : "transforming";

    // 🛡️ BLINDAJE 2: Asegurar que levelData siempre sea un objeto válido, incluso si t() falla
    const rawLevelData = t(`res.${levelKey}`, { returnObjects: true });
    const safeLevelData = (typeof rawLevelData === 'object' && rawLevelData !== null) ? rawLevelData : {};

    return {
      totalPoints, totalPercentage, dimensionsScore, levelKey, levelData: safeLevelData, lowestDimension, strongestDimension, riskGap, riskLabel
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
const isFormValid =
  isValidText(userInfo.nombre, 18) &&
  isValidText(userInfo.organizacion, 25) &&
  isValidEmail(userInfo.correo) &&
  isValidPhone(userInfo.telefono) &&
  isValidText(userInfo.rol, 15) &&
  (!brandConfig.showCluster || userInfo.clusterMember !== '');
  userInfo.pais.trim() !== '';
      return (
      <div className="app-layout-wrapper" style={{ ...darkFuturisticBackgroundStyle }}>
        {floatingControls}
        
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

  <h2 style={{ color: oneDataDarkBlue, fontSize: 'clamp(1.6rem, 2.5vh, 2rem)', marginBottom: '0.5rem', fontWeight: '900' }}>
    {t('formTitle')}
  </h2>

  <p style={{ color: '#1a202c', fontSize: '0.95rem', marginBottom: '2rem' }}>
    {t('formSub')}
  </p>

  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

    <div className="form-grid">
      <div>
        <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '700', fontSize: '0.9rem' }}>
          {t('fName')}
        </label>

        <input
          type="text"
          name="nombre"
          maxLength={18}
          pattern="[A-Za-zÀ-ÿ\s]+"
          value={userInfo.nombre}
          onChange={handleUserInputChange}
          placeholder={t('phName')}
          style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #e2e8f0', outline: 'none' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '700', fontSize: '0.9rem' }}>
          {t('fCompany')}
        </label>

        <input
          type="text"
          name="organizacion"
          maxLength={25}
          value={userInfo.organizacion}
          onChange={handleUserInputChange}
          placeholder={t('phCompany')}
          style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #e2e8f0', outline: 'none' }}
        />
      </div>
    </div>

    <div className="form-grid">
      <div>
        <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '700', fontSize: '0.9rem' }}>
          {t('fEmail')}
        </label>

        <input
          type="email"
          name="correo"
          maxLength={50}
          value={userInfo.correo}
          onChange={handleUserInputChange}
          placeholder={t('phEmail')}
          style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #e2e8f0', outline: 'none' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '700', fontSize: '0.9rem' }}>
          {t('fPhone')}
        </label>

        <input
          type="tel"
          name="telefono"
          maxLength={15}
          value={userInfo.telefono}
          onChange={handleUserInputChange}
          placeholder={t('phPhone')}
          style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #e2e8f0', outline: 'none' }}
        />
      </div>
    </div>

    <div className="form-grid">
      <div>
        <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '700', fontSize: '0.9rem' }}>
          {t('fRole')}
        </label>

        <input
          type="text"
          name="rol"
          maxLength={15}
          value={userInfo.rol}
          onChange={handleUserInputChange}
          placeholder={t('phRole')}
          style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #e2e8f0', outline: 'none' }}
        />
      </div>

{brandConfig.showCluster && (
  <div>
    <label style={{
      display: 'block',
      marginBottom: '0.4rem',
      fontWeight: '700',
      fontSize: '0.9rem'
    }}>
      ¿Eres miembro del Cluster?
    </label>

    <select
      name="clusterMember"
      value={userInfo.clusterMember}
      onChange={handleUserInputChange}
      style={{
        width: '100%',
        padding: '12px 14px',
        borderRadius: '10px',
        border: '2px solid #e2e8f0',
        backgroundColor: '#fff',
        cursor: 'pointer'
      }}
    >
      <option value="">Selecciona una opción...</option>
      <option value="true">Sí</option>
      <option value="false">No</option>
    </select>
  </div>
)}


      <div>
        <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '700', fontSize: '0.9rem' }}>
          {t('fCountry')}
        </label>

        <select
          name="pais"
          value={userInfo.pais}
          onChange={handleUserInputChange}
          style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #e2e8f0', backgroundColor: '#fff', cursor: 'pointer' }}
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
                      {/* 🛡️ BLINDAJE 3: Optional chaining (?.class) por si la traducción de la clase falla */}
                      <h2 style={{ color: scoreColor, fontSize: '1.4rem', fontWeight: '900', margin: '0 0 0.5rem 0' }}>{results.levelData?.class}</h2>
                      <p style={{ fontSize: '0.9rem', color: '#2d3748', lineHeight: '1.5', margin: 0 }}><strong>{t('dashFocus')}:</strong> {results.levelData?.action}</p>
                    </div>
                  </div>
                </div>

                <div className="radar-container">
                  <h3 style={{ fontSize: '1.2rem', color: oneDataDarkBlue, fontWeight: '800', marginBottom: '1rem', textAlign: 'center' }}>{t("dashboard.mapTitle")}</h3>
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
                    <RadarChart width={420} height={300} cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="dimension" tick={{fill: '#475569', fontSize: 12, fontWeight: 600}} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{fill: '#94a3b8', fontSize: 10}} />
                      <Radar name="Madurez" dataKey="value" stroke={scoreColor} fill={scoreColor} fillOpacity={0.4} />
                    </RadarChart>
                  </div>

                  <div style={{ marginTop: "20px", maxWidth: "420px", marginLeft: "auto", marginRight: "auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: "600", color: "#475569" }}>
                      <span>{t("dashboard.levels.exploring")}</span>
                      <span>{t("dashboard.levels.adopting")}</span>
                      <span>{t("dashboard.levels.implementing")}</span>
                      <span>{t("dashboard.levels.transforming")}</span>
                    </div>
                    <div style={{ position: "relative", height: "8px", background: "#e2e8f0", borderRadius: "4px", marginTop: "8px" }}>
                      <div style={{ position: "absolute", height: "8px", background: "#3533cd", width: `${results.totalPercentage}%`, borderRadius: "4px" }}></div>
                    </div>
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

                <div style={{ margin: '1.8rem 0', padding: '1.2rem 1.5rem', background: '#f8fafc', borderLeft: `4px solid ${results.riskLabel?.color || '#cbd5e1'}`, borderRadius: '6px' }}>
                  <p style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#0f172a' }}>{t("dashboard.orgBalanceTitle")}</p>
                  <p style={{ marginTop: '0.4rem', color: results.riskLabel?.color || '#475569', fontWeight: 700, margin: '0.4rem 0 0 0' }}>{results.riskLabel?.text}</p>
                  <p style={{ marginTop: '0.6rem', color: '#334155', lineHeight: '1.6', margin: '0.6rem 0 0 0' }}>{t("dashboard.orgBalanceDesc")}</p>
                </div>

                <div style={{ background: '#f8fafc', borderLeft: '4px solid #3533cd', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.6rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1rem', color: '#0f172a' }}>{t("dashboard.execSummary")}</h3>
                  <p style={{ marginBottom: '1rem', color: '#334155', lineHeight: '1.5' }}>
                    {t("dashboard.execStrongest", {
                      dimension: t(`dimNames.${results.strongestDimension}`)
                    })}
                  </p>
                  <p style={{ marginBottom: '1rem', color: '#334155', lineHeight: '1.5' }}>
                    {t("dashboard.execWeakest", {
                      dimension: t(`dimNames.${results.lowestDimension}`)
                    })}
                  </p>
                  <p style={{ margin: 0, color: '#334155', lineHeight: '1.5' }}>{t("dashboard.execRecommendation")}</p>
                </div>

                <div className="action-plan-section">
                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                      <span style={{ fontSize: '1.6rem' }}>📑</span>
                      <h3 style={{ fontSize: '1.4rem', color: oneDataDarkBlue, fontWeight: '900', margin: 0 }}>{t('planTitle')}</h3>
                   </div>

                   <div style={{ marginTop: '1.6rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.6rem' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1rem', color: '#0f172a' }}>{t("dashboard.strategicActivationTitle")}</h3>
                      <p style={{ marginBottom: '1rem', color: '#334155', lineHeight: '1.5' }}>
                        {t("dashboard.strategicActivationDesc1", {
                          dimension: t(`dimNames.${results.lowestDimension}`)
                        })}
                      </p>
                      <p style={{ marginBottom: '1.6rem', color: '#334155', lineHeight: '1.5' }}>{t("dashboard.strategicActivationDesc2")}</p>
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
                        <h4 style={{ color: oneDataBrightBlue, marginTop: 0, marginBottom: '0.6rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '800' }}>{t('currentDiagnosis')}</h4>
                        <p style={{ margin: 0, color: '#2d3748', fontSize: '1.05rem', lineHeight: '1.5', textAlign: 'left' }}>{results.levelData?.desc}</p>
                     </div>
                     <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                        <h4 style={{ color: oneDataDarkBlue, marginTop: 0, marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '800', textAlign: 'left' }}>{t('recommendations')}</h4>
                        <ul style={{ margin: 0, paddingLeft: '0', listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                          {[1, 2, 3].map(num => {
                            // 🛡️ BLINDAJE 4: Optional chaining en las propiedades dinámicas
                            const recLink = results.levelData?.[`rec${num}Link`];
                            const recTitle = results.levelData?.[`rec${num}Title`];
                            const recDesc = results.levelData?.[`rec${num}Desc`];
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
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.2rem', color: '#0f172a' }}>{t('implementationTitle')}</h3>
                        <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>{t('nextSteps')}</p>
                        <p style={{ marginBottom: '1rem', color: '#334155', lineHeight: '1.5' }}>{t('implementationDesc1')}</p>
                        <p style={{ marginBottom: '1rem', color: '#334155', lineHeight: '1.5' }}>{t('implementationDesc2')}</p>
                        <p style={{ marginBottom: '1.5rem', color: '#334155', lineHeight: '1.5' }}>{t('implementationDesc3')}</p>
                        <a href="mailto:contact@onedatasoftware.com" style={{ display: 'inline-block', padding: '10px 26px', backgroundColor: '#3533cd', color: '#ffffff', textDecoration: 'none', borderRadius: '6px', fontWeight: '600' }}>{t('btnContactTeam')}</a>
                        
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "30px", marginTop: "45px", flexWrap: "wrap" }}>
                          {brandConfig.showCluster && (
                            <img src={assets.cluster} alt="Cluster" style={{ height: "45px", objectFit: "contain" }} />
                          )}
                          <img src={assets.onedata} alt="OneData" style={{ height: "50px", objectFit: "contain" }} />
                          <img src={assets.aws} alt="AWS" style={{ height: "45px", objectFit: "contain" }} />
                        </div>
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
          
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          width: "100%",
          marginBottom: "20px"
        }}>
          <div style={{ justifySelf: "start" }}>
            {brandConfig.showCluster && (
              <img src={assets.cluster} alt="Cluster" style={{ height: "45px" }} />
            )}
          </div>
          <div style={{ justifySelf: "center" }}>
            <img src={assets.onedata} alt="OneData" style={{ height: "55px" }} />
          </div>
          <div style={{ justifySelf: "end" }}>
            <img src={assets.aws} alt="AWS" style={{ height: "45px" }} />
          </div>
        </div>

        <div style={{
          width: "100%",
          height: "4px",
          background: "#3533cd",
          marginBottom: "18px"
        }}/>

        <div style={{ textAlign:"center" }}>
          <h1 style={{
            fontSize: "1.6rem",
            fontWeight: "900",
            margin:0
          }}>
            {t('reportTitle')}
          </h1>

          <p style={{
            margin:0,
            color:"#64748b"
          }}>
            {t('reportSubtitle')}
          </p>
        </div>
        
          <div style={{
            marginTop:"10px",
            fontSize:"12px",
            color:"#64748b",
            textAlign:"center"
          }}>
            {t('dashEvalOf')} <strong>{userInfo.nombre}</strong> | {userInfo.organizacion}<br/>
            Fecha: {userInfo.fecha}
          </div>

                <div className="radar-container print-avoid-break" style={{ padding:"20px", marginTop:"10px", marginBottom:"25px", border:"1px solid #e2e8f0", borderRadius:"10px" }}>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: "800", letterSpacing: "0.5px", textTransform: "uppercase", marginTop: "10px", marginBottom: "20px", color:"#0f172a", textAlign: "center" }}>
                    {t("dashboard.mapTitle")}
                  </h3>
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <RadarChart width={500} height={300} cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="dimension" tick={{fill: '#475569', fontSize: 10, fontWeight: 600}} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{fill: '#94a3b8', fontSize: 8}} />
                      <Radar name="Madurez" dataKey="value" stroke={scoreColor} fill={scoreColor} fillOpacity={0.4} isAnimationActive={false} />
                    </RadarChart>
                  </div>

                  <div style={{ marginTop: "20px", maxWidth: "420px", marginLeft: "auto", marginRight: "auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: "600", color: "#475569" }}>
                      <span>{t("dashboard.levels.exploring")}</span>
                      <span>{t("dashboard.levels.adopting")}</span>
                      <span>{t("dashboard.levels.implementing")}</span>
                      <span>{t("dashboard.levels.transforming")}</span>
                    </div>
                    <div style={{ position: "relative", height: "8px", background: "#e2e8f0", borderRadius: "4px", marginTop: "8px" }}>
                      <div style={{ position: "absolute", height: "8px", background: "#3533cd", width: `${results.totalPercentage}%`, borderRadius: "4px" }}></div>
                    </div>
                  </div>
                </div>

                <div className="print-dimension-table print-avoid-break" style={{ marginBottom: '1.6rem' }}>
                  <div className="print-section-divider"></div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase', color: '#0f172a', marginBottom: '0.8rem' }}>{t('dimensionBreakdown')}</h3>
                  <div className="print-title-accent"></div>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e2e8f0', marginTop: '1.2rem' }}>
                    <thead style={{ background: '#f8fafc', borderBottom: '2px solid #cbd5e1' }}>
                      <tr>
                        <th style={{ textAlign: 'left', padding: '10px 6px', color: '#475569', fontSize: '0.9rem', textTransform: 'uppercase' }}>{t('dimension')}</th>
                        <th style={{ textAlign: 'center', padding: '10px 6px', color: '#475569', fontSize: '0.9rem', textTransform: 'uppercase' }}>{t('score')}</th>
                        <th style={{ textAlign: 'right', padding: '10px 6px', color: '#475569', fontSize: '0.9rem', textTransform: 'uppercase' }}>{t('progress')}</th>
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
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase', color: '#0f172a', marginBottom: '0.8rem' }}>{t("dashboard.execSummary")}</h3>
                  <div className="print-title-accent"></div>
                  <p style={{ marginBottom: '1rem', color: '#334155', lineHeight: '1.5' }}>
                    {t("dashboard.execStrongest", {
                      dimension: t(`dimNames.${results.strongestDimension}`)
                    })}
                  </p>
                  <p style={{ marginBottom: '1rem', color: '#334155', lineHeight: '1.5' }}>
                    {t("dashboard.execWeakest", {
                      dimension: t(`dimNames.${results.lowestDimension}`)
                    })}
                  </p>
                  <p style={{ margin: 0, color: '#334155', lineHeight: '1.5' }}>{t("dashboard.execRecommendation")}</p>
                </div>

                <div className="print-avoid-break" style={{ margin: '1.6rem 0', padding: '1.2rem 1.5rem', background: '#f8fafc', borderLeft: `4px solid ${results.riskLabel?.color || '#cbd5e1'}`, borderRadius: '6px' }}>
                  <p style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#0f172a' }}>{t("dashboard.orgBalanceTitle")}</p>
                  <p style={{ marginTop: '0.4rem', color: results.riskLabel?.color || '#475569', fontWeight: 700, margin: '0.4rem 0 0 0' }}>{results.riskLabel?.text}</p>
                  <p style={{ marginTop: '0.6rem', color: '#334155', lineHeight: '1.6', margin: '0.6rem 0 0 0' }}>{t("dashboard.orgBalanceDesc")}</p>
                </div>

                <div className="print-avoid-break">
                   <div className="print-section-divider"></div>
                   <h3 style={{ fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase', color: '#0f172a', marginBottom: '0.8rem' }}>{t('maturityDiagnosis')}</h3>
                   <div className="print-title-accent"></div>
                   
                   <h4 style={{ color: '#0f172a', marginTop: 0, marginBottom: '0.6rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '800' }}>{t('currentDiagnosis')}</h4>
                   <p style={{ margin: '0 0 1.5rem 0', color: '#334155', fontSize: '1rem', lineHeight: '1.5', textAlign: 'left' }}>{results.levelData?.desc}</p>

                   <h4 style={{ color: '#0f172a', marginTop: 0, marginBottom: '0.8rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '800' }}>{t('recommendations')}</h4>
                   <ul style={{ margin: 0, paddingLeft: '0', listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                     {[1, 2, 3].map(num => {
                       const recLink = results.levelData?.[`rec${num}Link`];
                       const recTitle = results.levelData?.[`rec${num}Title`];
                       const recDesc = results.levelData?.[`rec${num}Desc`];
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
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase', color: '#0f172a', marginBottom: '0.8rem' }}>{t("dashboard.strategicActivationTitle")}</h3>
                  <div className="print-title-accent"></div>
                  <p style={{ marginBottom: '1rem', color: '#334155', lineHeight: '1.5' }}>
                    {t("dashboard.strategicActivationDesc1", {
                      dimension: t(`dimNames.${results.lowestDimension}`)
                    })}
                  </p>
                  <p style={{ marginBottom: '1.6rem', color: '#334155', lineHeight: '1.5' }}>{t("dashboard.strategicActivationDesc2")}</p>
                  
                  <div className="recommendations-grid">
                    {combinedStrategic.map((offering, index) => (
                      <div key={index} className="recommendation-item print-avoid-break">
                        <a href={offering.link} target="_blank" rel="noopener noreferrer" className="print-link" style={{ fontWeight: '700', color: '#1e3a8a', textDecoration: 'none', fontSize: '1rem' }}>{offering.title}</a>
                        <p style={{ marginTop: '0.4rem', marginBottom: 0, color: '#475569', lineHeight: '1.5' }}>{offering.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {!brandConfig.showCluster && (
                <div className="print-benefits-section print-avoid-break">
                  <div className="print-section-divider"></div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase', color: '#0f172a', marginBottom: '0.8rem' }}>{t('strategicBenefits')}</h3>
                  <div className="print-title-accent"></div>
                  <p style={{ fontSize: '0.95rem', color: '#475569', marginBottom: '1.6rem', marginTop: 0 }}>{t('strategicBenefitsDesc')}</p>
                  
                  <div className="benefits-list">
                    <div className="benefit-item print-avoid-break">
                      <strong>{t('benefit1Title')}</strong>
                      <p>{t('benefit1Desc')}</p>
                    </div>
                    <div className="benefit-item print-avoid-break">
                      <strong>{t('benefit2Title')}</strong>
                      <p>{t('benefit2Desc')}</p>
                    </div>
                    <div className="benefit-item print-avoid-break">
                      <strong>{t('benefit3Title')}</strong>
                      <p>{t('benefit3Desc')}</p>
                    </div>
                  </div>
                </div>
                )}
                
                <div className="print-avoid-break print-cta-block" style={{ marginBottom: '1.6rem' }}>
                  <div className="print-section-divider"></div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase', color: '#0f172a', marginBottom: '0.8rem' }}>{t('implementationTitle')}</h3>
                  <div className="print-title-accent"></div>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem', marginTop: '0.2rem' }}>{t('nextSteps')}</p>
                  <p style={{ marginBottom: '1rem', color: '#334155', lineHeight: '1.5' }}>{t('implementationDesc1')}</p>
                  <p style={{ marginBottom: '1rem', color: '#334155', lineHeight: '1.5' }}>{t('implementationDesc2')}</p>
                  <p style={{ marginBottom: '1.6rem', color: '#334155', lineHeight: '1.5' }}>{t('implementationDesc3')}</p>
                  
                  <p className="pdf-contact print-only-block">
                    {t('contactText')}<br/><br/>
                    <strong>contact@onedatasoftware.com</strong>
                  </p>
                </div>

                <div className="print-only-block print-avoid-break" style={{
                  width: "100%",
                  marginTop: "60px",
                  paddingTop: "24px",
                  borderTop: "2px solid #3533cd",
                  background: "#ffffff",
                  fontSize: "11px",
                  color: "#475569",
                  pageBreakInside: "avoid"
                }}>

                  <div style={{ width: "100%" }}>
                    
                    <div style={{
                      textAlign: "center",
                      fontWeight: "800",
                      fontSize: "13px",
                      color: "#0f172a",
                      marginBottom: "16px",
                      letterSpacing: "1px",
                      textTransform: "uppercase"
                    }}>
                      OneData Software Solutions
                    </div>

                    <div style={{
                      display: "table",
                      width: "100%",
                      marginBottom: "30px",
                      lineHeight: "1.6"
                    }}>
                      <div style={{ display: "table-cell", textAlign: "left", width: "50%", verticalAlign: "top" }}>
                        Av Armando Birlaín Shaffler No.2001<br/>
                        Centro Sur, Piso 14<br/>
                        Santiago de Querétaro, México
                      </div>
                      <div style={{ display: "table-cell", textAlign: "right", width: "50%", verticalAlign: "top" }}>
                        contact@onedatasoftware.com<br/>
                        +52 442 403 7629<br/>
                        © {new Date().getFullYear()} OneData
                      </div>
                    </div>

                    <div style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      width: "100%",
                      paddingTop: "20px",
                      borderTop: "1px solid #cbd5e1"
                    }}>
                      
                      {brandConfig?.showCluster && (
                        <img src={assets.cluster} alt="Cluster" style={{ height: "45px", objectFit: "contain" }}/>
                      )}
                      <img src={assets.onedata} alt="OneData" style={{ height: "55px", objectFit: "contain" }}/>
                      <img src={assets.aws} alt="AWS" style={{ height: "45px", objectFit: "contain" }}/>
                      
                    </div>
                  </div>
                </div> 

              </div> 

            </div> 

          </div> 
        </div> 

      <footer className="main-footer no-print">
  <div className="footer-container">

    <div className="footer-column">
      <h4>🌎 {t("footer.presence")}</h4>
      <p>México · USA · Canadá · India · Sri Lanka</p>
    </div>

    <div className="footer-column">
      <h4>📍 {t("footer.office")}</h4>
      <p>Av Armando Birlaín Shaffler No.2001</p>
      <p>Centro Sur, Piso 14, Corporativo 2</p>
      <p>Santiago de Querétaro, Qro, México</p>
    </div>

    <div className="footer-column">
      <h4>📞 {t("footer.contact")}</h4>
      <p>☎ +52 442 403 7629</p>
      <p>☎ +52 446 144 3375</p>
      <p>✉ contact@onedatasoftware.com</p>
    </div>

  </div>

  <div className="footer-bottom">
    © {new Date().getFullYear()} OneData Software Solutions. {t("footer.rights")}
  </div>
</footer>

      </div>
    );
  }

  // 🛡️ BLINDAJE 5: Proteger lectura de currentQuestion y evitar fallos si el array questions está vacío.
  const currentQuestion = questions?.[currentQuestionIndex] || {};
  const progressPercentage = questions.length
    ? Math.round(((currentQuestionIndex + 1) / questions.length) * 100)
    : 0;

  const isCurrentQuestionAnswered =
    currentQuestion?.id && answers[currentQuestion.id] !== undefined;

  return (
    <div className="app-layout-wrapper">
      {floatingControls}
      <div className="main-content-flex hero-section" style={{ ...lightFuturisticBackgroundStyle }}>
        
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
              <p className="generating">{t("dashboard.generating")}</p>
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
                {/* 🛡️ BLINDAJE 6: Optional chaining en las opciones de respuesta */}
                {currentQuestion?.options?.map((opt) => {
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
                  {currentQuestionIndex === questions.length - 1 ? t('btnResults') : t('btnNext')}
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}