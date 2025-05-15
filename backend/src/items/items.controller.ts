import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
  soldedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

@Controller('/api/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll(): { message: string; data: Item[] } {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): { message: string; data: Item } {
    return this.itemsService.findOne(id);
  }

  @Post()
  create(
    @Body() item: CreateItemDto,
  ): Promise<{ message: string; data: Item }> {
    return this.itemsService.create(item);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() item: UpdateItemDto,
  ): { message: string; data: Item } {
    return this.itemsService.update(id, item);
  }
}
