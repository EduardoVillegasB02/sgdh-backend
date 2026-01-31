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
import { EthnicService } from './ethnic.service';
import { CreateEthnicDto, UpdateEthnicDto } from './dto';
import { SuccessMessage } from '../../../../../common/decorators';
import { SearchDto } from '../../../../../common/dto';

@Controller('pam/ethnic')
export class EthnicController {
  constructor(private readonly EthnicService: EthnicService) {}

  @Get()
  findAll(@Query() dto: SearchDto) {
    return this.EthnicService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.EthnicService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateEthnicDto) {
    return this.EthnicService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateEthnicDto) {
    return this.EthnicService.update(id, dto);
  }

  @Delete(':id')
  toggleDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.EthnicService.toggleDelete(id);
  }

  @Post('upload')
  @SuccessMessage('Creación masiva exitosa')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.EthnicService.upload(file);
  }
}
