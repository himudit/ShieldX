/**
 * JWT-related interfaces
 */

export interface JWTPayload {
  user_id: string;
  email: string;
  issued_at: number;
  expires_at: number;
}

