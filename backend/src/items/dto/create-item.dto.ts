import { IsString, IsNotEmpty } from 'class-validator';

export class CreateItemDto {
  @IsString({ message: 'Name must be a string!!' })
  @IsNotEmpty({ message: 'Name is required!!' })
  name: string;

  @IsString()
  description: string;
}
