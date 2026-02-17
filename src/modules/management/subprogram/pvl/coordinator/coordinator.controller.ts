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
import { CoordinatorService } from './coordinator.service';
import {
  CreateCoordinatorDto,
  FilterCoordinatorDto,
  UpdateCoordinatorDto,
} from './dto';
import { SuccessMessage } from '../../../../../common/decorators';

@Controller('pvl/coordinator')
export class CoordinatorController {
  constructor(private readonly coordinatorService: CoordinatorService) {}

  @Get()
  findAll(@Query() dto: FilterCoordinatorDto) {
    return this.coordinatorService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.coordinatorService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateCoordinatorDto) {
    return this.coordinatorService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCoordinatorDto,
  ) {
    return this.coordinatorService.update(id, dto);
  }

  @Delete(':id')
  toggleDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.coordinatorService.toggleDelete(id);
  }

  @Post('upload')
  @SuccessMessage('Creación masiva exitosa')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.coordinatorService.upload(file);
  }
}
