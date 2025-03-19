import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Group } from '../entities/group.entity';

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

class SearchByDto implements Partial<Pick<Group, 'name' | 'description'>> {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;
}

export class FindGroupQueryDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => PaginationDto)
  pagination: PaginationDto = new PaginationDto();

  @IsOptional()
  @ValidateNested()
  @Type(() => SearchByDto)
  searchBy: SearchByDto = new SearchByDto();
}
