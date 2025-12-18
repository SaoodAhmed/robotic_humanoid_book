<!--
Sync Impact Report:
Version change: 1.0.0 → 1.1.0
Modified principles: Added RAG Chatbot Integration section
Added sections: RAG Chatbot Integration principles
Removed sections: None
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ updated
  - .specify/templates/spec-template.md ✅ updated
  - .specify/templates/tasks-template.md ✅ updated
  - .specify/templates/commands/sp.constitution.md ✅ updated
Follow-up TODOs: None
-->

# Physical AI & Humanoid Robotics Textbook Constitution

## Core Principles

### Technical Accuracy
All technical explanations must be correct and consistent with ROS 2, Gazebo, Unity, NVIDIA Isaac, and VLA documentation; All hardware recommendations must be validated for current compatibility (Jetson, RealSense, Unitree, etc.)

### Pedagogical Clarity
Content must be optimized for educational material (Flesch-Kincaid grade 10–14); Include diagrams, tables, and code samples where beneficial; Accessibility for students with varying levels of prior robotics experience

### Coherence and Structure
Content must maintain coherence across modules (ROS 2, Gazebo, Unity, Isaac, VLA); All content must be structured for Docusaurus (MDX format, clean headings, navigable sidebar); All module descriptions must include: concepts, tools, student tasks, and learning outcomes

### Practical Relevance
Content must focus on practical relevance to real-world humanoid robotics workflows; Students must be able to follow the book to set up ROS 2, Gazebo, Unity, NVIDIA Isaac, and Jetson workflows without confusion

### Content Standards
Zero plagiarism; all external descriptions must be original wording; Hardware pricing must not include fictional data; only general ranges allowed; Writing quality optimized for educational material

### Deployment and Format Compliance
Writing format: MDX files compatible with Docusaurus v3+; Deployment-ready folder structure for GitHub Pages; Visuals: Provide textual placeholders for diagrams, figures, and flowcharts

## RAG Chatbot Integration Principles

### Faithful Retrieval
All chatbot answers must be grounded in retrieved textbook passages; Knowledge scope limited strictly to published textbook content; Zero hallucination tolerance; Fallback response required when information is not present in the retrieved context

### Accurate Context-Aware Responses
Support two modes: full-book RAG and user-selected-text-only answering; Selected-text mode must ignore all non-selected content; Responses must be accurate, context-aware, and suitable for students and instructors

### Seamless Integration
Frontend integration must not disrupt Docusaurus performance or navigation; Privacy-safe and cost-conscious system design; Clear, helpful responses with explicit source attribution

### Technical Standards
Retrieval must use vector search (Qdrant) with explicit source attribution; Backend API implemented using FastAPI with clear request/response schemas; Data storage using Neon serverless Postgres for metadata and conversation state; LLM interaction via OpenAI Agents / ChatKit SDKs with controlled prompts and guardrails

### Cost and Performance Constraints
Must operate within free-tier or low-cost limits (Qdrant Cloud Free Tier, Neon Free Tier); Stateless or minimally stateful sessions; no long-term personal data storage; No training or fine-tuning of models; retrieval + prompting only; Latency must remain acceptable for interactive use

## Content and Technical Constraints

Full textbook length: Equivalent of 120–180 pages of instructional content; Hardware/software recommendations must be realistic, actionable, and coherent; Textbook can be directly placed inside a Docusaurus project and rendered without modification; Codebase must be modular and deployment-ready

## Success Criteria and Course Flow

Entire course flows from fundamentals → simulation → perception → humanoid control → VLA → capstone; The textbook is suitable for use in a 12–15 week university course; Final result is logically complete, technically accurate, and ready for deployment as a public course textbook; Users can ask questions about any module and receive correct, cited answers; Users can select text in the book and ask questions answered only from that selection; Chatbot consistently refuses or defers when information is not present in the retrieved context; End-to-end system deploys successfully (Docusaurus frontend + FastAPI backend); System is reliable, explainable, and suitable for educational deployment

## Governance

This constitution governs all development of the Physical AI & Humanoid Robotics textbook and its integrated RAG chatbot; All content must adhere to Docusaurus MDX format requirements; All technical information must be verified against official documentation sources; Course structure must follow the logical progression from fundamentals to capstone project; Compliance with educational standards (Flesch-Kincaid grade 10-14) is mandatory; All diagrams and visuals must have appropriate textual placeholders for accessibility; All chatbot responses must be grounded in retrieved textbook content with explicit source attribution

**Version**: 1.1.0 | **Ratified**: 2025-12-11 | **Last Amended**: 2025-12-18