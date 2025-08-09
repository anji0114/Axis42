// src/anthropic/anthropic.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Anthropic from '@anthropic-ai/sdk';

@Injectable()
export class AnthropicService {
  private anthropic: Anthropic;

  constructor(private configService: ConfigService) {
    this.anthropic = new Anthropic({
      apiKey: this.configService.get<string>('ANTHROPIC_API_KEY'),
    });
  }

  async createMessage(
    prompt: string,
    model: string = 'claude-3-haiku-20240307',
  ): Promise<string> {
    try {
      const response = await this.anthropic.messages.create({
        model: model,
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      if (response.content[0].type === 'text') {
        return response.content[0].text;
      }

      throw new Error('Unexpected response format from Anthropic API');
    } catch (error) {
      console.error('Anthropic API error:', error);
      throw error;
    }
  }
}
