import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemDto, CreateItemDto, UpdateItemDto } from './dto/item.dto';

@Controller('/api/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll(): ItemDto[] {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): ItemDto {
    const item = this.itemsService.findOne(id);
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  @Post()
  create(@Body() createItemDto: CreateItemDto): ItemDto {
    return this.itemsService.create(createItemDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateItemDto: UpdateItemDto,
  ): ItemDto {
    const updatedItem = this.itemsService.update(id, updateItemDto);
    if (!updatedItem) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return updatedItem;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): { message: string } {
    const deleted = this.itemsService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return { message: `Item with ID ${id} has been deleted` };
  }
}
