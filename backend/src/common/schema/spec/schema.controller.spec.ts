import { Test, TestingModule } from '@nestjs/testing';
import { SchemaController } from '../schema.controller';
import { SchemaService } from '../schema.service';

describe('SchemaController', () => {
  let schemaController: SchemaController;
  let schemaServive: SchemaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchemaController],
      providers: [
        {
          provide: SchemaService,
          useValue: {
            createSchema: jest.fn(),
            dropSchema: jest.fn(),
          },
        },
      ],
    }).compile();

    schemaController = module.get<SchemaController>(SchemaController);
    schemaServive = module.get<SchemaService>(SchemaService);
  });

  it('should be defined', () => {
    expect(schemaController).toBeDefined();
    expect(schemaServive).toBeDefined();
  });
});
