import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Training } from './entities/training.entity';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { Exercise } from 'src/modules/exercises/entities/exercise.entity';
import { TrainingExercise } from 'src/common/entities/training-exercise.entity';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(Training)
    private readonly trainingRepository: Repository<Training>,
    @InjectRepository(TrainingExercise)
    private readonly trainingExerciseRepository: Repository<TrainingExercise>,
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
  ) {}

  public async create(createTrainingDto: CreateTrainingDto): Promise<Training> {
    const { exercise_ids, ...trainingData } = createTrainingDto;
    const training = this.trainingRepository.create(trainingData);
    await this.trainingRepository.save(training);

    if (exercise_ids && exercise_ids.length > 0) {
      for (const exerciseId of exercise_ids) {
        const exercise = await this.exerciseRepository.findOneBy({ id: exerciseId });
        if (exercise) {
          const trainingExercise = this.trainingExerciseRepository.create({ training, exercise });
          await this.trainingExerciseRepository.save(trainingExercise);
        }
      }
    }

    return this.trainingRepository.findOne({
      where: { id: training.id },
      relations: ['trainingExercises', 'trainingExercises.exercise'],
    });
  }

  public async findAll(): Promise<Training[]> {
    return this.trainingRepository.find({ relations: ['trainingExercises', 'trainingExercises.exercise'] });
  }

  public async findOne(id: number): Promise<Training> {
    return this.trainingRepository.findOne({
      where: { id },
      relations: ['trainingExercises', 'trainingExercises.exercise'],
    });
  }

  public async update(id: number, updateTrainingDto: UpdateTrainingDto): Promise<Training> {
    const { exercise_ids, ...trainingData } = updateTrainingDto;
    await this.trainingRepository.update(id, trainingData);

    const training = await this.trainingRepository.findOne({ where: { id } });
    if (training) {
      await this.trainingExerciseRepository.delete({ training });

      if (exercise_ids && exercise_ids.length > 0) {
        for (const exerciseId of exercise_ids) {
          const exercise = await this.exerciseRepository.findOneBy({ id: exerciseId });
          if (exercise) {
            const trainingExercise = this.trainingExerciseRepository.create({ training, exercise });
            await this.trainingExerciseRepository.save(trainingExercise);
          }
        }
      }
    }

    return this.trainingRepository.findOne({
      where: { id },
      relations: ['trainingExercises', 'trainingExercises.exercise'],
    });
  }

  public async remove(id: number): Promise<void> {
    await this.trainingRepository.delete(id);
  }
}