import { Injectable } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  private items = [
    { id: 1, name: 'Item 1', description: 'Item 1 description' },
    { id: 2, name: 'Item 2', description: 'Item 2 description' },
    { id: 3, name: 'Item 3', description: 'Item 3 description' },
  ];

  findAll(): { message: string; data: Item[] } {
    return {
      message: 'This action returns all items !!',
      data: this.items,
    };
  }

  findOne(id: string): { message: string; data: Item | undefined } {
    return {
      message: `This action returns a #${id} item !!`,
      data: this.items.find((item) => item.id === parseInt(id)),
    };
  }

  create(dto: CreateItemDto): { message: string; data: Item } {
    const newItem = {
      id: this.items.length + 1,
      name: dto.name,
      description: dto.description,
    };
    this.items.push(newItem);
    return {
      message: 'Item created successfully',
      data: newItem,
    };
  }

  update(
    id: string,
    dto: UpdateItemDto,
  ): { message: string; data: Item | null } {
    const itemIndex = this.items.findIndex((item) => item.id === parseInt(id));
    if (itemIndex === -1) {
      return {
        message: 'Item not found',
        data: null,
      };
    }
    this.items[itemIndex] = { ...this.items[itemIndex], ...dto };
    return {
      message: 'Item updated successfully',
      data: this.items[itemIndex],
    };
  }
}
