import { Test, TestingModule } from '@nestjs/testing';
import { SchemaService } from '../schema.service';
import { DataSource } from 'typeorm';

describe('SchemaService', () => {
  let schemaService: SchemaService;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchemaService,
        {
          provide: DataSource,
          useValue: {
            query: jest.fn(),
          },
        },
      ],
    }).compile();

    schemaService = module.get<SchemaService>(SchemaService);
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(schemaService).toBeDefined();
    expect(dataSource).toBeDefined();
  });
});
