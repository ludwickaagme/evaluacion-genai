import { useState } from 'react';
import { questions } from './data/preguntas';
import logo from './assets/logo.png';
import onedataWhite from './assets/onedata-white.png';
import awsWhite from './assets/AWS-white.png';
import './App.css'; 

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nombre: '',
    organizacion: '',
    correo: '',
    fecha: new Date().toISOString().split('T')[0]
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const oneDataDarkBlue = '#000'; 
  const oneDataBrightBlue = '#3533cd'; 
  const awsOrange = '#ff9900';
  const awsGray = '#808080';

  const oneDataDeepGradient = `linear-gradient(135deg, ${oneDataDarkBlue} 0%, ${oneDataBrightBlue} 100%)`;

  const logoTopLeftStyle = {
    position: 'absolute',
    top: '4vh',
    left: '4vw',
    height: 'clamp(30px, 4.5vh, 50px)', 
    objectFit: 'contain',
    zIndex: 10
  };

  const logoBottomRightStyle = {
    position: 'absolute',
    bottom: '3vh',
    right: '4vw',
    height: 'clamp(25px, 4vh, 40px)', 
    objectFit: 'contain',
    zIndex: 10,
    opacity: 0.95
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

  const translateText = (text) => {
    if (!text) return "";
    return text.replace(/Generative AI/g, 'IA Generativa').replace(/Agentic AI/g, 'Agentes de IA').replace(/GenAI/g, 'IA Generativa');
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
    if (totalPercentage <= 40) { 
      classification = "🔍 EXPLORANDO";
      action = "Requiere partner con capacidad de EDUCACIÓN Y ENABLEMENT para establecer bases.";
    } else if (totalPercentage <= 60) { 
      classification = "🚀 ADOPTANDO";
      action = "Requiere partner con experiencia en IMPLEMENTACIÓN GUIADA de casos de uso.";
    } else if (totalPercentage <= 80) { 
      classification = "⚙️ IMPLEMENTANDO";
      action = "Requiere partner especializado en OPTIMIZACIÓN y escalado de soluciones.";
    } else { 
      classification = "🌟 TRANSFORMANDO";
      action = "Requiere partner estratégico de INNOVACIÓN para liderar el mercado.";
    }

    return { totalPoints, totalPercentage, dimensionsScore, classification, action };
  };

  // ==========================================
  // 1. PORTADA
  // ==========================================
  if (!hasStarted) {
    const isFormValid = userInfo.nombre.trim() !== '' && userInfo.organizacion.trim() !== '' && userInfo.correo.trim() !== '';

    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexWrap: 'wrap', position: 'relative' }}>
        
        {/* PANEL IZQUIERDO (AZUL) */}
        <div style={{ flex: '1 1 500px', background: oneDataDeepGradient, padding: 'clamp(3rem, 6vh, 6rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
          
          <img src={logo} alt="OneData" style={logoTopLeftStyle} />
          <img src={awsWhite} alt="AWS" style={logoBottomRightStyle} />

          <div style={{ marginTop: 'clamp(3rem, 6vh, 5rem)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> 
            <div style={{ maxWidth: '550px' }}>
              <h1 style={{ color: '#ffffff', fontSize: 'clamp(2.5rem, 5vh, 3.5rem)', fontWeight: '900', marginBottom: '1.5rem', lineHeight: '1.2', textAlign: 'left', letterSpacing: '-0.02em' }}>
                ¿Listo para potenciar su competitividad con IA?
              </h1>
              
              <p style={{ color: '#ffffff', fontSize: 'clamp(1.1rem, 2.2vh, 1.25rem)', lineHeight: '1.6', textAlign: 'left', marginBottom: '2.5rem', fontWeight: '400', opacity: '0.95' }}>
                Realice este breve diagnóstico para generar su plan de acción personalizado y definir su siguiente paso estratégico en Inteligencia Artificial Generativa.
              </p>

              <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: '2.5rem' }}></div>

              <p style={{ color: '#ffffff', fontSize: 'clamp(1.05rem, 2vh, 1.15rem)', marginBottom: '2rem', lineHeight: '1.6', textAlign: 'left', opacity: '0.95' }}>
                Está innovando a gran velocidad para transformar su negocio, pero ¿cómo asegurar su competitividad? Descúbralo ahora.
              </p>
              
              <p style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '1.5rem', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left' }}>
                Sus resultados incluirán:
              </p>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left', color: '#ffffff' }}>
                <li style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: oneDataBrightBlue, marginTop: '0.5rem', flexShrink: 0, borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '1.05rem', lineHeight: '1.5', fontWeight: '500', color: '#ffffff' }}>Puntuación detallada de madurez frente al mercado.</span>
                </li>
                <li style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: oneDataBrightBlue, marginTop: '0.5rem', flexShrink: 0, borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '1.05rem', lineHeight: '1.5', fontWeight: '500', color: '#ffffff' }}>Plan de acción personalizado para su transformación.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: oneDataBrightBlue, marginTop: '0.5rem', flexShrink: 0, borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '1.05rem', lineHeight: '1.5', fontWeight: '500', color: '#ffffff' }}>Recomendaciones estratégicas de expertos.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* PANEL DERECHO */}
        <div style={{ flex: '1 1 450px', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ maxWidth: '500px', width: '100%', background: '#ffffff', padding: 'clamp(3rem, 5vh, 4rem)', borderRadius: '24px', boxShadow: '0 25px 50px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: oneDataDarkBlue, fontSize: 'clamp(1.8rem, 3vh, 2.2rem)', marginBottom: '1rem', fontWeight: '900', lineHeight: '1.1' }}>Comience su diagnóstico</h2>
            <p style={{ color: '#1a202c', fontSize: '1.05rem', marginBottom: '2.5rem', lineHeight: '1.6', fontWeight: '500' }}>
              Complete sus datos para iniciar. La evaluación toma aproximadamente 5 minutos.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', color: '#000', fontSize: '1rem' }}>Nombre completo *</label>
                <input type="text" name="nombre" value={userInfo.nombre} onChange={handleUserInputChange} placeholder="Ej. Juan Pérez" style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '1rem', boxSizing: 'border-box', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = oneDataBrightBlue} onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}/>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', color: '#000', fontSize: '1rem' }}>Organización / Empresa *</label>
                <input type="text" name="organizacion" value={userInfo.organizacion} onChange={handleUserInputChange} placeholder="Ej. OneData" style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '1rem', boxSizing: 'border-box', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = oneDataBrightBlue} onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', color: '#000', fontSize: '1rem' }}>Correo electrónico *</label>
                <input type="email" name="correo" value={userInfo.correo} onChange={handleUserInputChange} placeholder="juan@empresa.com" style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '1rem', boxSizing: 'border-box', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = oneDataBrightBlue} onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
              </div>
            </div>

            <button 
              onClick={() => setHasStarted(true)}
              disabled={!isFormValid}
              style={{ 
                marginTop: '3rem', width: '100%', padding: '16px', 
                backgroundColor: isFormValid ? awsOrange : '#cbd5e0', 
                color: '#ffffff', border: 'none', borderRadius: '14px', 
                cursor: isFormValid ? 'pointer' : 'not-allowed',
                fontSize: '1.1rem', fontWeight: '800', transition: 'all 0.2s ease',
                boxShadow: isFormValid ? `0 10px 20px -5px ${awsOrange}66` : 'none',
                letterSpacing: '0.05em'
              }}
            >
              EMPEZAR DIAGNÓSTICO
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. RESULTADOS (ANIMADO Y COMPACTO)
  // ==========================================
  if (isFinished) {
    const results = calculateResults();
    const circleDashArray = `${(results.totalPercentage * 113) / 100}, 113`;
    const scoreColor = results.totalPercentage > 80 ? '#48bb78' : results.totalPercentage > 60 ? oneDataBrightBlue : awsOrange;

    return (
      <div style={{ 
        height: '100vh', width: '100vw', overflow: 'hidden', 
        background: oneDataDeepGradient, 
        display: 'flex', alignItems: 'center', justifyContent: 'center', 
        padding: '3vh 3vw', boxSizing: 'border-box', position: 'relative'
      }}>
        <img src={onedataWhite} alt="OneData" style={logoTopLeftStyle} />
        <img src={awsWhite} alt="AWS" style={logoBottomRightStyle} />

        <div style={{ 
          position: 'relative', zIndex: 1, maxWidth: '1400px', width: '100%', height: '88vh', 
          background: '#ffffff', borderRadius: '24px', 
          boxShadow: '0 30px 70px rgba(0,0,0,0.3)', 
          boxSizing: 'border-box', overflow: 'hidden',
          display: 'flex', flexDirection: 'column'
        }}>
          
          <div style={{ padding: '2.5vh 4vw', borderBottom: '1px solid #eee', flexShrink: 0 }}>
             <h2 style={{ fontSize: '1.8rem', color: oneDataDarkBlue, fontWeight: '900', margin: 0 }}>Dashboard de Madurez IA</h2>
          </div>

          <div className="results-container" style={{ padding: '3vh 4vw', overflowY: 'auto', display: 'flex', gap: '4vw', height: '100%' }}>
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2vh', paddingRight: '2vw', borderRight: '1px solid #eee' }}>
              
              <div style={{ background: '#f8f9fa', padding: '1.2rem', borderRadius: '16px', borderLeft: `4px solid ${oneDataBrightBlue}`, flexShrink: 0 }}>
                <h4 style={{ margin: '0 0 5px 0', color: oneDataDarkBlue, fontSize: '1rem' }}>Evaluación realizada para:</h4>
                <p style={{ margin: '0 0 2px 0', fontSize: '1.1rem', fontWeight: 700, color: oneDataBrightBlue }}>{userInfo.nombre}</p>
                <p style={{ margin: 0, color: awsGray, fontSize: '0.9rem' }}>{userInfo.organizacion} | {userInfo.fecha}</p>
              </div>

              <div style={{ textAlign: 'center', flexShrink: 0 }}>
                <h3 style={{ color: awsGray, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem', margin: '1vh 0' }}>Puntuación Global</h3>
                <div style={{ position: 'relative', width: '130px', height: '130px', margin: '0 auto' }}> 
                  <svg viewBox="0 0 36 36" style={{ display: 'block', maxWidth: '100%', maxHeight: '100%' }}>
                    <path fill="none" stroke="#edf2f7" strokeWidth="2.5" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    {/* SVG PATH CON LA CLASE .circle QUE CONTIENE LA ANIMACIÓN */}
                    <path className="circle" fill="none" strokeWidth="2.5" strokeDasharray={circleDashArray} stroke={scoreColor} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                    <span style={{ display: 'block', fontSize: '2rem', fontWeight: 900, color: oneDataDarkBlue, lineHeight: 1 }}>{results.totalPoints}</span>
                    <span style={{ color: awsGray, fontSize: '0.9rem' }}>de 50</span>
                  </div>
                </div>
              </div>

               <div style={{ background: 'linear-gradient(135deg, #fff 0%, #fefefe 100%)', borderRadius: '16px', padding: '1.2rem', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', border: '1px solid #f0f4f8', flexShrink: 0 }}>
                  <h2 style={{ color: awsOrange, fontSize: '1.3rem', fontWeight: '900', margin: '0 0 0.8rem 0', letterSpacing: '-0.5px' }}>{results.classification}</h2>
                  <p style={{ fontSize: '0.95rem', color: '#2d3748', lineHeight: '1.4', margin: 0 }}>
                    <strong>Siguiente paso estratégico:</strong><br/> {results.action}
                  </p>
               </div>

              <button 
                onClick={() => {
                  setAnswers({}); 
                  setUserInfo({ ...userInfo, fecha: new Date().toISOString().split('T')[0] });
                  setIsFinished(false); 
                  setHasStarted(false);
                  setCurrentQuestionIndex(0);
                }}
                style={{ marginTop: 'auto', width: '100%', padding: '14px', backgroundColor: oneDataDarkBlue, color: '#ffffff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', flexShrink: 0 }}
              >
                Realizar nueva evaluación
              </button>
            </div>

            <div style={{ flex: 1.6, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.2rem', color: oneDataDarkBlue, fontWeight: '800', margin: '0 0 2vh 0', textAlign: 'left' }}>Desglose por Dimensión Estratégica</h3>
              
              {/* LA CUADRÍCULA AHORA USA LA CLASE CSS PARA EMPAQUETARSE ARRIBA */}
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
                          <span>Progreso</span>
                          <span>{percentage.toFixed(0)}%</span>
                        </div>
                        <div style={{ height: '8px', backgroundColor: '#edf2f7', borderRadius: '4px', overflow: 'hidden' }}>
                          {/* ESTA ES LA BARRA CON LA ANIMACIÓN CSS CONECTADA */}
                          <div className="progress-bar-modern" style={{ width: `${percentage}%` }}></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 3. CUESTIONARIO
  // ==========================================
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isCurrentQuestionAnswered = answers[currentQuestion.id] !== undefined;

  return (
    <div style={{ 
      position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden', 
      backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', 
      padding: '2vh 2vw', boxSizing: 'border-box'
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: oneDataDeepGradient, zIndex: 0 }}></div>

      <img src={onedataWhite} alt="OneData" style={logoTopLeftStyle} />
      <img src={awsWhite} alt="AWS" style={logoBottomRightStyle} />

      <div style={{ 
        position: 'relative', zIndex: 1, maxWidth: '1500px', width: '100%', height: '90vh', 
        background: '#ffffff', padding: '3vh 3vw', borderRadius: '24px', 
        boxShadow: '0 30px 60px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box'
      }}>
        
        <div key={currentQuestionIndex} style={{ marginBottom: '2vh', flexShrink: 0, width: '100%', maxWidth: '1100px', alignSelf: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: awsGray, fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <span>Dimensión de negocio: <span style={{color: oneDataBrightBlue}}>{translateText(currentQuestion.title || '')}</span></span>
            <span>Pregunta {currentQuestionIndex + 1} / {questions.length}</span>
          </div>

          <div style={{ width: '100%', height: '8px', backgroundColor: '#edf2f7', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{ width: `${progressPercentage}%`, height: '100%', backgroundColor: awsOrange, borderRadius: '999px', transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
          </div>
        </div>

        <div style={{ flexShrink: 0, textAlign: 'center' }}>
            <h2 key={`text-${currentQuestionIndex}`} className="question-text" style={{ color: oneDataDarkBlue, fontSize: '1.8rem', marginBottom: '1vh', fontWeight: '700', lineHeight: '1.3', maxWidth: '1000px', margin: '0 auto', paddingTop: '3vh' }}>
              {translateText(currentQuestion.text)}
            </h2>
            <p style={{ color: '#718096', marginTop: '1vh', fontSize: '1rem' }}>
              Por favor, seleccione una de las respuestas a continuación:
            </p>
        </div>
        
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', overflow: 'hidden' }}>
          <div className="options-container" key={`opts-${currentQuestionIndex}`}>
              {currentQuestion.options.map((opt) => {
                const rawLabel = opt.label.split('-').pop().trim();
                const cleanLabel = rawLabel.charAt(0).toUpperCase() + rawLabel.slice(1).toLowerCase();
                const isSelected = answers[currentQuestion.id] === opt.points;
                
                const translatedTitle = translateText(opt.title || '');
                let translatedDesc = translateText(opt.desc || '');

                if (translatedTitle && translatedDesc.toLowerCase().startsWith(translatedTitle.toLowerCase())) {
                  let sliced = translatedDesc.substring(translatedTitle.length).trim();
                  sliced = sliced.replace(/^[.,\-:;]\s*/, '');
                  if (sliced.length > 0) {
                    sliced = sliced.charAt(0).toUpperCase() + sliced.slice(1);
                  }
                  translatedDesc = sliced;
                }

                return (
                  <button 
                    key={opt.level}
                    onClick={() => handleSelect(currentQuestion.id, opt.points)}
                    className={`option-card ${isSelected ? 'selected' : ''}`}
                  >
                    <div className="option-body" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <div style={{ textAlign: 'center', flexGrow: 1 }}>
                        <div style={{ fontWeight: 800, marginBottom: '0.8rem', color: oneDataDarkBlue, fontSize: '1.15rem', lineHeight: '1.2' }}>
                          {translatedTitle}
                        </div>
                        <div className="option-desc" style={{ color: '#2d3748', fontSize: '0.95rem', lineHeight: '1.4' }}>
                          {translatedDesc}
                        </div>
                      </div>
                      <span className="option-label" style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                        {cleanLabel}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
        </div>

        <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '3vh' }}>
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
                ← Atrás
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
                {currentQuestionIndex === questions.length - 1 ? 'Ver Resultados' : 'Siguiente →'}
            </button>
        </div>

      </div>
    </div>
  );
}