import { Modality } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { SearchDto } from '../../../../../../common/dto';

export class FilterCenterDto extends SearchDto {
  @IsOptional()
  @IsEnum(Modality)
  modality?: Modality;
}
