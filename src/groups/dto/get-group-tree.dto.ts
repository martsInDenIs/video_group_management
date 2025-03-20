import { Type } from 'class-transformer';
import { IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { PaginationDTO } from 'src/common/dtos/pagination.dto';

export class GetGroupTreeDTO {
  @IsOptional()
  @IsUUID()
  @Type(() => String)
  rootGroup?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => PaginationDTO)
  pagination: PaginationDTO = new PaginationDTO();
}
