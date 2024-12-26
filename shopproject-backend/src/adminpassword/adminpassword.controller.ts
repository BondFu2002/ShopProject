import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AdminpasswordService } from './adminpassword.service';

import { UpdateAdminpasswordDto } from './dto/update-adminpassword.dto';

@Controller('adminpassword')
export class AdminpasswordController {
  constructor(private readonly adminpasswordService: AdminpasswordService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.adminpasswordService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdminpasswordDto: UpdateAdminpasswordDto,
  ) {
    return this.adminpasswordService.update(id, updateAdminpasswordDto);
  }
}
