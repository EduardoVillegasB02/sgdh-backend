import { IsDateString, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { SearchDto } from 'src/common/dto';

export class FilterGeneralDto extends SearchDto {
  @IsOptional()
  @IsUUID()
  module_id?: string;

  @IsOptional()
  age?: number;

  @IsOptional()
  age_min?: number;

  @IsOptional()
  age_max?: number;

  @IsOptional()
  month?: string;

  @IsOptional()
  @IsDateString()
  birthday?: string;
}
