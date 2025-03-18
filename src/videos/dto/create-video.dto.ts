import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsUUID()
  @IsNotEmpty()
  groupId: string;
}
