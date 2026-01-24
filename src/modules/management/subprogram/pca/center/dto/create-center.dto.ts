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
  members?: string;

  @IsString()
  members_male?: string;

  @IsString()
  members_female?: string;

  @IsString()
  latitude: string;

  @IsString()
  longitude: string;

  @IsUUID()
  president_id: string;

  @IsUUID()
  directive_id: string;

}
