import { IsOptional, IsString } from 'class-validator';

export class CreatePresidentDto {
  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsOptional()
  @IsString()
  dni?: string;

  @IsString()
  sex: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  birthday?: string;
}
