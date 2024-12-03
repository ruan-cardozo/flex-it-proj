import { Test, TestingModule } from '@nestjs/testing';
import { TrainingGoalsController } from '../training-goals.controller';
import { TrainingGoalsService } from '../training-goals.service';

describe('TrainingGoalsController', () => {
  let controller: TrainingGoalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingGoalsController],
      providers: [TrainingGoalsService],
    }).compile();

    controller = module.get<TrainingGoalsController>(TrainingGoalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
