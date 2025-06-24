import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Item {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Int)
  price: number;

  @Field({ nullable: true })
  soldedAt?: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
