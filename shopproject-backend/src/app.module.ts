import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, ProductModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
