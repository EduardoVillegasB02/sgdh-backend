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
import { WorkshopService } from './workshop.service';
import { CreateWorkshopDto, UpdateWorkshopDto } from './dto';
import { SearchDto } from '../../../../../common/dto';

@Controller('recreation/workshop')
export class WorkshopController {
  constructor(private readonly workshopService: WorkshopService) {}

  @Get()
  findAll(@Query() dto: SearchDto) {
    return this.workshopService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.workshopService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateWorkshopDto) {
    return this.workshopService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateWorkshopDto,
  ) {
    return this.workshopService.update(id, dto);
  }

  @Delete(':id')
  toggleDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.workshopService.toggleDelete(id);
  }
}
