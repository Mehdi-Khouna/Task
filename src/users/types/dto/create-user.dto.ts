import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @ApiProperty()
    @MinLength(8)
    password: string;

}