# Research: Website URL Ingestion Pipeline

## Overview
Research for implementing a backend ingestion pipeline that fetches content from the deployed Docusaurus textbook website, extracts clean text content, chunks it, generates embeddings using Cohere, and stores them in Qdrant Cloud with rich metadata.

## Decision: Python Package Manager
**Rationale**: The user specifically requested using UV package manager for the project.
**Chosen**: UV (https://github.com/astral-sh/uv) - Fast Python package installer and resolver

## Decision: Web Scraping Approach
**Rationale**: Need to extract clean text from HTML pages while removing navigation and non-content elements.
**Chosen**:
- requests library for HTTP requests
- BeautifulSoup4 with lxml parser for HTML parsing and content extraction
- Select specific CSS selectors to target main content areas in Docusaurus sites

**Alternatives considered**:
- Selenium (overkill for static content, slower)
- Scrapy (too complex for simple site scraping)
- Playwright (unnecessary for static Docusaurus content)

## Decision: Text Chunking Strategy
**Rationale**: Need fixed-size chunks with overlap for optimal RAG retrieval as specified in requirements.
**Chosen**: RecursiveCharacterTextSplitter from langchain (or similar implementation) with:
- Chunk size: 1000 characters
- Overlap: 200 characters
- Character separators: ["\n\n", "\n", " ", ""]

## Decision: Cohere Embedding Model
**Rationale**: Need to choose between Cohere small vs large models as specified in requirements.
**Chosen**: Cohere embed-multilingual-v3.0 (balanced cost/performance model)
- Good for technical content like textbooks
- Cost-effective while maintaining quality
- Supports multiple languages if needed

**Alternatives considered**:
- embed-english-v3.0 (only English support)
- embed-english-light-v3.0 (lower quality)

## Decision: Qdrant Collection Setup
**Rationale**: Need to create a collection with appropriate vector dimensions for Cohere embeddings.
**Chosen**:
- Collection name: "rag_embeddings" as specified
- Vector size: 1024 (for Cohere embed-multilingual-v3.0)
- Distance function: Cosine
- Payload schema with rich metadata: module, section, URL, chunk ID

## Decision: Sitemap URL Processing
**Rationale**: Need to fetch URLs from the provided sitemap.
**Chosen**:
- Use requests to fetch sitemap.xml
- Use xml.etree.ElementTree or BeautifulSoup to parse sitemap
- Target: https://robotic-humanoid-book-nc39.vercel.app/sitemap.xml as provided

## Decision: Error Handling and Logging
**Rationale**: Need robust error handling for network requests, API calls, and storage operations.
**Chosen**:
- Use Python logging module with configurable levels
- Implement retry logic for network requests
- Graceful degradation when individual URLs fail
- Detailed logging for debugging and monitoring

## Decision: Environment Configuration
**Rationale**: Need to securely manage API keys and configuration as specified in requirements.
**Chosen**:
- Use python-dotenv for environment variable management
- Store Cohere API key, Qdrant URL, and other secrets in .env file
- Configuration-driven pipeline as specified in requirements

## Technical Unknowns Resolved
- **URL extraction**: Use sitemap.xml parsing to get all URLs
- **Content extraction**: Target Docusaurus content selectors specifically
- **Metadata schema**: module, section, URL, chunk ID as specified
- **Upsert strategy**: Use Qdrant's upsert functionality to avoid duplication