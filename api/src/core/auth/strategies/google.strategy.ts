import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { userService } from '../services/user.service';
import type { GoogleProfile } from '../types';

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback',
    scope: ['email', 'profile'],
  },
  async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
      // Passport Google OAuth20のprofileを変換
      const googleProfile: GoogleProfile = {
        id: profile.id,
        email: profile.emails?.[0]?.value || '',
        name: {
          givenName: profile.name?.givenName || '',
          familyName: profile.name?.familyName || '',
        },
        emails: profile.emails || [],
        photos: profile.photos || [],
      };

      const user = await userService.findOrCreateUser(googleProfile);
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
);