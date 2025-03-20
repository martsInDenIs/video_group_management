import { Injectable } from '@nestjs/common';
import { CreateVideoDto, UpdateVideoDto, FindVideosQueryDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import { getPaginationSkip } from 'src/common/utils';
@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
  ) {}

  create(data: CreateVideoDto) {
    return this.videoRepository.save(data);
  }

  async findAll({ pagination, searchBy }: FindVideosQueryDto) {
    const skip = getPaginationSkip(pagination.page, pagination.limit);

    const queryBuilder = this.videoRepository.createQueryBuilder('video');

    /** Add Search By options */
    if (searchBy) {
      Object.entries(searchBy).forEach(([key, value]) => {
        queryBuilder.andWhere(`video.${key} LIKE :${key}`, {
          [`${key}`]: `%${value}%`,
        });
      });
    }

    const [videos, total] = await queryBuilder
      .skip(skip)
      .take(pagination.limit)
      .getManyAndCount();

    return { videos, total };
  }

  findOne(id: string) {
    return this.videoRepository.findOne({ where: { id } });
  }

  update(id: string, data: UpdateVideoDto) {
    return this.videoRepository.update(id, data);
  }

  remove(id: string) {
    return this.videoRepository.delete(id);
  }
}
