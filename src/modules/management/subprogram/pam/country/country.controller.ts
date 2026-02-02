import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CountryService } from './country.service';
import { CreateCountryDto, UpdateCountryDto } from './dto';
import { SuccessMessage } from '../../../../../common/decorators';
import { SearchDto } from '../../../../../common/dto';

@Controller('pam/country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  findAll(@Query() dto: SearchDto) {
    return this.countryService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.countryService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateCountryDto) {
    return this.countryService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCountryDto,
  ) {
    return this.countryService.update(id, dto);
  }

  @Delete(':id')
  toggleDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.countryService.toggleDelete(id);
  }

  @Post('upload')
  @SuccessMessage('Creación masiva exitosa')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.countryService.upload(file);
  }
}
