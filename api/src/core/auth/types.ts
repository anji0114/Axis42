import { Request } from 'express';

// JWT ペイロード型
export type JwtPayload = {
  userId: string;
  email: string;
  name: string;
};

// 認証済みユーザー型
export type AuthUser = JwtPayload;

// 認証付きリクエスト型
export interface AuthRequest extends Request {
  user: AuthUser;
}

// Google プロフィール型
export type GoogleProfile = {
  id: string;
  email: string;
  name: { givenName: string; familyName: string };
  emails: { value: string }[];
  photos: { value: string }[];
};

// 認証レスポンス型
export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    name: string | null;
  };
};

// ログイン結果型
export type LoginResult = {
  access_token: string;
  refresh_token: string;
  user: AuthUser;
};

// リフレッシュトークン結果型
export type RefreshTokenResult = {
  access_token: string;
  refresh_token: string;
  user: AuthUser;
};

// Cookie オプション型
export type CookieOptions = {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'lax' | 'strict' | 'none';
  maxAge: number;
};