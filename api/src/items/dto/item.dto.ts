export class ItemDto {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export class CreateItemDto {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export class UpdateItemDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}
