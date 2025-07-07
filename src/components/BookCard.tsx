import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { Book } from '@/types';
import { formatPrice } from '@/lib/auth';
import { useCart } from '@/contexts/CartContext';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(book);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-400" />
      );
    }

    return stars;
  };

  return (
    <Link href={`/books/${book.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
        {/* Book Image */}
        <div className="relative h-64 bg-gray-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-600 text-center">
              <div className="text-4xl mb-2">📚</div>
              <div className="text-sm">Book Cover</div>
            </div>
          </div>
          {/* Stock indicator */}
          {book.stock < 5 && book.stock > 0 && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
              Only {book.stock} left
            </div>
          )}
          {book.stock === 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              Out of Stock
            </div>
          )}
        </div>

        {/* Book Details */}
        <div className="p-4">
          <div className="mb-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {book.category}
            </span>
          </div>

          <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors">
            {book.title}
          </h3>

          <p className="text-gray-600 text-sm mb-2">by {book.author}</p>

          <p className="text-gray-700 text-sm mb-3 line-clamp-2">
            {book.description}
          </p>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex space-x-1">
              {renderStars(book.averageRating)}
            </div>
            <span className="text-sm text-gray-600">
              ({book.ratings.length} review{book.ratings.length !== 1 ? 's' : ''})
            </span>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-green-600">
              {formatPrice(book.price)}
            </span>
            
            <button
              onClick={handleAddToCart}
              disabled={book.stock === 0}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>{book.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
