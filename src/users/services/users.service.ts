import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, UserResponseDTO } from '../dto';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from '../dto/login-user.dto';
import { HashService } from './hash.service';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private hashService: HashService,
  ) {}

  create(data: CreateUserDto) {
    return this.userRepository.save(data);
  }

  async login(data: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.hashService.compare(
      data.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return instanceToPlain(user, {
      excludeExtraneousValues: true,
    }) as UserResponseDTO;
  }
}
