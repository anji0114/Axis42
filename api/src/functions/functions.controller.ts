import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  BadRequestException,
  Get,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FunctionsService } from './functions.service';
import { createFunctionSchema } from './dto/create-function.dto';
import { AuthUser } from '../shared/types/auth.types';

interface RequestWithUser extends Request {
  user: AuthUser;
}

@Controller('functions')
export class FunctionsController {
  constructor(private functionsService: FunctionsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createFunction(@Body() body: any, @Req() req: RequestWithUser) {
    const result = createFunctionSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException(result.error.issues);
    }

    return this.functionsService.createFunction(req.user.userId, result.data);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getFunction(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.functionsService.getFunction(req.user.userId, id);
  }
}
