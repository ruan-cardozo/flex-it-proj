import { Test, TestingModule } from '@nestjs/testing';
import { DailyTrainingController } from './daily-training.controller';
import { DailyTrainingService } from './daily-training.service';

describe('DailyTrainingController', () => {
  let controller: DailyTrainingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyTrainingController],
      providers: [DailyTrainingService],
    }).compile();

    controller = module.get<DailyTrainingController>(DailyTrainingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
