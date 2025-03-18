import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
  ) {}

  create(data: CreateVideoDto) {
    return this.videoRepository.save(data);
  }

  findAll() {
    return this.videoRepository.find();
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
