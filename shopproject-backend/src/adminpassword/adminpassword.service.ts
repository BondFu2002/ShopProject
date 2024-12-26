import { Injectable } from '@nestjs/common';
import { UpdateAdminpasswordDto } from './dto/update-adminpassword.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminpasswordService {
  constructor(private prisma: PrismaService) {}
  findOne(id: number) {
    return this.prisma.adminPassword.findUnique({ where: { id } });
  }

  update(id: number, updateAdminpasswordDto: UpdateAdminpasswordDto) {
    return this.prisma.adminPassword.update({
      where: { id },
      data: updateAdminpasswordDto,
    });
  }
}
