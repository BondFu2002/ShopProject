import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
} from 'class-validator';

export class CreateProductDto {
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(300)
  @ApiProperty({ required: false })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  stock: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  category: string;

  @IsString()
  @ApiProperty()
  imageUrl: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  published?: boolean = false;
}
