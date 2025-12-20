# Implementation Tasks: Website URL Ingestion Pipeline

**Feature**: Website URL Ingestion, Embedding Generation, and Vector Storage
**Branch**: `001-web-ingestion-pipeline`
**Generated**: 2025-12-19
**Plan**: [plan.md](./plan.md)

## Implementation Strategy

This feature implements a backend ingestion pipeline that fetches content from the deployed Docusaurus textbook website, extracts clean text content, chunks it, generates embeddings using Cohere, and stores them in Qdrant Cloud with rich metadata. The implementation follows the user story priorities from the specification, with each story being independently testable.

**MVP Scope**: User Story 1 (URL Ingestion Pipeline) provides a complete, independently testable increment that can fetch and parse content from the textbook website.

## Dependencies

User stories are designed to be independent, but implementation follows this logical sequence:
- US1 (URL Ingestion) → US2 (Content Extraction) → US3 (Embedding & Storage)
- Each story builds on the previous implementation but can be tested independently

## Parallel Execution Examples

Each user story phase includes parallelizable tasks:
- **US1**: Sitemap parsing and URL fetching can run in parallel for different sections
- **US2**: Content extraction from different URLs can run in parallel [P]
- **US3**: Embedding generation and storage operations can run in parallel [P]

---

## Phase 1: Setup

**Goal**: Initialize project structure and dependencies per implementation plan

**Independent Test**: Project can be created and dependencies installed successfully

- [X] T001 Create backend directory structure per plan
- [X] T002 [P] Initialize Python project with uv in backend/
- [X] T003 [P] Add dependencies to pyproject.toml (requests, beautifulsoup4, lxml, cohere, qdrant-client, python-dotenv)
- [X] T004 Create .env file structure with placeholder values
- [X] T005 Create requirements.txt from pyproject.toml

## Phase 2: Foundational Components

**Goal**: Implement foundational components needed across all user stories

**Independent Test**: Core utilities can be imported and used without errors

- [X] T006 Create main.py file with proper imports and structure
- [X] T007 Implement logging configuration per research decisions
- [X] T008 Create utility functions for environment variable loading
- [X] T009 Implement Qdrant client initialization with error handling
- [X] T010 Create data models for Content Chunk, Vector Embedding, and Metadata

## Phase 3: User Story 1 - URL Ingestion Pipeline (Priority: P1)

**Goal**: Implement sitemap-driven URL fetching to automatically fetch and parse content from the deployed Docusaurus textbook website

**Independent Test**: Can run the ingestion pipeline against the textbook website and verify that HTML content is successfully fetched from all sitemap URLs

**Acceptance Scenarios**:
1. Given a valid sitemap URL for the textbook site, When the ingestion pipeline runs, Then all URLs listed in the sitemap are successfully fetched and parsed
2. Given some URLs return 404 or other errors, When the ingestion pipeline runs, Then errors are logged and the pipeline continues with other URLs

- [X] T011 [US1] Implement get_all_urls function to fetch and parse sitemap.xml
- [X] T012 [US1] Add sitemap URL validation and error handling
- [X] T013 [US1] Implement URL fetching with retry logic and timeout handling
- [X] T014 [US1] Add logging for URL fetching status and errors
- [X] T015 [US1] Create test data for sitemap validation
- [X] T016 [US1] Write unit tests for URL fetching functionality

## Phase 4: User Story 2 - Content Extraction and Cleaning (Priority: P2)

**Goal**: Extract clean text content from HTML pages while removing navigation, code chrome, and non-content elements

**Independent Test**: Can provide HTML input and verify that only main content is extracted while navigation, headers, footers, and code blocks are removed

**Acceptance Scenarios**:
1. Given HTML content with navigation elements and main content, When content extraction runs, Then only the main textbook content is extracted without navigation or UI chrome

- [X] T017 [US2] Implement extract_text_from_url function with BeautifulSoup
- [X] T018 [US2] Add HTML element removal for navigation, headers, footers, and non-content elements
- [X] T019 [US2] Implement Docusaurus-specific CSS selector targeting for main content
- [X] T020 [US2] Add module and section extraction from URL structure
- [X] T021 [US2] Create content validation and cleanup utilities
- [X] T022 [US2] Write unit tests for content extraction functionality
- [X] T023 [US2] Create test HTML files for content extraction validation

## Phase 5: User Story 3 - Embedding Generation and Vector Storage (Priority: P3)

**Goal**: Generate embeddings using Cohere models and store them in Qdrant Cloud with rich metadata

**Independent Test**: Can provide clean text content and verify that embeddings are generated and stored in Qdrant with appropriate metadata

**Acceptance Scenarios**:
1. Given clean text content and Cohere API credentials, When embedding generation runs, Then vector embeddings are successfully created and stored in Qdrant with metadata

- [X] T024 [US3] Implement Cohere client initialization with API key handling
- [X] T025 [US3] Implement embed function to generate vector embeddings from text
- [X] T026 [US3] Create Qdrant collection named "rag_embeddings" with proper schema
- [X] T027 [US3] Implement chunk_text function for fixed-size chunks with overlap
- [X] T028 [US3] Implement save_chunk_to_qdrant function with upsert functionality
- [X] T029 [US3] Add rich metadata (module, section, URL, chunk ID) to stored embeddings
- [X] T030 [US3] Implement batch processing for embedding generation to respect API limits
- [X] T031 [US3] Write unit tests for embedding and storage functionality
- [X] T032 [US3] Create integration tests for end-to-end pipeline

## Phase 6: Configuration and Pipeline Orchestration

**Goal**: Implement configuration-driven pipeline for re-indexing and updates with proper error handling

- [X] T033 Create Pipeline Configuration class with validation rules
- [X] T034 Implement pipeline state management and status tracking
- [X] T035 Create main function to orchestrate the entire pipeline (Ingestion → Processing → Embedding → Storage)
- [X] T036 Add comprehensive error handling and logging for each pipeline step
- [X] T037 Implement re-indexing functionality with upsert to avoid duplication
- [X] T038 Create configuration validation for chunk size and overlap parameters

## Phase 7: Polish & Cross-Cutting Concerns

**Goal**: Complete the implementation with proper testing, documentation, and quality assurance

- [X] T039 Create comprehensive integration tests for the full pipeline
- [X] T040 Add performance monitoring and timing for each pipeline phase
- [X] T041 Implement rate limiting handling for Cohere API calls
- [X] T042 Add validation for content extraction accuracy (90%+ non-content removal)
- [X] T043 Create sample similarity queries for validation (for future retrieval testing)
- [X] T044 Write documentation for running and configuring the pipeline
- [X] T045 Add proper type hints throughout the codebase
- [X] T046 Create a README with setup and usage instructions
- [X] T047 Perform end-to-end testing with the target textbook website
- [X] T048 Validate that all requirements from spec are met (FR-001 through FR-010)