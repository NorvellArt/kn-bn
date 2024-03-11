import { IsInt, IsString, IsUUID } from 'class-validator';

export class CreateTaskDto {
    @IsInt()
    seconds: number;

    @IsString()
    @IsUUID()
    projectId: string;
}
