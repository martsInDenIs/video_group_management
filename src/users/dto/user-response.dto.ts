import { Exclude, Expose } from 'class-transformer';

export class UserResponseDTO {
  @Exclude()
  password: string;

  @Expose()
  email: string;

  @Expose()
  role: string;
}
