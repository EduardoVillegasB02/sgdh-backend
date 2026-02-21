import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { MotherService } from './mother.service';
import { CreateMotherDto, FilterMotherDto, UpdateMotherDto } from './dto';

@Controller('compromise/mother')
export class MotherController {
  constructor(private readonly motherService: MotherService) {}

  @Get()
  findAll(@Query() dto: FilterMotherDto) {
    return this.motherService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.motherService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateMotherDto) {
    return this.motherService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateMotherDto) {
    return this.motherService.update(id, dto);
  }

  @Delete(':id')
  toggleDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.motherService.toggleDelete(id);
  }
}
