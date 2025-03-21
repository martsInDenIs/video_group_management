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
import { GenerateTokensInterceptor } from '@/auth/interceptors';
import { Public } from '@/auth/decorators';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Public()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: 201,
  })
  @ApiResponse({
    status: 400,
    description: 'Duplicate entry: user already exists.',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async create(@Body(HashPasswordPipe) body: CreateUserDto): Promise<void> {
    await this.usersService.create(body);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in.',
    type: UserResponseDTO,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid credentials.',
  })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(GenerateTokensInterceptor)
  @Post('login')
  login(@Body() body: LoginUserDto): Promise<UserResponseDTO> {
    return this.usersService.login(body);
  }
}
