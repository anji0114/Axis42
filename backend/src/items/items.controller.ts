import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';

@Controller('/api/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll(): { message: string; data: Item[] } {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): {
    message: string;
    data: Item | undefined;
  } {
    return this.itemsService.findOne(id);
  }

  @Post()
  create(@Body() item: Omit<Item, 'id'>): { message: string; data: Item } {
    return this.itemsService.create(item);
  }
}
