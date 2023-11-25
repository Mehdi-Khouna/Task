import { Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto} from 'src/users/types';
import {ApiOperation, ApiTags } from '@nestjs/swagger';



@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Log a user in' })
  async login(@Body() loginCredentials: LoginDto) {
    return this.authService.LogIn(loginCredentials);
  }
}
