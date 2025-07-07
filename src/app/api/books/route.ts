import { NextRequest, NextResponse } from 'next/server';
import { getBooks } from '@/lib/data';
import { SearchFilters } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const author = searchParams.get('author');
    const sortBy = searchParams.get('sortBy') as SearchFilters['sortBy'];
    const sortOrder = searchParams.get('sortOrder') as SearchFilters['sortOrder'];

    let books = getBooks();

    // Apply search filters
    if (search) {
      const searchLower = search.toLowerCase();
      books = books.filter(book => 
        book.title.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower) ||
        book.description.toLowerCase().includes(searchLower)
      );
    }

    if (category && category !== 'all') {
      books = books.filter(book => book.category === category);
    }

    if (author) {
      books = books.filter(book => 
        book.author.toLowerCase().includes(author.toLowerCase())
      );
    }

    if (minPrice) {
      books = books.filter(book => book.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      books = books.filter(book => book.price <= parseFloat(maxPrice));
    }

    // Apply sorting
    if (sortBy) {
      books.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        if (sortBy === 'rating') {
          aValue = a.averageRating;
          bValue = b.averageRating;
        } else {
          aValue = a[sortBy];
          bValue = b[sortBy];
        }

        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (sortOrder === 'desc') {
          return bValue > aValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
      });
    }

    return NextResponse.json({
      success: true,
      books,
      total: books.length,
    });
  } catch (error) {
    console.error('Books fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
