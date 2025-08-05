import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VariationsService } from './variations.service';
import { createVariationSchema } from './dto/create-variation.dto';
import { AuthUser } from '../common/types/auth.types';

interface RequestWithUser extends Request {
  user: AuthUser;
}

@Controller('variations')
export class VariationsController {
  constructor(private variationsService: VariationsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createVariation(@Body() body: any, @Req() req: RequestWithUser) {
    const result = createVariationSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException(result.error.issues);
    }

    return this.variationsService.createVariation(req.user.userId, result.data);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getVariation(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.variationsService.getVariation(req.user.userId, id);
  }
}
