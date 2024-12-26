import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAdminpasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
