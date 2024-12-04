import { Test, TestingModule } from '@nestjs/testing';
import { TrainingGoalsService } from './training-goals.service';

describe('TrainingGoalsService', () => {
  let service: TrainingGoalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingGoalsService],
    }).compile();

    service = module.get<TrainingGoalsService>(TrainingGoalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
