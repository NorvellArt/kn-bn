import { CurrentUser } from '@/shared/decorators';
import { Controller, Post, Body } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateProjectDto } from './dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Post()
    async create(@Body() input: CreateProjectDto, @CurrentUser() user: User) {
        return this.projectService.createProjects(input, user);
    }
}
