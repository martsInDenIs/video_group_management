import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './services';
import { CreateUserDto, UserResponseDTO } from './dto';
import { HashPasswordPipe } from './pipes';
import { LoginUserDto } from './dto/login-user.dto';
import { GenerateTokensInterceptor } from '../auth/interceptors';
import { Public } from 'src/auth/decorators';

@Public()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async create(@Body(HashPasswordPipe) body: CreateUserDto): Promise<void> {
    await this.usersService.create(body);
  }

  @HttpCode(HttpStatus.OK)
  @UseInterceptors(GenerateTokensInterceptor)
  @Post('login')
  login(@Body() body: LoginUserDto): Promise<UserResponseDTO> {
    return this.usersService.login(body);
  }
}
