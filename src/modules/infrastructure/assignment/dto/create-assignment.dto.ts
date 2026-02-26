import { IsOptional, IsUUID } from 'class-validator';

export class CreateAssignmentDto {
  @IsOptional()
  @IsUUID()
  module_id?: string;

  @IsOptional()
  @IsUUID()
  permission_id?: string;

  @IsUUID()
  role_id: string;

  @IsUUID()
  user_id: string;
}
