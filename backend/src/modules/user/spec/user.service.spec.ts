import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
7;
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { SchemaService } from '../../../common/schema/schema.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;
  let schemaService: SchemaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            findAndCount: jest.fn(),
            fineOneOrFail: jest.fn(),
          },
        },
        {
          provide: SchemaService,
          useValue: {
            createSchema: jest.fn(),
            dropSchema: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    schemaService = module.get<SchemaService>(SchemaService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(schemaService).toBeDefined();
  });
});
