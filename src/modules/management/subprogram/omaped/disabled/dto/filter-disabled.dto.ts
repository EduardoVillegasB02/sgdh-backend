import { Degree } from '@prisma/client';
import { IsDateString, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { SearchDto } from 'src/common/dto';

export class FilterDisabledDto extends SearchDto {
  @IsOptional()
  @IsEnum(Degree)
  degree?: Degree;

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
