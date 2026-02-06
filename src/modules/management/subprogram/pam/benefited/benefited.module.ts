import { Module } from '@nestjs/common';
import { BenefitedService } from './benefited.service';
import { BenefitedController } from './benefited.controller';

@Module({
  controllers: [BenefitedController],
  providers: [BenefitedService],
})
export class BenefitedModule {}
