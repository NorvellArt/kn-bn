import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto';
import { User } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ProjectService {
    constructor(private readonly prismaService: PrismaService) {}

    public async createProjects(input: CreateProjectDto, user: User) {
        return await this.prismaService.project.create({
            data: {
                name: input.name,
                user: { connect: { id: user.id } },
            },
        });
    }
}
