import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsArray,
  IsUUID,
} from 'class-validator';
import { Video } from '../entities/video.entity';
import { PaginationDTO } from 'src/common/dtos/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

class SearchByDto implements Partial<Pick<Video, 'name' | 'description'>> {
  @ApiProperty({
    description: 'Search by title',
    required: false,
    example: 'NestJS',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    description: 'Search by description',
    required: false,
    example: 'tutorial',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiProperty({
    description: 'Search by parent group IDs',
    required: false,
    example: [
      '123e4567-e89b-12d3-a456-426614174000',
      '123e4567-e89b-12d3-a456-426614174001',
    ],
  })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  groups?: string[];
}

export class FindVideosQueryDto {
  @ApiProperty({
    type: PaginationDTO,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PaginationDTO)
  pagination: PaginationDTO = new PaginationDTO();

  @ApiProperty({
    type: SearchByDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SearchByDto)
  searchBy?: SearchByDto;
}
