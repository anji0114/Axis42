import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFunctionDto } from './dto/create-function.dto';
import { Function } from '@prisma/client';

@Injectable()
export class FunctionsService {
  constructor(private prisma: PrismaService) {}

  async createFunction(
    userId: string,
    createFunctionDto: CreateFunctionDto,
  ): Promise<Function> {
    // プロジェクトが存在し、ユーザーが所有者であることを確認
    const project = await this.prisma.project.findUnique({
      where: {
        id: createFunctionDto.projectId,
        userId,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found or access denied');
    }

    return this.prisma.function.create({
      data: {
        name: createFunctionDto.name,
        description: createFunctionDto.description,
        projectId: createFunctionDto.projectId,
      },
    });
  }

  async getFunction(userId: string, id: string): Promise<Function> {
    const func = await this.prisma.function.findUnique({
      where: {
        id,
        project: {
          userId,
        },
      },
    });

    if (!func) {
      throw new NotFoundException('Function not found');
    }

    return func;
  }
}
