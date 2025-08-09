import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { Response } from 'express';
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
    const { access_token } = await this.authService.login(user);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // 本番環境ではHTTPS必須
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7日間
    });

    res.redirect(`${CLIENT_URL}/projects`);
  }

  @Get('logout')
  logout(@Res() res: Response) {
    res.clearCookie('access_token');
    res.redirect(`${CLIENT_URL}/login`);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  me(@Req() req: Request & { user: AuthUser }) {
    return req.user;
  }
}
