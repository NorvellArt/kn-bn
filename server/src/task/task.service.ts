import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {
    constructor(private prismaService: PrismaService) {}

    public async createTask(input: CreateTaskDto) {
        return await this.prismaService.task.create({
            data: {
                seconds: input.seconds,
                project: { connect: { id: input.projectId } },
            },
        });
    }

    public async deleteTask(id: number): Promise<Task> {
        return await this.prismaService.task.delete({
            where: { id },
        });
    }
}
