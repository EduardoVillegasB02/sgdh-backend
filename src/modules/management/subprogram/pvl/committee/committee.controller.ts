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
import { CommitteeService } from './committee.service';
import {
  CreateCommitteeDto,
  FilterCommitteeDto,
  UpdateCommitteeDto,
} from './dto';
import { SuccessMessage } from '../../../../../common/decorators';

@Controller('pvl/committee')
export class CommitteeController {
  constructor(private readonly committeeService: CommitteeService) {}

  @Get()
  findAll(@Query() dto: FilterCommitteeDto) {
    return this.committeeService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.committeeService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateCommitteeDto) {
    return this.committeeService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCommitteeDto,
  ) {
    return this.committeeService.update(id, dto);
  }

  @Delete(':id')
  toggleDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.committeeService.toggleDelete(id);
  }

  @Post('upload')
  @SuccessMessage('Creación masiva exitosa')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.committeeService.upload(file);
  }
}
