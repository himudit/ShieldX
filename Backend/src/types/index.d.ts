import { Request } from 'express';

/**
 * Extend Express Request to include userId from auth middleware
 */
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

