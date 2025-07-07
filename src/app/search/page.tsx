'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Book } from '@/types';
import BookCard from '@/components/BookCard';
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';

export default function SearchPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [categories, setCategories] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get('q');

  useEffect(() => {
    if (queryFromUrl) {
      setSearchQuery(queryFromUrl);
    }
  }, [queryFromUrl]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const searchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('search', searchQuery);
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      params.append('sortBy', sortBy);
      params.append('sortOrder', sortOrder);

      const response = await fetch(`/api/books?${params.toString()}`);
      const data = await response.json();
      if (data.success) {
        setBooks(data.books);
      }
    } catch (error) {
      console.error('Error searching books:', error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory, sortBy, sortOrder]);

  useEffect(() => {
    if (searchQuery.trim()) {
      searchBooks();
    } else {
      setBooks([]);
    }
  }, [searchQuery, searchBooks]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchBooks();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Search Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Books</h1>
          <p className="text-gray-600">Find your next great read from our collection</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search by title, author, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-16"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Search className="h-6 w-6" />
            </button>
          </div>
        </form>

        {/* Filters */}
        {searchQuery && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-700">Filters:</span>
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <label htmlFor="category" className="text-sm font-medium text-gray-700">
                  Category:
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="flex items-center space-x-2">
                <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                  Sort:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="title">Title</option>
                  <option value="author">Author</option>
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                </select>
                <button
                  type="button"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {sortOrder === 'asc' ? (
                    <SortAsc className="h-4 w-4" />
                  ) : (
                    <SortDesc className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchQuery && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {loading ? 'Searching...' : `Search Results for "${searchQuery}"`}
              </h2>
              {!loading && (
                <p className="text-gray-600">
                  {books.length} book{books.length !== 1 ? 's' : ''} found
                </p>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md h-96 animate-pulse">
                    <div className="h-64 bg-gray-200 rounded-t-lg"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : books.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-600 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No books found</h3>
                <p className="text-gray-600 mb-4">
                  Try searching with different keywords or check your spelling
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* No Search Query */}
        {!searchQuery && (
          <div className="text-center py-12">
            <div className="text-gray-600 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Start your search</h3>
            <p className="text-gray-600 mb-8">
              Enter a book title, author name, or keyword to find books in our collection
            </p>
            <div className="max-w-md mx-auto">
              <p className="text-sm text-gray-500 mb-4">Popular searches:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Clean Code', 'Design Patterns', 'JavaScript', 'Database', 'Architecture'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
