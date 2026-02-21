import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ModuleService } from './module.service';
import { FilterModuleDto } from './dto';

@Controller('module')
export class ModuleController {
  constructor(private readonly ModuleService: ModuleService) {}

  @Get()
  findAll(@Query() dto: FilterModuleDto) {
    return this.ModuleService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ModuleService.findOne(id);
  }
}
