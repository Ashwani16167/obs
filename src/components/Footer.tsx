import Link from 'next/link';
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center space-x-2 text-2xl font-bold mb-4">
              <BookOpen className="h-8 w-8" />
              <span>BookStore</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Your one-stop destination for all kinds of books. From software engineering to literature, 
              we have something for every reader.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>info@bookstore.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-300 hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-300 hover:text-white transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-300 hover:text-white transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Popular Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories?category=Software" className="text-gray-300 hover:text-white transition-colors">
                  Software
                </Link>
              </li>
              <li>
                <Link href="/categories?category=Database" className="text-gray-300 hover:text-white transition-colors">
                  Database
                </Link>
              </li>
              <li>
                <Link href="/categories?category=Architecture" className="text-gray-300 hover:text-white transition-colors">
                  Architecture
                </Link>
              </li>
              <li>
                <Link href="/categories?category=English" className="text-gray-300 hover:text-white transition-colors">
                  English
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>123 Book Street, Reading City, RC 12345</span>
              </div>
              <div className="mt-4">
                <p className="text-gray-300 text-sm">
                  Customer Service Hours:<br />
                  Mon-Fri: 9:00 AM - 6:00 PM<br />
                  Sat-Sun: 10:00 AM - 4:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 BookStore. All rights reserved. Made with ❤️ for book lovers.
          </p>
        </div>
      </div>
    </footer>
  );
}
