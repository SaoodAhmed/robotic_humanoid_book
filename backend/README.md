# Website URL Ingestion Pipeline

This project implements a backend ingestion pipeline that fetches content from the deployed Docusaurus textbook website, extracts clean text content, chunks it, generates embeddings using Cohere, and stores them in Qdrant Cloud with rich metadata.

## Features

- **Sitemap-driven URL ingestion**: Automatically fetches all URLs from the textbook website sitemap
- **Content extraction and cleaning**: Removes navigation, headers, footers, and other non-content elements
- **Text chunking**: Splits content into fixed-size chunks with overlap for optimal RAG retrieval
- **Embedding generation**: Uses Cohere's embedding models to generate vector representations
- **Vector storage**: Stores embeddings in Qdrant Cloud with rich metadata
- **Upsert operations**: Avoids duplication when re-indexing content

## Prerequisites

- Python 3.11 or higher
- Cohere API key
- Qdrant Cloud account and API key

## Setup

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Create a `.env` file with your API keys (use `.env.example` as a template):

```env
COHERE_API_KEY=your_cohere_api_key_here
QDRANT_URL=your_qdrant_cluster_url
QDRANT_API_KEY=your_qdrant_api_key
SITE_URL=https://robotic-humanoid-book-nc39.vercel.app
SITEMAP_URL=https://robotic-humanoid-book-nc39.vercel.app/sitemap.xml
CHUNK_SIZE=1000
CHUNK_OVERLAP=200
EMBEDDING_MODEL=embed-multilingual-v3.0
```

## Usage

Run the ingestion pipeline:

```bash
python main.py
```

## Configuration

The pipeline can be configured using environment variables:

- `SITEMAP_URL`: URL of the sitemap to process (default: textbook website)
- `CHUNK_SIZE`: Size of text chunks (default: 1000)
- `CHUNK_OVERLAP`: Overlap between chunks (default: 200)
- `EMBEDDING_MODEL`: Cohere embedding model to use (default: embed-multilingual-v3.0)

## Architecture

The pipeline follows these steps:
1. Fetch all URLs from the sitemap
2. Extract clean text content from each URL
3. Chunk the content into fixed-size pieces with overlap
4. Generate embeddings using Cohere
5. Store embeddings in Qdrant with rich metadata (URL, module, section, chunk ID)

## Testing

Run the unit tests:

```bash
python -m pytest tests/
```

## Data Model

The pipeline works with these main entities:

- **Content Chunk**: A segment of extracted text with metadata (URL, module, section)
- **Vector Embedding**: Numerical representation of content chunk
- **Metadata**: Structured information associated with each embedding
- **Pipeline Configuration**: Settings that control the ingestion process

## Error Handling

- Network request failures are retried with exponential backoff
- Individual URL failures don't stop the entire pipeline
- Detailed logging for debugging and monitoring
- Graceful degradation when APIs are unavailable

## Performance Considerations

- Batch processing to respect API rate limits
- Configurable chunk sizes for optimal performance
- Efficient content extraction using BeautifulSoup