import { Product } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';

export class ProductEntity implements Product {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty()
  price: number;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  categoryId: number;

  @ApiProperty({ required: false, type: CategoryEntity })
  category: CategoryEntity;

  @ApiProperty()
  published: boolean;

  @ApiProperty({ required: false, nullable: true })
  imageUrl: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  MId: number;

  @ApiProperty()
  CId: number;

  @ApiProperty({ required: false, type: UserEntity })
  CreatedBy?: UserEntity;

  @ApiProperty({ required: false, type: UserEntity })
  ModifiedBy?: UserEntity;

  constructor({ CreatedBy, ModifiedBy, ...data }: Partial<ProductEntity>) {
    Object.assign(this, data);

    if (CreatedBy) {
      this.CreatedBy = new UserEntity(CreatedBy);
    }
    if (ModifiedBy) {
      this.ModifiedBy = new UserEntity(ModifiedBy);
    }
  }
}
