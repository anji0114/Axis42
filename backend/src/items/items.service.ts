import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
  soldedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  findAll(): { message: string; data: Item[] } {
    return {
      message: 'This action returns all items !!',
      data: [],
    };
  }

  findOne(id: string): { message: string; data: Item } {
    const item = {
      id: 1,
      name: 'Item 1',
      description: 'Description 1',
      price: 100,
      soldedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    return {
      message: `This action returns a #${id} item !!`,
      data: item,
    };
  }

  async create(
    dto: Prisma.ItemsCreateInput,
  ): Promise<{ message: string; data: Item }> {
    const item = await this.prisma.items.create({
      data: dto,
    });

    return {
      message: 'Item created successfully',
      data: item,
    };
  }

  update(id: string, dto: UpdateItemDto): { message: string; data: Item } {
    const updatedItem = {
      id: 1,
      name: dto.name || '',
      description: 'aa',
      price: 100,
      soldedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return {
      message: 'Item updated successfully',
      data: updatedItem,
    };
  }
}
