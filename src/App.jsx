import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; 
import logo from './assets/logo.png'; 
import onedataWhite from './assets/onedata-white.png';
import awsWhite from './assets/AWS-white.png';
import clusterLogo from './assets/cluster.png'; 
import awsColor from './assets/awscolor.png';
import clusterColor from './assets/clustercolor.png';
import logoColor from './assets/logocolor.png';
import fondo from './assets/fondo.jpg'; 
import './App.css'; 

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
    {
      title: "AWS Machine Learning Solutions",
      link: "https://offerings.onedatasoftware.com/aws-machine-learning/",
      description: "Implementación de modelos predictivos y analítica avanzada para convertir datos en decisiones estratégicas."
    },
    {
      title: "AWS AI Agent Solutions",
      link: "https://offerings.onedatasoftware.com/aws-ai-agent/",
      description: "Automatización inteligente de procesos mediante agentes de IA."
    }
  ],

  Platform: [
    {
      title: "AWS Data Migration",
      link: "https://offerings.onedatasoftware.com/aws-data-migration/",
      description: "Migración segura y confiable de datos hacia infraestructura escalable en AWS."
    },
    {
      title: "CloudOps - OneData",
      link: "https://offerings.onedatasoftware.com/aws-cloud-ops-governance/",
      description: "Optimización y gobierno de infraestructura en la nube para soportar iniciativas de IA."
    }
  ],

  Security: [
    {
      title: "AWS Security Solutions",
      link: "https://offerings.onedatasoftware.com/aws-security/",
      description: "Protección integral de datos, identidades y cargas de trabajo en la nube."
    },
    {
      title: "CloudOps - Governance",
      link: "https://offerings.onedatasoftware.com/aws-cloud-ops-governance/",
      description: "Implementación de controles y marcos de seguridad operativa."
    }
  ],

  Operations: [
    {
      title: "CloudOps - Automation",
      link: "https://offerings.onedatasoftware.com/aws-cloud-ops-governance/",
      description: "Automatización y monitoreo continuo para escalar operaciones."
    },
    {
      title: "AWS AI Agent Solutions",
      link: "https://offerings.onedatasoftware.com/aws-ai-agent/",
      description: "Automatización inteligente de flujos operativos."
    }
  ],

  Governance: [
    {
      title: "AWS Security & Compliance",
      link: "https://offerings.onedatasoftware.com/aws-security/",
      description: "Implementación de marcos regulatorios y cumplimiento en entornos de IA."
    },
    {
      title: "CloudOps Governance",
      link: "https://offerings.onedatasoftware.com/aws-cloud-ops-governance/",
      description: "Gestión centralizada de infraestructura y control de costos."
    }
  ],

  People: [
    {
      title: "AWS AI Agent Enablement",
      link: "https://offerings.onedatasoftware.com/aws-ai-agent/",
      description: "Capacitación y adopción de IA para equipos internos."
    },
    {
      title: "AWS Machine Learning Advisory",
      link: "https://offerings.onedatasoftware.com/aws-machine-learning/",
      description: "Acompañamiento estratégico en implementación de analítica avanzada."
    }
  ]
};

  const darkFuturisticBackgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundColor: oneDataDarkBlue, 
  };

  const lightFuturisticBackgroundStyle = {
    backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundColor: oneDataDarkBlue, 
  };

  const topBarContainerStyle = {
    position: 'absolute', top: '40px', left: '4vw', right: '4vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10, pointerEvents: 'none' 
  };

  const handleResetApp = () => {
    if (hasStarted && !isFinished) {
      const confirmMsg = currentLanguage === 'es' ? '¿Seguro que deseas volver al inicio? Perderás tu progreso actual.' : 'Are you sure you want to return home? Your current progress will be lost.';
      if (!window.confirm(confirmMsg)) return;
    }
    setAnswers({}); setUserInfo({ nombre: '', organizacion: '', correo: '', telefono: '', rol: '', pais: '', fecha: new Date().toISOString().split('T')[0] });
    setIsFinished(false); setHasStarted(false); setCurrentQuestionIndex(0); setAnimateCharts(false); 
  };

  const handleSelect = (questionId, points) => { setAnswers({ ...answers, [questionId]: points }); };
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
const levelStrategicBoost = {
  exploring: [
    {
      title: "AWS Data Migration",
      link: "https://offerings.onedatasoftware.com/aws-data-migration/",
      description: "Modernización de infraestructura base para habilitar capacidades de IA."
    },
    {
      title: "AWS Security Solutions",
      link: "https://offerings.onedatasoftware.com/aws-security/",
      description: "Establecimiento de una postura de seguridad sólida desde el inicio."
    }
  ],

  adopting: [
    {
      title: "AWS Machine Learning Solutions",
      link: "https://offerings.onedatasoftware.com/aws-machine-learning/",
      description: "Implementación de primeros modelos predictivos y analítica avanzada."
    },
    {
      title: "CloudOps - Governance",
      link: "https://offerings.onedatasoftware.com/aws-cloud-ops-governance/",
      description: "Estructuración operativa para escalar iniciativas tecnológicas."
    }
  ],

  implementing: [
    {
      title: "AWS AI Agent Solutions",
      link: "https://offerings.onedatasoftware.com/aws-ai-agent/",
      description: "Automatización inteligente de procesos empresariales."
    },
    {
      title: "CloudOps - Automation",
      link: "https://offerings.onedatasoftware.com/aws-cloud-ops-governance/",
      description: "Optimización continua y control de costos en la nube."
    }
  ],

  transforming: [
    {
      title: "AWS AI Agent Solutions",
      link: "https://offerings.onedatasoftware.com/aws-ai-agent/",
      description: "Orquestación de sistemas autónomos impulsados por IA."
    },
    {
      title: "AWS IoT Solutions",
      link: "https://offerings.onedatasoftware.com/aws-iot-solutions/",
      description: "Integración del mundo físico con ecosistemas digitales avanzados."
    }
  ]
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
  (lowest, current) =>
    normalizedDimensions[current] < normalizedDimensions[lowest]
      ? current
      : lowest
);

