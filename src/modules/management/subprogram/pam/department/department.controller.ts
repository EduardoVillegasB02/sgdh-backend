import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto';
import { SuccessMessage } from '../../../../../common/decorators';
import { SearchDto } from '../../../../../common/dto';

@Controller('pam/department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  findAll(@Query() dto: SearchDto) {
    return this.departmentService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.departmentService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateDepartmentDto) {
    return this.departmentService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateDepartmentDto,
  ) {
    return this.departmentService.update(id, dto);
  }

  @Delete(':id')
  toggleDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.departmentService.toggleDelete(id);
  }

  @Post('upload')
  @SuccessMessage('Creación masiva exitosa')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.departmentService.upload(file);
  }
}
