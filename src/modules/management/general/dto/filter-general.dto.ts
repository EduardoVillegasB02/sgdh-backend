import { IsOptional } from 'class-validator';
import { SearchDto } from '../../../../common/dto';

export class FilterGeneralDto extends SearchDto {
  @IsOptional()
  module_name?: string;

  @IsOptional()
  age?: number;

  @IsOptional()
  age_min?: number;

  @IsOptional()
  age_max?: number;

  @IsOptional()
  month?: string;

  @IsOptional()
  birthday?: string;
}
