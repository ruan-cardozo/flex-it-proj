import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';
import { REQUEST } from '@nestjs/core';

@Injectable({scope: Scope.REQUEST})
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  public async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {

    createExerciseDto.created_by = this.request['userId'];

    const exercise = this.exerciseRepository.create(createExerciseDto);

    await this.exerciseRepository.save(exercise);

    return exercise;
  }

  public async findAll(): Promise<Exercise[]> {
    return this.exerciseRepository.find({ relations: ['trainingExercises', 'trainingExercises.training'], where: { created_by: this.request['userId'] } });
  }

  public async findOne(id: number): Promise<Exercise> {
    return this.exerciseRepository.findOne({
      where: { id, created_by: this.request['userId'] },
      relations: ['trainingExercises', 'trainingExercises.training'],
    });
  }

  public async update(id: number, updateExerciseDto: UpdateExerciseDto): Promise<Exercise> {

    const existingExercise = await this.exerciseRepository.findOne({ where: { id, created_by: this.request['userId'] } });

    if (!existingExercise) {
        throw new Error('Exercise not found');
    }

    const updatedExercise = {
        ...existingExercise,
        ...updateExerciseDto,
    };

    await this.exerciseRepository.save(updatedExercise);

    const exercise = await this.exerciseRepository.findOne({ where: { id, created_by: this.request['userId'] } });

    return exercise;
  }

  public async remove(id: number): Promise<void> {
    await this.exerciseRepository.delete({ id, created_by: this.request['userId'] });
  }
}