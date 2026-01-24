import { Module } from '@nestjs/common';
import { PresidentService } from './president.service';
import { PresidentController } from './president.controller';

@Module({
  controllers: [PresidentController],
  providers: [PresidentService],
})
export class PresidentModule {}
