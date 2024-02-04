import {
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { UserResponse } from '@/user/responses';
import { CurrentUser, Roles } from '@/shared/decorators';
import { JwtPayload } from '@/auth/interfaces/interfaces';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Role } from '@prisma/client';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':idOrEmail')
    async findOneUser(@Param('idOrEmail') idOrEmail: string) {
        const user = await this.userService.findOne(idOrEmail);
        return new UserResponse(user);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: JwtPayload) {
        return this.userService.delete(id, user);
    }

    // ========== NOTE: Пример использования RolesGuard ==============
    // @UseGuards(RolesGuard)
    // @Roles(Role.ADMIN)
    // @Get()
    // me(@CurrentUser() user: JwtPayload) {
    //     return user;
    // }
}
