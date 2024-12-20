import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, ProductModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
