export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  contactNumber: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  ratings: Rating[];
  averageRating: number;
}

export interface Rating {
  userId: string;
  rating: number;
  review: string;
}

export interface CartItem {
  bookId: string;
  quantity: number;
  book: Book;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  shippingAddress: User['shippingAddress'];
  paymentDetails: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardHolderName: string;
  };
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: Omit<User, 'password'>;
  token?: string;
}

export interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  author?: string;
  sortBy?: 'title' | 'author' | 'price' | 'rating';
  sortOrder?: 'asc' | 'desc';
}
