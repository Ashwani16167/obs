# Online Book Store

A modern, full-featured online book store built with Next.js, TypeScript, and Tailwind CSS. This web application allows customers to browse, search, and purchase books online with a seamless shopping experience.

## Features

### 🛍️ Core Shopping Features
- **Book Browsing**: Browse books by categories (Software, Database, English, Architecture, etc.)
- **Advanced Search**: Search books by title, author, or keywords
- **Shopping Cart**: Add/remove books, update quantities, persistent cart storage
- **User Authentication**: Secure login/register system with JWT tokens
- **User Profiles**: Manage personal information and shipping addresses

### 📚 Book Management
- **Category-based Organization**: Books organized into multiple categories
- **Detailed Book Information**: Title, author, description, price, stock status
- **User Reviews & Ratings**: 5-star rating system with written reviews
- **Stock Management**: Real-time stock status and availability

### 💳 Payment & Checkout
- **Credit Card Payment**: Simulated credit card transaction processing
- **Order Management**: Track orders and purchase history
- **Shipping Address**: Multiple shipping address support

### 🎨 User Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Clean, intuitive interface with Tailwind CSS
- **Fast Performance**: Optimized with Next.js App Router
- **Accessibility**: Built with accessibility best practices

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: JWT with bcryptjs password hashing
- **Data Storage**: JSON files (easily upgradeable to databases)
- **Icons**: Lucide React
- **State Management**: React Context API

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd online-book-store
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Demo Credentials

For testing purposes, you can use these demo credentials:
- **Email**: john@example.com
- **Password**: password123

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── api/            # API routes
│   ├── login/          # Login page
│   ├── register/       # Registration page
│   ├── categories/     # Categories browsing page
│   ├── cart/           # Shopping cart page
│   └── layout.tsx      # Root layout
├── components/         # Reusable React components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   └── BookCard.tsx    # Book display component
├── contexts/           # React Context providers
│   ├── AuthContext.tsx # Authentication state
│   └── CartContext.tsx # Shopping cart state
├── lib/                # Utility functions
│   ├── auth.ts         # Authentication utilities
│   └── data.ts         # Data access functions
└── types/              # TypeScript type definitions
    └── index.ts        # Application types
data/                   # JSON data files
├── books.json          # Book catalog
├── users.json          # User accounts
└── categories.json     # Book categories
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration  
- `GET /api/auth/verify` - Token verification

### Books
- `GET /api/books` - Get books with filtering/sorting
- `GET /api/books/[id]` - Get specific book details

### Categories
- `GET /api/categories` - Get all book categories

## Features in Detail

### User Authentication
- Secure JWT-based authentication
- Password hashing with bcryptjs
- Persistent login sessions
- Protected routes and API endpoints

### Shopping Cart
- Add/remove books from cart
- Update quantities with stock validation
- Persistent cart storage in localStorage
- Real-time total calculation

### Book Search & Filtering
- Search by title, author, or description
- Filter by category, price range
- Sort by title, author, price, or rating
- Responsive grid and list views

### Responsive Design
- Mobile-first design approach
- Optimized for all screen sizes
- Touch-friendly interface elements
- Accessible navigation

## Environment Variables

Create a `.env.local` file in the root directory:

```
JWT_SECRET=your-secret-key-here
```

## Deployment

This application can be deployed to any platform that supports Next.js:

### Vercel (Recommended)
1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms
- Netlify
- Railway
- Heroku
- Digital Ocean App Platform

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help, please open an issue on GitHub or contact us at support@bookstore.com.

---

Built with ❤️ for book lovers everywhere!
#   o b s  
 