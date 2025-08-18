// Types
export type {
  JwtPayload,
  AuthUser,
  AuthRequest,
  GoogleProfile,
  AuthResponse,
  LoginResult,
  RefreshTokenResult,
  CookieOptions,
} from './types';

// Services
export { AuthService, authService } from './services/auth.service';
export { UserService, userService } from './services/user.service';

// Middleware
export { authenticateJWT, extractTokenFromCookie, optionalAuth } from './middleware/auth.middleware';

// Passport
export { PassportService, passportInstance } from './services/passport.service';

// Strategies
export { googleStrategy } from './strategies/google.strategy';
export { jwtStrategy } from './strategies/jwt.strategy';