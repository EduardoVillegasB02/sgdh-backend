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
import { DisabledService } from './disabled.service';
import { CreateDisabledDto, UpdateDisabledDto } from './dto';
import { SearchDto } from '../../../../../common/dto';

@Controller('omaped/disabled')
export class DisabledController {
  constructor(private readonly disabledService: DisabledService) {}

  @Get()
  findAll(@Query() dto: SearchDto) {
    return this.disabledService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.disabledService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateDisabledDto) {
    return this.disabledService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateDisabledDto,
  ) {
    return this.disabledService.update(id, dto);
  }

  @Delete(':id')
  toggleDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.disabledService.toggleDelete(id);
  }
}
