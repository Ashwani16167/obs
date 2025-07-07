import { NextRequest, NextResponse } from 'next/server';
import { getUsers, saveUsers, getUserByEmail } from '@/lib/data';
import { hashPassword, generateToken, generateId } from '@/lib/auth';
import { User } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();
    const { email, password, name, contactNumber, shippingAddress } = userData;

    // Validation
    if (!email || !password || !name || !contactNumber || !shippingAddress) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User already exists with this email' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser: User = {
      id: generateId(),
      email,
      password: hashedPassword,
      name,
      contactNumber,
      shippingAddress,
      createdAt: new Date().toISOString(),
    };

    // Save user
    const users = getUsers();
    users.push(newUser);
    saveUsers(users);

    // Generate token
    const token = generateToken(newUser.id);
    const { password: _password, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
