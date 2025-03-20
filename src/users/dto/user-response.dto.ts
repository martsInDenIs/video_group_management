import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../role.enum';

export class UserResponseDTO {
  @Exclude()
  password: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'User ID',
  })
  id: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'User email',
  })
  @Expose()
  email: string;

  @ApiProperty({
    example: Role.Viewer,
    description: 'User role',
    enum: Role,
  })
  @Expose()
  role: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Access token',
  })
  accessToken: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Refresh token',
  })
  refreshToken: string;
}
