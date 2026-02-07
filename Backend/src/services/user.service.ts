import { prisma } from '../config/primsa';
import { hashPassword, verifyPassword } from '../utils/password';
import { signToken } from '../utils/jwt';
import {
  SignupData,
  SignupResult,
  LoginData,
  LoginResult,
  ProfileResult,
} from '../interfaces/user.interface';

/**
 * Sign up a new user
 */
export const signup = async (data: SignupData): Promise<SignupResult> => {
  // Validate input
  if (!data.email || !data.password || !data.name) {
    const error = new Error('Email, password, and name are required');
    (error as any).statusCode = 400;
    throw error;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    const error = new Error('Invalid email format');
    (error as any).statusCode = 400;
    throw error;
  }

  // Validate password length
  if (data.password.length < 8) {
    const error = new Error('Password must be at least 8 characters long');
    (error as any).statusCode = 400;
    throw error;
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    const error = new Error('User with this email already exists');
    (error as any).statusCode = 409;
    throw error;
  }

  // Hash password
  const hashedPassword = await hashPassword(data.password);

  // Create user
  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
    },
  });

  // Generate JWT token
  const token = signToken(user.id, user.email);

  // Return user data (without password) and token
  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    },
    token,
  };
};


/**
 * Login an existing user
 */
export const login = async (data: LoginData): Promise<LoginResult> => {
  // Validate input
  if (!data.email || !data.password) {
    const error = new Error('Email and password are required');
    (error as any).statusCode = 400;
    throw error;
  }

  // Validate email forma
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    const error = new Error('Invalid email format');
    (error as any).statusCode = 400;
    throw error;
  }

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    const error = new Error('Invalid email or password');
    (error as any).statusCode = 401;
    throw error;
  }

  // Verify password
  const isPasswordValid = await verifyPassword(user.password, data.password);

  if (!isPasswordValid) {
    const error = new Error('Invalid email or password');
    (error as any).statusCode = 401;
    throw error;
  }

  // Generate JWT token
  const token = signToken(user.id, user.email);

  // Return user data (without password) and token
  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    },
    token,
  };
};

/**
 * Get user profile by ID
 */
export const getProfile = async (userId: string): Promise<ProfileResult> => {
  // Find user by ID
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    const error = new Error('User not found');
    (error as any).statusCode = 404;
    throw error;
  }

  return user;
};

