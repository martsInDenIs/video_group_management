import { Test, TestingModule } from '@nestjs/testing';
import { GroupsService } from './groups.service';
import { QueryFailedError, Repository, SelectQueryBuilder } from 'typeorm';
import { Group } from './entities/group.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const DEFAULT_REPOSITORY_METHODS = {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  createQueryBuilder: jest.fn(() => ({
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    getMany: jest.fn(),
    getManyAndCount: jest.fn(),
    getOne: jest.fn(),
  })),
};

describe('GroupsService', () => {
  let service: GroupsService;
  let repository: jest.Mocked<Repository<Group>>;
  let mockQueryBuilder: jest.Mocked<SelectQueryBuilder<Group>>;

  const groupData = {
    id: '1',
    name: 'Test Group',
    description: 'Test Description',
  };

  beforeEach(async () => {
    mockQueryBuilder = {
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn(),
    } as any;

    const mockRepository = {
      ...DEFAULT_REPOSITORY_METHODS,
      createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupsService,
        { provide: getRepositoryToken(Group), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
    repository = module.get(getRepositoryToken(Group));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createdGroup = {
      ...groupData,
      id: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      children: [],
    };

    beforeEach(() => {
      jest.spyOn(repository, 'save').mockImplementation(() => {
        return Promise.resolve(createdGroup as any);
      });
    });
    it('should create a group', async () => {
      await expect(service.create(groupData)).resolves.toEqual(
        createdGroup as any,
      );
    });

    it('should throw an error if the parent group does not exist', async () => {
      const queryError = new QueryFailedError('query', [], {
        code: '23503',
        detail: 'Key (parentId)=(1) is not present in table "groups"',
      } as any);

      repository.save.mockRejectedValue(queryError);

      await expect(service.create(groupData)).rejects.toThrow(QueryFailedError);
    });
  });

  describe('findAll', () => {
    it('should return one group', async () => {
      mockQueryBuilder.getManyAndCount.mockResolvedValue([
        [groupData as any],
        1,
      ]);

      await expect(
        service.findAll({ pagination: { page: 1, limit: 10 } }),
      ).resolves.toEqual({ groups: [groupData], total: 1 });
    });

    it('should return filtered groups with search', async () => {
      const pagination = { page: 1, limit: 10 };
      const searchBy = { name: 'test' };
      const mockGroups = [{ id: 1, name: 'Test Group' }];
      const total = 1;

      mockQueryBuilder.getManyAndCount.mockResolvedValue([
        mockGroups as any,
        total,
      ]);

      const result = await service.findAll({ pagination, searchBy });

      // Перевіряємо, що був викликаний andWhere з правильними параметрами
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'group.name LIKE :name',
        { name: '%test%' },
      );

      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(0);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(10);

      expect(result).toEqual({
        groups: mockGroups,
        total,
      });
    });

    it('should handle multiple search parameters', async () => {
      const pagination = { page: 1, limit: 10 };
      const searchBy = {
        name: 'test',
        description: 'desc',
      };
      const mockGroups = [
        { id: 1, name: 'Test Group', description: 'Test Description' },
      ];
      const total = 1;

      mockQueryBuilder.getManyAndCount.mockResolvedValue([
        mockGroups as any,
        total,
      ]);

      const result = await service.findAll({ pagination, searchBy });

      // Перевіряємо, що andWhere був викликаний для кожного параметра пошуку
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'group.name LIKE :name',
        { name: '%test%' },
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'group.description LIKE :description',
        { description: '%desc%' },
      );

      expect(result).toEqual({
        groups: mockGroups,
        total,
      });
    });
  });
});
