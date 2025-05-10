import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

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
  create(@Body() item: CreateItemDto): { message: string; data: Item } {
    return this.itemsService.create(item);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() item: UpdateItemDto,
  ): { message: string; data: Item | null } {
    console.log(id, item);
    const data = this.itemsService.update(id, item);
    if (!data) {
      throw new NotFoundException('Item not found');
    }
    return data;
  }
}
