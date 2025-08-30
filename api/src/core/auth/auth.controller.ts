import { Controller, Get, UseGuards, Req, Res, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { CLIENT_URL } from 'src/shared/constants/urls';
import { AuthUser } from 'src/shared/types/auth.types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth(@Req() req: Request) {
    console.log(req);
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req: Request & { user: User },
    @Res() res: Response,
  ) {
    const user = req.user;
    const userAgent = req.headers['user-agent'];
    const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';

    const { access_token, refresh_token } = await this.authService.login(
      user,
      userAgent,
      ipAddress,
    );

    // Access Token Cookie (15分)
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 2 * 60 * 60 * 1000, // 2時間
    });

    // Refresh Token Cookie (7日間)
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7日間
    });

    res.redirect(`${CLIENT_URL}/projects`);
  }

  @Get('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Req() req: Request & { user: AuthUser }, @Res() res: Response) {
    // DBのRefresh Tokenを無効化
    await this.authService.revokeRefreshTokens(req.user.userId);

    // Cookieをクリア
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    return res.json({ ok: true });
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  me(@Req() req: Request & { user: AuthUser }) {
    return req.user;
  }
  // Refresh Token使用してAccess Token更新
  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    try {
      // CookieからRefresh Tokenを取得
      const refreshToken = req.cookies?.refresh_token as string;

      if (!refreshToken) {
        return res.status(401).json({ error: 'No refresh token provided' });
      }

      // ユーザーエージェントとIPアドレスを取得
      const userAgent = req.headers['user-agent'];
      const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';

      // 新しいAccess Token + Refresh Tokenを発行
      const {
        access_token,
        refresh_token: new_refresh_token,
        user,
      } = await this.authService.refreshAccessToken(
        refreshToken,
        userAgent,
        ipAddress,
      );

      // 新しいトークンをCookieにセット
      res.cookie('access_token', access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 2 * 60 * 60 * 1000, // 2時間
      });

      res.cookie('refresh_token', new_refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7日間
      });

      return res.json({
        userId: user.id,
        email: user.email,
        name: user.name,
      });
    } catch {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }
  }

  // postman用ログイン
  @Post('postman-login')
  login(@Res({ passthrough: true }) res: Response) {
    // accsess_tokenを自分でセットする
    res.cookie('access_token', process.env.ACCESS_TOKEN, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 60 * 60 * 24 * 7 * 1000, // 7日
    });
    return { ok: true };
  }
}
