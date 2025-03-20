import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Group } from '../entities/group.entity';
import { PaginationDTO } from 'src/common/dtos/pagination.dto';

export class SearchByDto
  implements Partial<Pick<Group, 'name' | 'description'>>
{
  @ApiProperty({
    description: 'Search by name',
    required: false,
    example: 'Marketing',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Search by description',
    required: false,
    example: 'department',
  })
  @IsString()
  @IsOptional()
  description?: string;
}

export class FindGroupQueryDto {
  @ApiProperty({
    type: PaginationDTO,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PaginationDTO)
  pagination: PaginationDTO;

  @ApiProperty({
    type: SearchByDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SearchByDto)
  searchBy?: SearchByDto;
}
