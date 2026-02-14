import { Format, Level } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { SearchDto } from '../../../../../../common/dto';

export class FilterRegisteredDto extends SearchDto {
  @IsOptional()
  @IsEnum(Format)
  format?: Format;

  @IsOptional()
  @IsEnum(Level)
  level?: Level;

  @IsOptional()
  @IsUUID()
  box_id?: string;

  @IsOptional()
  @IsUUID()
  declaration_id?: string;

  @IsOptional()
  @IsUUID()
  enumerator_id?: string;

  @IsOptional()
  @IsUUID()
  urban_id?: string;

  @IsOptional()
  @IsString()
  members_min?: string;

  @IsOptional()
  @IsString()
  members_max?: string;

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
  birthday_day?: string;

  @IsOptional()
  @IsString()
  birthday_month?: string;
}
