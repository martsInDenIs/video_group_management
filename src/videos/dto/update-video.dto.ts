import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateVideoDto } from './create-video.dto';

export class UpdateVideoDto extends PartialType(
  PickType(CreateVideoDto, ['name', 'description', 'url', 'groupId']),
) {}
