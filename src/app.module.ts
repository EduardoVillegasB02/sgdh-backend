import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuditModule } from './modules/audit/audit.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/infrastructure/role/role.module';
import { SessionModule } from './modules/session/session.module';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PermissionModule } from './modules/infrastructure/permission/permission.module';
import { AccessModule } from './modules/infrastructure/access/access.module';
import { AssignmentModule } from './modules/infrastructure/assignment/assignment.module';
import { ModuleModule } from './modules/infrastructure/module/module.module';
import { CoordinatorModule } from './modules/management/subprogram/pvl/coordinator/coordinator.module';
import { ComitteeModule } from './modules/management/subprogram/pvl/committee/committee.module';
import { CoupleModule } from './modules/management/subprogram/pvl/couple/couple.module';
import { TownModule } from './modules/management/subprogram/pvl/town/town.module';
import { ConfigModule } from '@nestjs/config';
import { CenterModule } from './modules/management/subprogram/pca/center/center.module';
import { DirectiveModule } from './modules/management/subprogram/pca/directive/directive.module';
import { PresidentModule } from './modules/management/subprogram/pca/president/president.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuditModule,
    AuthModule,
    RoleModule,
    SessionModule,
    UserModule,
    PrismaModule,
    PermissionModule,
    AccessModule,
    AssignmentModule,
    ModuleModule,
    CoordinatorModule,
    ComitteeModule,
    CoupleModule,
    TownModule,
    CenterModule,
    DirectiveModule,
    PresidentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
