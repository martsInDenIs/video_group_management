import { Injectable, PipeTransform } from '@nestjs/common';
import { HashService } from '../services';
import { CreateUserDto } from '../dto';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  constructor(private readonly hashService: HashService) {}

  async transform(value: CreateUserDto | LoginUserDto) {
    return { ...value, password: await this.hashService.hash(value.password) };
  }
}
