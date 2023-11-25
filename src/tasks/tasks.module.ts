import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities';
import { UsersModule } from 'src/users/users.module';
import { TaskRepository } from './repositories';

@Module({
  imports : [TypeOrmModule.forFeature([Task]), UsersModule],
  controllers: [TasksController],
  providers: [TasksService, TaskRepository],
  exports: [TypeOrmModule, TasksService]
})
export class TasksModule {}
