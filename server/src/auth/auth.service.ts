import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { UserService } from '@/user/user.service';
import { Tokens } from './interfaces/interfaces';
import { compareSync } from 'bcrypt';
import { Token, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/prisma/prisma.service';
import { v4 } from 'uuid';
import { add } from 'date-fns';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly prismaService: PrismaService,
    ) {}

    async register(dto: RegisterDto) {
        const user: User = await this.userService.findOne(dto.email).catch((err) => {
            this.logger.error(err);
            return null;
        });

        if (user) {
            throw new ConflictException('Email is already in use');
        }

        return this.userService.save(dto).catch((err) => {
            this.logger.error(err);
            return null;
        });
    }

    async login(dto: LoginDto, userAgent: string): Promise<Tokens> {
        const user: User = await this.userService.findOne(dto.email).catch((err) => {
            this.logger.error(err);
            return null;
        });

        if (!user || !compareSync(dto.password, user.password)) {
            throw new UnauthorizedException('You have entered an incorrect login or password');
        }

        return this.generateTokens(user, userAgent);
    }

    private async generateTokens(user: User, userAgent: string): Promise<Tokens> {
        const accessToken =
            'Bearer ' +
            this.jwtService.sign({
                id: user.id,
                email: user.email,
                roles: user.roles,
            });

        const refreshToken = await this.getRefreshToken(user.id, userAgent);

        return { accessToken, refreshToken };
    }

    async refreshTokens(refreshToken: string, userAgent: string): Promise<Tokens> {
        const token = await this.prismaService.token.findUnique({ where: { token: refreshToken } });

        if (!token) {
            throw new UnauthorizedException();
        }

        await this.prismaService.token.delete({ where: { token: refreshToken } });

        if (new Date(token.exp) < new Date()) {
            throw new UnauthorizedException();
        }
        const user = await this.userService.findOne(token.userId);

        return this.generateTokens(user, userAgent);
    }

    private async getRefreshToken(userId: string, userAgent: string): Promise<Token> {
        const _token = await this.prismaService.token.findFirst({
            where: { userId, userAgent },
        });
        const token = _token?.token ?? '';

        return this.prismaService.token.upsert({
            where: { token },
            update: { token: v4(), exp: add(new Date(), { months: 1 }) },
            create: {
                token: v4(),
                exp: add(new Date(), { months: 1 }),
                userId,
                userAgent,
            },
        });
    }

    deleteRefreshToken(token: string) {
        return this.prismaService.token.delete({ where: { token } });
    }
}
