import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  ValidateNested,
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
