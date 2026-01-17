/**
 * User-related interfaces
 */

export interface SignupData {
  email: string;
  password: string;
  name: string;
}

export interface SignupResult {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: Date;
  };
  token: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResult {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: Date;
  };
  token: string;
}

export interface ProfileResult {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

