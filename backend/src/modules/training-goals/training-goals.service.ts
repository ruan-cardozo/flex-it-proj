import { Inject, Injectable } from '@nestjs/common';
import { CreateManyGoalsDto, CreateTrainingGoalDto } from './dto/create-training-goal.dto';
import { UpdateTrainingGoalDto } from './dto/update-training-goal.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainingGoal } from './entities/training-goal.entity';

@Injectable()
export class TrainingGoalsService {

  constructor(
    @InjectRepository(TrainingGoal)
    private trainingGoalsRepository: Repository<TrainingGoal>,
    @Inject('REQUEST') private request: Request,
  ) { }

  async create(createTrainingGoalDto: CreateTrainingGoalDto) {

    createTrainingGoalDto.created_by = this.request['userId'];

    this.trainingGoalsRepository.create(createTrainingGoalDto);
    const regex = /^[a-zA-Z0-9\s]*$/;
    if (!regex.test(createTrainingGoalDto.goal)) {

      throw new Error('Invalid input: only alphanumeric characters and spaces are allowed');
    }

    return this.trainingGoalsRepository.save(createTrainingGoalDto);
  }

  async createMany(createManyGoalsDto: CreateManyGoalsDto) {
    const userId = this.request['userId'];
    const regex = /^[a-zA-Z0-9\s]*$/;

    await this.trainingGoalsRepository.clear();

    const goals = await Promise.all(createManyGoalsDto.goals.map(async (goalDto) => {

        if (!regex.test(goalDto.goal)) {
            throw new Error('Invalid input: only alphanumeric characters and spaces are allowed');
        }

        return this.trainingGoalsRepository.save({
            goal: goalDto.goal,
            done: goalDto.done,
            created_by: userId
        });
    }));

    return {
        message: 'Metas criadas com sucesso',
        goals: goals,
    };
}

  findAll() {
    return this.trainingGoalsRepository.find({ 
      where: { 
        created_by: 1 
      }
    });
  }

  findOne(id: number) {
    return this.trainingGoalsRepository.findOne({
      where: {
        id: id,
        created_by: this.request['userId']
      }
    });
  }

  update(id: number, updateTrainingGoalDto: UpdateTrainingGoalDto) {
    return this.trainingGoalsRepository.update(id, updateTrainingGoalDto);
  }

  remove(id: number) {
    return this.trainingGoalsRepository.delete(id);
  }
}