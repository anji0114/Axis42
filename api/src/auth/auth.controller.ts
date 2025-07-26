import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { Response } from 'express';
import { UserService } from './user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

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

    // フロントエンドにリダイレクト
    res.redirect('http://localhost:3000/dashboard');
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(
    @Req()
    req: Request & { user: { userId: string; email: string; name: string } },
  ) {
    const user = req.user as { userId: string; email: string; name: string };

    if (!user.userId) {
      throw new Error('User ID not found');
    }

    // DBから最新情報を取得
    const dbUser = await this.userService.findById(user.userId);
    if (!dbUser) {
      throw new Error('User not found');
    }

    return {
      id: dbUser.id,
      email: dbUser.email,
      name: dbUser.name,
      profileImageUrl: dbUser.profileImageUrl,
      createdAt: dbUser.createdAt,
    };
  }

  @Get('logout')
  logout(@Res() res: Response) {
    res.clearCookie('access_token');
    res.redirect('http://localhost:3000/login');
  }
}
