# Feature Specification: Website URL Ingestion, Embedding Generation, and Vector Storage

**Feature Branch**: `001-web-ingestion-pipeline`
**Created**: 2025-12-19
**Status**: Draft
**Input**: User description: "Website URL Ingestion, Embedding Generation, and Vector Storage

Create:

- URL ingestion pipeline for the deployed Docusaurus book

- Content extraction and cleaning logic (HTML → clean text)

- Chunking strategy optimized for RAG retrieval

- Embedding generation using Cohere embedding models

- Vector storage layer using Qdrant Cloud with structured metadata

- Configuration-driven pipeline for re-indexing and updates

Decisions needing documentation:

- Ingestion scope: full-site crawl vs sitemap-driven URLs (choose sitemap-driven for control)

- Chunking method: fixed-size vs semantic overlap (choose fixed-size with overlap)

- Metadata schema: minimal vs rich (choose rich: module, section, URL, chunk ID)

- Embedding model choice: Cohere small vs large (choose balanced cost/performance model)

- Re-index strategy: overwrite vs upsert (choose upsert to avoid duplication)

Testing strategy:

- Verify all target URLs are successfully fetched and parsed

- Confirm text is cleaned of navigation, code chrome, and non-content elements

- Validate chunk sizes and overlap consistency

- Ensure embeddings are generated without failures or truncation

- Confirm vectors are correctly stored and indexed in Qdrant

- Run sample similarity queries to validate vector integrity (no retrieval logic yet)

Technical details:

- Implement as a standalone backend pipeline (CLI or script-based)

- Use environment variables for API keys and endpoints

- Log ingestion, embedding, and storage steps with clear error reporting

- Ensure compatibility with Qdrant Cloud Free Tier limits

- Organize work in phases: Ingestion → Processing → Embedding → Storage → Validation"

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.

  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - URL Ingestion Pipeline (Priority: P1)

As a system administrator, I need to automatically fetch and parse content from the deployed Docusaurus textbook website so that the content can be processed for RAG applications. The system should use sitemap-driven URLs for controlled ingestion rather than full-site crawling.

**Why this priority**: This is the foundational capability that enables all other features - without content ingestion, there can be no embedding or vector storage.

**Independent Test**: Can be fully tested by running the ingestion pipeline against the textbook website and verifying that HTML content is successfully fetched from all sitemap URLs.

**Acceptance Scenarios**:

1. **Given** a valid sitemap URL for the textbook site, **When** the ingestion pipeline runs, **Then** all URLs listed in the sitemap are successfully fetched and parsed
2. **Given** some URLs return 404 or other errors, **When** the ingestion pipeline runs, **Then** errors are logged and the pipeline continues with other URLs

---

### User Story 2 - Content Extraction and Cleaning (Priority: P2)

As a content processor, I need to extract clean text content from HTML pages while removing navigation, code chrome, and non-content elements so that only relevant textbook content is used for embedding generation.

**Why this priority**: Clean content is essential for generating high-quality embeddings that will enable effective RAG retrieval.

**Independent Test**: Can be tested by providing HTML input and verifying that only main content is extracted while navigation, headers, footers, and code blocks are removed.

**Acceptance Scenarios**:

1. **Given** HTML content with navigation elements and main content, **When** content extraction runs, **Then** only the main textbook content is extracted without navigation or UI chrome

---

### User Story 3 - Embedding Generation and Vector Storage (Priority: P3)

As a system operator, I need to generate embeddings using Cohere models and store them in Qdrant Cloud with rich metadata so that the content can be efficiently retrieved by RAG applications.

**Why this priority**: This completes the end-to-end pipeline from content ingestion to storage in the vector database for retrieval.

**Independent Test**: Can be tested by providing clean text content and verifying that embeddings are generated and stored in Qdrant with appropriate metadata.

**Acceptance Scenarios**:

1. **Given** clean text content and Cohere API credentials, **When** embedding generation runs, **Then** vector embeddings are successfully created and stored in Qdrant with metadata

---

### Edge Cases

- What happens when the Cohere API rate limit is exceeded during embedding generation?
- How does the system handle malformed HTML that cannot be properly parsed?
- What happens when Qdrant Cloud storage limits are reached during vector storage?
- How does the system handle network timeouts during URL fetching?
- What happens when the sitemap contains invalid or inaccessible URLs?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST fetch content from URLs specified in the textbook website sitemap using sitemap-driven ingestion
- **FR-002**: System MUST extract clean text content from HTML pages while removing navigation, headers, footers, and other non-content elements
- **FR-003**: System MUST chunk extracted content using fixed-size chunks with overlap for optimal RAG retrieval
- **FR-004**: System MUST generate vector embeddings using Cohere embedding models for the extracted content
- **FR-005**: System MUST store vector embeddings in Qdrant Cloud with rich metadata including module, section, URL, and chunk ID
- **FR-006**: System MUST support upsert operations to avoid duplication when re-indexing content
- **FR-007**: System MUST provide configuration-driven pipeline for re-indexing and updates
- **FR-008**: System MUST implement proper error handling and logging for each pipeline step (ingestion, processing, embedding, storage)
- **FR-009**: System MUST validate that all target URLs are successfully fetched and parsed during ingestion
- **FR-010**: System MUST ensure chunk sizes and overlap consistency according to the defined strategy

### Key Entities

- **Content Chunk**: A segment of extracted text from the textbook website with associated metadata (URL, module, section, chunk ID)
- **Vector Embedding**: Numerical representation of content chunk generated by Cohere embedding models
- **Metadata**: Structured information associated with each vector embedding including module, section, URL, and chunk ID
- **Pipeline Configuration**: Settings that control the ingestion, processing, embedding, and storage operations

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The ingestion pipeline successfully fetches content from 100% of URLs listed in the textbook website sitemap
- **SC-002**: Content extraction removes at least 90% of non-content elements (navigation, headers, footers) while preserving all main textbook content
- **SC-003**: The system generates embeddings for all content chunks without failures or truncation within 2 hours for a typical textbook site
- **SC-004**: All vector embeddings are correctly stored in Qdrant Cloud with complete metadata (module, section, URL, chunk ID)
- **SC-005**: Sample similarity queries return relevant results with at least 85% accuracy when tested against known content relationships
- **SC-006**: The pipeline completes all phases (Ingestion → Processing → Embedding → Storage → Validation) without critical errors
- **SC-007**: Re-indexing operations successfully update existing content without creating duplicate entries in the vector store
