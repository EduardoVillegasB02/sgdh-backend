import { Modality } from '@prisma/client';
import { IsEnum } from 'class-validator';
import { SearchDto } from '../../../../../../common/dto';

export class FilterCenterDto extends SearchDto {
  @IsEnum(Modality)
  modality?: Modality;
}
