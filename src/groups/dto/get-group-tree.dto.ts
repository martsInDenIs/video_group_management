import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDTO } from 'src/common/dtos/pagination.dto';

export class GetGroupTreeDTO {
  @ApiProperty({
    description: 'Root group ID',
    required: false,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsOptional()
  rootGroup?: string;

  @ApiProperty({
    type: PaginationDTO,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PaginationDTO)
  pagination: PaginationDTO;
}
