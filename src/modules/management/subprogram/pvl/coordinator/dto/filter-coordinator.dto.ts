import { IsOptional, IsUUID } from 'class-validator';
import { SearchDto } from '../../../../../../common/dto';

export class FilterCoordinatorDto extends SearchDto {
  @IsOptional()
  @IsUUID()
  coordinator_id?: string;

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
