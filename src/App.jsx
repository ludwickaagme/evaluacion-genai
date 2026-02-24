import { useState } from 'react';
import { questions } from './data/preguntas';

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

  // Color principal de OneData
  const oneDataBlue = '#2CB9F9';
  const oneDataHover = '#1a9edc'; // Un tono un poco más oscuro para el hover
  const oneDataGradient = `linear-gradient(135deg, ${oneDataBlue} 0%, #007bff 100%)`;
  const oneDataLight = '#e6f7ff'; // Fondo claro para selecciones

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
      <div style={{ padding: '3rem 5%', minHeight: '100vh', backgroundColor: '#f8f9fa', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#1a202c', fontWeight: '800' }}>Resultados del Diagnóstico</h2>
          
          <div style={{ background: '#ffffff', padding: '3rem', borderRadius: '24px', marginTop: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
            
            <div style={{ backgroundColor: '#f7fafc', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid #e2e8f0' }}>
              <p style={{ margin: '0 0 0.5rem 0', color: '#4a5568' }}><strong>Organización evaluada:</strong> {userInfo.organizacion}</p>
              <p style={{ margin: '0 0 0.5rem 0', color: '#4a5568' }}><strong>Evaluador:</strong> {userInfo.nombre}</p>
              <p style={{ margin: 0, color: '#4a5568' }}><strong>Fecha:</strong> {userInfo.fecha}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.5rem', color: '#2d3748' }}>Puntuación Total:</h3>
              <span style={{ fontSize: '3rem', fontWeight: '900', color: oneDataBlue }}>{results.totalPoints} / 50</span>
            </div>
            
            <hr style={{ margin: '2.5rem 0', borderColor: '#e2e8f0' }} />
            
            <h2 style={{ color: oneDataBlue, textAlign: 'center', fontSize: '2.2rem', textTransform: 'uppercase', fontWeight: '800' }}>{results.classification}</h2>
            <p style={{ textAlign: 'center', fontSize: '1.2rem', marginTop: '1rem', color: '#4a5568' }}><strong>Recomendación:</strong> {results.action}</p>
          </div>

          <h3 style={{ marginTop: '4rem', fontSize: '1.8rem', color: '#2d3748', marginBottom: '1.5rem' }}>Desglose por Dimensión</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {Object.entries(results.dimensionsScore).map(([dimension, score]) => {
              const maxScore = (dimension === 'People' || dimension === 'Operations') ? 5 : 10;
              const percentage = (score / maxScore) * 100;
              
              return (
                <div key={dimension} style={{ padding: '1.5rem', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <strong style={{ fontSize: '1.1rem', color: '#2d3748' }}>{dimension}</strong> 
                    <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#4a5568' }}>{score} / {maxScore}</span>
                  </div>
                  <div style={{ width: '100%', backgroundColor: '#edf2f7', borderRadius: '999px', height: '10px', overflow: 'hidden' }}>
                    <div style={{ width: `${percentage}%`, backgroundColor: oneDataBlue, height: '100%', borderRadius: '999px', transition: 'width 0.5s ease' }}></div>
                  </div>
                </div>
              );
            })}
          </div>

          <button 
            onClick={() => {
              setAnswers({}); 
              setUserInfo({ ...userInfo, fecha: new Date().toISOString().split('T')[0] });
              setIsFinished(false); 
              setHasStarted(false);
              setCurrentQuestionIndex(0);
              window.scrollTo(0,0);
            }}
            style={{ marginTop: '4rem', width: '100%', padding: '16px', backgroundColor: '#2d3748', color: '#ffffff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold', transition: 'background-color 0.2s' }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1a202c'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2d3748'}
          >
            Realizar otro diagnóstico
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
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '400px', background: oneDataGradient, zIndex: 0 }}></div>
      
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1300px', width: '100%', background: '#ffffff', padding: '4rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
        
        <div style={{ marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#718096', fontSize: '0.9rem', fontWeight: '600' }}>
                <span>Dimensión: {currentQuestion.dimension}</span>
                <span>Pregunta {currentQuestionIndex + 1} de {questions.length}</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: '#edf2f7', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${progressPercentage}%`, height: '100%', backgroundColor: oneDataBlue, borderRadius: '4px', transition: 'width 0.3s ease' }}></div>
            </div>
        </div>

        <h2 style={{ color: '#1a202c', fontSize: '2rem', marginBottom: '1rem', textAlign: 'center', fontWeight: '800', lineHeight: '1.3' }}>
          {translateText(currentQuestion.text)}
        </h2>
        <p style={{ textAlign: 'center', color: '#718096', marginBottom: '3rem', fontSize: '1.1rem' }}>
          Seleccione la opción que mejor describa su situación actual:
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1.5rem', justifyContent: 'center', alignItems: 'stretch', flexWrap: 'wrap' }}>
          {currentQuestion.options.map((opt) => {
            const rawLabel = opt.label.split('-').pop().trim();
            const cleanLabel = rawLabel.charAt(0).toUpperCase() + rawLabel.slice(1).toLowerCase();
            const isSelected = answers[currentQuestion.id] === opt.points;

            return (
              <button 
                key={opt.level}
                onClick={() => handleSelect(currentQuestion.id, opt.points)}
                style={{ 
                  flex: '1 1 0',
                  minWidth: '220px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
                  padding: '2rem',
                  background: isSelected ? oneDataLight : '#ffffff',
                  border: isSelected ? `2px solid ${oneDataBlue}` : '2px solid transparent',
                  borderRadius: '20px',
                  cursor: 'pointer', transition: 'all 0.3s ease',
                  boxShadow: isSelected ? `0 10px 25px ${oneDataBlue}40` : '0 10px 30px rgba(0,0,0,0.06)',
                  outline: 'none',
                  transform: isSelected ? 'translateY(-4px)' : 'none'
                }}
              >
                {/* Solo mostramos el título en grande, sin la descripción */}
                <strong style={{ display: 'block', color: isSelected ? oneDataBlue : '#1a202c', fontSize: '1.6rem', fontWeight: '800' }}>
                  {cleanLabel}
                </strong>
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '4rem' }}>
            <button 
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                style={{ 
                    padding: '14px 32px', 
                    backgroundColor: '#edf2f7', 
                    color: currentQuestionIndex === 0 ? '#cbd5e0' : '#4a5568', 
                    border: 'none', 
                    borderRadius: '8px', 
                    cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
                    fontSize: '1.1rem', fontWeight: 'bold', transition: 'all 0.2s ease'
                }}
            >
                ← Atrás
            </button>
            
            <button 
                onClick={goToNextQuestion}
                disabled={!isCurrentQuestionAnswered}
                style={{ 
                    padding: '14px 32px', 
                    backgroundColor: !isCurrentQuestionAnswered ? '#cbd5e0' : oneDataBlue, 
                    color: '#ffffff', border: 'none', borderRadius: '8px', 
                    cursor: !isCurrentQuestionAnswered ? 'not-allowed' : 'pointer',
                    fontSize: '1.1rem', fontWeight: 'bold', transition: 'all 0.2s ease',
                    boxShadow: !isCurrentQuestionAnswered ? 'none' : `0 4px 12px ${oneDataBlue}66`
                }}
            >
                {currentQuestionIndex === questions.length - 1 ? 'Ver Resultados' : 'Siguiente →'}
            </button>
        </div>

      </div>
    </div>
  );
}