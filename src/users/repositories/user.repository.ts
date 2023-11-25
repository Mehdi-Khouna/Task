import { DataSource, Repository } from 'typeorm';
import { User } from '../entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  //we have select password set to false in the entity so that we dont always return the password
  //this is a custom query to return the user with the password because we need it for the validation in the login
  async getUserWithPassword(email: string) {
    return this.createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }
}