import { DataSource, Repository } from 'typeorm';
import { Task} from '../entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }
  async getTaskById(taskId: string) {
    return this.createQueryBuilder('task')
      .leftJoinAndSelect('task.user' , 'user')
      .where('task.id = :taskId', { taskId })
      .getOne();
  }

  async getAllTasksByUser(userId: string ) {
    const query = this.createQueryBuilder('task')
      .leftJoin('task.user', 'user')
      .where('user.id = :userId', { userId })
    return query.getMany()
  }
}