const strongestDimension = Object.keys(normalizedDimensions).reduce(
  (highest, current) =>
    normalizedDimensions[current] > normalizedDimensions[highest]
      ? current
      : highest
);
const riskGap =
  normalizedDimensions[strongestDimension] -
  normalizedDimensions[lowestDimension];

let levelKey =
  totalPercentage <= 40
    ? "exploring"
    : totalPercentage <= 60
    ? "adopting"
    : totalPercentage <= 80
    ? "implementing"
    : "transforming";

return {
  totalPoints,
  totalPercentage,
  dimensionsScore,
  levelKey,
  levelData: t(`res.${levelKey}`, { returnObjects: true }),
  lowestDimension,
  strongestDimension,
  riskGap
};
  };
  
  const floatingControls = (
    <div className="no-print" style={{ position: 'fixed', bottom: '32px', opacity: 0.95, backdropFilter: 'blur(8px)', right: '32px', zIndex: 9999, display: 'flex', gap: '12px', alignItems: 'center', background: '#ffffff', padding: '8px 12px', borderRadius: '50px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', border: '1px solid #e2e8f0' }}>
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
      <div style={{ minHeight: '100vh', display: 'flex', flexWrap: 'wrap', position: 'relative' }}>
        {floatingControls}
        <div style={{ flex: '1 1 500px', ...darkFuturisticBackgroundStyle, padding: 'clamp(3rem, 6vh, 6rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
          <div style={topBarContainerStyle}>
            <img src={clusterLogo} alt="Cluster" style={{ height: 'clamp(40px, 6vh, 65px)', objectFit: 'contain', transform: 'scale(1.8)', marginLeft: '2vw' }} />
            <img src={onedataWhite} alt="OneData" style={{ height: 'clamp(35px, 5.5vh, 60px)', objectFit: 'contain' }} />
            <img src={awsWhite} alt="AWS" style={{ height: 'clamp(35px, 5.5vh, 60px)', objectFit: 'contain', opacity: 0.95 }} /> 
          </div>
          <div style={{ marginTop: 'clamp(3rem, 6vh, 5rem)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> 
            <div style={{ maxWidth: '550px' }}>
              <h1 style={{ color: '#ffffff', fontSize: 'clamp(2.5rem, 5vh, 3.5rem)', fontWeight: '900', marginBottom: '1.5rem', lineHeight: '1.2' }}>{t('title')}</h1>
              <p style={{ color: '#ffffff', fontSize: 'clamp(1.1rem, 2.2vh, 1.25rem)', lineHeight: '1.6', marginBottom: '2.5rem', opacity: '0.95' }}>{t('subtitle')}</p>
              <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: '2.5rem' }}></div>
              <p style={{ color: '#ffffff', fontSize: 'clamp(1.05rem, 2vh, 1.15rem)', marginBottom: '2rem', lineHeight: '1.6', opacity: '0.95' }}>{t('desc')}</p>
              <p style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '1.5rem', color: '#ffffff', textTransform: 'uppercase' }}>{t('resultsInclude')}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#ffffff' }}>
                <li style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'flex-start', gap: '15px' }}><div style={{ width: '8px', height: '8px', backgroundColor: oneDataBrightBlue, marginTop: '0.5rem', flexShrink: 0, borderRadius: '50%' }}></div><span style={{ fontSize: '1.05rem', lineHeight: '1.5', fontWeight: '500' }}>{t('bullet1')}</span></li>
                <li style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'flex-start', gap: '15px' }}><div style={{ width: '8px', height: '8px', backgroundColor: oneDataBrightBlue, marginTop: '0.5rem', flexShrink: 0, borderRadius: '50%' }}></div><span style={{ fontSize: '1.05rem', lineHeight: '1.5', fontWeight: '500' }}>{t('bullet2')}</span></li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}><div style={{ width: '8px', height: '8px', backgroundColor: oneDataBrightBlue, marginTop: '0.5rem', flexShrink: 0, borderRadius: '50%' }}></div><span style={{ fontSize: '1.05rem', lineHeight: '1.5', fontWeight: '500' }}>{t('bullet3')}</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ flex: '1 1 450px', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ maxWidth: '550px', width: '100%', background: '#ffffff', padding: 'clamp(2.5rem, 4vh, 3.5rem)', borderRadius: '24px', boxShadow: '0 25px 50px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: oneDataDarkBlue, fontSize: 'clamp(1.6rem, 2.5vh, 2rem)', marginBottom: '0.5rem', fontWeight: '900' }}>{t('formTitle')}</h2>
            <p style={{ color: '#1a202c', fontSize: '0.95rem', marginBottom: '2rem' }}>{t('formSub')}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}><label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '700', fontSize: '0.9rem' }}>{t('fName')}</label><input type="text" name="nombre" value={userInfo.nombre} onChange={handleUserInputChange} placeholder="Ej. Juan Pérez" style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #e2e8f0', outline: 'none' }} /></div>
                <div style={{ flex: 1 }}><label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '700', fontSize: '0.9rem' }}>{t('fCompany')}</label><input type="text" name="organizacion" value={userInfo.organizacion} onChange={handleUserInputChange} placeholder="Ej. OneData" style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #e2e8f0', outline: 'none' }} /></div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}><label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '700', fontSize: '0.9rem' }}>{t('fEmail')}</label><input type="email" name="correo" value={userInfo.correo} onChange={handleUserInputChange} placeholder="juan@empresa.com" style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #e2e8f0', outline: 'none' }} /></div>
                <div style={{ flex: 1 }}><label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '700', fontSize: '0.9rem' }}>{t('fPhone')}</label><input type="tel" name="telefono" value={userInfo.telefono} onChange={handleUserInputChange} placeholder="Ej. +52 555..." style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #e2e8f0', outline: 'none' }} /></div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}><label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '700', fontSize: '0.9rem' }}>{t('fRole')}</label><input type="text" name="rol" value={userInfo.rol} onChange={handleUserInputChange} placeholder="Ej. Director de TI" style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #e2e8f0', outline: 'none' }} /></div>
                <div style={{ flex: 1 }}>
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
    );
  }

  if (isFinished) {
    const results = calculateResults();
    const riskLabel =
  results.riskGap > 0.5
    ? { text: "Alto Desbalance", color: "#dc2626" }
    : results.riskGap > 0.3
    ? { text: "Riesgo Moderado", color: "#ea580c" }
    : { text: "Madurez Equilibrada", color: "#16a34a" };
    const dimensionBased = tacticalOfferings[results.lowestDimension] || [];
    const levelBased = levelStrategicBoost[results.levelKey] || [];

    /* Evita duplicados por título */
    const combinedStrategic = [
      ...dimensionBased,
      ...levelBased.filter(
        levelItem =>
          !dimensionBased.some(dimItem => dimItem.title === levelItem.title)
      )
    ];

    const targetDashArray = (results.totalPercentage * 113) / 100;
    const circleDashArray = animateCharts ? `${targetDashArray}, 113` : `0, 113`;
    const scoreColor =
      results.totalPercentage > 80
        ? '#48bb78'
        : results.totalPercentage > 60
        ? oneDataBrightBlue
        : awsOrange;

    return (
      <>
        {/* WRAPPER SOLO PARA EL CARD */}
        <div
          className="results-page-wrapper"
          style={{
            minHeight: '100vh',
            width: '100%',
            ...lightFuturisticBackgroundStyle,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '120px 2vw 60px 2vw',
            boxSizing: 'border-box',
            position: 'relative',
          }}
        >
          {floatingControls}

          <div style={topBarContainerStyle} className="no-print">
            <img src={clusterLogo} alt="Cluster" style={{ height: 'clamp(40px, 6vh, 65px)', objectFit: 'contain', transform: 'scale(1.8)', marginLeft: '2vw' }} />
            <img src={logo} alt="OneData" style={{ height: 'clamp(35px, 5.5vh, 60px)', objectFit: 'contain' }} />
            <img src={awsWhite} alt="AWS" style={{ height: 'clamp(35px, 5.5vh, 60px)', objectFit: 'contain', opacity: 0.95 }} />
          </div>

          <div
            className="results-main-card"
            style={{
              position: 'relative',
              zIndex: 1,
              maxWidth: '1400px',
              width: '100%',
              minHeight: '85vh',
              height: 'auto',
              background: '#ffffff',
              borderRadius: '24px',
              boxShadow: '0 30px 70px rgba(0,0,0,0.5)',
              boxSizing: 'border-box',
              overflow: 'visible',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* LOGOS SOLO PDF */}
            <div className="print-logos-header print-only-flex">
              <img src={clusterColor} alt="Cluster" className="print-cluster-logo" />
              <img src={logoColor} alt="OneData" className="print-onedata-logo" />
              <img src={awsColor} alt="AWS" className="print-aws-logo" />
            </div>

            {/* TITULO */}
            <div className="print-title-container print-only-block" style={{ padding: '2.5vh 4vw', borderBottom: '1px solid #eee', textAlign: 'center' }}>
               <h2 style={{ fontSize: '1.8rem', color: oneDataDarkBlue, fontWeight: '900', margin: 0 }}>{t('dashTitle')}</h2>
            </div>

            <div className="print-content-padding" style={{ padding: '3vh 4vw', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

              {/* ENCABEZADO 1: SOLO PARA WEB (Con el círculo SVG que te gustaba, se oculta en PDF) */}
              <div className="no-print evaluation-header">
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
                  <div className="classification-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1rem' }}>
                    <h2 style={{ color: scoreColor, fontSize: '1.4rem', fontWeight: '900', margin: '0 0 0.5rem 0' }}>{results.levelData.class}</h2>
                    <p style={{ fontSize: '0.9rem', color: '#2d3748', lineHeight: '1.4', margin: 0 }}><strong>{t('dashFocus')}:</strong> {results.levelData.action}</p>
                  </div>
                </div>
              </div>

              {/* ENCABEZADO 2: SOLO PARA PDF (Diseño de Tabla Limpia, se oculta en Web) */}
              <div className="print-only-block print-document-header">
                 <div className="pdf-header-grid">
                   <div className="pdf-user-col">
                      <p className="pdf-label">{t('dashEvalOf')}</p>
                      <h2 className="pdf-name">{userInfo.nombre} <span className="pdf-role">| {userInfo.rol}</span></h2>
                      <p className="pdf-org">{userInfo.organizacion} | {userInfo.pais} | {userInfo.fecha}</p>
                   </div>
                   <div className="pdf-score-banner" style={{ borderLeftColor: scoreColor }}>
                      <div className="pdf-sb-left">
                         <span className="pdf-label">PUNTUACIÓN GLOBAL</span>
                         <div className="pdf-score-wrapper">
                           <span className="pdf-big-score" style={{ color: scoreColor }}>{results.totalPoints}</span>
                           <span className="pdf-small-score"> / 50</span>
                         </div>
                      </div>
                      <div className="pdf-sb-right">
                         <h2 className="pdf-level" style={{ color: scoreColor }}>{results.levelData.class}</h2>
                         <p className="pdf-focus"><strong>{t('dashFocus')}:</strong><br/>{results.levelData.action}</p>
                      </div>
                   </div>
                 </div>
              </div>

              {/* BARRAS DE PROGRESO (Visibles en ambos) */}
              <div className="results-main">
                <h3 style={{ fontSize: '1.2rem', color: oneDataDarkBlue, fontWeight: '800', margin: '0 0 2vh 0', textAlign: 'left' }}>{t('dashBreakdown')}</h3>
                <div className="dimensions-grid">
                  {Object.entries(results.dimensionsScore).map(([dimension, score]) => {
                    const maxScore = (dimension === 'People' || dimension === 'Operations') ? 5 : 10;
                    const percentage = (score / maxScore) * 100;
                    const icon = dimension === 'Business' ? '💼' : dimension === 'People' ? '👥' : dimension === 'Governance' ? '⚖️' : dimension === 'Platform' ? '🛠️' : dimension === 'Security' ? '🔒' : '⚙️';
                    
                    const isStrongest = dimension === results.strongestDimension;
                    const isLowest = dimension === results.lowestDimension;

                    const dynamicBorder = isStrongest
                      ? `2px solid ${oneDataBrightBlue}`
                      : isLowest
                      ? `2px solid ${awsOrange}`
                      : '1px solid #e2e8f0';

                    const dynamicShadow = isStrongest
                      ? `0 0 0 3px ${oneDataBrightBlue}20`
                      : isLowest
                      ? `0 0 0 3px ${awsOrange}20`
                      : 'none';

                    return (
                      <div
                        key={dimension}
                        className="dimension-card print-avoid-break"
                        style={{
                          border: dynamicBorder,
                          boxShadow: dynamicShadow,
                          boxSizing: 'border-box'
                        }}
                      >
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

              <div style={{ margin: '1.5rem 0', padding: '1rem 1.5rem', background: '#f8fafc', borderRadius: '12px', borderLeft: `6px solid ${riskLabel.color}` }}>
                <p style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>
                  Nivel de equilibrio organizacional:
                  <strong style={{ color: riskLabel.color }}>
                    {" "}{riskLabel.text}
                  </strong>
                </p>
              </div>

              {/* RESUMEN EJECUTIVO ESTRATÉGICO */}
              <div style={{ background: '#f1f5f9', borderLeft: '6px solid #3533cd', padding: '2rem', borderRadius: '12px', marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '900', marginBottom: '1rem', color: '#0f172a' }}>
                  🧠 Resumen Ejecutivo del Diagnóstico
                </h3>
                <p style={{ marginBottom: '1rem', color: '#334155', lineHeight: '1.6' }}>
                Se identificó como principal fortaleza la dimensión
                <strong style={{ color: oneDataBrightBlue }}>
                  {" "}{t(`dimNames.${results.strongestDimension}`)}
                </strong>.
                </p>
                <p style={{ marginBottom: '1rem', color: '#334155', lineHeight: '1.6' }}>
                Se detectaron fortalezas relevantes en las dimensiones con mayor puntuación,
                pero la principal área de oportunidad estratégica se encuentra en
               <strong style={{ color: awsOrange }}>
              {" "}{t(`dimNames.${results.lowestDimension}`)}
               </strong>.
              </p>
                <p style={{ color: '#334155', lineHeight: '1.6' }}>
                  Antes de escalar iniciativas de IA a nivel organizacional,
                  es prioritario fortalecer esta dimensión para reducir riesgos,
                  mejorar la eficiencia operativa y maximizar el retorno de inversión.
                </p>
              </div>

              {/* PLAN DE ACCIÓN Y LINKS */}
              <div className="action-plan-section">
                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '1.6rem' }}>📑</span>
                    <h3 style={{ fontSize: '1.4rem', color: oneDataDarkBlue, fontWeight: '900', margin: 0 }}>{t('planTitle')}</h3>
                 </div>
                 <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', padding: '1.8rem', borderRadius: '16px', marginBottom: '2rem' }}>
                    <h3 style={{ color: '#c2410c', fontSize: '1.2rem', fontWeight: '900', marginBottom: '1rem' }}>
                      🔥 Activación Estratégica Recomendada
                    </h3>
                    <p style={{ marginBottom: '1.5rem', color: '#7c2d12' }}>
                      La dimensión prioritaria a fortalecer es:
                      <strong> {t(`dimNames.${results.lowestDimension}`)}</strong>.
                      Recomendamos activar las siguientes soluciones:
                    </p>

                    {combinedStrategic.map((offering, index) => (
                      <div key={index} style={{ marginBottom: '1.2rem' }}>
                        <a
                          href={offering.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontWeight: '800',
                            color: '#ea580c',
                            textDecoration: 'none',
                            fontSize: '1rem'
                          }}
                        >
                          {offering.title}
                        </a>
                        <p style={{ marginTop: '0.4rem', color: '#444' }}>
                          {offering.description}
                        </p>
                      </div>
                    ))}
                  </div>

                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                   <div className="print-avoid-break" style={{ background: 'linear-gradient(to right, rgba(53, 51, 205, 0.04), transparent)', borderLeft: `5px solid ${oneDataBrightBlue}`, padding: '1.5rem', borderRadius: '0 12px 12px 0' }}>
                      <h4 style={{ color: oneDataBrightBlue, marginTop: 0, marginBottom: '0.6rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '800' }}>{t('planCurrent')}</h4>
                      <p style={{ margin: 0, color: '#2d3748', fontSize: '1.05rem', lineHeight: '1.6', textAlign: 'left' }}>{results.levelData.desc}</p>
                   </div>

                   <div className="print-avoid-break" style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                      <h4 style={{ color: oneDataDarkBlue, marginTop: 0, marginBottom: '1.2rem', fontSize: '1.1rem', fontWeight: '800', textAlign: 'left' }}>{t('planRec')}</h4>
                      <ul style={{ margin: 0, paddingLeft: '0', listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                        {[1, 2, 3].map(num => {
                          const recLink = results.levelData[`rec${num}Link`];
                          const recTitle = results.levelData[`rec${num}Title`];
                          const recDesc = results.levelData[`rec${num}Desc`];
                          if (!recTitle) return null;
                          return (
                            <li key={num} className="print-avoid-break" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                               <div style={{ color: '#ffffff', backgroundColor: awsOrange, borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold', flexShrink: 0, marginTop: '2px' }}>✓</div>
                               <div style={{ color: '#4a5568', fontSize: '1rem', lineHeight: '1.5' }}>
                                 {recLink ? (
                                   <a href={recLink} target="_blank" rel="noopener noreferrer" className="print-link">
                                     {recTitle}
                                   </a>
                                 ) : (
                                    <strong style={{ color: oneDataBrightBlue }}>{recTitle}</strong>
                                 )}
                                 {' '}{recDesc}
                               </div>
                            </li>
                          );
                        })}
                      </ul>
                   </div>

                   {/* BENEFICIOS EXCLUSIVOS - SOLO PDF */}
                   <div className="print-only-block print-avoid-break" style={{ marginTop: '2.5rem', padding: '2rem', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', pageBreakInside: 'avoid' }}>
                     <p style={{ textAlign: 'center', fontSize: '0.95rem', color: '#475569', marginBottom: '1rem' }}>
                       Como parte de esta evaluación estratégica, su organización puede acceder a los siguientes beneficios exclusivos:
                     </p>
                     <h3 style={{ fontSize: '1.4rem', fontWeight: '900', marginBottom: '1.2rem', color: '#0f172a', textAlign: 'center' }}>
                       🎁 Beneficios Estratégicos Incluidos
                     </h3>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                       {/* Beneficio 1 */}
                       <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                         <div style={{ backgroundColor: '#3533cd', color: '#ffffff', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                           🚀
                         </div>
                         <div>
                           <h4 style={{ margin: 0, fontWeight: '800', fontSize: '1rem', color: '#1e293b' }}>
                             Prueba de Concepto (POc) en AWS
                           </h4>
                           <p style={{ margin: '0.4rem 0 0 0', color: '#475569', fontSize: '0.95rem' }}>
                             Migración o implementación de IA en la nube con horas de acompañamiento estratégico
                             por parte de nuestro equipo certificado.
                           </p>
                         </div>
                       </div>
                       {/* Beneficio 2 */}
                       <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                         <div style={{ backgroundColor: '#ff9900', color: '#ffffff', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                           💰
                         </div>
                         <div>
                           <h4 style={{ margin: 0, fontWeight: '800', fontSize: '1rem', color: '#1e293b' }}>
                             Créditos y Programas de Financiamiento AWS
                           </h4>
                           <p style={{ margin: '0.4rem 0 0 0', color: '#475569', fontSize: '0.95rem' }}>
                             Nominación para acceder hasta <strong>$2,000 USD</strong> en créditos
                             y programas de apoyo de AWS. *Aplican restricciones.* </p>
                         </div>
                       </div>
                       {/* Beneficio 3 */}
                       <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                         <div style={{ backgroundColor: '#16a34a', color: '#ffffff', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                           🎓
                         </div>
                         <div>
                           <h4 style={{ margin: 0, fontWeight: '800', fontSize: '1rem', color: '#1e293b' }}>
                             Capacitación Masiva en IA sobre AWS
                           </h4>
                           <p style={{ margin: '0.4rem 0 0 0', color: '#475569', fontSize: '0.95rem' }}>
                             Formación estructurada para garantizar adopción,
                             entendimiento y ejecución sólida de la IA dentro de su organización.
                           </p>
                         </div>
                       </div>
                     </div>
                   </div>
                   
                   {/* CTA BLOCK - AHORA TAMBIÉN VISIBLE EN WEB (Quitada la clase print-only-block) */}
                   <div className="print-cta-block" style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: '12px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                      <h3 style={{ color: oneDataBrightBlue, fontSize: '1.3rem', margin: '0 0 0.5rem 0', fontWeight: '900' }}>{t('pdfCtaTitle')}</h3>
                      <p style={{ margin: '0 0 1rem 0', color: '#4a5568', fontSize: '1rem', fontWeight: '500' }}>{t('pdfCta')}</p>
                      <a href="mailto:contact@onedatasoftware.com" className="print-cta-btn" style={{ display: 'inline-block', padding: '10px 24px', backgroundColor: '#ff9900', color: '#ffffff', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' }}>{t('btnContact')}</a>
                   </div>

                   {/* FOOTER SOLO PDF */}
                   <div className="print-only-block pdf-footer">
                     <div className="pdf-footer-content">
                       <p><strong>OneData Software Solutions</strong></p>
                       <p>contact@onedatasoftware.com</p>
                       {/* CONTACTO MÉXICO */}
                       <p style={{ marginTop: '0.8rem', fontWeight: 600 }}>
                         Oficina México:
                       </p>
                       <p>
                         Av Armando Birlaín Shaffler No.2001 Col Centro Sur,
                         Piso 14, Corporativo 2, 76090
                       </p>
                       <p>
                         Santiago de Querétaro, Qro, México
                       </p>
                       <p style={{ marginTop: '0.8rem' }}>
                         © {new Date().getFullYear()} OneData Software Solutions. All Rights Reserved.
                       </p>
                     </div>
                   </div>
                 </div>
              </div>

              <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', paddingBottom: '2rem' }} className="no-print">
                  <button onClick={handleResetApp} style={{ padding: '12px 30px', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', transition: '0.2s' }}>
                    {t('btnNewEval')}
                  </button>
                  <button onClick={() => window.print()} style={{ padding: '12px 35px', backgroundColor: oneDataBrightBlue, color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 15px rgba(53, 51, 205, 0.3)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    {t('dashDownload')}
                  </button>
              </div>
            </div>
          </div>
        </div>

        <footer className="main-footer no-print">
          <div className="footer-container">
            {/* PAÍSES */}
            <div className="footer-column">
              <h4>INDIA</h4>
              <p>OneData Software Solutions,</p>
              <p>65, AA Arcade First Floor,</p>
              <p>Subramaniyam Avenue,</p>
              <p>Vilankuruchi Main Road,</p>
              <p>Coimbatore, TN – 641035, India</p>
            </div>

            <div className="footer-column">
              <h4>Headquarters - USA</h4>
              <p>OneData Software Solutions LLC.,</p>
              <p>534 River Crossing Drive – 102,</p>
              <p>Fort Mill, SC 29715, USA</p>
            </div>

            <div className="footer-column">
              <h4>CANADA</h4>
              <p>OneData Software Solutions INC.</p>
              <p>(1000806039) – 229 Yonge Street,</p>
              <p>Suite 400, Toronto, Ontario,</p>
              <p>M5B 1N9, Canada</p>
            </div>

            <div className="footer-column">
              <h4>SRI LANKA</h4>
              <p>OneData Software Solutions Pvt Ltd.,</p>
              <p>46 A Sri Sumangala Road</p>
              <p>Ratmalana, Sri Lanka</p>
            </div>

            <div className="footer-column">
              <h4>MEXICO</h4>
              <p>OneData Software Solutions,</p>
              <p>Av Armando Birlaín Shaffler</p>
              <p>No.2001 Col Centro Sur,</p>
              <p>Piso 14, Corporativo 2, 76090</p>
              <p>Santiago de Querétaro, Qro, México</p>
            </div>
          </div>

          {/* CONTACTO CENTRADO ABAJO */}
          <div className="footer-contact">
            <div className="footer-contact-block">
              <h4>For Business Enquiries</h4>
              <p>+91 78456 06222</p>
              <p>contact@onedatasoftware.com</p>
            </div>

            <div className="footer-contact-block">
              <h4>For Career Enquiries</h4>
              <p>+91 9600295140</p>
              <p>hire-india@onedatasoftware.com</p>
            </div>
          </div>

          <div className="footer-bottom">
            © {new Date().getFullYear()} OneData Software Solutions. All Rights Reserved.
          </div>
        </footer>
      </>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isCurrentQuestionAnswered = answers[currentQuestion.id] !== undefined;

  return (
    <div className="results-page-wrapper" style={{ minHeight: 'auto', width: '100vw', ...lightFuturisticBackgroundStyle, display: 'flex', paddingBottom: '60px', alignItems: 'flex-start', justifyContent: 'center', padding: '14vh 2vw 5vh 2vw', boxSizing: 'border-box', position: 'relative' }}>
      {floatingControls}
      <div style={topBarContainerStyle}>
        <img src={clusterLogo} alt="Cluster" style={{ height: 'clamp(40px, 6vh, 65px)', objectFit: 'contain', transform: 'scale(1.8)', marginLeft: '2vw' }} />
        <img src={onedataWhite} alt="OneData" style={{ height: 'clamp(35px, 5.5vh, 60px)', objectFit: 'contain' }} />
        <img src={awsWhite} alt="AWS" style={{ height: 'clamp(35px, 5.5vh, 60px)', objectFit: 'contain', opacity: 0.95 }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1300px', width: '100%', minHeight: 'auto', height: 'auto', background: '#ffffff', padding: '3rem 3vw', borderRadius: '24px', boxShadow: '0 30px 70px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', gap: '2rem' }}>
        <div key={currentQuestionIndex} style={{ flexShrink: 0, width: '100%', maxWidth: '1100px', alignSelf: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: awsGray, fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <span>{t('dimLabel')} <span style={{color: oneDataBrightBlue}}>{t(`dimNames.${currentQuestion.dimension}`)}</span></span>
            <span>{t('questionOf', { current: currentQuestionIndex + 1, total: questions.length })}</span>
          </div>
          <div style={{ width: '100%', height: '8px', backgroundColor: '#edf2f7', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{ width: `${progressPercentage}%`, height: '100%', backgroundColor: awsOrange, borderRadius: '999px', transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
          </div>
        </div>

        <div style={{ flexShrink: 0, textAlign: 'center' }}>
           <h2
  key={`text-${currentQuestionIndex}`}
  className="question-text"
  style={{
    color: oneDataDarkBlue,
    fontSize: 'clamp(1.5rem, 2.2vw, 1.9rem)',
    marginBottom: '1rem',
    fontWeight: '700',
    lineHeight: '1.25',
    maxWidth: '1000px',
    margin: '0 auto'
  }}
>
  {currentQuestion.text}
</h2>
            <p style={{ color: '#718096', margin: 0, fontSize: '1rem' }}>{t('selectOption')}</p>
        </div>
        
<div style={{
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'center',
  width: '100%',
  minHeight: '380px'
}}>          <div className="options-container" key={`opts-${currentQuestionIndex}`}>
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
                {currentQuestionIndex === questions.length - 1 ? t('btnResults') : t('btnNext')}
            </button>
        </div>
      </div>

    </div>
  );
}