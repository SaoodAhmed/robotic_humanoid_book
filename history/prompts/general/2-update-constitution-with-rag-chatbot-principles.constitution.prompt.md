---
id: 2-update-constitution-with-rag-chatbot-principles
title: Update Constitution with RAG Chatbot Integration Principles
stage: constitution
date: 2025-12-18
model: haiku-4-5-20251001
feature: rag-chatbot-integration
branch: 001-vla-integration
user: Claude
command: /sp.constitution "now update old constitute and also, add the constutue for integrating RAG chatbot Project: Integrated RAG Chatbot for the Physical AI & Humanoid Robotics Textbook

Core principles:

- Faithful retrieval grounded strictly in textbook content

- Accurate, context-aware answers with zero hallucination

- Clear, helpful responses suitable for students and instructors

- Seamless integration with the published Docusaurus textbook

- Privacy-safe and cost-conscious system design

Key standards:

- All chatbot answers must be grounded in retrieved textbook passages

- Support two modes: full-book RAG and user-selected-text-only answering

- Retrieval must use vector search (Qdrant) with explicit source attribution

- Backend API implemented using FastAPI with clear request/response schemas

- Data storage using Neon serverless Postgres for metadata and conversation state

- LLM interaction via OpenAI Agents / ChatKit SDKs with controlled prompts and guardrails

- No training or fine-tuning of models; retrieval + prompting only

- Frontend integration must not disrupt Docusaurus performance or navigation

Constraints:

- Knowledge scope limited strictly to published textbook content

- Selected-text mode must ignore all non-selected content

- Must operate within free-tier or low-cost limits (Qdrant Cloud Free Tier, Neon Free Tier)

- Stateless or minimally stateful sessions; no long-term personal data storage

- Codebase must be modular and deployment-ready

- Zero hallucination tolerance; fallback response required when answer is not supported by retrieved text

Success criteria:

- Users can ask questions about any module and receive correct, cited answers

- Users can select text in the book and ask questions answered only from that selection

- Chatbot consistently refuses or defers when information is not present in the retrieved context

- End-to-end system deploys successfully (Docusaurus frontend + FastAPI backend)

- Latency remains acceptable for interactive use

- System is reliable, explainable, and suitable for educational deployment"
labels: ["constitution", "rag", "chatbot", "integration"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests: []
---

# Update Constitution with RAG Chatbot Integration Principles

## Prompt

"now update old constitute and also, add the constutue for integrating RAG chatbot Project: Integrated RAG Chatbot for the Physical AI & Humanoid Robotics Textbook

Core principles:

- Faithful retrieval grounded strictly in textbook content

- Accurate, context-aware answers with zero hallucination

- Clear, helpful responses suitable for students and instructors

- Seamless integration with the published Docusaurus textbook

- Privacy-safe and cost-conscious system design

Key standards:

- All chatbot answers must be grounded in retrieved textbook passages

- Support two modes: full-book RAG and user-selected-text-only answering

- Retrieval must use vector search (Qdrant) with explicit source attribution

- Backend API implemented using FastAPI with clear request/response schemas

- Data storage using Neon serverless Postgres for metadata and conversation state

- LLM interaction via OpenAI Agents / ChatKit SDKs with controlled prompts and guardrails

- No training or fine-tuning of models; retrieval + prompting only

- Frontend integration must not disrupt Docusaurus performance or navigation

Constraints:

- Knowledge scope limited strictly to published textbook content

- Selected-text mode must ignore all non-selected content

- Must operate within free-tier or low-cost limits (Qdrant Cloud Free Tier, Neon Free Tier)

- Stateless or minimally stateful sessions; no long-term personal data storage

- Codebase must be modular and deployment-ready

- Zero hallucination tolerance; fallback response required when answer is not supported by retrieved text

Success criteria:

- Users can ask questions about any module and receive correct, cited answers

- Users can select text in the book and ask questions answered only from that selection

- Chatbot consistently refuses or defers when information is not present in the retrieved context

- End-to-end system deploys successfully (Docusaurus frontend + FastAPI backend)

- Latency remains acceptable for interactive use

- System is reliable, explainable, and suitable for educational deployment"

## Response

Updated the project constitution to include RAG chatbot integration principles while preserving the existing textbook principles. The new version (1.1.0) adds a dedicated "RAG Chatbot Integration Principles" section with five key principles covering:

1. Faithful Retrieval - grounding answers in textbook passages with zero hallucination
2. Accurate Context-Aware Responses - supporting both full-book and selected-text modes
3. Seamless Integration - maintaining Docusaurus performance and privacy-safe design
4. Technical Standards - using vector search, FastAPI, Neon Postgres, and OpenAI Agents
5. Cost and Performance Constraints - operating within free-tier limits with acceptable latency

The constitution now governs both the textbook content and its integrated RAG chatbot system, ensuring all development adheres to the established principles for both components.

## Outcome

The constitution has been successfully updated to version 1.1.0, incorporating the RAG chatbot integration principles while maintaining all existing textbook principles. The governance section was also updated to reflect the expanded scope covering both the textbook and chatbot system.

## Evaluation

The updated constitution properly captures all the requested principles for the RAG chatbot integration while maintaining consistency with the existing textbook development guidelines. The version has been incremented appropriately from 1.0.0 to 1.1.0 to reflect the addition of new principles.