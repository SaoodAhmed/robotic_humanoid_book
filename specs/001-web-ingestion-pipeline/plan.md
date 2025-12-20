# Implementation Plan: Website URL Ingestion Pipeline

**Branch**: `001-web-ingestion-pipeline` | **Date**: 2025-12-19 | **Spec**: [link](./spec.md)
**Input**: Feature specification from `/specs/001-web-ingestion-pipeline/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Create a backend ingestion pipeline that fetches content from the deployed Docusaurus textbook website, extracts clean text content, chunks it, generates embeddings using Cohere, and stores them in Qdrant Cloud with rich metadata. The implementation will be a single main.py file with functions for URL fetching, content extraction, text chunking, embedding generation, and Qdrant storage.

## Technical Context

**Language/Version**: Python 3.11
**Primary Dependencies**: uv (package manager), Cohere client, Qdrant client, requests, beautifulsoup4, lxml, sentence-transformers or similar
**Storage**: Qdrant Cloud vector database
**Testing**: pytest for unit and integration tests
**Target Platform**: Linux server (backend service)
**Project Type**: Single backend service
**Performance Goals**: Process textbook site within 2 hours, handle API rate limits gracefully, maintain 90%+ content extraction accuracy
**Constraints**: Must operate within Qdrant Cloud Free Tier limits, avoid duplication with upsert operations, handle sitemap-driven ingestion
**Scale/Scope**: Single textbook site with multiple modules and pages, rich metadata storage per content chunk

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Technical Standards Compliance
- ✅ **Backend API Implementation**: Uses Python with requests, BeautifulSoup4, Cohere client, and Qdrant client for web scraping, embedding generation, and vector storage
- ✅ **Vector Search with Qdrant**: Aligns with requirement to use Qdrant for retrieval with source attribution
- ✅ **Data Storage with Neon Postgres**: Uses Qdrant Cloud as specified for vector storage with rich metadata (module, section, URL, chunk ID)
- ✅ **LLM Interaction via OpenAI Agents/ChatKit SDKs**: Uses Cohere embeddings as specified in requirements

### Cost and Performance Constraints
- ✅ **Free-tier Operation**: Design operates within Qdrant Cloud Free Tier limits with batch processing to respect API rate limits
- ✅ **Stateless Sessions**: Pipeline is stateless, processing and storing content chunks without maintaining long-term personal data
- ✅ **No Model Training**: Uses retrieval + prompting only, without training or fine-tuning models
- ✅ **Acceptable Latency**: Design focuses on processing efficiency with configurable chunk sizes for optimal performance

### RAG Chatbot Integration Compliance
- ✅ **Faithful Retrieval**: Content extraction focuses on textbook passages with proper source attribution through rich metadata
- ✅ **Technical Standards**: Implements vector search with explicit source attribution for downstream RAG use
- ✅ **Privacy-Safe Design**: No personal data is collected during ingestion process

### Post-Design Verification
- ✅ **Single File Implementation**: Successfully designed as a single main.py file with all required functions
- ✅ **Sitemap-Driven Ingestion**: Implementation uses sitemap.xml parsing as required
- ✅ **Upsert Strategy**: Uses Qdrant's upsert functionality to avoid duplication
- ✅ **Environment Configuration**: Uses .env for secure API key management

### Gate Status: **PASSED** - All constitutional requirements satisfied

## Project Structure

### Documentation (this feature)

```text
specs/001-web-ingestion-pipeline/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
backend/
├── pyproject.toml       # Project configuration and dependencies
├── main.py              # Single file implementation with all functions
├── .env                 # Environment variables (gitignored)
├── requirements.txt     # Dependencies list
└── tests/
    ├── test_main.py     # Tests for main ingestion functions
    └── test_data/       # Test data for validation
```

**Structure Decision**: Backend service will be implemented as a single main.py file with all required functions as specified: get_all_urls, extract_text_from_url, chunk_text, embed, create_collection, save_chunk_to_qdrant. The project will use uv for package management and be organized in a backend/ directory with proper test coverage.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
