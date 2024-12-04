import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Training } from './entities/training.entity';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { Exercise } from 'src/modules/exercises/entities/exercise.entity';
import { TrainingExercise } from 'src/common/entities/training-exercise.entity';
import { REQUEST } from '@nestjs/core';
import * as puppeteer from 'puppeteer';
import * as path from 'path';
import * as fs from 'fs';
import { formatToBrazilianDate } from 'src/common/helpers/date-helper';

@Injectable({scope: Scope.REQUEST})
export class TrainingService {
  constructor(
    @InjectRepository(Training)
    private readonly trainingRepository: Repository<Training>,
    @InjectRepository(TrainingExercise)
    private readonly trainingExerciseRepository: Repository<TrainingExercise>,
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
    @Inject(REQUEST) private readonly request: Request,
  ) { }

  public async create(createTrainingDto: CreateTrainingDto): Promise<Training> {
    const { exercise_ids, ...trainingData } = createTrainingDto;
    trainingData.created_by = this.request['userId'];
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
    const userId = this.request['userId'];
    return this.trainingRepository.find({
      where: { created_by: userId },
      relations: ['trainingExercises', 'trainingExercises.exercise'],
    });
  }

  public async findOne(id: number): Promise<Training> {
    return this.trainingRepository.findOne({
      where: { id, created_by: this.request['userId'] },
      relations: ['trainingExercises', 'trainingExercises.exercise'],
    });
  }

  public async update(id: number, updateTrainingDto: UpdateTrainingDto): Promise<Training> {
    const { exercise_ids, ...trainingData } = updateTrainingDto;
    const userId = this.request['userId'];

    const training = await this.trainingRepository.findOne({ where: { id, created_by: userId } });
    if (!training) {
      throw new Error('Training not found or you do not have permission to update this training');
    }

    await this.trainingRepository.update(id, trainingData);

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

    return this.trainingRepository.findOne({
      where: { id },
      relations: ['trainingExercises', 'trainingExercises.exercise'],
    });
  }

  public async printTraining(id: number) {

    const databaseTraining = await this.findOne(id);

    if (!databaseTraining) {
      throw new Error('Training not found');
    }

    const templatePath = path.join(__dirname, './templates', 'training-template.html');
    let html = fs.readFileSync(templatePath, 'utf8');

    html = html.replace('{{trainingName}}', databaseTraining.name);
    html = html.replace('{{observations}}', databaseTraining.necessary_equipment);
    const today = new Date();
    const formattedDate = formatToBrazilianDate(today);
    html = html.replace('{{todayDate}}', formattedDate);

    const exercises = databaseTraining.trainingExercises.map((te) => {
      return `<tr>
        <td>${te.exercise.name}</td>
        <td>${te.exercise.muscle_group}</td>
        <td>${te.exercise.series}</td>
        <td>${te.exercise.repetitions}</td>
        <td>${te.exercise.exercise_weight}</td>
        <td>${te.exercise.rest_time}</td>
      </tr>
    `}).join('');

    html = html.replace('{{exerciseRows}}', exercises);

    const browser = await puppeteer.launch({ 
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    await page.setContent(html);

    const pdf = await page.pdf({ 
        format: 'A4',
        printBackground: true,
      }
    );

    await browser.close();

    return Buffer.from(pdf);
  }

  public async remove(id: number): Promise<void> {
    const userId = this.request['userId'];
    const training = await this.trainingRepository.findOne({ where: { id, created_by: userId } });

    if (!training) {
      throw new Error('Training not found or you do not have permission to delete this training');
    }

    await this.trainingRepository.delete(id);
  }
}