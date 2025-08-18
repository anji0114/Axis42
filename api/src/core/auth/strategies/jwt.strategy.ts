import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import type { JwtPayload } from '../types';

// Cookieからトークンを抽出する関数
const cookieExtractor = (req: any) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['access_token'];
  }
  return token;
};

export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromExtractors([
      cookieExtractor,
      ExtractJwt.fromAuthHeaderAsBearerToken(),
    ]),
    ignoreExpiration: false,
    secretOrKey: process.env.JWT_SECRET!,
  },
  (payload: JwtPayload, done: any) => {
    try {
      // JWT payloadをそのまま返す（ユーザー検証は必要に応じて）
      return done(null, {
        userId: payload.userId,
        email: payload.email,
        name: payload.name,
      });
    } catch (error) {
      return done(error, false);
    }
  }
);