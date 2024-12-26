import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateAdminpasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  password: number;
}
