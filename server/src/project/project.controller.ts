import { CurrentUser } from '@/shared/decorators';
import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { Project, User } from '@prisma/client';
import { CreateProjectDto } from './dto';
import { ProjectService } from './project.service';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Post()
    async create(@Body() input: CreateProjectDto, @CurrentUser() user: User) {
        return this.projectService.createProjects(input, user);
    }

    @Put(':id')
    async publishPost(@Param('id') id: string, @Body() input: UpdateProjectDto): Promise<Project> {
        return this.projectService.updateProject({
            where: { id },
            data: { ...input },
        });
    }
}
