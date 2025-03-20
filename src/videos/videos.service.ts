import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import { FindVideosQueryDto } from './dto/find-videos.query.dto';
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

    if (searchBy.name) {
      queryBuilder.andWhere('video.name LIKE :name', {
        name: `%${searchBy.name}%`,
      });
    }

    if (searchBy.description) {
      queryBuilder.andWhere('video.description LIKE :description', {
        description: `%${searchBy.description}%`,
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
