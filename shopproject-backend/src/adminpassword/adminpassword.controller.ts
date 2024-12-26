import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AdminpasswordService } from './adminpassword.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateAdminpasswordDto } from './dto/update-adminpassword.dto';
import { CategoryEntity } from 'src/category/entities/category.entity';
@Controller('adminpassword')
@ApiTags('adminpassword')
export class AdminpasswordController {
  constructor(private readonly adminpasswordService: AdminpasswordService) {}

  @Get(':id')
  @ApiOkResponse({ type: CategoryEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.adminpasswordService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: CategoryEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdminpasswordDto: UpdateAdminpasswordDto,
  ) {
    return this.adminpasswordService.update(id, updateAdminpasswordDto);
  }
}
