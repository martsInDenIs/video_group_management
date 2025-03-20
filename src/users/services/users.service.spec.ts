import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { HashService } from './hash.service';
import { QueryFailedError, Repository } from 'typeorm';
import { Role } from '../role.enum';
import { UnauthorizedException } from '@nestjs/common';

const mockRepository = {
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

describe('UsersService', () => {
  let service: UsersService;
  let repository: jest.Mocked<Repository<User>>;
  let hashService: jest.Mocked<HashService>;

  const userData = {
    id: '1',
    email: 'test@test.com',
    password: 'password',
    role: Role.Viewer,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        HashService,
        { provide: getRepositoryToken(User), useValue: mockRepository },
      ],
    }).compile();

    jest.spyOn(mockRepository, 'save').mockImplementation((user) => {
      return Promise.resolve(user);
    });
    jest.spyOn(mockRepository, 'findOne').mockImplementation((userData) => {
      return Promise.resolve(userData);
    });

    service = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(User));
    hashService = module.get(HashService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const result = await service.create(userData);

      expect(result).toEqual(userData);
      expect(repository.save).toHaveBeenCalledWith(userData);
    });

    it('should throw an error if the user already exists', async () => {
      const queryError = new QueryFailedError('query', [], {
        code: '23505',
        detail: 'Key (email)=(test@example.com) already exists',
      } as any);

      repository.save.mockRejectedValue(queryError);

      await expect(service.create(userData)).rejects.toThrow(QueryFailedError);

      expect(repository.save(userData)).rejects.toMatchObject({
        driverError: {
          code: '23505',
          detail: expect.stringContaining('already exists'),
        },
      });
    });
  });

  describe('login', () => {
    it('should return a user if the credentials are correct', async () => {
      repository.findOne.mockResolvedValue(userData);
      jest.spyOn(hashService, 'compare').mockResolvedValue(true);

      const result = await service.login(userData);

      expect(result).toEqual(userData);
    });

    it('should throw an error if the user does not exist', async () => {
      repository.findOne.mockResolvedValue(null);
      await expect(service.login(userData)).rejects.toThrow(
        new UnauthorizedException('Invalid credentials'),
      );
    });

    it('should throw an error if the password is incorrect', async () => {
      repository.findOne.mockResolvedValue({
        ...userData,
        password: 'incorrect_password',
      });

      await expect(service.login(userData)).rejects.toThrow(
        new UnauthorizedException('Invalid credentials'),
      );
    });
  });
});
