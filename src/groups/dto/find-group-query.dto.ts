import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Group } from '../entities/group.entity';
import { PaginationDTO } from 'src/common/dtos/pagination.dto';

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
  @Type(() => PaginationDTO)
  pagination: PaginationDTO = new PaginationDTO();

  @IsOptional()
  @ValidateNested()
  @Type(() => SearchByDto)
  searchBy: SearchByDto = new SearchByDto();
}
