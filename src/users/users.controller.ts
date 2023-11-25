import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
    UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto} from './types';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { User } from './entities';


@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    @Post()
    @ApiOperation({ summary: 'create a user' })
    @ApiCreatedResponse({ description: 'user created successfuly', type: User })
    @ApiBadRequestResponse({ description: 'something is missing try again' })
    @UsePipes(ValidationPipe)
    async createUser(@Body() createUserDto: CreateUserDto) {
      return this.usersService.createUser(createUserDto);
    }

    @Get()
    @ApiOperation({ summary: 'get all users ' })
    @ApiCreatedResponse({ description: 'users found', type: User })
    @ApiNotFoundResponse({ description: 'users not found' })
    async getAllUsers() {
      return this.usersService.getAllUsers();
    }

    @Get(':id')
    @ApiOperation({ summary: 'get one user by Id' })
    @ApiCreatedResponse({ description: 'user found', type: User })
    @ApiNotFoundResponse({ description: 'user not found' })
    async getUserById(@Param('id') id: string) {
      return this.usersService.getUserById(id);
    }
}
