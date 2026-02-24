import { useState, useEffect } from 'react';
import './App.css';
import { questions as questionsEs } from './data/preguntas';
import { questions as questionsEn } from './data/questions';

export default function App() {
  const [lang, setLang] = useState('es');
  const questions = lang === 'es' ? questionsEs : questionsEn;

  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [index, setIndex] = useState(0);

  const current = questions[index];
  
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

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

  if (isFinished) {
    const results = calculateResults();
    return (
      <div className="app-root">
        <div className="rotating-bg" aria-hidden="true" />
        <div className="inner-card">
          <div className="content-inner">
            <h2 style={{ textAlign: 'center', fontSize: '2.2rem', color: '#064e3b', margin: '0' }}>{lang === 'es' ? 'Resultados de Evaluación GenAI' : 'GenAI Assessment Results'}</h2>

            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', marginTop: '12px', boxShadow: '0 8px 12px rgba(2,6,23,0.06)', width: '50%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#334155' }}>{lang === 'es' ? 'Puntuación Total:' : 'Total Score:'}</h3>
                <span style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#0f766e' }}>{results.totalPoints} / 50</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#334155' }}>{lang === 'es' ? 'Promedio General:' : 'Overall Average:'}</h3>
                <span style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#0f766e' }}>{results.average.toFixed(1)} / 5.0</span>
              </div>
              <hr style={{ margin: '1rem 0', borderColor: '#e2e8f0' }} />
              <h2 style={{ color: '#059669', textAlign: 'center', fontSize: '1.4rem', margin: '0.5rem 0' }}>{results.classification}</h2>
              <p style={{ textAlign: 'center', fontSize: '1rem', marginTop: '0.5rem', color: '#475569' }}><strong>{lang === 'es' ? 'Recomendación:' : 'Recommendation:'}</strong> {results.action}</p>
            </div>

            <button 
              onClick={() => {setAnswers({}); setIsFinished(false); setIndex(0); window.scrollTo(0,0);}}
              className="nav-button next"
              style={{ marginTop: '18px', width: '260px', padding: '14px 28px', borderRadius: '999px', background: '#0f766e', color: 'white', fontWeight: 700 }}
            >
              {lang === 'es' ? 'Volver a evaluar' : 'Retake Assessment'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-root">
      <div className="rotating-bg" aria-hidden="true" />
      <div className="inner-card">
        <button onClick={toggleLang} className="lang-toggle">{lang === 'es' ? 'ES' : 'EN'}</button>

        <div className="content-inner">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '4px' }}>
            {questions.map((_, i) => (
              <div key={i} style={{ width: '10px', height: '10px', borderRadius: '999px', background: i <= index ? '#0f172a' : '#f1f5f9' }} />
            ))}
          </div>

          <div key={index} className="qa-stage">
            <div style={{ textAlign: 'center', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                <span className="dimension-badge">{current.dimension}</span>
              </div>
              <h1 className="question-title">{current.text}</h1>
              <div className="scale-note">{lang === 'es' ? 'Califique en una escala de 1-5' : 'Rate on a scale of 1-5'}</div>
            </div>

            <div className="options-row">
              {current.options.map((opt, i) => (
                <button
                  key={opt.level}
                  onClick={() => handleSelect(current.id, opt.points)}
                  className={"option-tile" + (answers[current.id] === opt.points ? ' selected' : '')}
                  style={{ ['--i']: i }}
                >
                  {opt.points}
                </button>
              ))}
            </div>

            <div className="options-wrapper">
              <div className="gradient-bar" style={{ width: `${current.options.length * 220 + (current.options.length - 1) * 16}px`, maxWidth: '100%' }} />
              <div className="gradient-labels" style={{ width: `${current.options.length * 220 + (current.options.length - 1) * 16}px`, maxWidth: '100%' }}>
                {current.options.map((opt, i) => (
                  <div key={i} className={answers[current.id] === opt.points ? 'label-selected' : ''}>{opt.label}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="nav-container">
            <button onClick={goBack} disabled={index === 0} className={"nav-button back"} style={{ opacity: index === 0 ? 0.6 : 1, cursor: index === 0 ? 'not-allowed' : 'pointer' }}>{lang === 'es' ? '← Back' : '← Back'}</button>
            <button onClick={goNext} disabled={!answers[current.id]} className={"nav-button next"} style={{ opacity: !answers[current.id] ? 0.7 : 1, cursor: !answers[current.id] ? 'not-allowed' : 'pointer' }}>{index === questions.length - 1 ? (lang === 'es' ? 'Finish' : 'Finish') : (lang === 'es' ? 'Next →' : 'Next →')}</button>
          </div>

        </div>
      </div>
    </div>
  );
}