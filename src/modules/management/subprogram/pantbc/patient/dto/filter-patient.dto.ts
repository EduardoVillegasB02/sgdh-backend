import { Patientype, Sex } from '@prisma/client';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { SearchDto } from '../../../../../../common/dto';

export class FilterPatientDto extends SearchDto {
  @IsOptional()
  @IsEnum(Patientype)
  patient: Patientype;

  @IsOptional()
  @IsEnum(Sex)
  sex: Sex;

  @IsOptional()
  @IsUUID()
  census: string;

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
