import { Controller, Get, Body, Patch, Param, Query } from '@nestjs/common';
import { GeneralService } from './general.service';
import { FilterGeneralDto } from './dto';

@Controller('general')
export class GeneralController {
  constructor(private readonly generalService: GeneralService) {}

  @Get()
  findAll(@Query() dto: FilterGeneralDto) {
    return this.generalService.findAll(dto);
  }

  @Get('birthday')
  getForMessage() {
    return this.generalService.getForMessage();
  }

  @Patch('send/:id')
  sendMessage(@Param('id') id: string, @Body() dto: { message: string }) {
    return this.generalService.sendMessage(id, dto.message);
  }

  @Patch('answer/:id')
  sendanswer(@Param('id') id: string, @Body() dto: { answer: string }) {
    return this.generalService.answerMessage(id, dto.answer);
  }
}
