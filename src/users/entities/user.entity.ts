import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { hash, genSalt } from 'bcrypt';
import { IUser } from "../types";
import { Task } from "src/tasks/entities";
import { ITask } from "src/tasks/types";

@Entity()
export class User implements IUser {

    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({
        select : false
    })
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Task, (task) => task.user)
    tasks: ITask[];

    @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      const salt = await genSalt();
      this.password = await hash(this.password.toString(), salt);
    }
  }


}