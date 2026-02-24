import { useState } from 'react';
import { questions } from './data/preguntas';
import logo from './assets/logo.png';
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

  // --- PALETA DE COLORES ---
  const oneDataDarkBlue = '#141f72'; 
  const oneDataBrightBlue = '#2CB9F9'; 
  const awsOrange = '#ff9900';
  const awsGray = '#808080';

  const oneDataDeepGradient = `linear-gradient(135deg, ${oneDataDarkBlue} 0%, ${oneDataBrightBlue} 100%)`;

  const handleSelect = (questionId, points) => {
    setAnswers({ ...answers, [questionId]: points });
  };

  const handleUserInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const translateText = (text) => {
    if (!text) return "";
    return text
      .replace(/Generative AI/g, 'IA Generativa')
      .replace(/Agentic AI/g, 'IA Agéntica')
      .replace(/GenAI/g, 'IA Generativa');
  };

  const calculateResults = () => {
    const totalPoints = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
    const average = totalPoints / 10; 

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

    if (average >= 1.0 && average <= 2.0) {
      classification = "🔍 EXPLORANDO";
      action = "Requiere partner con capacidad de EDUCACIÓN Y ENABLEMENT";
    } else if (average > 2.0 && average <= 3.0) {
      classification = "🚀 ADOPTANDO";
      action = "Requiere partner con experiencia en IMPLEMENTACIÓN GUIADA";
    } else if (average > 3.0 && average <= 4.0) {
      classification = "⚙️ IMPLEMENTANDO";
      action = "Requiere partner especializado en OPTIMIZACIÓN";
    } else {
      classification = "🌟 TRANSFORMANDO";
      action = "Requiere partner estratégico de INNOVACIÓN";
    }

    return { totalPoints, average, dimensionsScore, classification, action };
  };

  // ==========================================
  // PORTADA
  // ==========================================
  if (!hasStarted) {
    const isFormValid = userInfo.nombre.trim() !== '' && userInfo.organizacion.trim() !== '' && userInfo.correo.trim() !== '';

    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 500px', background: oneDataDeepGradient, padding: '5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white' }}>
          <img src={logo} alt="OneData Logo" style={{ width: '380px', marginBottom: '4rem', maxWidth: '100%' }} />
          {/* TAMAÑOS AJUSTADOS AQUÍ */}
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.2', textAlign: 'left' }}>
            ¿Listo para potenciar su competitividad con IA?
          </h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '650px', lineHeight: '1.6', opacity: '0.9', textAlign: 'left' }}>
            Realice este breve diagnóstico para generar su plan de acción personalizado y definir su siguiente paso estratégico en Inteligencia Artificial Generativa.
          </p>
        </div>

        <div style={{ flex: '1 1 400px', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ maxWidth: '500px', width: '100%', background: '#ffffff', padding: '3rem', borderRadius: '24px', boxShadow: '0 25px 50px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: oneDataDarkBlue, fontSize: '1.8rem', marginBottom: '1.5rem', fontWeight: '800' }}>Comience su diagnóstico</h2>
            <p style={{ color: awsGray, fontSize: '1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
              Complete sus datos para iniciar la evaluación. Sus resultados incluirán un análisis por dimensión y recomendaciones personalizadas.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: oneDataDarkBlue, fontSize: '0.95rem' }}>Nombre completo *</label>
                <input type="text" name="nombre" value={userInfo.nombre} onChange={handleUserInputChange} placeholder="Ej. Juan Pérez" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '1rem', boxSizing: 'border-box', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = oneDataBrightBlue} onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}/>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: oneDataDarkBlue, fontSize: '0.95rem' }}>Organización / Empresa *</label>
                <input type="text" name="organizacion" value={userInfo.organizacion} onChange={handleUserInputChange} placeholder="Ej. OneData" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '1rem', boxSizing: 'border-box', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = oneDataBrightBlue} onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: oneDataDarkBlue, fontSize: '0.95rem' }}>Correo electrónico *</label>
                <input type="email" name="correo" value={userInfo.correo} onChange={handleUserInputChange} placeholder="juan@empresa.com" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '1rem', boxSizing: 'border-box', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = oneDataBrightBlue} onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
              </div>
            </div>

            <button 
              onClick={() => setHasStarted(true)}
              disabled={!isFormValid}
              style={{ 
                marginTop: '2.5rem', width: '100%', padding: '16px', 
                backgroundColor: isFormValid ? awsOrange : '#cbd5e0', 
                color: '#ffffff', border: 'none', borderRadius: '12px', 
                cursor: isFormValid ? 'pointer' : 'not-allowed',
                fontSize: '1.1rem', fontWeight: 'bold', transition: 'all 0.2s ease',
                boxShadow: isFormValid ? `0 10px 20px -5px ${awsOrange}66` : 'none'
              }}
            >
              Empezar Diagnóstico
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // RESULTADOS (TAMAÑOS BALANCEADOS)
  // ==========================================
  if (isFinished) {
    const results = calculateResults();
    return (
      <div style={{ 
        height: '100vh', width: '100vw', overflow: 'hidden', 
        backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', 
        padding: '2vh 2vw', boxSizing: 'border-box'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: oneDataDeepGradient, zIndex: 0 }}></div>

        <div style={{ 
          position: 'relative', zIndex: 1, maxWidth: '1200px', width: '100%', height: '90vh', 
          background: '#ffffff', padding: '4vh 3vw', borderRadius: '24px', 
          boxShadow: '0 30px 60px rgba(0,0,0,0.15)', boxSizing: 'border-box' 
        }}>
          
          <div className="results-container">
            
            <div className="results-left">
              <div>
                {/* TÍTULO RESULTADOS NORMALIZADO */}
                <h2 style={{ fontSize: '2.2rem', color: oneDataDarkBlue, fontWeight: '900', margin: '0 0 2vh 0', lineHeight: '1.1', textAlign: 'left' }}>
                  Resultados del Diagnóstico
                </h2>
                
                <div style={{ backgroundColor: '#f4f6f9', padding: '1.5vh 1.5vw', borderRadius: '12px', marginBottom: '3vh', textAlign: 'left' }}>
                  <p style={{ margin: '0 0 0.5vh 0', color: oneDataDarkBlue, fontSize: '0.95rem' }}><strong>Organización:</strong> {userInfo.organizacion}</p>
                  <p style={{ margin: '0 0 0.5vh 0', color: awsGray, fontSize: '0.95rem' }}><strong>Evaluador:</strong> {userInfo.nombre}</p>
                  <p style={{ margin: 0, color: awsGray, fontSize: '0.85rem' }}>Fecha: {userInfo.fecha}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2vh' }}>
                  <h3 style={{ margin: 0, fontSize: '1.4rem', color: oneDataDarkBlue, fontWeight: '700' }}>Puntuación:</h3>
                  {/* NÚMERO DE PUNTUACIÓN REDUCIDO PARA NO GRITAR */}
                  <span style={{ fontSize: '2.8rem', fontWeight: '900', color: awsOrange, lineHeight: '1' }}>{results.totalPoints} <span style={{fontSize: '1.4rem', color: awsGray}}>/ 50</span></span>
                </div>
                
                <div style={{ textAlign: 'center', marginTop: '3vh', padding: '2vh', border: '1px dashed #cbd5e1', borderRadius: '16px' }}>
                    {/* RESULTADO (EJ. IMPLEMENTANDO) NORMALIZADO */}
                    <h2 style={{ color: awsOrange, fontSize: '1.8rem', textTransform: 'uppercase', fontWeight: '900', letterSpacing: '-0.5px', margin: '0 0 1vh 0' }}>{results.classification}</h2>
                    <p style={{ fontSize: '1rem', color: oneDataDarkBlue, lineHeight: '1.4', margin: 0 }}><strong>Recomendación:</strong> {results.action}</p>
                </div>
              </div>

              <button 
                onClick={() => {
                  setAnswers({}); 
                  setUserInfo({ ...userInfo, fecha: new Date().toISOString().split('T')[0] });
                  setIsFinished(false); 
                  setHasStarted(false);
                  setCurrentQuestionIndex(0);
                }}
                style={{ width: '100%', padding: '1.5vh', backgroundColor: oneDataDarkBlue, color: '#ffffff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold', transition: 'all 0.2s', boxShadow: `0 8px 20px -8px ${oneDataDarkBlue}`, marginTop: '2vh' }}
              >
                Realizar otro diagnóstico
              </button>
            </div>

            <div className="results-right">
              {/* TÍTULO DIMENSIONES NORMALIZADO */}
              <h3 style={{ fontSize: '1.4rem', color: oneDataDarkBlue, fontWeight: '800', margin: '0 0 2vh 0', textAlign: 'left' }}>Desglose por Dimensión</h3>
              
              <div className="results-grid">
                {Object.entries(results.dimensionsScore).map(([dimension, score]) => {
                  const maxScore = (dimension === 'People' || dimension === 'Operations') ? 5 : 10;
                  const percentage = (score / maxScore) * 100;
                  
                  return (
                    <div key={dimension} style={{ padding: '1.5vh 1.5vw', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 10px rgba(0,0,0,0.03)', border: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1vh', alignItems: 'center' }}>
                        <strong style={{ fontSize: '1rem', color: oneDataDarkBlue }}>{dimension}</strong> 
                        <span style={{ fontSize: '1rem', fontWeight: 'bold', color: awsGray }}>{score} / {maxScore}</span>
                      </div>
                      <div style={{ width: '100%', backgroundColor: '#edf2f7', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
                        <div style={{ width: `${percentage}%`, backgroundColor: awsOrange, height: '100%', borderRadius: '999px', transition: 'width 1s ease-in-out' }}></div>
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
  // CUESTIONARIO
  // ==========================================
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isCurrentQuestionAnswered = answers[currentQuestion.id] !== undefined;

  return (
    <div style={{ 
      height: '100vh', width: '100vw', overflow: 'hidden', 
      backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', 
      padding: '2vh 2vw', boxSizing: 'border-box'
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: oneDataDeepGradient, zIndex: 0 }}></div>
      
      <div style={{ 
        position: 'relative', zIndex: 1, maxWidth: '1300px', width: '100%', height: '90vh', 
        background: '#ffffff', padding: '3vh 3vw', borderRadius: '24px', 
        boxShadow: '0 30px 60px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box'
      }}>
        
        <div style={{ marginBottom: '2vh', flexShrink: 0, width: '100%', maxWidth: '900px', alignSelf: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', color: awsGray, fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                <span>Dimensión: <span style={{color: oneDataDarkBlue}}>{currentQuestion.dimension}</span></span>
                <span>Pregunta {currentQuestionIndex + 1} / {questions.length}</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: '#edf2f7', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: `${progressPercentage}%`, height: '100%', backgroundColor: awsOrange, borderRadius: '999px', transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
            </div>
        </div>

        <div style={{ flexShrink: 0, textAlign: 'center', marginBottom: '2vh' }}>
            {/* TÍTULO DE PREGUNTA REDUCIDO */}
            <h2 style={{ color: '#1a202c', fontSize: '1.8rem', marginBottom: '1vh', fontWeight: '700', lineHeight: '1.3', maxWidth: '1000px', margin: '0 auto' }}>
              {translateText(currentQuestion.text)}
            </h2>
            <p style={{ color: '#718096', margin: '1vh 0', fontSize: '1rem' }}>
              Por favor, seleccione una de las respuestas a continuación:
            </p>
        </div>
        
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', overflow: 'hidden' }}>
            <div className="options-container">
              {currentQuestion.options.map((opt) => {
                const rawLabel = opt.label.split('-').pop().trim();
                const cleanLabel = rawLabel.charAt(0).toUpperCase() + rawLabel.slice(1).toLowerCase();
                const isSelected = answers[currentQuestion.id] === opt.points;

                return (
                  <button 
                    key={opt.level}
                    onClick={() => handleSelect(currentQuestion.id, opt.points)}
                    className={`option-card ${isSelected ? 'selected' : ''}`}
                  >
                    <span className="option-text">{cleanLabel}</span>
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
                    cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
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
                    cursor: !isCurrentQuestionAnswered ? 'not-allowed' : 'pointer',
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