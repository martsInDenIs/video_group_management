import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class PaginationDTO {
  @ApiProperty({
    required: false,
    name: 'pagination[page]',
    example: 1,
    description: 'The page number',
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @ApiProperty({
    required: false,
    name: 'pagination[limit]',
    example: 10,
    description: 'The number of items per page',
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  limit: number = 1;
}
