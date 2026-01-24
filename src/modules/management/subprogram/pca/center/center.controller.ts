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
import { CenterService } from './center.service';
import { CreateCenterDto, UpdateCenterDto } from './dto';
import { SuccessMessage } from '../../../../../common/decorators';
import { SearchDto } from '../../../../../common/dto';

@Controller('pca/center')
export class CenterController {
    constructor(private readonly centerService: CenterService) {}

    @Get()
    findAll(@Query() dto: SearchDto) {
        return this.centerService.findAll(dto);
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.centerService.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateCenterDto) {
        return this.centerService.create(dto);
    }

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateCenterDto,
    ) {
        return this.centerService.update(id, dto);
    }

    @Delete(':id')
    toggleDelete(@Param('id', ParseUUIDPipe) id: string) {
        return this.centerService.toggleDelete(id);
    }

    @Post('upload')
    @SuccessMessage('Creacion masiva Exitosa')
    @UseInterceptors(FileInterceptor('file'))
    upload(@UploadedFile() file: Express.Multer.File) {
        return this.centerService.upload(file);
    }
}

