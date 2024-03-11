import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from '@/task/dto/create-task.dto';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    async create(@Body() input: CreateTaskDto) {
        return await this.taskService.createTask(input);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<Task> {
        return await this.taskService.deleteTask(id);
    }
}
