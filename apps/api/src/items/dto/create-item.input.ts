import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class CreateItemInput {
  @Field()
  @IsString({ message: 'Name must be a string!!' })
  @IsNotEmpty({ message: 'Name is required!!' })
  name: string;

  @Field()
  @IsString()
  description: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Field({ nullable: true })
  @IsOptional()
  soldedAt?: Date;
}
