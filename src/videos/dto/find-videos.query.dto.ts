import { Type } from 'class-transformer';
import {
  Min,
  IsNumber,
  IsOptional,
  IsString,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Video } from '../entities/video.entity';

class PaginationDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  limit: number = 1;
}

class SearchByDto implements Partial<Pick<Video, 'name' | 'description'>> {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;
}

export class FindVideosQueryDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => PaginationDto)
  pagination: PaginationDto = new PaginationDto();

  @IsOptional()
  @ValidateNested()
  @Type(() => SearchByDto)
  searchBy?: SearchByDto;
}
