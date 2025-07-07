import { NextResponse } from 'next/server';
import { getCategories } from '@/lib/data';

export async function GET() {
  try {
    const categories = getCategories();
    
    return NextResponse.json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error('Categories fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
