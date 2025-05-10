import { Injectable } from '@nestjs/common';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  private items = [
    { id: 1, name: 'Item 1', description: 'Item 1 description' },
    { id: 2, name: 'Item 2', description: 'Item 2 description' },
    { id: 3, name: 'Item 3', description: 'Item 3 description' },
  ];

  findAll(): { message: string; data: Item[] } {
    return {
      message: 'This action returns all items',
      data: this.items,
    };
  }

  findOne(id: string): { message: string; data: Item | undefined } {
    return {
      message: `This action returns a #${id} item`,
      data: this.items.find((item) => item.id === parseInt(id)),
    };
  }

  create(item: Omit<Item, 'id'>): { message: string; data: Item } {
    const newItem = { id: this.items.length + 1, ...item };
    this.items.push(newItem);
    return {
      message: 'Item created successfully',
      data: newItem,
    };
  }
}
