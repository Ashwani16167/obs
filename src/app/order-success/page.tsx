'use client';

import Link from 'next/link';
import { CheckCircle, Home, BookOpen } from 'lucide-react';

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Successful!</h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-green-800 mb-2">What&apos;s Next?</h2>
          <ul className="text-sm text-green-700 space-y-1 text-left">
            <li>• You&apos;ll receive an order confirmation email shortly</li>
            <li>• Your books will be shipped within 1-2 business days</li>
            <li>• You&apos;ll get a tracking number once your order ships</li>
            <li>• Delivery typically takes 3-5 business days</li>
          </ul>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center space-x-2"
          >
            <Home className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          
          <Link
            href="/categories"
            className="w-full border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center space-x-2"
          >
            <BookOpen className="h-5 w-5" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? Contact our customer service at{' '}
            <a href="mailto:support@bookstore.com" className="text-blue-600 hover:text-blue-700">
              support@bookstore.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
