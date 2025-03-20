import { PartialType, PickType } from '@nestjs/swagger';
import { CreateVideoDto } from './create-video.dto';

export class UpdateVideoDto extends PartialType(
  PickType(CreateVideoDto, ['name', 'description', 'url', 'groupId']),
) {}
