import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  stock: number;

  @ApiProperty({ required: false })
  category: string;

  @ApiProperty()
  imageUrls: string;

  @ApiProperty({ required: false, default: false })
  published?: boolean = false;
}
