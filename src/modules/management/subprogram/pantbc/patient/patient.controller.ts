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
import { PatientService } from './patient.service';
import { CreatePatientDto, FilterPatientDto, UpdatePatientDto } from './dto';

@Controller('pantbc/patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  findAll(@Query() dto: FilterPatientDto) {
    return this.patientService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.patientService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreatePatientDto) {
    return this.patientService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePatientDto,
  ) {
    return this.patientService.update(id, dto);
  }

  @Delete(':id')
  toggleDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.patientService.toggleDelete(id);
  }
}
