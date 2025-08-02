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
import { ProjectsService } from './projects.service';
import { createProjectSchema } from './dto/create-project.dto';
import { AuthUser } from '../common/types/auth.types';

interface RequestWithUser extends Request {
  user: AuthUser;
}

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createProject(@Body() body: any, @Req() req: RequestWithUser) {
    const result = createProjectSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException(result.error.issues);
    }

    return this.projectsService.createProject(req.user.userId, result.data);
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
}
