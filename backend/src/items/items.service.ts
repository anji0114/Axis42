import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateItemDto } from './dto/update-item.dto';
import { CreateItemInput } from './dto/create-item.input';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  private readonly items: Item[] = [
    {
      id: 1,
      name: '商品1',
      description: 'これは商品1の説明です',
      price: 1000,
      soldedAt: undefined,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: 2,
      name: '商品2',
      description: 'これは商品2の説明です',
      price: 2000,
      soldedAt: undefined,
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02'),
    },
    {
      id: 3,
      name: '商品3',
      description: 'これは商品3の説明です',
      price: 3000,
      soldedAt: undefined,
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-03'),
    },
  ];

  findAll(): { message: string; data: Item[] } {
    return {
      message: 'Items retrieved successfully',
      data: this.items,
    };
  }

  findOne(id: string): { message: string; data: Item } {
    const item = this.items.find((item) => item.id === parseInt(id));
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return {
      message: 'Item retrieved successfully',
      data: item,
    };
  }

  create(dto: CreateItemInput): { message: string; data: Item } {
    const newItem: Item = {
      id: this.items.length + 1,
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.items.push(newItem);
    return {
      message: 'Item created successfully',
      data: newItem,
    };
  }

  update(id: string, dto: UpdateItemDto): { message: string; data: Item } {
    const index = this.items.findIndex((item) => item.id === parseInt(id));
    if (index === -1) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    const updatedItem = {
      ...this.items[index],
      ...dto,
      updatedAt: new Date(),
    };
    this.items[index] = updatedItem;
    return {
      message: 'Item updated successfully',
      data: updatedItem,
    };
  }
}
