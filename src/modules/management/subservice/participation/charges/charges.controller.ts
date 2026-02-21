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
import { ChargesService } from './charges.service';
import { CreateChargesDto, UpdateChargesDto } from './dto';
import { SearchDto } from '../../../../../common/dto';

@Controller('participation/charges')
export class ChargesController {
  constructor(private readonly chargesService: ChargesService) {}

  @Get()
  findAll(@Query() dto: SearchDto) {
    return this.chargesService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.chargesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateChargesDto) {
    return this.chargesService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateChargesDto,
  ) {
    return this.chargesService.update(id, dto);
  }

  @Delete(':id')
  toggleDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.chargesService.toggleDelete(id);
  }
}
