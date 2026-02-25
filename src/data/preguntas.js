// src/data/preguntas.js

export const questions = [
  // --- DIMENSIÓN BUSINESS ---
  {
    id: "Q1",
    dimension: "Business",
    title: "Identificación de Casos de Uso GenAI", 
    text: "¿Tiene su organización lineamientos para identificar y priorizar casos de uso que puedan beneficiarse de capacidades de Generative AI o Agentic AI?", 
    options: [
      { level: 1, points: 1, label: "Inicial", title: "No existen lineamientos", desc: "No existen lineamientos. La identificación de casos de uso GenAI ocurre de manera reactiva y descoordinada, impulsada por intereses individuales o solicitudes ad-hoc." },
      { level: 2, points: 2, label: "Fundacional", title: "Existen lineamientos básicos para GenAI", desc: "Existen lineamientos básicos para GenAI pero se aplican inconsistentemente entre equipos, sin alineación con los objetivos organizacionales." },
      { level: 3, points: 3, label: "Definido", title: "Lineamientos definidos para identificar oportunidades", desc: "Lineamientos definidos para identificar oportunidades GenAI y Agentic AI con roles claros, priorización basada en valor de negocio y evaluaciones de riesgo." }, 
      { level: 4, points: 4, label: "Medido", title: "Lineamientos gestionados proactivamente", desc: "Lineamientos gestionados proactivamente con mediciones cuantitativas. El desempeño de implementaciones existentes informa nuevos casos de uso con métricas claras." }, 
      { level: 5, points: 5, label: "Optimizado", title: "Lineamientos evaluados y refinados", desc: "Lineamientos evaluados y refinados continuamente con datos y feedback. La organización busca proactivamente nuevos casos de uso e integra capacidades emergentes." } 
    ]
  },
  {
    id: "Q2",
    dimension: "Business",
    title: "Integración de GenAI en Procesos", 
    text: "¿Tiene su organización mecanismos para integrar soluciones de Generative AI y Agentic AI en los procesos de negocio existentes?", 
    options: [
      { level: 1, points: 1, label: "Inicial", title: "No existen mecanismos de integración", desc: "No existen mecanismos de integración. Las soluciones GenAI se implementan como experimentos aislados o pruebas de concepto sin enfoque en integración amplia." }, 
      { level: 2, points: 2, label: "Fundacional", title: "Enfoques básicos de integración definidos", desc: "Enfoques básicos de integración definidos pero aplicados inconsistentemente. No hay enfoque estandarizado en la organización para incorporar GenAI." }, 
      { level: 3, points: 3, label: "Definido", title: "Lineamientos definidos para integrar soluciones GenAI", desc: "Lineamientos definidos para integrar soluciones GenAI y Agentic AI. Se desarrolla capacitación para abordar nuevos requisitos de datos, privacidad y riesgos." }, 
      { level: 4, points: 4, label: "Medido", title: "Mecanismos de integración gestionados", desc: "Mecanismos de integración gestionados proactivamente con coordinación fuerte. KPIs claros rastrean mejoras en procesos y desempeño de agentes." }, 
      { level: 5, points: 5, label: "Optimizado", title: "Organización optimiza la integración", desc: "La organización optimiza activamente la integración de GenAI en procesos. El enfoque se refina mediante ciclos de feedback con impacto medible rastreado." } 
    ]
  },

  // --- DIMENSION PEOPLE  ---
  {
    id: "Q3",
    dimension: "People",
    title: "Programa de Desarrollo de Habilidades", 
    text: "¿Existe un programa de desarrollo de habilidades en AI enfocado en diferentes personas (líderes de negocio, desarrolladores AI, ingenieros de datos, científicos de datos, usuarios finales) cubriendo ML, Generative AI y Agentic AI?", 
    options: [
      { level: 1, points: 1, label: "Inicial", title: "No existe programa estructurado", desc: "No existe programa estructurado de desarrollo de habilidades AI. El aprendizaje ocurre por iniciativa individual sin distinción entre roles organizacionales." }, 
      { level: 2, points: 2, label: "Fundacional", title: "Materiales básicos de capacitación disponibles", desc: "Materiales básicos de capacitación disponibles pero aplicados inconsistentemente. Talleres informales para roles técnicos sin enfoque estructurado por persona." }, 
      { level: 3, points: 3, label: "Definido", title: "Rutas de aprendizaje definidas por persona", desc: "Rutas de aprendizaje AI definidas para diferentes personas con sesiones regulares. Roles definidos en el journey de aprendizaje con currículum y métodos de evaluación." }, 
      { level: 4, points: 4, label: "Medido", title: "Programa gestionado con progreso rastreado", desc: "Programa integral de desarrollo de habilidades gestionado activamente con progreso rastreado. Métricas de desempeño establecidas y revisadas regularmente." }, 
      { level: 5, points: 5, label: "Optimizado", title: "Programa adaptativo que evoluciona", desc: "Programa adaptativo que evoluciona con feedback y tecnologías emergentes. Aborda brechas de habilidades proactivamente con impacto medible en el negocio." } 
    ]
  },

  // --- DIMENSION GOVERNANCE ---
  {
    id: "Q4",
    dimension: "Governance",
    title: "Políticas de Uso Responsable de AI", 
    text: "¿Existen políticas y lineamientos de uso responsable de AI integrados en procesos de desarrollo, lineamientos operacionales y marcos de trabajo de gestión de riesgos?", 
    options: [
      { level: 1, points: 1, label: "Inicial", title: "No hay políticas formales de AI responsable", desc: "No hay políticas formales de AI responsable. Documentación de modelos ausente o ad-hoc sin enfoque estandarizado. Equipos toman decisiones sin guía formal." }, 
      { level: 2, points: 2, label: "Fundacional", title: "Políticas básicas aplicadas inconsistentemente", desc: "Políticas básicas de AI responsable existen pero se aplican inconsistentemente. Templates básicos de documentación varían entre equipos con cobertura limitada." }, 
      { level: 3, points: 3, label: "Definido", title: "Lineamientos con requisitos de documentación", desc: "Lineamientos de AI responsable aplicados en la organización con requisitos de documentación. Templates cubren desarrollo, principios éticos, privacidad y bias." }, 
      { level: 4, points: 4, label: "Medido", title: "Marco de trabajo con planes de mitigación", desc: "Marco de trabajo de AI Responsable con lineamientos de implementación, planes de mitigación y procesos de gestión de riesgos. Documentación robusta de modelos." }, 
      { level: 5, points: 5, label: "Optimizado", title: "Desarrollo y refinamiento proactivo", desc: "Desarrollo y refinamiento proactivo de lineamientos de AI Responsable. Documentación captura ciclo de vida completo integrada con sistemas de gobernanza." } 
    ]
  },
  {
    id: "Q5",
    dimension: "Governance",
    title: "Evaluación de Riesgos de AI", 
    text: "¿Ha establecido su organización mecanismos para pre-evaluar el impacto potencial de negocio, legal y ético de soluciones AI no-determinísticas (resultados inesperados, alucinaciones, comportamiento impredecible de agentes) con prácticas de mitigación?", 
    options: [
      { level: 1, points: 1, label: "Inicial", title: "No existen procesos formales de evaluación de riesgos AI", desc: "No existen procesos formales de evaluación de riesgos AI. Respuestas a comportamientos inesperados son reactivas, ocurriendo solo después de incidentes." }, 
      { level: 2, points: 2, label: "Fundacional", title: "Mecanismos básicos de evaluación de riesgos", desc: "Mecanismos básicos de evaluación de riesgos y guardrails existen pero se aplican inconsistentemente. Consideración limitada de riesgos de agentes autónomos." }, 
      { level: 3, points: 3, label: "Definido", title: "Marco de trabajo estandarizado de evaluación de riesgos", desc: "Marco de trabajo de evaluación de riesgos estandarizado en la organización. Lineamientos documentados para identificar, evaluar y mitigar riesgos AI potenciales." }, 
      { level: 4, points: 4, label: "Medido", title: "Marco de trabajo con análisis de escenarios", desc: "Marco de trabajo incluye análisis de escenarios para visualizar resultados potenciales y su impacto. Estrategias de mitigación como guardrails implementadas." }, 
      { level: 5, points: 5, label: "Optimizado", title: "Estrategia integral y proactiva", desc: "Estrategia integral y proactiva de evaluación y mitigación de riesgos AI que evoluciona con capacidades emergentes. Mejores prácticas documentadas y compartidas." } 
    ]
  },

  // --- DIMENSION PLATFORM  ---
  {
    id: "Q6",
    dimension: "Platform",
    title: "Prácticas de Diseño AI-First", 
    text: "¿Ha adoptado su organización prácticas de diseño de aplicaciones AI-first, asegurando que los desarrolladores comprendan las características únicas de trabajar con ML, Generative AI y agentes autónomos?", 
    options: [
      { level: 1, points: 1, label: "Inicial", title: "No se han adoptado prácticas AI-first", desc: "No se han adoptado prácticas de diseño AI-first. Desarrolladores carecen de comprensión de conceptos AI como salidas probabilísticas o autonomía de agentes." }, 
      { level: 2, points: 2, label: "Fundacional", title: "Conciencia básica de incertidumbre AI", desc: "Conciencia básica de cómo incertidumbres AI afectan experiencia de usuario. Interfaces consideran ocasionalmente limitaciones AI sin enfoque consistente." }, 
      { level: 3, points: 3, label: "Definido", title: "Diseños que consideran incertidumbre AI", desc: "Aplicaciones diseñadas considerando cómo incertidumbres AI afectan usuarios. Patrones arquitectónicos estándar para gestionar incertidumbres y agentes." }, 
      { level: 4, points: 4, label: "Medido", title: "Prácticas AI-first con métricas", desc: "Prácticas de diseño AI-first con habilidades avanzadas en experiencias robustas. Métricas rastrean satisfacción de usuario en niveles de confianza variables." }, 
      { level: 5, points: 5, label: "Optimizado", title: "Aplicaciones integran cuantificación avanzada", desc: "Aplicaciones integran componentes AI con cuantificación avanzada de incertidumbre y adaptación dinámica. Métricas demuestran excelencia consistente." } 
    ]
  },
  {
    id: "Q7",
    dimension: "Platform",
    title: "Plataformas de Ciclo de Vida AI", 
    text: "¿Utiliza su organización plataformas AI que soporten todos los aspectos del ciclo de vida AI - desde preparación de datos hasta despliegue y gestión en producción - para soluciones ML, Generative AI y Agentic AI?", 
    options: [
      { level: 1, points: 1, label: "Inicial", title: "Herramientas y plataformas desconectadas", desc: "Herramientas y plataformas desconectadas que soportan aspectos aislados del ciclo de vida AI. Equipos usan diferentes herramientas para varias etapas." }, 
      { level: 2, points: 2, label: "Fundacional", title: "Plataformas soportan algunos aspectos", desc: "Plataformas soportan algunos aspectos del ciclo de vida AI. Workflows no están integrados end-to-end con soporte limitado para MLOps o FMOps." }, 
      { level: 3, points: 3, label: "Definido", title: "Plataformas soportan la mayoría de etapas", desc: "Plataformas soportan la mayoría de aspectos del ciclo de vida AI con capacidades integradas. Enfoques consistentes con automatización básica." }, 
      { level: 4, points: 4, label: "Medido", title: "Plataformas con capacidades avanzadas", desc: "Plataformas incluyen capacidades avanzadas para preparación de datos, desarrollo, automatización de despliegue y gestión. Workflows integrados eficientes." }, 
      { level: 5, points: 5, label: "Optimizado", title: "Plataformas optimizan workflows end-to-end", desc: "Plataformas optimizan workflows en todas las etapas del ciclo de vida con herramientas avanzadas de monitoreo. Procesos de mejora continua basados en uso." } 
    ]
  },

  // --- DIMENSION SECURITY  ---
  {
    id: "Q8",
    dimension: "Security",
    title: "Prácticas de Seguridad de Ambientes", 
    text: "¿Ha implementado su organización mejores prácticas para mantener ambientes y datos seguros, prevenir fuga de datos y asegurar sistemas AI contra vulnerabilidades y comportamientos no intencionados?", 
    options: [
      { level: 1, points: 1, label: "Inicial", title: "No existen prácticas de seguridad definidas", desc: "No existen prácticas de seguridad definidas para ambientes AI o protección de datos. Controles de seguridad para modelos AI son ad-hoc y reactivos." }, 
      { level: 2, points: 2, label: "Fundacional", title: "Controles básicos de seguridad presentes", desc: "Controles básicos de seguridad en lugar pero no comprensivos para necesidades AI. Conciencia de riesgos de fuga de datos implementada inconsistentemente." }, 
      { level: 3, points: 3, label: "Definido", title: "Lineamientos para prevenir fuga de datos", desc: "Lineamientos existen para evaluar y prevenir riesgos de fuga de datos. Protocolos guían protección de modelos, datos y comportamientos de agentes." }, 
      { level: 4, points: 4, label: "Medido", title: "Controles monitoreados con métricas", desc: "Controles de seguridad comprensivos monitoreados activamente con métricas cuantitativas. Detección automatizada de fuga potencial de datos." }, 
      { level: 5, points: 5, label: "Optimizado", title: "Organización adapta prácticas de seguridad", desc: "La organización adapta y mejora proactivamente prácticas de seguridad AI. Medidas optimizadas continuamente basadas en amenazas emergentes y mejores prácticas." } 
    ]
  },
  {
    id: "Q9",
    dimension: "Security",
    title: "Políticas de Seguridad AI", 
    text: "¿Ha establecido su organización políticas, estándares y lineamientos claros de seguridad junto con roles y responsabilidades relacionados con AI?", 
    options: [
      { level: 1, points: 1, label: "Inicial", title: "No existen políticas o estándares de seguridad AI", desc: "No existen políticas o estándares de seguridad AI. Roles y responsabilidades de seguridad para sistemas AI indefinidos o poco claros." }, 
      { level: 2, points: 2, label: "Fundacional", title: "Políticas básicas documentadas", desc: "Políticas básicas de seguridad AI documentadas pero aplicadas inconsistentemente. Roles iniciales definidos pero carecen de cobertura de necesidades AI." }, 
      { level: 3, points: 3, label: "Definido", title: "Marco de trabajo de gobernanza establecido", desc: "Marco de trabajo de gobernanza de seguridad AI establecido con políticas, estándares y lineamientos claros. Roles bien definidos en todos los aspectos." }, 
      { level: 4, points: 4, label: "Medido", title: "Gobernanza gestionada con auditorías", desc: "Marco de trabajo comprensivo de gobernanza de seguridad gestionado activamente con métricas cuantitativas. Auditorías regulares evalúan efectividad de políticas." }, 
      { level: 5, points: 5, label: "Optimizado", title: "Gobernanza de seguridad adaptativa", desc: "Gobernanza de seguridad AI se adapta proactivamente a desafíos emergentes. Políticas actualizadas continuamente basadas en resultados medidos y amenazas." } 
    ]
  },

  // --- DIMENSION OPERATIONS  ---
  {
    id: "Q10",
    dimension: "Operations",
    title: "Mecanismos de Observabilidad", 
    text: "¿Ha establecido su organización mecanismos automatizados para observabilidad y respuesta a incidentes en soluciones AI?", 
    options: [
      { level: 1, points: 1, label: "Inicial", title: "Falta de mecanismos automatizados de monitoreo", desc: "Falta de mecanismos automatizados de monitoreo. No hay forma sistemática de detectar o responder a incidentes, dependiendo de reportes de usuarios." }, 
      { level: 2, points: 2, label: "Fundacional", title: "Herramientas básicas de monitoreo implementadas", desc: "Herramientas básicas de monitoreo implementadas para algunas soluciones AI con cobertura inconsistente. Alertas simples para fallas obvias." }, 
      { level: 3, points: 3, label: "Definido", title: "Observabilidad automatizada estandarizada", desc: "Prácticas estandarizadas de monitoreo y observabilidad automatizadas. Dashboards rastrean desempeño de modelos y salud del sistema con alertas configuradas." }, 
      { level: 4, points: 4, label: "Medido", title: "Observabilidad con insights profundos", desc: "Herramientas automatizadas de observabilidad proveen insights profundos. Mecanismos de respuesta automatizados manejan incidentes comunes con escalamiento rápido." },
      { level: 5, points: 5, label: "Optimizado", title: "Detectar, diagnosticar y resolver problemas pronto", desc: "Capacidad de detectar, diagnosticar y resolver problemas antes de impactar usuarios. Respuesta altamente automatizada con supervisión humana y analytics predictivos." } 
    ]
  }
];