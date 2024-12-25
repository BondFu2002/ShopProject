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
  // @IsNumber()
  // @IsNotEmpty()
  // @ApiProperty()
  // id: number;

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
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  stock: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  categoryId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  CId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  MId: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  published?: boolean = false;
}
