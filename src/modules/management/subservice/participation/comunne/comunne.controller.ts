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
import { ComunneService } from './comunne.service';
import { CreateComunneDto, UpdateComunneDto } from './dto';
import { SearchDto } from '../../../../../common/dto';

@Controller('participation/comunne')
export class ComunneController {
  constructor(private readonly comunneService: ComunneService) {}

  @Get()
  findAll(@Query() dto: SearchDto) {
    return this.comunneService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.comunneService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateComunneDto) {
    return this.comunneService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateComunneDto,
  ) {
    return this.comunneService.update(id, dto);
  }

  @Delete(':id')
  toggleDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.comunneService.toggleDelete(id);
  }
}
