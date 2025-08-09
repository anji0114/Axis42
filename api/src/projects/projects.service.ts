import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../core/database/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async createProject(
    userId: string,
    createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    return this.prisma.project.create({
      data: {
        name: createProjectDto.name,
        description: createProjectDto.description,
        userId,
      },
    });
  }

  async getProjects(userId: string): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getProject(userId: string, id: string): Promise<Project> {
    const project = await this.prisma.project.findUnique({
      where: {
        id,
        userId,
      },
      include: {
        functions: true,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async deleteProject(userId: string, id: string): Promise<void> {
    await this.prisma.project.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
