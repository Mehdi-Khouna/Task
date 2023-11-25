import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { UserRepository } from './repositories';
import {CreateUserDto, LoginDto, UserPayload} from './types';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async createUser(createUserDto: CreateUserDto) {
        const { email } = createUserDto;
        const user = await this.userRepository.findOne({ where: { email } });
        if (user) {
          throw new HttpException('Email already exists', HttpStatus.FORBIDDEN);
        }
        return await this.userRepository.save(
          this.userRepository.create(createUserDto),
        );
    }
    async getAllUsers() {
        return this.userRepository.find();
      }
    async getUserById(id: string) {
        return this.userRepository.findOne({where : {id}});
    }

    async userLogIn(loginCredentials: LoginDto) {
        const { email, password } = loginCredentials;
    
        const user = await this.userRepository.getUserWithPassword(email)
        if (!user) {
          throw new UnauthorizedException('Invalid credentials');
        }
        
    
        const validPassword = await compare(password, user.password);
        
    
        if (!validPassword) {
          throw new UnauthorizedException('Invalid credentials');
        }
        const payload : UserPayload = {id : user.id }
    
        const token =  this.jwtService.sign(payload);
    
        return { token: token };
      }
    async userLogout(id: string) {
      const user = await this.userRepository.find({where : {id}})
        if (!user) {
          throw new UnauthorizedException('Invalid credentials');
        }
      
    }

}
