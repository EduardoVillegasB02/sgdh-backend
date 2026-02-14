import {} from '@prisma/client';
import { IsOptional } from 'class-validator';
import { SearchDto } from '../../../../../../common/dto';

export class FilterPresidentDto extends SearchDto {
  @IsOptional()
  modality?: 'CPOT' | 'EATER';

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
