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
} from "./types";

// Services
export { AuthService, authService } from "./authService";
export { UserService, userService } from "./userService";

// Middleware
export {
  authenticateJWT,
  extractTokenFromCookie,
  optionalAuth,
} from "./middleware/authMiddleware";

// Passport
export { PassportService, passportInstance } from "./passportService";

// Strategies
export { googleStrategy } from "./strategies/googleStrategy";
export { jwtStrategy } from "./strategies/jwtStrategy";
