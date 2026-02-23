// src/data/preguntas.js

export const questions = [
  // --- DIMENSIÓN BUSINESS [cite: 5] ---
  {
    id: "Q1",
    dimension: "Business",
    title: "Identificación de Casos de Uso GenAI", // [cite: 6]
    text: "¿Tiene su organización lineamientos para identificar y priorizar casos de uso que puedan beneficiarse de capacidades de Generative AI o Agentic AI?", // [cite: 7]
    options: [
      { level: 1, points: 1, label: "🔴 NIVEL 1 - INICIAL", desc: "No existen lineamientos. La identificación de casos de uso GenAI ocurre de manera reactiva y descoordinada, impulsada por intereses individuales o solicitudes ad-hoc." }, // [cite: 9, 10]
      { level: 2, points: 2, label: "🟠 NIVEL 2 - FUNDACIONAL", desc: "Existen lineamientos básicos para GenAI pero se aplican inconsistentemente entre equipos, sin alineación con los objetivos organizacionales." }, // [cite: 11]
      { level: 3, points: 3, label: "🟡 NIVEL 3 - DEFINIDO", desc: "Lineamientos definidos para identificar oportunidades GenAI y Agentic AI con roles claros, priorización basada en valor de negocio y evaluaciones de riesgo." }, // [cite: 12]
      { level: 4, points: 4, label: "🟢 NIVEL 4 - MEDIDO", desc: "Lineamientos gestionados proactivamente con mediciones cuantitativas. El desempeño de implementaciones existentes informa nuevos casos de uso con métricas claras." }, // [cite: 13, 14]
      { level: 5, points: 5, label: "🔵 NIVEL 5 - OPTIMIZADO", desc: "Lineamientos evaluados y refinados continuamente con datos y feedback. La organización busca proactivamente nuevos casos de uso e integra capacidades emergentes." } // [cite: 15, 16]
    ]
  },
  {
    id: "Q2",
    dimension: "Business",
    title: "Integración de GenAI en Procesos", // [cite: 17]
    text: "¿Tiene su organización mecanismos para integrar soluciones de Generative AI y Agentic AI en los procesos de negocio existentes?", // [cite: 18]
    options: [
      { level: 1, points: 1, label: "🔴 NIVEL 1 - INICIAL", desc: "No existen mecanismos de integración. Las soluciones GenAI se implementan como experimentos aislados o pruebas de concepto sin enfoque en integración amplia." }, // [cite: 20, 21]
      { level: 2, points: 2, label: "🟠 NIVEL 2 - FUNDACIONAL", desc: "Enfoques básicos de integración definidos pero aplicados inconsistentemente. No hay enfoque estandarizado en la organización para incorporar GenAI." }, // [cite: 22, 23]
      { level: 3, points: 3, label: "🟡 NIVEL 3 - DEFINIDO", desc: "Lineamientos definidos para integrar soluciones GenAI y Agentic AI. Se desarrolla capacitación para abordar nuevos requisitos de datos, privacidad y riesgos." }, // [cite: 24, 25]
      { level: 4, points: 4, label: "🟢 NIVEL 4 - MEDIDO", desc: "Mecanismos de integración gestionados proactivamente con coordinación fuerte. KPIs claros rastrean mejoras en procesos y desempeño de agentes." }, // [cite: 26, 27]
      { level: 5, points: 5, label: "🔵 NIVEL 5 - OPTIMIZADO", desc: "La organización optimiza activamente la integración de GenAI en procesos. El enfoque se refina mediante ciclos de feedback con impacto medible rastreado." } // [cite: 28, 29]
    ]
  },

  // --- DIMENSIÓN PEOPLE [cite: 30] ---
  {
    id: "Q3",
    dimension: "People",
    title: "Programa de Desarrollo de Habilidades", // [cite: 31]
    text: "¿Existe un programa de desarrollo de habilidades en AI enfocado en diferentes personas (líderes de negocio, desarrolladores AI, ingenieros de datos, científicos de datos, usuarios finales) cubriendo ML, Generative AI y Agentic AI?", // [cite: 32]
    options: [
      { level: 1, points: 1, label: "🔴 NIVEL 1 - INICIAL", desc: "No existe programa estructurado de desarrollo de habilidades AI. El aprendizaje ocurre por iniciativa individual sin distinción entre roles organizacionales." }, // [cite: 34, 35]
      { level: 2, points: 2, label: "🟠 NIVEL 2 - FUNDACIONAL", desc: "Materiales básicos de capacitación disponibles pero aplicados inconsistentemente. Talleres informales para roles técnicos sin enfoque estructurado por persona." }, // [cite: 36, 37]
      { level: 3, points: 3, label: "🟡 NIVEL 3 - DEFINIDO", desc: "Rutas de aprendizaje AI definidas para diferentes personas con sesiones regulares. Roles definidos en el journey de aprendizaje con currículum y métodos de evaluación." }, // [cite: 38, 39]
      { level: 4, points: 4, label: "🟢 NIVEL 4 - MEDIDO", desc: "Programa integral de desarrollo de habilidades gestionado activamente con progreso rastreado. Métricas de desempeño establecidas y revisadas regularmente." }, // [cite: 40, 41]
      { level: 5, points: 5, label: "🔵 NIVEL 5 - OPTIMIZADO", desc: "Programa adaptativo que evoluciona con feedback y tecnologías emergentes. Aborda brechas de habilidades proactivamente con impacto medible en el negocio." } // [cite: 42, 43]
    ]
  },

  // --- DIMENSIÓN GOVERNANCE [cite: 44] ---
  {
    id: "Q4",
    dimension: "Governance",
    title: "Políticas de Uso Responsable de AI", // [cite: 45]
    text: "¿Existen políticas y lineamientos de uso responsable de AI integrados en procesos de desarrollo, lineamientos operacionales y frameworks de gestión de riesgos?", // [cite: 46]
    options: [
      { level: 1, points: 1, label: "🔴 NIVEL 1 - INICIAL", desc: "No hay políticas formales de AI responsable. Documentación de modelos ausente o ad-hoc sin enfoque estandarizado. Equipos toman decisiones sin guía formal." }, // [cite: 48, 49]
      { level: 2, points: 2, label: "🟠 NIVEL 2 - FUNDACIONAL", desc: "Políticas básicas de AI responsable existen pero se aplican inconsistentemente. Templates básicos de documentación varían entre equipos con cobertura limitada." }, // [cite: 50, 51]
      { level: 3, points: 3, label: "🟡 NIVEL 3 - DEFINIDO", desc: "Lineamientos de AI responsable aplicados en la organización con requisitos de documentación. Templates cubren desarrollo, principios éticos, privacidad y bias." }, // [cite: 52, 53]
      { level: 4, points: 4, label: "🟢 NIVEL 4 - MEDIDO", desc: "Framework de AI Responsable con lineamientos de implementación, planes de mitigación y procesos de gestión de riesgos. Documentación robusta de modelos." }, // [cite: 54, 55]
      { level: 5, points: 5, label: "🔵 NIVEL 5 - OPTIMIZADO", desc: "Desarrollo y refinamiento proactivo de lineamientos de AI Responsable. Documentación captura ciclo de vida completo integrada con sistemas de gobernanza." } // [cite: 56, 57]
    ]
  },
  {
    id: "Q5",
    dimension: "Governance",
    title: "Evaluación de Riesgos de AI", // [cite: 58]
    text: "¿Ha establecido su organización mecanismos para pre-evaluar el impacto potencial de negocio, legal y ético de soluciones AI no-determinísticas (resultados inesperados, alucinaciones, comportamiento impredecible de agentes) con prácticas de mitigación?", // [cite: 59]
    options: [
      { level: 1, points: 1, label: "🔴 NIVEL 1 - INICIAL", desc: "No existen procesos formales de evaluación de riesgos AI. Respuestas a comportamientos inesperados son reactivas, ocurriendo solo después de incidentes." }, // [cite: 61, 62]
      { level: 2, points: 2, label: "🟠 NIVEL 2 - FUNDACIONAL", desc: "Mecanismos básicos de evaluación de riesgos y guardrails existen pero se aplican inconsistentemente. Consideración limitada de riesgos de agentes autónomos." }, // [cite: 63, 64]
      { level: 3, points: 3, label: "🟡 NIVEL 3 - DEFINIDO", desc: "Framework de evaluación de riesgos estandarizado en la organización. Lineamientos documentados para identificar, evaluar y mitigar riesgos AI potenciales." }, // [cite: 65, 66]
      { level: 4, points: 4, label: "🟢 NIVEL 4 - MEDIDO", desc: "Framework incluye análisis de escenarios para visualizar resultados potenciales y su impacto. Estrategias de mitigación como guardrails implementadas." }, // [cite: 67, 68]
      { level: 5, points: 5, label: "🔵 NIVEL 5 - OPTIMIZADO", desc: "Estrategia integral y proactiva de evaluación y mitigación de riesgos AI que evoluciona con capacidades emergentes. Mejores prácticas documentadas y compartidas." } // [cite: 69, 70]
    ]
  },

  // --- DIMENSIÓN PLATFORM [cite: 71] ---
  {
    id: "Q6",
    dimension: "Platform",
    title: "Prácticas de Diseño AI-First", // [cite: 72]
    text: "¿Ha adoptado su organización prácticas de diseño de aplicaciones AI-first, asegurando que los desarrolladores comprendan las características únicas de trabajar con ML, Generative AI y agentes autónomos?", // [cite: 73]
    options: [
      { level: 1, points: 1, label: "🔴 NIVEL 1 - INICIAL", desc: "No se han adoptado prácticas de diseño AI-first. Desarrolladores carecen de comprensión de conceptos AI como salidas probabilísticas o autonomía de agentes." }, // [cite: 75, 76]
      { level: 2, points: 2, label: "🟠 NIVEL 2 - FUNDACIONAL", desc: "Conciencia básica de cómo incertidumbres AI afectan experiencia de usuario. Interfaces consideran ocasionalmente limitaciones AI sin enfoque consistente." }, // [cite: 77, 78]
      { level: 3, points: 3, label: "🟡 NIVEL 3 - DEFINIDO", desc: "Aplicaciones diseñadas considerando cómo incertidumbres AI afectan usuarios. Patrones arquitectónicos estándar para gestionar incertidumbres y agentes." }, // [cite: 79, 80]
      { level: 4, points: 4, label: "🟢 NIVEL 4 - MEDIDO", desc: "Prácticas de diseño AI-first con habilidades avanzadas en experiencias robustas. Métricas rastrean satisfacción de usuario en niveles de confianza variables." }, // [cite: 81, 82]
      { level: 5, points: 5, label: "🔵 NIVEL 5 - OPTIMIZADO", desc: "Aplicaciones integran componentes AI con cuantificación avanzada de incertidumbre y adaptación dinámica. Métricas demuestran excelencia consistente." } // [cite: 83, 84]
    ]
  },
  {
    id: "Q7",
    dimension: "Platform",
    title: "Plataformas de Ciclo de Vida AI", // [cite: 85]
    text: "¿Utiliza su organización plataformas AI que soporten todos los aspectos del ciclo de vida AI - desde preparación de datos hasta despliegue y gestión en producción - para soluciones ML, Generative AI y Agentic AI?", // [cite: 86]
    options: [
      { level: 1, points: 1, label: "🔴 NIVEL 1 - INICIAL", desc: "Herramientas y plataformas desconectadas que soportan aspectos aislados del ciclo de vida AI. Equipos usan diferentes herramientas para varias etapas." }, // [cite: 88, 89]
      { level: 2, points: 2, label: "🟠 NIVEL 2 - FUNDACIONAL", desc: "Plataformas soportan algunos aspectos del ciclo de vida AI. Workflows no están integrados end-to-end con soporte limitado para MLOps o FMOps." }, // [cite: 90, 91]
      { level: 3, points: 3, label: "🟡 NIVEL 3 - DEFINIDO", desc: "Plataformas soportan la mayoría de aspectos del ciclo de vida AI con capacidades integradas. Enfoques consistentes con automatización básica." }, // [cite: 92, 93]
      { level: 4, points: 4, label: "🟢 NIVEL 4 - MEDIDO", desc: "Plataformas incluyen capacidades avanzadas para preparación de datos, desarrollo, automatización de despliegue y gestión. Workflows integrados eficientes." }, // [cite: 94, 95]
      { level: 5, points: 5, label: "🔵 NIVEL 5 - OPTIMIZADO", desc: "Plataformas optimizan workflows en todas las etapas del ciclo de vida con herramientas avanzadas de monitoreo. Procesos de mejora continua basados en uso." } // [cite: 96, 97]
    ]
  },

  // --- DIMENSIÓN SECURITY [cite: 98] ---
  {
    id: "Q8",
    dimension: "Security",
    title: "Prácticas de Seguridad de Ambientes", // [cite: 99]
    text: "¿Ha implementado su organización mejores prácticas para mantener ambientes y datos seguros, prevenir fuga de datos y asegurar sistemas AI contra vulnerabilidades y comportamientos no intencionados?", // [cite: 100]
    options: [
      { level: 1, points: 1, label: "🔴 NIVEL 1 - INICIAL", desc: "No existen prácticas de seguridad definidas para ambientes AI o protección de datos. Controles de seguridad para modelos AI son ad-hoc y reactivos." }, // [cite: 102, 103]
      { level: 2, points: 2, label: "🟠 NIVEL 2 - FUNDACIONAL", desc: "Controles básicos de seguridad en lugar pero no comprensivos para necesidades AI. Conciencia de riesgos de fuga de datos implementada inconsistentemente." }, // [cite: 104, 105]
      { level: 3, points: 3, label: "🟡 NIVEL 3 - DEFINIDO", desc: "Lineamientos existen para evaluar y prevenir riesgos de fuga de datos. Protocolos guían protección de modelos, datos y comportamientos de agentes." }, // [cite: 106, 107]
      { level: 4, points: 4, label: "🟢 NIVEL 4 - MEDIDO", desc: "Controles de seguridad comprensivos monitoreados activamente con métricas cuantitativas. Detección automatizada de fuga potencial de datos." }, // [cite: 108, 109]
      { level: 5, points: 5, label: "🔵 NIVEL 5 - OPTIMIZADO", desc: "La organización adapta y mejora proactivamente prácticas de seguridad AI. Medidas optimizadas continuamente basadas en amenazas emergentes y mejores prácticas." } // [cite: 110, 111]
    ]
  },
  {
    id: "Q9",
    dimension: "Security",
    title: "Políticas de Seguridad AI", // [cite: 112]
    text: "¿Ha establecido su organización políticas, estándares y lineamientos claros de seguridad junto con roles y responsabilidades relacionados con AI?", // [cite: 113]
    options: [
      { level: 1, points: 1, label: "🔴 NIVEL 1 - INICIAL", desc: "No existen políticas o estándares de seguridad AI. Roles y responsabilidades de seguridad para sistemas AI indefinidos o poco claros." }, // [cite: 115, 116]
      { level: 2, points: 2, label: "🟠 NIVEL 2 - FUNDACIONAL", desc: "Políticas básicas de seguridad AI documentadas pero aplicadas inconsistentemente. Roles iniciales definidos pero carecen de cobertura de necesidades AI." }, // [cite: 117, 118]
      { level: 3, points: 3, label: "🟡 NIVEL 3 - DEFINIDO", desc: "Framework de gobernanza de seguridad AI establecido con políticas, estándares y lineamientos claros. Roles bien definidos en todos los aspectos." }, // [cite: 119, 120]
      { level: 4, points: 4, label: "🟢 NIVEL 4 - MEDIDO", desc: "Framework comprensivo de gobernanza de seguridad gestionado activamente con métricas cuantitativas. Auditorías regulares evalúan efectividad de políticas." }, // [cite: 121, 122]
      { level: 5, points: 5, label: "🔵 NIVEL 5 - OPTIMIZADO", desc: "Gobernanza de seguridad AI se adapta proactivamente a desafíos emergentes. Políticas actualizadas continuamente basadas en resultados medidos y amenazas." } // [cite: 123, 124]
    ]
  },

  // --- DIMENSIÓN OPERATIONS [cite: 125] ---
  {
    id: "Q10",
    dimension: "Operations",
    title: "Mecanismos de Observabilidad", // [cite: 126]
    text: "¿Ha establecido su organización mecanismos automatizados para observabilidad y respuesta a incidentes en soluciones AI?", // [cite: 127]
    options: [
      { level: 1, points: 1, label: "🔴 NIVEL 1 - INICIAL", desc: "Falta de mecanismos automatizados de monitoreo. No hay forma sistemática de detectar o responder a incidentes, dependiendo de reportes de usuarios." }, // [cite: 129, 130]
      { level: 2, points: 2, label: "🟠 NIVEL 2 - FUNDACIONAL", desc: "Herramientas básicas de monitoreo implementadas para algunas soluciones AI con cobertura inconsistente. Alertas simples para fallas obvias." }, // [cite: 131, 132]
      { level: 3, points: 3, label: "🟡 NIVEL 3 - DEFINIDO", desc: "Prácticas estandarizadas de monitoreo y observabilidad automatizadas. Dashboards rastrean desempeño de modelos y salud del sistema con alertas configuradas." }, // [cite: 133, 134]
      { level: 4, points: 4, label: "🟢 NIVEL 4 - MEDIDO", desc: "Herramientas automatizadas de observabilidad proveen insights profundos. Mecanismos de respuesta automatizados manejan incidentes comunes con escalamiento rápido." }, // [cite: 135, 136]
      { level: 5, points: 5, label: "🔵 NIVEL 5 - OPTIMIZADO", desc: "Capacidad de detectar, diagnosticar y resolver problemas antes de impactar usuarios. Respuesta altamente automatizada con supervisión humana y analytics predictivos." } // [cite: 137, 138]
    ]
  }
];