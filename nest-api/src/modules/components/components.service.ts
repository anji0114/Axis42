import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/core/database/prisma/prisma.service';
import { AnthropicService } from '@/modules/anthropic/anthropic.service';
import { CreateComponentDto } from './dto/create-component.dto';
import { Component } from '@prisma/client';
import { extractHtmlContent } from './utils/html-extractor.util';
import { PROMPT_TEMPLATES } from './constants/prompts.constant';

@Injectable()
export class ComponentsService {
  constructor(
    private prisma: PrismaService,
    private anthropicService: AnthropicService,
  ) {}

  async createComponent(
    userId: string,
    createComponentDto: CreateComponentDto,
  ): Promise<Component> {
    // プロジェクトが存在し、ユーザーが所有者であることを確認
    const project = await this.prisma.project.findUnique({
      where: {
        id: createComponentDto.projectId,
        userId,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found or access denied');
    }

    // 基本的なComponentレコードを作成（AI生成なし）
    return this.prisma.component.create({
      data: {
        name: createComponentDto.name,
        description: createComponentDto.description,
        projectId: createComponentDto.projectId,
        content: '', // 空文字で開始
        framework: 'vanilla', // デフォルト値
      },
    });
  }

  async getComponent(userId: string, id: string): Promise<Component> {
    const component = await this.prisma.component.findUnique({
      where: {
        id,
        project: {
          userId,
        },
      },
    });

    if (!component) {
      throw new NotFoundException('Component not found');
    }

    return component;
  }

  async getComponentPreview(
    userId: string,
    id: string,
  ): Promise<{ content: string }> {
    const component = await this.getComponent(userId, id);
    return { content: component.content };
  }

  async updateComponent(
    userId: string,
    id: string,
    prompt: string,
    framework?: string,
  ): Promise<Component> {
    const component = await this.getComponent(userId, id);

    // AI修正
    const updatePrompt = PROMPT_TEMPLATES.UPDATE_COMPONENT(
      prompt,
      component.content || PROMPT_TEMPLATES.DEFAULT_HTML,
      framework || component.framework,
    );

    const aiResponse = await this.anthropicService.createMessage(updatePrompt);

    // AIレスポンスからHTMLのみを抽出
    const updatedContent = extractHtmlContent(aiResponse);

    const updateData: { content: string; framework?: string } = {
      content: updatedContent,
    };
    if (framework) {
      updateData.framework = framework;
    }

    return this.prisma.component.update({
      where: { id },
      data: updateData,
    });
  }
}
