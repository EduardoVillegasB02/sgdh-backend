import { Degree } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SearchDto } from '../../../../../../common/dto';

export class FilterDisabledDto extends SearchDto {
  @IsOptional()
  @IsEnum(Degree)
  degree?: Degree;

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
