import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { GeneralModule } from 'src/modules/management/general/general.module';

@Module({
  imports: [GeneralModule],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
