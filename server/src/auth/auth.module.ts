import { Module } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { LocalStrategy } from '@/auth/local.strategy';
import { JwtStrategy } from '@/auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/users/user.entity';
import { UsersController } from '@/users/users.controller';
import { AuthController } from '@/auth/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.AUTH_SECRET,
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController, UsersController],
})
export class AuthModule {}
