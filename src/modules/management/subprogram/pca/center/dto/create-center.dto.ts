import { Route } from '@prisma/client';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCenterDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsString()
  latitude: string;

  @IsString()
  longitude: string;

  @IsOptional()
  @IsString()
  members_male?: string;

  @IsOptional()
  @IsString()
  members_female?: string;

  @IsString()
  sex: string;

  @IsOptional()
  @IsString()
  handicappeds?: string;

  @IsUUID()
  president_id: string;

  @IsUUID()
  directive_id: string;

}
