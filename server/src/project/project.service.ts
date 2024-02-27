import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto';
import { User, Prisma, Project } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ProjectService {
    constructor(private prismaService: PrismaService) {}

    public async createProjects(input: CreateProjectDto, user: User) {
        return await this.prismaService.project.create({
            data: {
                name: input.name,
                user: { connect: { id: user.id } },
            },
        });
    }

    public async updateProject(params: {
        where: Prisma.ProjectWhereUniqueInput;
        data: Prisma.ProjectUpdateInput;
    }): Promise<Project> {
        const { data, where } = params;

        return this.prismaService.project.update({
            data,
            where,
        });
    }
}
