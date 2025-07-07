'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Book, Rating } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatPrice } from '@/lib/auth';
import { Star, ShoppingCart, ArrowLeft, User, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/books/${id}`);
        const data = await response.json();
        if (data.success) {
          setBook(data.book);
        }
      } catch (error) {
        console.error('Error fetching book:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (book) {
      addToCart(book, quantity);
      // You could add a toast notification here
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-5 w-5 fill-yellow-400/50 text-yellow-400" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-5 w-5 text-gray-400" />
      );
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Book Not Found</h1>
          <p className="text-gray-600 mb-8">The book you're looking for doesn't exist.</p>
          <Link
            href="/categories"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Books</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-blue-600 hover:text-blue-700">
                Home
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link href="/categories" className="text-blue-600 hover:text-blue-700">
                Books
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link 
                href={`/categories?category=${book.category}`} 
                className="text-blue-600 hover:text-blue-700"
              >
                {book.category}
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-900 truncate font-medium">{book.title}</li>
          </ol>
        </nav>

        {/* Book Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Book Image */}
          <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
            <div className="text-center text-gray-600">
              <div className="text-8xl mb-4">📚</div>
              <div className="text-lg">Book Cover</div>
              <div className="text-sm mt-2">{book.title}</div>
            </div>
          </div>

          {/* Book Information */}
          <div className="space-y-6 bg-gray-900 p-6 rounded-lg">
            <div>
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-4">
                {book.category}
              </span>
              <h1 className="text-3xl font-bold text-white mb-2">{book.title}</h1>
              <p className="text-xl text-gray-300 mb-4">by {book.author}</p>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex space-x-1">
                  {renderStars(book.averageRating)}
                </div>
                <span className="text-lg font-semibold text-white">{book.averageRating.toFixed(1)}</span>
                <span className="text-gray-300">
                  ({book.ratings.length} review{book.ratings.length !== 1 ? 's' : ''})
                </span>
              </div>
            </div>

            {/* Price and Stock */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-green-600">
                  {formatPrice(book.price)}
                </span>
                {book.stock > 0 ? (
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    book.stock < 5 
                      ? 'bg-orange-100 text-orange-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {book.stock < 5 ? `Only ${book.stock} left` : 'In Stock'}
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    Out of Stock
                  </span>
                )}
              </div>

              {book.stock > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <label htmlFor="quantity" className="text-sm font-medium text-gray-300">
                      Quantity:
                    </label>
                    <select
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      {[...Array(Math.min(book.stock, 10))].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>

                  <div className="text-sm text-gray-300">
                    <p>✓ Free shipping on orders over ₹2000</p>
                    <p>✓ 30-day return policy</p>
                    <p>✓ Secure payment processing</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
          <p className="text-gray-300 leading-relaxed">{book.description}</p>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          
          {book.ratings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No reviews yet. Be the first to review this book!</p>
              {user && (
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Write a Review
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {book.ratings.map((rating, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <div className="flex space-x-1">
                          {renderStars(rating.rating)}
                        </div>
                        <span className="text-sm text-gray-500">
                          Anonymous User
                        </span>
                      </div>
                      <p className="text-gray-700">{rating.review}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
