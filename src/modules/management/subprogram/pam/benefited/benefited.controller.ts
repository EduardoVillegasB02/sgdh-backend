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
import { BenefitedService } from './benefited.service';
import {
  CreateBenefitedDto,
  FilterBenefitedDto,
  UpdateBenefitedDto,
} from './dto';

@Controller('pam/benefited')
export class BenefitedController {
  constructor(private readonly benefitedService: BenefitedService) {}

  @Get()
  findAll(@Query() dto: FilterBenefitedDto) {
    return this.benefitedService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.benefitedService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateBenefitedDto) {
    return this.benefitedService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateBenefitedDto,
  ) {
    return this.benefitedService.update(id, dto);
  }

  @Delete(':id')
  toggleDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.benefitedService.toggleDelete(id);
  }
}
