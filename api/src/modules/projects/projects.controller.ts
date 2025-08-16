import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProjectsService } from './projects.service';
import {
  createProjectSchema,
  CreateProjectDto,
} from './dto/create-project.dto';
import { AuthUser } from '@/shared/types/auth.types';
import { createZodPipe } from '@/shared/pipes/zod-validation.pipe';

interface RequestWithUser extends Request {
  user: AuthUser;
}

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createProject(
    @Body(createZodPipe(createProjectSchema, true)) dto: CreateProjectDto,
    @Req() req: RequestWithUser,
  ) {
    console.log('🎯 コントローラーで受信したデータ:', dto);

    const project = await this.projectsService.createProject(
      req.user.userId,
      dto,
    );

    return project;
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getProjects(@Req() req: RequestWithUser) {
    return this.projectsService.getProjects(req.user.userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getProject(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.projectsService.getProject(req.user.userId, id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteProject(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.projectsService.deleteProject(req.user.userId, id);
  }
}
