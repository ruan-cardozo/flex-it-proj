import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>
  ) {}

  public async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    const exercise = this.exerciseRepository.create(createExerciseDto);
    await this.exerciseRepository.save(exercise);

    return exercise;
  }

  public async findAll(): Promise<Exercise[]> {
    return this.exerciseRepository.find({ relations: ['trainingExercises', 'trainingExercises.training'] });
  }

  public async findOne(id: number): Promise<Exercise> {
    return this.exerciseRepository.findOne({
      where: { id },
      relations: ['trainingExercises', 'trainingExercises.training'],
    });
  }

  public async update(id: number, updateExerciseDto: UpdateExerciseDto): Promise<Exercise> {
    await this.exerciseRepository.update(id, updateExerciseDto);
    return this.exerciseRepository.findOne({ where: { id } });
  }

  public async remove(id: number): Promise<void> {
    await this.exerciseRepository.delete(id);
  }
}