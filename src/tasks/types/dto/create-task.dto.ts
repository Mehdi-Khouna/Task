import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
export class CreateTaskDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name : string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description : string

}