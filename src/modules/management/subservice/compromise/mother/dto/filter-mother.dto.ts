import { IsOptional, IsString } from 'class-validator';
import { SearchDto } from '../../../../../../common/dto';

export class FilterMotherDto extends SearchDto {
  @IsOptional()
  @IsString()
  age?: string;

  @IsOptional()
  @IsString()
  age_min?: string;

  @IsOptional()
  @IsString()
  age_max?: string;

  @IsOptional()
  @IsString()
  month?: string;

  @IsOptional()
  @IsString()
  birthday?: string;
}
