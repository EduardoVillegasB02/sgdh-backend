import { Module } from '@nestjs/common';
import { EnumeratorService } from './enumerator.service';
import { EnumeratorController } from './enumerator.controller';

@Module({
  controllers: [EnumeratorController],
  providers: [EnumeratorService],
})
export class EnumeratorModule {}
