import { Controller, Get, UseGuards, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { AuthUser } from '../shared/types/auth.types';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: AuthUser): Promise<User> {
    const foundUser = await this.usersService.findById(user.userId);

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }
}
