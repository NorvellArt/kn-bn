import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto';
import { User, Prisma, Project } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ProjectService {
    constructor(private prismaService: PrismaService) {}

    public async findOne(id: string): Promise<Project> {
        return await this.prismaService.project.findUnique({
            where: { id },
        });
    }

    public async findMany(userId: string): Promise<Project[]> {
        return await this.prismaService.project.findMany({
            where: {
                userId,
            },
        });
    }

    public async createProject(input: CreateProjectDto, user: User) {
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

        return await this.prismaService.project.update({
            data,
            where,
        });
    }

    public async deleteProject(id: string): Promise<Project> {
        return await this.prismaService.project.delete({
            where: { id },
        });
    }
}
