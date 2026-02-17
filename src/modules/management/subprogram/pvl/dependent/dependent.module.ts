import { Module } from '@nestjs/common';
import { DependentService } from './dependent.service';
import { DependentController } from './dependent.controller';

@Module({
  controllers: [DependentController],
  providers: [DependentService],
})
export class DependentModule {}
