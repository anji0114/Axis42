import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';
import { CreateItemDto, UpdateItemDto } from './dto/item.dto';

@Injectable()
export class ItemsService {
  private items: Item[] = [
    {
      id: 1,
      name: 'ノートPC',
      description: '高性能なビジネス向けノートパソコン',
      price: 150000,
      stock: 10,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: 2,
      name: 'ワイヤレスマウス',
      description: 'Bluetooth対応の静音マウス',
      price: 3500,
      stock: 25,
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02'),
    },
    {
      id: 3,
      name: 'USB-Cハブ',
      description: '7in1多機能USBハブ',
      price: 5000,
      stock: 15,
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-03'),
    },
  ];
  private nextId = 4;

  findAll(): Item[] {
    return this.items;
  }

  findOne(id: number): Item | undefined {
    return this.items.find(item => item.id === id);
  }

  create(createItemDto: CreateItemDto): Item {
    const newItem: Item = {
      id: this.nextId++,
      ...createItemDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.items.push(newItem);
    return newItem;
  }

  update(id: number, updateItemDto: UpdateItemDto): Item | undefined {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) {
      return undefined;
    }
    
    this.items[index] = {
      ...this.items[index],
      ...updateItemDto,
      updatedAt: new Date(),
    };
    return this.items[index];
  }

  remove(id: number): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) {
      return false;
    }
    
    this.items.splice(index, 1);
    return true;
  }
}
