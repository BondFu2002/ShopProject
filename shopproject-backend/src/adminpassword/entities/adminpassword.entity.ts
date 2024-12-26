import { AdminPassword } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Adminpassword implements AdminPassword {
  @ApiProperty()
  id: number;

  @ApiProperty()
  password: string;
}
