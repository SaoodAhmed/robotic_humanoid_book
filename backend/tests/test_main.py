import unittest
from unittest.mock import patch, MagicMock
import os
import sys
from datetime import datetime

# Add the backend directory to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from main import get_all_urls, extract_text_from_url, chunk_text, embed, clean_content


class TestIngestionPipeline(unittest.TestCase):

    def test_get_all_urls_with_mock_sitemap(self):
        """[US1] Write unit tests for URL fetching functionality"""
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

    def test_chunk_text_basic(self):
        """[US3] Write unit tests for embedding and storage functionality"""
        content = "This is a test sentence. " * 50  # Create a longer text
        chunks = chunk_text(content, chunk_size=100, overlap=20)

        # Should have multiple chunks
        self.assertGreater(len(chunks), 1)

        # Check that chunks are not empty
        for chunk in chunks:
            self.assertGreater(len(chunk['content']), 0)

    def test_chunk_text_empty(self):
        """[US3] Write unit tests for embedding and storage functionality"""
        chunks = chunk_text("", chunk_size=100, overlap=20)
        self.assertEqual(len(chunks), 0)

    def test_clean_content(self):
        """[US2] Write unit tests for content extraction functionality"""
        dirty_content = "  This   is   a   test  \n\n  with   extra   spaces  \n  and  \n  newlines  "
        cleaned = clean_content(dirty_content)
        expected = "This is a test with extra spaces and newlines"
        self.assertEqual(cleaned, expected)

    def test_clean_content_empty(self):
        """[US2] Write unit tests for content extraction functionality"""
        cleaned = clean_content("")
        self.assertEqual(cleaned, "")


if __name__ == '__main__':
    unittest.main()