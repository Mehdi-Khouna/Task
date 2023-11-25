import { Body, Controller, Get, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards';
import { TasksService } from './tasks.service';
import { Task } from './entities';
import { CreateTaskDto } from './types';


@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService : TasksService) {}

    @Post()
    @ApiOperation({ summary: 'create a task' })
    @ApiCreatedResponse({
      description: 'task created successfuly',
      type: Task,
    })
    @ApiBadRequestResponse({ description: 'something is missing try again' })
    @UsePipes(ValidationPipe)
    async createReport(
      @Query('userId') userId: string,
      @Body() createTaskDto: CreateTaskDto,
    ) {
      return this.tasksService.createTask(userId, createTaskDto);
    }

    @Get()
    @ApiOperation({ summary: 'get all task' })
    @ApiCreatedResponse({ description: 'task found', type: Task })
    @ApiNotFoundResponse({ description: 'task not found' })
    async getAlltasksByUser(@Query('userId') userId: string ) {
      return this.tasksService.getAllTasksByUser(userId );
    }
}
