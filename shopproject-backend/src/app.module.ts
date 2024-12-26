import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { AdminpasswordModule } from './adminpassword/adminpassword.module';

@Module({
  imports: [
    PrismaModule,
    ProductModule,
    UsersModule,
    AuthModule,
    CategoryModule,
    AdminpasswordModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
