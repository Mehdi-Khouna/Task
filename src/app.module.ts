import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/entities';

@Module({
  imports: [ ConfigModule.forRoot({isGlobal : true}),
    TypeOrmModule.forRootAsync({
      inject : [ConfigService],
      useFactory : (configService : ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DATABASE_HOST'),
          port: parseInt(configService.get('DATABASE_PORT')),
          username: configService.get('DATABASE_USERNAME'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_NAME'),
          entities: [User, Task],
          synchronize: true, //only for development
        }
      }
    }),
    UsersModule, AuthModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
