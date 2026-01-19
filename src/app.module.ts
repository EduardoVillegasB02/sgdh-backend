import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { AuditModule } from './modules/audit/audit.module';
import { UserModule } from './modules/user/user.module';
import { SessionModule } from './modules/session/session.module';

@Module({
  imports: [AuthModule, AuditModule, UserModule, SessionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
