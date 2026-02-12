import { Send } from '@prisma/client';
import { IsDateString, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { SearchDto } from 'src/common/dto';

export class FilterGeneralDto extends SearchDto {
  @IsOptional()
  @IsUUID()
  module_id?: string;

  @IsOptional()
  @IsDateString()
  bithday?: string;

  @IsOptional()
  @IsEnum(Send)
  send?: Send;
}
