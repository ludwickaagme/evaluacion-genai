export const questions = [
  // --- BUSINESS ---
  {
    id: "Q1",
    dimension: "Business",
    title: "Identification of GenAI Use Cases",
    text: "Does your organization have guidelines to identify and prioritize use cases that could benefit from Generative AI or Agentic AI capabilities?",
    options: [
      { level: 1, points: 1, label: "Initial", desc: "No guidelines exist." },
      { level: 2, points: 2, label: "Foundational", desc: "Basic guidelines exist but are applied inconsistently" },
      { level: 3, points: 3, label: "Defined", desc: "Defined guidelines exist with clear roles" },
      { level: 4, points: 4, label: "Measured", desc: "Guidelines are proactively managed with quantitative measurements" },
      { level: 5, points: 5, label: "Optimized", desc: "Guidelines are continuously evaluated and refined using data and feedback" }
    ]
  },
  {
    id: "Q2",
    dimension: "Business",
    title: "Integration of GenAI into Processes",
    text: "Does your organization have mechanisms to integrate Generative AI and Agentic AI solutions into existing business processes?",
    options: [
      { level: 1, points: 1, label: "Initial", desc: "No integration mechanisms" },
      { level: 2, points: 2, label: "Foundational", desc: "Basic integration approaches" },
      { level: 3, points: 3, label: "Defined", desc: "Defined guidelines with training" },
      { level: 4, points: 4, label: "Measured", desc: "Managed integration with KPIs" },
      { level: 5, points: 5, label: "Optimized", desc: "Optimized integration with feedback" }
    ]
  },

  // --- PEOPLE  ---
  {
    id: "Q3",
    dimension: "People",
    title: "AI Skills Development Program",
    text: "Is there an AI skills development program focused on different personas (business leaders, AI developers, data engineers, data scientists, end users) covering ML, Generative AI and Agentic AI?",
    options: [
      { level: 1, points: 1, label: "Initial", desc: "No structured skills program" },
      { level: 2, points: 2, label: "Foundational", desc: "Basic training, inconsistent application" },
      { level: 3, points: 3, label: "Defined", desc: "Defined learning paths by persona" },
      { level: 4, points: 4, label: "Measured", desc: "Managed program with tracked progress" },
      { level: 5, points: 5, label: "Optimized", desc: "Adaptive program addressing skill gaps" }
    ]
  },

  // --- GOVERNANCE ---
  {
    id: "Q4",
    dimension: "Governance",
    title: "Responsible AI Use Policies",
    text: "Are there policies and guidelines for responsible AI use integrated into development processes, operational guidelines and risk management frameworks?",
    options: [
      { level: 1, points: 1, label: "Initial", desc: "No responsible AI policies" },
      { level: 2, points: 2, label: "Foundational", desc: "Basic policies, inconsistent application" },
      { level: 3, points: 3, label: "Defined", desc: "Guidelines with documentation requirements" },
      { level: 4, points: 4, label: "Measured", desc: "Framework with mitigation plans" },
      { level: 5, points: 5, label: "Optimized", desc: "Proactively refined responsible AI guidelines" }
    ]
  },
  {
    id: "Q5",
    dimension: "Governance",
    title: "AI Risk Assessment",
    text: "Has your organization established mechanisms to pre-assess the potential business, legal and ethical impact of non-deterministic AI solutions (unexpected outputs, hallucinations, unpredictable agent behavior) with mitigation practices?",
    options: [
      { level: 1, points: 1, label: "Initial", desc: "No AI risk assessment processes" },
      { level: 2, points: 2, label: "Foundational", desc: "Basic guardrails, inconsistent application" },
      { level: 3, points: 3, label: "Defined", desc: "Standardized risk assessment framework" },
      { level: 4, points: 4, label: "Measured", desc: "Scenario analysis and mitigations" },
      { level: 5, points: 5, label: "Optimized", desc: "Comprehensive, evolving risk strategy" }
    ]
  },

  // --- PLATFORM  ---
  {
    id: "Q6",
    dimension: "Platform",
    title: "AI-First Design Practices",
    text: "Has your organization adopted AI-first application design practices, ensuring developers understand the unique characteristics of working with ML, Generative AI and autonomous agents?",
    options: [
      { level: 1, points: 1, label: "Initial", desc: "No AI-first design practices" },
      { level: 2, points: 2, label: "Foundational", desc: "Basic awareness of AI uncertainty" },
      { level: 3, points: 3, label: "Defined", desc: "Designs that consider AI uncertainty" },
      { level: 4, points: 4, label: "Measured", desc: "AI-first practices with metrics" },
      { level: 5, points: 5, label: "Optimized", desc: "Advanced uncertainty quantification" }
    ]
  },
  {
    id: "Q7",
    dimension: "Platform",
    title: "AI Lifecycle Platforms",
    text: "Does your organization use AI platforms that support all aspects of the AI lifecycle - from data preparation to deployment and production management - for ML, Generative AI and Agentic AI solutions?",
    options: [
      { level: 1, points: 1, label: "Initial", desc: "Disconnected lifecycle tools" },
      { level: 2, points: 2, label: "Foundational", desc: "Platforms support some lifecycle stages" },
      { level: 3, points: 3, label: "Defined", desc: "Platforms support most lifecycle stages" },
      { level: 4, points: 4, label: "Measured", desc: "Advanced capabilities and automation" },
      { level: 5, points: 5, label: "Optimized", desc: "Optimized end-to-end lifecycle platforms" }
    ]
  },

  // --- SECURITY  ---
  {
    id: "Q8",
    dimension: "Security",
    title: "Environment Security Practices",
    text: "Has your organization implemented best practices to keep environments and data secure, prevent data leakage and protect AI systems against vulnerabilities and unintended behaviors?",
    options: [
      { level: 1, points: 1, label: "Initial", desc: "No security practices for AI" },
      { level: 2, points: 2, label: "Foundational", desc: "Basic security controls, incomplete" },
      { level: 3, points: 3, label: "Defined", desc: "Guidelines to prevent data leakage" },
      { level: 4, points: 4, label: "Measured", desc: "Monitored controls with metrics" },
      { level: 5, points: 5, label: "Optimized", desc: "Proactive AI security improvements" }
    ]
  },
  {
    id: "Q9",
    dimension: "Security",
    title: "AI Security Policies",
    text: "Has your organization established clear security policies, standards and guidelines along with roles and responsibilities related to AI?",
    options: [
      { level: 1, points: 1, label: "Initial", desc: "No AI security policies" },
      { level: 2, points: 2, label: "Foundational", desc: "Basic policies, inconsistent" },
      { level: 3, points: 3, label: "Defined", desc: "Governance framework with clear roles" },
      { level: 4, points: 4, label: "Measured", desc: "Managed governance with audits" },
      { level: 5, points: 5, label: "Optimized", desc: "Adaptive security governance" }
    ]
  },

  // --- OPERATIONS  ---
  {
    id: "Q10",
    dimension: "Operations",
    title: "Observability Mechanisms",
    text: "Has your organization established automated mechanisms for observability and incident response in AI solutions?",
    options: [
      { level: 1, points: 1, label: "Initial", desc: "No automated monitoring mechanisms" },
      { level: 2, points: 2, label: "Foundational", desc: "Basic monitoring, limited coverage" },
      { level: 3, points: 3, label: "Defined", desc: "Standardized automated observability" },
      { level: 4, points: 4, label: "Measured", desc: "Deep observability with automated response" },
      { level: 5, points: 5, label: "Optimized", desc: "Predictive, highly automated incident response" }
    ]
  }
];
