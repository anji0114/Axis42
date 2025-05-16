import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Query(() => [Item])
  items(): Item[] {
    const result = this.itemsService.findAll();
    return result.data;
  }

  @Query(() => Item)
  item(@Args('id', { type: () => ID }) id: string): Item {
    const result = this.itemsService.findOne(id);
    return result.data;
  }

  @Mutation(() => Item)
  createItem(@Args('createItemInput') createItemInput: CreateItemInput): Item {
    const result = this.itemsService.create(createItemInput);
    return result.data;
  }

  @Mutation(() => Item)
  updateItem(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateItemInput') updateItemInput: UpdateItemInput,
  ): Item {
    const result = this.itemsService.update(id, updateItemInput);
    return result.data;
  }
}
