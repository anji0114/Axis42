export interface JwtPayload {
  userId: string;
  email: string;
  name: string;
}

export type AuthUser = JwtPayload;

export interface AuthRequest extends Request {
  user: AuthUser;
}
