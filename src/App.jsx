import { useState } from 'react';
import { questions } from './data/preguntas';

export default function App() {
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (questionId, points) => {
    setAnswers({ ...answers, [questionId]: points });
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)', borderLeft: '6px solid #10b981' }}>
              <strong style={{ fontSize: '1.2rem', color: '#334155' }}>Business (Q1, Q2):</strong> <span style={{ float: 'right', fontSize: '1.2rem', fontWeight: 'bold' }}>{results.dimensionsScore.Business} / 10 pts</span>
            </div>
            <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)', borderLeft: '6px solid #10b981' }}>
              <strong style={{ fontSize: '1.2rem', color: '#334155' }}>People (Q3):</strong> <span style={{ float: 'right', fontSize: '1.2rem', fontWeight: 'bold' }}>{results.dimensionsScore.People} / 5 pts</span>
            </div>
            <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)', borderLeft: '6px solid #10b981' }}>
              <strong style={{ fontSize: '1.2rem', color: '#334155' }}>Governance (Q4, Q5):</strong> <span style={{ float: 'right', fontSize: '1.2rem', fontWeight: 'bold' }}>{results.dimensionsScore.Governance} / 10 pts</span>
            </div>
            <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)', borderLeft: '6px solid #10b981' }}>
              <strong style={{ fontSize: '1.2rem', color: '#334155' }}>Platform (Q6, Q7):</strong> <span style={{ float: 'right', fontSize: '1.2rem', fontWeight: 'bold' }}>{results.dimensionsScore.Platform} / 10 pts</span>
            </div>
            <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)', borderLeft: '6px solid #10b981' }}>
              <strong style={{ fontSize: '1.2rem', color: '#334155' }}>Security (Q8, Q9):</strong> <span style={{ float: 'right', fontSize: '1.2rem', fontWeight: 'bold' }}>{results.dimensionsScore.Security} / 10 pts</span>
            </div>
            <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)', borderLeft: '6px solid #10b981' }}>
              <strong style={{ fontSize: '1.2rem', color: '#334155' }}>Operations (Q10):</strong> <span style={{ float: 'right', fontSize: '1.2rem', fontWeight: 'bold' }}>{results.dimensionsScore.Operations} / 5 pts</span>
            </div>
          </div>

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
                    <strong style={{ display: 'block', color: '#0f172a', marginBottom: '6px', fontSize: '1.1rem' }}>{opt.label} ({opt.points} pts)</strong>
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
