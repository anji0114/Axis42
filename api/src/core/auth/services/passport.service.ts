import passport from "passport";
import { googleStrategy } from "../strategies/google.strategy";
import { jwtStrategy } from "../strategies/jwt.strategy";

export class PassportService {
  static initialize() {
    // Google OAuth戦略を登録
    passport.use("google", googleStrategy);

    // JWT戦略を登録
    passport.use("jwt", jwtStrategy);

    // セッション用のシリアライゼーション（OAuth用）
    passport.serializeUser((user: any, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id: string, done) => {
      // 必要に応じてユーザー情報を取得
      // 今回はJWT中心なので、シンプルに実装
      done(null, { id });
    });

    return passport;
  }

  static getGoogleAuthMiddleware() {
    return passport.authenticate("google", {
      scope: ["email", "profile"],
    });
  }

  static getGoogleCallbackMiddleware() {
    return passport.authenticate("google", {
      session: false, // JWTを使うのでセッションは無効
    });
  }

  static getJWTAuthMiddleware() {
    return passport.authenticate("jwt", {
      session: false,
    });
  }
}

// Passport初期化
export const passportInstance = PassportService.initialize();
