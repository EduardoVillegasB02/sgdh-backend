import { PartialType } from '@nestjs/mapped-types';
import { CreatePresidentDto } from './create-president.dto';

export class UpdateCoordinatorDto extends PartialType(CreatePresidentDto) {}
