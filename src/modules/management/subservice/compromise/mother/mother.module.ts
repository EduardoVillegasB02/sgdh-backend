import { Module } from '@nestjs/common';
import { MotherService } from './mother.service';
import { MotherController } from './mother.controller';

@Module({
  controllers: [MotherController],
  providers: [MotherService],
})
export class MotherModule {}
