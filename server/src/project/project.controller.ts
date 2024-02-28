import { CurrentUser } from '@/shared/decorators';
import { Controller, Post, Body, Put, Param, Delete, Get } from '@nestjs/common';
import { Project, User } from '@prisma/client';
import { CreateProjectDto } from './dto';
import { ProjectService } from './project.service';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Get(':id')
    async get(@Param('id') id: string): Promise<Project> {
        return await this.projectService.findOne(id);
    }

    @Get()
    async getAll(@CurrentUser() user: User): Promise<Project[]> {
        return await this.projectService.findMany(user.id);
    }

    @Post()
    async create(@Body() input: CreateProjectDto, @CurrentUser() user: User) {
        return await this.projectService.createProject(input, user);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() input: UpdateProjectDto): Promise<Project> {
        return await this.projectService.updateProject({
            where: { id },
            data: { ...input },
        });
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<string> {
        const deletedProject = await this.projectService.deleteProject(id);

        return deletedProject.id;
    }
}
