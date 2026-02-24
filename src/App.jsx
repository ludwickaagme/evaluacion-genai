import { useState } from 'react';
import { questions } from './data/preguntas';

export default function App() {
  // 1. Nuevos estados para la pantalla inicial y los datos del usuario
  const [hasStarted, setHasStarted] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nombre: '',
    organizacion: '',
    correo: '',
    fecha: new Date().toISOString().split('T')[0] // Toma la fecha de hoy por defecto
  });

  // 2. Estados que ya teníamos para las respuestas
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (questionId, points) => {
    setAnswers({ ...answers, [questionId]: points });
  };

  const handleUserInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
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
  // PANTALLA 1: REGISTRO (LANDING PAGE)
  // ==========================================
  if (!hasStarted) {
    // Validación básica: el botón se activa solo si llenan nombre, org y correo
    const isFormValid = userInfo.nombre.trim() !== '' && userInfo.organizacion.trim() !== '' && userInfo.correo.trim() !== '';

    return (
      <div style={{ padding: '3rem 5%', minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ maxWidth: '600px', width: '100%', background: '#ffffff', padding: '3rem', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}>
          <h1 style={{ color: '#0f172a', fontSize: '2.2rem', marginBottom: '1rem', textAlign: 'center' }}>Evaluación de Madurez en GenAI</h1>
          <p style={{ color: '#475569', fontSize: '1.1rem', marginBottom: '2rem', textAlign: 'center', lineHeight: '1.6' }}>
            Esta herramienta está diseñada para identificar el nivel de madurez tecnológica de su organización frente a la Inteligencia Artificial Generativa. Al finalizar este breve cuestionario de 10 preguntas, obtendrá un diagnóstico automático para descubrir qué tipo de partner tecnológico necesita para su siguiente paso.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#334155' }}>Nombre completo *</label>
              <input type="text" name="nombre" value={userInfo.nombre} onChange={handleUserInputChange} placeholder="Ej. Juan Pérez" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#334155' }}>Organización / Empresa *</label>
              <input type="text" name="organizacion" value={userInfo.organizacion} onChange={handleUserInputChange} placeholder="Ej. OneData" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#334155' }}>Correo electrónico *</label>
              <input type="email" name="correo" value={userInfo.correo} onChange={handleUserInputChange} placeholder="juan@empresa.com" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#334155' }}>Fecha de evaluación</label>
              <input type="date" name="fecha" value={userInfo.fecha} onChange={handleUserInputChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', boxSizing: 'border-box', backgroundColor: '#f1f5f9', color: '#64748b' }} readOnly />
            </div>
          </div>

          <button 
            onClick={() => setHasStarted(true)}
            disabled={!isFormValid}
            style={{ 
              marginTop: '3rem', width: '100%', padding: '16px', 
              backgroundColor: isFormValid ? '#0f766e' : '#cbd5e1', 
              color: 'white', border: 'none', borderRadius: '8px', 
              cursor: isFormValid ? 'pointer' : 'not-allowed',
              fontSize: '1.2rem', fontWeight: 'bold', transition: 'background-color 0.3s'
            }}
          >
            Empezar Evaluación
          </button>
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
            
            {/* Pequeño resumen de a quién pertenecen los resultados */}
            <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #e2e8f0' }}>
              <p style={{ margin: '0 0 0.5rem 0', color: '#475569' }}><strong>Organización evaluada:</strong> {userInfo.organizacion}</p>
              <p style={{ margin: '0 0 0.5rem 0', color: '#475569' }}><strong>Evaluador:</strong> {userInfo.nombre} ({userInfo.correo})</p>
              <p style={{ margin: 0, color: '#475569' }}><strong>Fecha:</strong> {userInfo.fecha}</p>
            </div>

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

          <button 
            onClick={() => {
              // Reiniciamos todo para una nueva evaluación
              setAnswers({}); 
              setUserInfo({ nombre: '', organizacion: '', correo: '', fecha: new Date().toISOString().split('T')[0] });
              setIsFinished(false); 
              setHasStarted(false);
              window.scrollTo(0,0);
            }}
            style={{ marginTop: '4rem', width: '100%', padding: '20px', backgroundColor: '#0f766e', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '1.3rem', fontWeight: 'bold', transition: 'background-color 0.2s' }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#115e59'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#0f766e'}
          >
            Realizar otra evaluación
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // PANTALLA 2: CUESTIONARIO
  // ==========================================
  return (
    <div style={{ padding: '3rem 5%', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ color: '#0f172a', fontSize: '2.5rem', marginBottom: '1rem' }}>Evaluación en Curso</h1>
          <p style={{ color: '#475569', fontSize: '1.2rem', margin: '0.5rem 0' }}>Seleccione la opción que mejor describa la situación actual de <strong>{userInfo.organizacion || 'su organización'}</strong>.</p>
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
          {Object.keys(answers).length < questions.length ? `Faltan preguntas por responder (${Object.keys(answers).length}/${questions.length})` : 'Finalizar y Ver Resultados'}
        </button>
      </div>
    </div>
  );
}
