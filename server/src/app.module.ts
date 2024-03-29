import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@/user/user.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth-guard';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, PrismaModule, AuthModule, ProjectModule, TaskModule],
    providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
