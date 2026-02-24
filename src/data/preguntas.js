// src/data/preguntas.js

export const questions = [
  // --- DIMENSIÓN BUSINESS ---
  {
    id: "Q1",
    dimension: "Business",
    title: "Identificación de Casos de Uso GenAI", 
    text: "¿Tiene su organización lineamientos para identificar y priorizar casos de uso que puedan beneficiarse de capacidades de Generative AI o Agentic AI?", 
    options: [
      { level: 1, points: 1, label: "Inicial", desc: "No existen lineamientos" },
      { level: 2, points: 2, label: "Fundacional", desc: "Existen lineamientos básicos" },
      { level: 3, points: 3, label: "Definido", desc: "Hay lineamientos definidos con roles claros" }, 
      { level: 4, points: 4, label: "Medido", desc: "Lineamientos gestionados proactivamente con mediciones cuantitativas" }, 
      { level: 5, points: 5, label: "Optimizado", desc: "Lineamientos evaluados y refinados continuamente con datos y feedback" } 
    ]
  },
  {
    id: "Q2",
    dimension: "Business",
    title: "Integración de GenAI en Procesos", 
    text: "¿Tiene su organización mecanismos para integrar soluciones de Generative AI y Agentic AI en los procesos de negocio existentes?", 
    options: [
      { level: 1, points: 1, label: "Inicial", desc: "No existen mecanismos de integración" }, 
      { level: 2, points: 2, label: "Fundacional", desc: "Enfoques básicos definidos" }, 
      { level: 3, points: 3, label: "Definido", desc: "Lineamientos definidos con capacitación" }, 
      { level: 4, points: 4, label: "Medido", desc: "Integración gestionada con KPIs" }, 
      { level: 5, points: 5, label: "Optimizado", desc: "Integración optimizada con feedback" } 
    ]
  },

  // --- DIMENSION PEOPLE  ---
  {
    id: "Q3",
    dimension: "People",
    title: "Programa de Desarrollo de Habilidades", 
    text: "¿Existe un programa de desarrollo de habilidades en AI enfocado en diferentes personas (líderes de negocio, desarrolladores AI, ingenieros de datos, científicos de datos, usuarios finales) cubriendo ML, Generative AI y Agentic AI?", 
    options: [
      { level: 1, points: 1, label: "Inicial", desc: "No existe programa estructurado" }, 
      { level: 2, points: 2, label: "Fundacional", desc: "Capacitación básica, aplicación inconsistente" }, 
      { level: 3, points: 3, label: "Definido", desc: "Rutas de aprendizaje definidas por persona" }, 
      { level: 4, points: 4, label: "Medido", desc: "Programa gestionado con progreso rastreado" }, 
      { level: 5, points: 5, label: "Optimizado", desc: "Programa adaptativo que cierra brechas" } 
    ]
  },

  // --- DIMENSION GOVERNANCE ---
  {
    id: "Q4",
    dimension: "Governance",
    title: "Políticas de Uso Responsable de AI", 
    text: "¿Existen políticas y lineamientos de uso responsable de AI integrados en procesos de desarrollo, lineamientos operacionales y frameworks de gestión de riesgos?", 
    options: [
      { level: 1, points: 1, label: "Inicial", desc: "No hay políticas de AI responsable" }, 
      { level: 2, points: 2, label: "Fundacional", desc: "Políticas básicas, aplicación inconsistente" }, 
      { level: 3, points: 3, label: "Definido", desc: "Lineamientos con requisitos de documentación" }, 
      { level: 4, points: 4, label: "Medido", desc: "Framework con planes de mitigación" }, 
      { level: 5, points: 5, label: "Optimizado", desc: "Lineamientos proactivamente refinados" } 
    ]
  },
  {
    id: "Q5",
    dimension: "Governance",
    title: "Evaluación de Riesgos de AI", 
    text: "¿Ha establecido su organización mecanismos para pre-evaluar el impacto potencial de negocio, legal y ético de soluciones AI no-determinísticas (resultados inesperados, alucinaciones, comportamiento impredecible de agentes) con prácticas de mitigación?", 
    options: [
      { level: 1, points: 1, label: "Inicial", desc: "No existen procesos de evaluación de riesgos" }, 
      { level: 2, points: 2, label: "Fundacional", desc: "Guardrails básicos, aplicación inconsistente" }, 
      { level: 3, points: 3, label: "Definido", desc: "Framework estandarizado de evaluación de riesgos" }, 
      { level: 4, points: 4, label: "Medido", desc: "Análisis de escenarios y mitigaciones" }, 
      { level: 5, points: 5, label: "Optimizado", desc: "Estrategia integral y en evolución" } 
    ]
  },

  // --- DIMENSION PLATFORM  ---
  {
    id: "Q6",
    dimension: "Platform",
    title: "Prácticas de Diseño AI-First", 
    text: "¿Ha adoptado su organización prácticas de diseño de aplicaciones AI-first, asegurando que los desarrolladores comprendan las características únicas de trabajar con ML, Generative AI y agentes autónomos?", 
    options: [
      { level: 1, points: 1, label: "Inicial", desc: "No se adoptaron prácticas AI-first" }, 
      { level: 2, points: 2, label: "Fundacional", desc: "Conciencia básica de incertidumbre AI" }, 
      { level: 3, points: 3, label: "Definido", desc: "Diseños que consideran incertidumbre AI" }, 
      { level: 4, points: 4, label: "Medido", desc: "Prácticas AI-first con métricas" }, 
      { level: 5, points: 5, label: "Optimizado", desc: "Cuantificación y adaptación avanzadas" } 
    ]
  },
  {
    id: "Q7",
    dimension: "Platform",
    title: "Plataformas de Ciclo de Vida AI", 
    text: "¿Utiliza su organización plataformas AI que soporten todos los aspectos del ciclo de vida AI - desde preparación de datos hasta despliegue y gestión en producción - para soluciones ML, Generative AI y Agentic AI?", 
    options: [
      { level: 1, points: 1, label: "Inicial", desc: "Herramientas desconectadas del ciclo de vida" }, 
      { level: 2, points: 2, label: "Fundacional", desc: "Plataformas soportan algunas etapas" }, 
      { level: 3, points: 3, label: "Definido", desc: "Plataformas soportan la mayoría de etapas" }, 
      { level: 4, points: 4, label: "Medido", desc: "Capacidades avanzadas y automatización" }, 
      { level: 5, points: 5, label: "Optimizado", desc: "Plataformas optimizadas end-to-end" } 
    ]
  },

  // --- DIMENSION SECURITY  ---
  {
    id: "Q8",
    dimension: "Security",
    title: "Prácticas de Seguridad de Ambientes", 
    text: "¿Ha implementado su organización mejores prácticas para mantener ambientes y datos seguros, prevenir fuga de datos y asegurar sistemas AI contra vulnerabilidades y comportamientos no intencionados?", 
    options: [
      { level: 1, points: 1, label: "Inicial", desc: "No existen prácticas de seguridad AI" }, 
      { level: 2, points: 2, label: "Fundacional", desc: "Controles básicos, cobertura incompleta" }, 
      { level: 3, points: 3, label: "Definido", desc: "Lineamientos para prevenir fuga de datos" }, 
      { level: 4, points: 4, label: "Medido", desc: "Controles monitoreados con métricas" }, 
      { level: 5, points: 5, label: "Optimizado", desc: "Mejoras proactivas en seguridad AI" } 
    ]
  },
  {
    id: "Q9",
    dimension: "Security",
    title: "Políticas de Seguridad AI", 
    text: "¿Ha establecido su organización políticas, estándares y lineamientos claros de seguridad junto con roles y responsabilidades relacionados con AI?", 
    options: [
      { level: 1, points: 1, label: "Inicial", desc: "No hay políticas de seguridad AI" }, 
      { level: 2, points: 2, label: "Fundacional", desc: "Políticas básicas, aplicación inconsistente" }, 
      { level: 3, points: 3, label: "Definido", desc: "Framework de gobernanza con roles claros" }, 
      { level: 4, points: 4, label: "Medido", desc: "Gobernanza gestionada con auditorías" }, 
      { level: 5, points: 5, label: "Optimizado", desc: "Gobernanza de seguridad adaptativa" } 
    ]
  },

  // --- DIMENSION OPERATIONS  ---
  {
    id: "Q10",
    dimension: "Operations",
    title: "Mecanismos de Observabilidad", 
    text: "¿Ha establecido su organización mecanismos automatizados para observabilidad y respuesta a incidentes en soluciones AI?", 
    options: [
      { level: 1, points: 1, label: "Inicial", desc: "No hay monitoreo automatizado" }, 
      { level: 2, points: 2, label: "Fundacional", desc: "Monitoreo básico, cobertura limitada" }, 
      { level: 3, points: 3, label: "Definido", desc: "Observabilidad automatizada estandarizada" }, 
      { level: 4, points: 4, label: "Medido", desc: "Observabilidad profunda y respuesta automatizada" },
      { level: 5, points: 5, label: "Optimizado", desc: "Respuesta predictiva y altamente automatizada" } 
    ]
  }
];