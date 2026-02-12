import { Module } from '@nestjs/common';
import { DisabledService } from './disabled.service';
import { DisabledController } from './disabled.controller';

@Module({
  controllers: [DisabledController],
  providers: [DisabledService],
})
export class DisabledModule {}
