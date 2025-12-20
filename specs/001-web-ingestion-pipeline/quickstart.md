# Quickstart: Website URL Ingestion Pipeline

## Prerequisites

- Python 3.11 or higher
- UV package manager installed
- Cohere API key
- Qdrant Cloud account and API key/URL

## Setup

### 1. Clone and Navigate to Backend Directory

```bash
# Create backend directory
mkdir backend && cd backend
```

### 2. Initialize Project with UV

```bash
# Create pyproject.toml
uv init

# Add dependencies to pyproject.toml
uv add requests beautifulsoup4 lxml cohere qdrant-client python-dotenv
```

### 3. Create Environment File

Create a `.env` file in the backend directory with your API keys:

```env
COHERE_API_KEY=your_cohere_api_key_here
QDRANT_URL=your_qdrant_cluster_url
QDRANT_API_KEY=your_qdrant_api_key
SITE_URL=https://robotic-humanoid-book-nc39.vercel.app
SITEMAP_URL=https://robotic-humanoid-book-nc39.vercel.app/sitemap.xml
```

### 4. Create the Main Implementation File

Create `main.py` with the required functions:

```python
import os
import requests
import cohere
import logging
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from qdrant_client import QdrantClient
from qdrant_client.http import models
from dotenv import load_dotenv
import xml.etree.ElementTree as ET
from typing import List, Dict, Any
import uuid
from datetime import datetime

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_all_urls(sitemap_url: str) -> List[str]:
    """
    Fetch all URLs from the sitemap
    """
    try:
        response = requests.get(sitemap_url)
        response.raise_for_status()

        # Parse the sitemap XML
        root = ET.fromstring(response.content)

        # Extract URLs - handle both regular sitemaps and sitemap indexes
        urls = []
        for url_elem in root.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}url/{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
            urls.append(url_elem.text.strip())

        logger.info(f"Found {len(urls)} URLs in sitemap")
        return urls
    except Exception as e:
        logger.error(f"Error fetching sitemap: {e}")
        return []

def extract_text_from_url(url: str) -> Dict[str, Any]:
    """
    Extract clean text content from a URL, removing navigation and non-content elements
    """
    try:
        response = requests.get(url)
        response.raise_for_status()

        soup = BeautifulSoup(response.content, 'lxml')

        # Remove common non-content elements
        for element in soup(['nav', 'header', 'footer', 'aside', 'script', 'style']):
            element.decompose()

        # Try to extract main content from Docusaurus-specific selectors
        main_content = None
        for selector in ['.main-wrapper', '.container', 'main', '.docContent', '.markdown']:
            main_content = soup.select_one(selector)
            if main_content:
                break

        # If no specific selector works, use body content
        if not main_content:
            main_content = soup.find('body')

        if main_content:
            # Remove any remaining non-content elements
            for element in main_content(['nav', 'header', 'footer', 'aside', 'script', 'style']):
                element.decompose()

            text = main_content.get_text(separator=' ', strip=True)
        else:
            text = soup.get_text(separator=' ', strip=True)

        # Extract module and section info from URL
        parsed_url = urlparse(url)
        path_parts = parsed_url.path.strip('/').split('/')

        module = path_parts[0] if path_parts and path_parts[0] else 'home'
        section = path_parts[1] if len(path_parts) > 1 else 'overview'

        return {
            'url': url,
            'module': module,
            'section': section,
            'content': text,
            'title': soup.title.string if soup.title else ''
        }
    except Exception as e:
        logger.error(f"Error extracting content from {url}: {e}")
        return {
            'url': url,
            'module': '',
            'section': '',
            'content': '',
            'title': ''
        }

def chunk_text(content: str, chunk_size: int = 1000, overlap: int = 200) -> List[Dict[str, Any]]:
    """
    Split content into chunks with overlap
    """
    if not content:
        return []

    chunks = []
    start = 0

    while start < len(content):
        end = start + chunk_size

        # If this is not the last chunk, try to break at a sentence or word boundary
        if end < len(content):
            # Look for a good break point near the end
            temp_end = end
            while temp_end > start + chunk_size - overlap and temp_end < len(content):
                if content[temp_end] in '.!? \n':
                    end = temp_end + 1
                    break
                temp_end += 1

        chunk_text = content[start:end].strip()
        if chunk_text:  # Only add non-empty chunks
            chunk_id = str(uuid.uuid4())
            chunks.append({
                'chunk_id': chunk_id,
                'content': chunk_text,
                'start_pos': start,
                'end_pos': end
            })

        # Move start position with overlap
        start = end - overlap if end < len(content) else end

        # Prevent infinite loop if chunk_size is too small
        if start == end:
            start += chunk_size

    logger.info(f"Content chunked into {len(chunks)} pieces")
    return chunks

def embed(texts: List[str]) -> List[List[float]]:
    """
    Generate embeddings for a list of texts using Cohere
    """
    cohere_api_key = os.getenv('COHERE_API_KEY')
    if not cohere_api_key:
        raise ValueError("COHERE_API_KEY environment variable not set")

    co = cohere.Client(cohere_api_key)

    try:
        response = co.embed(
            texts=texts,
            model="embed-multilingual-v3.0",  # Balanced cost/performance
            input_type="search_document"
        )

        return response.embeddings
    except Exception as e:
        logger.error(f"Error generating embeddings: {e}")
        return []

def create_collection(client: QdrantClient, collection_name: str):
    """
    Create a Qdrant collection for storing embeddings
    """
    try:
        # Check if collection already exists
        collections = client.get_collections()
        existing_collections = [c.name for c in collections.collections]

        if collection_name in existing_collections:
            logger.info(f"Collection '{collection_name}' already exists")
            return

        # Create new collection
        client.create_collection(
            collection_name=collection_name,
            vectors_config=models.VectorParams(
                size=1024,  # Cohere embed-multilingual-v3.0 returns 1024-dim vectors
                distance=models.Distance.COSINE
            )
        )

        logger.info(f"Created collection '{collection_name}' with 1024-dim vectors")
    except Exception as e:
        logger.error(f"Error creating collection: {e}")
        raise

def save_chunk_to_qdrant(client: QdrantClient, collection_name: str, chunk_data: Dict[str, Any], embedding: List[float]):
    """
    Save a content chunk with its embedding to Qdrant
    """
    try:
        # Prepare the payload with metadata
        payload = {
            'url': chunk_data['url'],
            'module': chunk_data['module'],
            'section': chunk_data['section'],
            'content': chunk_data['content'],
            'title': chunk_data.get('title', ''),
            'created_at': datetime.utcnow().isoformat()
        }

        # Prepare the point to insert
        point = models.PointStruct(
            id=chunk_data['chunk_id'],
            vector=embedding,
            payload=payload
        )

        # Upsert the point (insert or update if exists)
        client.upsert(
            collection_name=collection_name,
            points=[point]
        )

        logger.info(f"Saved chunk {chunk_data['chunk_id']} to Qdrant")
    except Exception as e:
        logger.error(f"Error saving chunk to Qdrant: {e}")
        raise

def main():
    """
    Main function to execute the entire pipeline
    """
    logger.info("Starting website ingestion pipeline")

    # Configuration
    sitemap_url = os.getenv('SITEMAP_URL', 'https://robotic-humanoid-book-nc39.vercel.app/sitemap.xml')
    collection_name = 'rag_embeddings'

    # Initialize Qdrant client
    qdrant_url = os.getenv('QDRANT_URL')
    qdrant_api_key = os.getenv('QDRANT_API_KEY')

    if not qdrant_url:
        raise ValueError("QDRANT_URL environment variable not set")

    if qdrant_api_key:
        client = QdrantClient(url=qdrant_url, api_key=qdrant_api_key, timeout=10)
    else:
        client = QdrantClient(url=qdrant_url, timeout=10)

    # Create collection if it doesn't exist
    create_collection(client, collection_name)

    # Step 1: Get all URLs from sitemap
    urls = get_all_urls(sitemap_url)
    if not urls:
        logger.error("No URLs found in sitemap")
        return

    # Process each URL
    for i, url in enumerate(urls):
        logger.info(f"Processing URL {i+1}/{len(urls)}: {url}")

        # Step 2: Extract text from URL
        page_data = extract_text_from_url(url)
        if not page_data['content']:
            logger.warning(f"No content extracted from {url}")
            continue

        # Step 3: Chunk the text
        chunks = chunk_text(page_data['content'])
        if not chunks:
            logger.warning(f"No chunks created from {url}")
            continue

        # Prepare texts for embedding
        texts_to_embed = [chunk['content'] for chunk in chunks]

        # Step 4: Generate embeddings (in batches to respect API limits)
        batch_size = 10  # Cohere API has limits
        for j in range(0, len(texts_to_embed), batch_size):
            batch_texts = texts_to_embed[j:j+batch_size]
            batch_chunks = chunks[j:j+batch_size]

            try:
                embeddings = embed(batch_texts)

                # Step 5: Save to Qdrant
                for chunk, embedding_vector in zip(batch_chunks, embeddings):
                    # Add URL, module, and section info to chunk data
                    chunk_data = {
                        'chunk_id': chunk['chunk_id'],
                        'url': page_data['url'],
                        'module': page_data['module'],
                        'section': page_data['section'],
                        'content': chunk['content'],
                        'title': page_data['title']
                    }

                    save_chunk_to_qdrant(client, collection_name, chunk_data, embedding_vector)

            except Exception as e:
                logger.error(f"Error processing batch {j//batch_size + 1}: {e}")
                continue

    logger.info("Website ingestion pipeline completed successfully")

if __name__ == "__main__":
    main()
```

