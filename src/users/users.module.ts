import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { UserRepository } from './repositories';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';



@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configSerice: ConfigService) => {
        return {
          secret: configSerice.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configSerice.get<string | number>('JWT_EXPIRE'),
          },
        };
      },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
