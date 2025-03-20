import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { FindGroupQueryDto } from './dto/find-group-query.dto';
import { GetGroupTreeDTO } from './dto/get-group-tree.dto';
import { getTreeRawQuery } from './groups.helpers';
import { getPaginationSkip } from 'src/common/utils';
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
    const skip = getPaginationSkip(page, limit);

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

  async getTree({ rootGroup, pagination }: GetGroupTreeDTO) {
    const skip = getPaginationSkip(pagination.page, pagination.limit);

    const queryParams = rootGroup
      ? [rootGroup, pagination.limit, skip]
      : [pagination.limit, skip];

    return this.groupRepository.query(getTreeRawQuery(rootGroup), queryParams);
  }
}
