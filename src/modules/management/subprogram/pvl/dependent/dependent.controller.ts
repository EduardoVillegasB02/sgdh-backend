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
import { DependentService } from './dependent.service';
import {
  CreateDependentDto,
  FilterDependentDto,
  UpdateDependentDto,
} from './dto';

@Controller('pvl/dependent')
export class DependentController {
  constructor(private readonly dependentService: DependentService) {}

  @Get()
  findAll(@Query() dto: FilterDependentDto) {
    return this.dependentService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.dependentService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateDependentDto) {
    return this.dependentService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateDependentDto,
  ) {
    return this.dependentService.update(id, dto);
  }

  @Delete(':id')
  toggleDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.dependentService.toggleDelete(id);
  }
}
