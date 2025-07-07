'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Book } from '@/types';
import BookCard from '@/components/BookCard';
import { Search, TrendingUp, BookOpen, Users, Award } from 'lucide-react';

export default function HomePage() {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const response = await fetch('/api/books?sortBy=rating&sortOrder=desc');
        const data = await response.json();
        if (data.success) {
          // Get top 6 books for featured section
          setFeaturedBooks(data.books.slice(0, 6));
        }
      } catch (error) {
        console.error('Error fetching featured books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBooks();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Discover Your Next
            <span className="block text-yellow-300">Great Read</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Explore thousands of books across multiple categories. From software engineering 
            to literature, find the perfect book for your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/categories" 
              className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors"
            >
              Browse Categories
            </Link>
            <Link 
              href="/search" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors"
            >
              Search Books
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Vast Collection</h3>
              <p className="text-gray-600">
                Thousands of books across multiple categories and subjects
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Easy Search</h3>
              <p className="text-gray-600">
                Find books by title, author, or browse by category
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">User Reviews</h3>
              <p className="text-gray-600">
                Read reviews and ratings from fellow book lovers
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Community</h3>
              <p className="text-gray-600">
                Join a community of readers and share your thoughts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Books</h2>
              <p className="text-gray-600">Highly rated books from our collection</p>
            </div>
            <Link 
              href="/categories" 
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              <span>View All</span>
              <TrendingUp className="h-5 w-5" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {featuredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Browse by Category
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Software', icon: '💻', color: 'bg-blue-500' },
              { name: 'Database', icon: '🗄️', color: 'bg-green-500' },
              { name: 'Architecture', icon: '🏗️', color: 'bg-purple-500' },
              { name: 'English', icon: '📚', color: 'bg-red-500' },
              { name: 'Mathematics', icon: '📊', color: 'bg-yellow-500' },
              { name: 'Science', icon: '🔬', color: 'bg-indigo-500' },
              { name: 'History', icon: '🏛️', color: 'bg-gray-500' },
              { name: 'Fiction', icon: '📖', color: 'bg-pink-500' },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/categories?category=${category.name}`}
                className="group p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center border border-gray-200 hover:border-gray-300"
              >
                <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Reading?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of readers who have found their favorite books with us. 
            Create an account today and start your reading journey.
          </p>
          <Link 
            href="/register" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
}
