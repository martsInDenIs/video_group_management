import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { FindGroupQueryDto } from './dto/find-group-query.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  create(data: CreateGroupDto) {
    return this.groupRepository.save(data);
  }

  async findAll({ pagination, searchBy }: FindGroupQueryDto) {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const queryBuilder = this.groupRepository.createQueryBuilder('group');

    if (searchBy?.name) {
      queryBuilder.andWhere('group.name LIKE :name', {
        name: `%${searchBy.name}%`,
      });
    }

    if (searchBy?.description) {
      queryBuilder.andWhere('group.description LIKE :description', {
        description: `%${searchBy.description}%`,
      });
    }

    const [groups, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { groups, total };
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
