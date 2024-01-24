import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { CreateUserDto } from '@/users/dto/create.user.dto';
import { User } from '@/users/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = new User();

    if (createUserDto.password !== createUserDto.retypedPassword) {
      throw new BadRequestException(['Passwords are not identical']);
    }

    const existingUser = await this.userRepository.findOne({
      where: [{ username: createUserDto.username }, { email: createUserDto.email }],
    });

    if (existingUser) {
      throw new BadRequestException(['Username or email is already in use']);
    }

    user.username = createUserDto.username;
    user.password = await this.authService.hashPassword(createUserDto.password);
    user.email = createUserDto.email;

    return {
      ...(await this.userRepository.save(user)),
      token: this.authService.getTokenForUser(user),
    };
  }
}