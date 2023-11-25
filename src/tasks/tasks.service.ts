import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './repositories';
import { UsersService } from 'src/users/users.service';
import { CreateTaskDto } from './types';

@Injectable()
export class TasksService {
    constructor(
        private readonly taskRepository: TaskRepository,
        private readonly usersService: UsersService,
      ) {}

    async getTaskById(id: string) {
        return this.taskRepository.getTaskById(id)
    }
    async getAllTasksByUser(userId : string) {
        const user = this.usersService.getUserById(userId)

        if (!user) {
            throw new NotFoundException('User Not Found');
        }

        return this.taskRepository.getAllTasksByUser(userId)

    }

    async createTask(userId : string, createTaskDto : CreateTaskDto) {
        const user = await this.usersService.getUserById(userId);

        if (!user) {
          throw new NotFoundException('User not found');
        }
        const taskBody = {...createTaskDto, user: user}
        return this.taskRepository.save(this.taskRepository.create(taskBody))
    }
}