### 5. Run the Pipeline

```bash
# Install dependencies
uv sync

# Run the ingestion pipeline
uv run python main.py
```

## Testing the Implementation

Create a simple test file to verify functionality:

```bash
# Create tests directory
mkdir tests
```

Create `tests/test_main.py`:

```python
import unittest
from unittest.mock import patch, MagicMock
import os
import sys

# Add the backend directory to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from main import get_all_urls, extract_text_from_url, chunk_text, embed

class TestIngestionPipeline(unittest.TestCase):

    def test_get_all_urls(self):
        # Test with a mock sitemap response
        with patch('requests.get') as mock_get:
            mock_response = MagicMock()
            mock_response.content = '''<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                <url>
                    <loc>https://example.com/page1</loc>
                </url>
                <url>
                    <loc>https://example.com/page2</loc>
                </url>
            </urlset>'''
            mock_response.raise_for_status.return_value = None
            mock_get.return_value = mock_response

            urls = get_all_urls("https://example.com/sitemap.xml")
            self.assertEqual(len(urls), 2)
            self.assertIn("https://example.com/page1", urls)

    def test_chunk_text(self):
        content = "This is a test sentence. " * 50  # Create a longer text
        chunks = chunk_text(content, chunk_size=100, overlap=20)

        # Should have multiple chunks
        self.assertGreater(len(chunks), 1)

        # Check that chunks are not empty
        for chunk in chunks:
            self.assertGreater(len(chunk['content']), 0)

    def test_chunk_text_empty(self):
        chunks = chunk_text("", chunk_size=100, overlap=20)
        self.assertEqual(len(chunks), 0)

if __name__ == '__main__':
    unittest.main()
```

Run the tests:

```bash
uv run python -m pytest tests/test_main.py -v
```

## Environment Configuration

Make sure your `.env` file contains:

```env
COHERE_API_KEY=your_cohere_api_key_here
QDRANT_URL=your_qdrant_cluster_url
QDRANT_API_KEY=your_qdrant_api_key
SITE_URL=https://robotic-humanoid-book-nc39.vercel.app
SITEMAP_URL=https://robotic-humanoid-book-nc39.vercel.app/sitemap.xml
```

## Expected Output

When you run the pipeline, you should see logs indicating:

1. URLs are fetched from the sitemap
2. Content is extracted from each URL
3. Text is chunked appropriately
4. Embeddings are generated
5. Chunks are saved to Qdrant with metadata

The pipeline will create a Qdrant collection named "rag_embeddings" with all the content chunks and their vector embeddings, ready for RAG applications.