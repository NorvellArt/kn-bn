import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { CurrentUser } from '@/users/current-user.decorator';
import { User } from '@/users/user.entity';
import { LocalAuthGuard } from '@/auth/local-auth.guard';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';

@Controller('auth')
@SerializeOptions({ strategy: 'excludeAll' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@CurrentUser() user: User) {
    return {
      userId: user.id,
      token: this.authService.getTokenForUser(user),
    };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getProfile(@CurrentUser() user: User) {
    return user;
  }
}
