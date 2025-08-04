import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VariationsService } from './variations.service';
import {
  createVariationSchema,
  createVariationWithFilesSchema,
  CreateVariationDto,
} from './dto/create-variation.dto';
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

  @Post('with-files')
  @UseGuards(AuthGuard('jwt'))
  async createVariationWithFiles(
    @Body() body: any,
    @Req() req: RequestWithUser,
  ) {
    const result = createVariationWithFilesSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException(result.error.issues);
    }

    return this.variationsService.createVariationWithFiles(
      req.user.userId,
      result.data,
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getVariation(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.variationsService.getVariation(req.user.userId, id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getVariationsByFunction(
    @Query('functionId') functionId: string,
    @Req() req: RequestWithUser,
  ) {
    if (!functionId) {
      throw new BadRequestException('functionId is required');
    }
    return this.variationsService.getVariationsByFunction(
      req.user.userId,
      functionId,
    );
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateVariation(
    @Param('id') id: string,
    @Body() body: Partial<CreateVariationDto>,
    @Req() req: RequestWithUser,
  ) {
    return this.variationsService.updateVariation(req.user.userId, id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteVariation(@Param('id') id: string, @Req() req: RequestWithUser) {
    await this.variationsService.deleteVariation(req.user.userId, id);
    return { message: 'Variation deleted successfully' };
  }
}
