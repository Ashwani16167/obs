# Copilot Instructions for Online Book Store

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is an Online Book Store web application built with Next.js, TypeScript, and Tailwind CSS. 

## Project Overview
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Custom JWT-based authentication
- **Data Storage**: JSON files (can be easily migrated to a database)

## Key Features
- User authentication (login/register)
- Book search by title and author
- Category-based browsing (Software, Database, English, Architecture, etc.)
- Shopping cart functionality
- User ratings and reviews (1-5 stars)
- Credit card payment simulation
- User profile management

## Code Style Guidelines
- Use TypeScript for all files
- Follow Next.js App Router patterns
- Use Tailwind CSS for styling
- Implement responsive design
- Use proper error handling and validation
- Follow REST API conventions for API routes
- Use proper TypeScript interfaces and types

## Architecture
- `/src/app` - App Router pages and layouts
- `/src/components` - Reusable React components
- `/src/lib` - Utility functions and configurations
- `/src/types` - TypeScript type definitions
- `/data` - JSON data files for books, users, etc.
- `/public` - Static assets

## Authentication
- JWT tokens for session management
- Password hashing with bcryptjs
- Protected routes and API endpoints

## State Management
- React hooks for local state
- Context API for global state (cart, user)
- Server actions for form submissions
