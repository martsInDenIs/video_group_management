import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsUUID,
  IsOptional,
  IsUrl,
  IsNotEmpty,
} from 'class-validator';

export class CreateVideoDto {
  @ApiProperty({
    example: 'Introduction to NestJS',
    description: 'The title of the video',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Learn the basics of NestJS framework',
    description: 'The description of the video',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'https://example.com/video.mp4',
    description: 'The URL of the video',
  })
  @IsUrl()
  url: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The ID of the group this video belongs to',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  groupId?: string;
}
