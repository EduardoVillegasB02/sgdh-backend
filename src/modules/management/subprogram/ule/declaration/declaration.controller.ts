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
import { DeclarationService } from './declaration.service';
import { CreateDeclarationDto, UpdateDeclarationDto } from './dto';
import { SuccessMessage } from '../../../../../common/decorators';
import { SearchDto } from '../../../../../common/dto';

@Controller('ule/declaration')
export class DeclarationController {
  constructor(private readonly declarationService: DeclarationService) {}

  @Get()
  findAll(@Query() dto: SearchDto) {
    return this.declarationService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.declarationService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateDeclarationDto) {
    return this.declarationService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateDeclarationDto,
  ) {
    return this.declarationService.update(id, dto);
  }

  @Delete(':id')
  toggleDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.declarationService.toggleDelete(id);
  }

  @Post('upload')
  @SuccessMessage('Creación masiva exitosa')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.declarationService.upload(file);
  }
}
