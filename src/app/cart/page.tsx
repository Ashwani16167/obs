'use client';

import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatPrice } from '@/lib/auth';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <ShoppingCart className="h-24 w-24 text-gray-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven&apos;t added any books to your cart yet.
          </p>
          <Link
            href="/categories"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">Review your items and proceed to checkout</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Items in Cart ({cart.items.length})
                </h2>
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {cart.items.map((item) => (
                <div key={item.bookId} className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Book Image Placeholder */}
                    <div className="w-20 h-28 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0">
                      <div className="text-gray-600 text-center">
                        <div className="text-2xl mb-1">📚</div>
                        <div className="text-xs">Book</div>
                      </div>
                    </div>

                    {/* Book Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            <Link href={`/books/${item.book.id}`} className="hover:text-blue-600">
                              {item.book.title}
                            </Link>
                          </h3>
                          <p className="text-gray-600 mb-2">by {item.book.author}</p>
                          <p className="text-sm text-gray-500 mb-3">
                            Category: {item.book.category}
                          </p>
                          <div className="flex items-center space-x-4">
                            <span className="text-xl font-bold text-green-600">
                              {formatPrice(item.book.price)}
                            </span>
                            {item.book.stock < 5 && (
                              <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
                                Only {item.book.stock} left
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.bookId)}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3 mt-4">
                        <span className="text-sm font-medium text-gray-700">Quantity:</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.bookId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-1 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.bookId, item.quantity + 1)}
                            disabled={item.quantity >= item.book.stock}
                            className="p-1 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="text-sm text-gray-500">
                          Subtotal: {formatPrice(item.book.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Items ({cart.items.length})</span>
                <span className="font-medium">{formatPrice(cart.total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">{formatPrice(cart.total * 0.08)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-green-600">
                    {formatPrice(cart.total * 1.08)}
                  </span>
                </div>
              </div>
            </div>

            {user ? (
              <Link
                href="/checkout"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
              >
                Proceed to Checkout
              </Link>
            ) : (
              <div className="space-y-3">
                <Link
                  href="/login?redirect=/checkout"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
                >
                  Login to Checkout
                </Link>
                <p className="text-xs text-gray-500 text-center">
                  Or{' '}
                  <Link href="/register" className="text-blue-600 hover:text-blue-700">
                    create an account
                  </Link>
                </p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200">
              <Link
                href="/categories"
                className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
