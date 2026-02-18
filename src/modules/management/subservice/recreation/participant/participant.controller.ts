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
import { ParticipantService } from './participant.service';
import {
  CreateParticipantDto,
  FilterParticipantDto,
  UpdateParticipantDto,
} from './dto';

@Controller('recreation/participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Get()
  findAll(@Query() dto: FilterParticipantDto) {
    return this.participantService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.participantService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateParticipantDto) {
    return this.participantService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateParticipantDto,
  ) {
    return this.participantService.update(id, dto);
  }

  @Delete(':id')
  toggleDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.participantService.toggleDelete(id);
  }
}
