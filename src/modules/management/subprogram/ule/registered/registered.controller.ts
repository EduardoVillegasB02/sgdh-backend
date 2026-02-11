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
import { RegisteredService } from './registered.service';
import {
  CreateRegisteredDto,
  FilterRegisteredDto,
  UpdateRegisteredDto,
} from './dto';
import { SuccessMessage } from '../../../../../common/decorators';
import { SearchDto } from '../../../../../common/dto';

@Controller('ule/registered')
export class RegisteredController {
  constructor(private readonly registeredService: RegisteredService) {}

  @Get()
  findAll(@Query() dto: FilterRegisteredDto) {
    return this.registeredService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.registeredService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateRegisteredDto) {
    return this.registeredService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateRegisteredDto,
  ) {
    return this.registeredService.update(id, dto);
  }

  @Delete(':id')
  toggleDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.registeredService.toggleDelete(id);
  }

  @Post('upload')
  @SuccessMessage('Creación masiva exitosa')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.registeredService.upload(file);
  }
}
