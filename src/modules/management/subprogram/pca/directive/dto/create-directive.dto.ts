import { IsOptional, IsString , IsDateString} from 'class-validator';

export class CreateDirectiveDto {
  @IsString()
  resolution: string;

  @IsDateString()
  start_at: string;
}
