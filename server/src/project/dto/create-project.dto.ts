import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    @Length(5, 255, { message: 'The name length must be greater than 5 and less then 255 symbols' })
    name: string;
}
