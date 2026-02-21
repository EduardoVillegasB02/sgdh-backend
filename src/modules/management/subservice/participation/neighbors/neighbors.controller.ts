import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { NeighborsService } from './neighbors.service';
import { CreateNeighborsDto, FilterNeighborsDto } from './dto';

@Controller('participation/neighbors')
export class NeighborsController {
  constructor(private readonly neighborsService: NeighborsService) {}

  @Get()
  findAll(@Query() dto: FilterNeighborsDto) {
    return this.neighborsService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.neighborsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateNeighborsDto) {
    return this.neighborsService.create(dto);
  }

  @Delete(':id')
  toggleDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.neighborsService.toggleDelete(id);
  }
}
