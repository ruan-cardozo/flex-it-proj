import { Test, TestingModule } from '@nestjs/testing';
import { DailyTrainingService } from './daily-training.service';

describe('DailyTrainingService', () => {
  let service: DailyTrainingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyTrainingService],
    }).compile();

    service = module.get<DailyTrainingService>(DailyTrainingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
