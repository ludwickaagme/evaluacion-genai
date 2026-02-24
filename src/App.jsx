import { useState, useEffect } from 'react';
import './App.css';
import { questions as questionsEs } from './data/preguntas';
import { questions as questionsEn } from './data/questions';

export default function App() {
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

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
      classification = lang === 'es' ? "🔍 EXPLORANDO" : "🔍 EXPLORING";
      action = lang === 'es' ? "Requiere partner con capacidad de EDUCACIÓN Y ENABLEMENT" : "Requires partner for EDUCATION and ENABLEMENT";
    } else if (average > 2.0 && average <= 3.0) {
      classification = lang === 'es' ? "🚀 ADOPTANDO" : "🚀 ADOPTING";
      action = lang === 'es' ? "Requiere partner con experiencia en IMPLEMENTACIÓN GUIADA" : "Requires partner experienced in GUIDED IMPLEMENTATION";
    } else if (average > 3.0 && average <= 4.0) {
      classification = lang === 'es' ? "⚙️ IMPLEMENTANDO" : "⚙️ IMPLEMENTING";
      action = lang === 'es' ? "Requiere partner especializado en OPTIMIZACIÓN" : "Requires partner specialized in OPTIMIZATION";
    } else {
      classification = lang === 'es' ? "🌟 TRANSFORMANDO" : "🌟 TRANSFORMING";
      action = lang === 'es' ? "Requiere partner estratégico de INNOVACIÓN" : "Requires strategic INNOVATION partner";
    }

    return { totalPoints, average, dimensionsScore, classification, action };
  };

  const goNext = () => {
    if (!answers[current.id]) return;
    if (index < questions.length - 1) setIndex(index + 1);
    else setIsFinished(true);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (index > 0) setIndex(index - 1);
    window.scrollTo(0, 0);
  };

  const toggleLang = () => {
    const newLang = lang === 'es' ? 'en' : 'es';
    setLang(newLang);
    // Keep answers keys (ids) same; questions structure uses same ids
  };

  // ==========================================
  // PANTALLA 1: PORTADA DE REGISTRO (Estilo AWS con OneData)
  // ==========================================
  if (!hasStarted) {
    const isFormValid = userInfo.nombre.trim() !== '' && userInfo.organizacion.trim() !== '' && userInfo.correo.trim() !== '';

    return (
      <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {/* Columna Izquierda con Degradado */}
        <div style={{ flex: '1', background: oneDataGradient, padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.2' }}>
            ¿Listo para potenciar su competitividad con IA?
          </h1>
          <p style={{ fontSize: '1.5rem', maxWidth: '600px', lineHeight: '1.6' }}>
            Realice este breve diagnóstico para generar su plan de acción personalizado y definir su siguiente paso estratégico en Inteligencia Artificial Generativa.
          </p>
        </div>

        {/* Columna Derecha con Formulario */}
        <div style={{ flex: '1', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ maxWidth: '500px', width: '100%', background: '#ffffff', padding: '3rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
            <h2 style={{ color: '#1a202c', fontSize: '2rem', marginBottom: '1.5rem', fontWeight: '800' }}>Comience su diagnóstico</h2>
            <p style={{ color: '#4a5568', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
              Complete sus datos para iniciar la evaluación. Sus resultados incluirán un análisis por dimensión y recomendaciones personalizadas.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#2d3748' }}>Nombre completo *</label>
                <input type="text" name="nombre" value={userInfo.nombre} onChange={handleUserInputChange} placeholder="Ej. Juan Pérez" style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem', boxSizing: 'border-box', transition: 'border-color 0.2s' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#2d3748' }}>Organización / Empresa *</label>
                <input type="text" name="organizacion" value={userInfo.organizacion} onChange={handleUserInputChange} placeholder="Ej. OneData" style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#2d3748' }}>Correo electrónico *</label>
                <input type="email" name="correo" value={userInfo.correo} onChange={handleUserInputChange} placeholder="juan@empresa.com" style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem', boxSizing: 'border-box' }} />
              </div>
            </div>

            <button 
              onClick={() => setHasStarted(true)}
              disabled={!isFormValid}
              style={{ 
                marginTop: '2.5rem', width: '100%', padding: '16px', 
                backgroundColor: isFormValid ? oneDataBlue : '#cbd5e0', 
                color: '#ffffff', border: 'none', borderRadius: '8px', 
                cursor: isFormValid ? 'pointer' : 'not-allowed',
                fontSize: '1.1rem', fontWeight: 'bold', transition: 'all 0.2s ease',
                boxShadow: isFormValid ? `0 4px 12px ${oneDataBlue}66` : 'none'
              }}
              onMouseOver={(e) => { if(isFormValid) e.target.style.backgroundColor = oneDataHover }}
              onMouseOut={(e) => { if(isFormValid) e.target.style.backgroundColor = oneDataBlue }}
            >
              Empezar Diagnóstico
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // PANTALLA 3: RESULTADOS
  // ==========================================
  if (isFinished) {
    const results = calculateResults();
    return (
      <div style={{ padding: '3rem 5%', minHeight: '100vh', backgroundColor: '#f0fdf4', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#064e3b' }}>Resultados de Evaluación GenAI</h2>
          
          <div style={{ background: '#ffffff', padding: '3rem', borderRadius: '16px', marginTop: '2rem', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.8rem', color: '#334155' }}>Puntuación Total:</h3>
              <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0f766e' }}>{results.totalPoints} / 50</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.8rem', color: '#334155' }}>Promedio General:</h3>
              <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0f766e' }}>{results.average.toFixed(1)} / 5.0</span>
            </div>
            
            <hr style={{ margin: '2.5rem 0', borderColor: '#e2e8f0' }} />
            
            <h2 style={{ color: '#059669', textAlign: 'center', fontSize: '2.2rem' }}>{results.classification}</h2>
            <p style={{ textAlign: 'center', fontSize: '1.4rem', marginTop: '1rem', color: '#475569' }}><strong>Recomendación:</strong> {results.action}</p>
          </div>

          <h3 style={{ marginTop: '4rem', fontSize: '2rem', color: '#064e3b' }}>Desglose por Dimensión</h3>
          
          {/* INICIO DE LAS TARJETAS CON BARRAS DE PROGRESO */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
            
            <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)', borderLeft: '6px solid #10b981' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <strong style={{ fontSize: '1.1rem', color: '#334155' }}>Business</strong> 
                <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{results.dimensionsScore.Business} / 10</span>
              </div>
              <div style={{ width: '100%', backgroundColor: '#e2e8f0', borderRadius: '999px', height: '8px' }}>
                <div style={{ width: `${(results.dimensionsScore.Business / 10) * 100}%`, backgroundColor: '#10b981', height: '100%', borderRadius: '999px' }}></div>
              </div>
            </div>

            <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)', borderLeft: '6px solid #10b981' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <strong style={{ fontSize: '1.1rem', color: '#334155' }}>People</strong> 
                <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{results.dimensionsScore.People} / 5</span>
              </div>
              <div style={{ width: '100%', backgroundColor: '#e2e8f0', borderRadius: '999px', height: '8px' }}>
                <div style={{ width: `${(results.dimensionsScore.People / 5) * 100}%`, backgroundColor: '#10b981', height: '100%', borderRadius: '999px' }}></div>
              </div>
            </div>

            <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)', borderLeft: '6px solid #10b981' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <strong style={{ fontSize: '1.1rem', color: '#334155' }}>Governance</strong> 
                <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{results.dimensionsScore.Governance} / 10</span>
              </div>
              <div style={{ width: '100%', backgroundColor: '#e2e8f0', borderRadius: '999px', height: '8px' }}>
                <div style={{ width: `${(results.dimensionsScore.Governance / 10) * 100}%`, backgroundColor: '#10b981', height: '100%', borderRadius: '999px' }}></div>
              </div>
            </div>

            <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)', borderLeft: '6px solid #10b981' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <strong style={{ fontSize: '1.1rem', color: '#334155' }}>Platform</strong> 
                <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{results.dimensionsScore.Platform} / 10</span>
              </div>
              <div style={{ width: '100%', backgroundColor: '#e2e8f0', borderRadius: '999px', height: '8px' }}>
                <div style={{ width: `${(results.dimensionsScore.Platform / 10) * 100}%`, backgroundColor: '#10b981', height: '100%', borderRadius: '999px' }}></div>
              </div>
            </div>

            <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)', borderLeft: '6px solid #10b981' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <strong style={{ fontSize: '1.1rem', color: '#334155' }}>Security</strong> 
                <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{results.dimensionsScore.Security} / 10</span>
              </div>
              <div style={{ width: '100%', backgroundColor: '#e2e8f0', borderRadius: '999px', height: '8px' }}>
                <div style={{ width: `${(results.dimensionsScore.Security / 10) * 100}%`, backgroundColor: '#10b981', height: '100%', borderRadius: '999px' }}></div>
              </div>
            </div>

            <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)', borderLeft: '6px solid #10b981' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <strong style={{ fontSize: '1.1rem', color: '#334155' }}>Operations</strong> 
                <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{results.dimensionsScore.Operations} / 5</span>
              </div>
              <div style={{ width: '100%', backgroundColor: '#e2e8f0', borderRadius: '999px', height: '8px' }}>
                <div style={{ width: `${(results.dimensionsScore.Operations / 5) * 100}%`, backgroundColor: '#10b981', height: '100%', borderRadius: '999px' }}></div>
              </div>
            </div>

          </div>
          {/* FIN DE LAS TARJETAS */}

          <button 
            onClick={() => {setAnswers({}); setIsFinished(false); window.scrollTo(0,0);}}
            style={{ marginTop: '4rem', width: '100%', padding: '20px', backgroundColor: '#0f766e', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '1.3rem', fontWeight: 'bold', transition: 'background-color 0.2s' }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#115e59'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#0f766e'}
          >
            Volver a evaluar
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // PANTALLA 2: CUESTIONARIO (Estilo OneData Simplificado)
  // ==========================================
  
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isCurrentQuestionAnswered = answers[currentQuestion.id] !== undefined;

  return (
    <div style={{ padding: '3rem 5%', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ color: '#0f172a', fontSize: '3rem', marginBottom: '1rem' }}>Cuestionario de Evaluación de Madurez en Generative AI</h1>
          <p style={{ color: '#475569', fontSize: '1.3rem', margin: '0.5rem 0' }}><strong>Objetivo:</strong> Determinar la madurez tecnológica para asignar el partner ideal.</p>
          <p style={{ color: '#475569', fontSize: '1.3rem', margin: '0.5rem 0' }}><strong>Duración estimada:</strong> 5 a 7 minutos.</p>
        </div>
        
        {questions.map((q) => (
          <div key={q.id} style={{ marginBottom: '3rem', padding: '2.5rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)' }}>
            <div style={{ marginBottom: '2rem' }}>
              <span style={{ backgroundColor: '#ccfbf1', color: '#0f766e', padding: '6px 12px', borderRadius: '6px', fontSize: '1rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{q.dimension}</span>
              <h3 style={{ marginTop: '1.5rem', color: '#1e293b', fontSize: '1.5rem' }}>{q.id}. {q.text}</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {q.options.map((opt) => (
                <label 
                  key={opt.level} 
                  style={{ 
                    display: 'flex', alignItems: 'flex-start', gap: '20px', 
                    padding: '20px', background: answers[q.id] === opt.points ? '#f0fdf4' : '#f8fafc',
                    border: answers[q.id] === opt.points ? '2px solid #10b981' : '2px solid #e2e8f0',
                    borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s ease'
                  }}
                >
                  <input 
                    type="radio" 
                    name={q.id} 
                    value={opt.points}
                    checked={answers[q.id] === opt.points}
                    onChange={() => handleSelect(q.id, opt.points)}
                    style={{ marginTop: '6px', transform: 'scale(1.5)', accentColor: '#10b981' }}
                  />
                  <div>
                    {/* AQUÍ ESTÁ EL CAMBIO: Ya no dice ({opt.points} pts) */}
                    <strong style={{ display: 'block', color: '#0f172a', marginBottom: '6px', fontSize: '1.1rem' }}>{opt.label}</strong>
                    <p style={{ margin: 0, fontSize: '1rem', color: '#475569', lineHeight: '1.5' }}>{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button 
          onClick={() => { setIsFinished(true); window.scrollTo(0,0); }}
          disabled={Object.keys(answers).length < questions.length}
          style={{ 
            width: '100%', padding: '20px', 
            backgroundColor: Object.keys(answers).length < questions.length ? '#cbd5e1' : '#0f766e', 
            color: 'white', border: 'none', borderRadius: '12px', 
            cursor: Object.keys(answers).length < questions.length ? 'not-allowed' : 'pointer',
            fontSize: '1.3rem', fontWeight: 'bold', transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => { if(Object.keys(answers).length === questions.length) e.target.style.backgroundColor = '#115e59' }}
          onMouseOut={(e) => { if(Object.keys(answers).length === questions.length) e.target.style.backgroundColor = '#0f766e' }}
        >
          {Object.keys(answers).length < questions.length ? `Faltan preguntas por responder (${Object.keys(answers).length}/${questions.length})` : 'Ver Resultados Completos'}
        </button>
      </div>
    </div>
  );
}