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
import { CensusService } from './census.service';
import { CreateCensusDto, UpdateCensusDto } from './dto';
import { SearchDto } from '../../../../../common/dto';

@Controller('pantbc/census')
export class CensusController {
  constructor(private readonly censusService: CensusService) {}

  @Get()
  findAll(@Query() dto: SearchDto) {
    return this.censusService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.censusService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateCensusDto) {
    return this.censusService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCensusDto) {
    return this.censusService.update(id, dto);
  }

  @Delete(':id')
  toggleDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.censusService.toggleDelete(id);
  }
}
