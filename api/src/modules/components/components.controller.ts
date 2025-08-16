import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Patch,
  Get,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ComponentsService } from './components.service';
import {
  createComponentSchema,
  CreateComponentDto,
} from './dto/create-component.dto';
import { createZodPipe } from '@/shared/pipes/zod-validation.pipe';
import { AuthUser } from '@/shared/types/auth.types';

interface RequestWithUser extends Request {
  user: AuthUser;
}

@Controller('components')
export class ComponentsController {
  constructor(private componentsService: ComponentsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createComponent(
    @Body(createZodPipe(createComponentSchema)) dto: CreateComponentDto,
    @Req() req: RequestWithUser,
  ) {
    return this.componentsService.createComponent(req.user.userId, dto);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getComponent(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.componentsService.getComponent(req.user.userId, id);
  }

  @Get(':id/preview')
  @UseGuards(AuthGuard('jwt'))
  async getComponentPreview(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
  ) {
    return this.componentsService.getComponentPreview(req.user.userId, id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateComponent(
    @Param('id') id: string,
    @Body() body: { prompt: string; framework?: string },
    @Req() req: RequestWithUser,
  ) {
    return this.componentsService.updateComponent(
      req.user.userId,
      id,
      body.prompt,
      body.framework,
    );
  }
}
