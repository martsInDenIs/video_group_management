import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  create(data: CreateGroupDto) {
    return this.groupRepository.save(data);
  }

  findAll() {
    return this.groupRepository.find();
  }

  findOne(id: string) {
    return this.groupRepository.findOne({ where: { id } });
  }

  update(id: string, data: UpdateGroupDto) {
    return this.groupRepository.update(id, data);
  }

  remove(id: string) {
    return this.groupRepository.delete(id);
  }
}
