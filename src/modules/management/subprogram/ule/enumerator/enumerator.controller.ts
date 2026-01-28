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
import { EnumeratorService } from './enumerator.service';
import { CreateEnumeratorDto, UpdateEnumeratorDto } from './dto';
import { SuccessMessage } from '../../../../../common/decorators';
import { SearchDto } from '../../../../../common/dto';

@Controller('ule/enumerator')
export class EnumeratorController {
  constructor(private readonly enumeratorService: EnumeratorService) {}

  @Get()
  findAll(@Query() dto: SearchDto) {
    return this.enumeratorService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.enumeratorService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateEnumeratorDto) {
    return this.enumeratorService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateEnumeratorDto,
  ) {
    return this.enumeratorService.update(id, dto);
  }

  @Delete(':id')
  toggleDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.enumeratorService.toggleDelete(id);
  }

  @Post('upload')
  @SuccessMessage('Creación masiva exitosa')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.enumeratorService.upload(file);
  }
}
