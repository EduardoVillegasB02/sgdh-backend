import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateDirectiveDto {

  @IsString()
  @IsNotEmpty()
  resolution: string;

  @IsDateString()
  start_At: string;

  @IsDateString()
  end_At: string;
}
