import { Module } from '@nestjs/common';
import { AdminpasswordService } from './adminpassword.service';
import { AdminpasswordController } from './adminpassword.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AdminpasswordController],
  providers: [AdminpasswordService],
  imports: [PrismaModule],
})
export class AdminpasswordModule {}
