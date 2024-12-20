import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateDailyTrainingDto } from './dto/create-daily-training.dto';
import { UpdateDailyTrainingDto } from './dto/update-daily-training.dto';
import { REQUEST } from '@nestjs/core';
import { DailyTrainingRepository } from './daily-training.repository';
import * as moment from 'moment-timezone';

@Injectable()
export class DailyTrainingService {

  constructor(
    @Inject('DailyTrainingRepository')
    private readonly dailyTrainingRepository: DailyTrainingRepository,
    @Inject(REQUEST) private readonly request: Request
  ) { }

  create(createDailyTrainingDto: CreateDailyTrainingDto) {
    
    createDailyTrainingDto.created_by = this.request['userId'];

    const dailyTraining = this.dailyTrainingRepository.create(createDailyTrainingDto);

    return this.dailyTrainingRepository.save(dailyTraining);
  }

  findAll() {
    return this.dailyTrainingRepository.find({ relations: ['training'] });
  }

  findOne(id: number) {
    return this.dailyTrainingRepository.findOne({ where: { id }, relations: ['training'] });
  }

  async getTrainingOfTheDay() {
    const today = Number(moment().tz('America/Sao_Paulo').format('DD'));
    const userId = this.request['userId'];

    if (!userId || isNaN(parseInt(userId, 10))) {
        throw new BadRequestException('Invalid userId');
    }

    const findDailyTraining = await this.dailyTrainingRepository.getTrainingOfTheDay(today, userId);

    if (!findDailyTraining) {
        throw new BadRequestException('Daily training not found');
    }

    return findDailyTraining;
}

  async update(id: number, updateDailyTrainingDto: UpdateDailyTrainingDto) {

    const findDailyTraining = await this.dailyTrainingRepository.findOne({ where: { id, created_by: this.request['userId'] } });

    if (!findDailyTraining) {

      return new BadRequestException('Daily training not found');
    }

    const updatedDailyTraining = await this.dailyTrainingRepository.update(id, updateDailyTrainingDto);

    return updatedDailyTraining;
  }

  async delete(id: number) {

    const findDailyTraining = this.dailyTrainingRepository.findOneBy({ id, created_by: this.request['userId'] });

    if (!findDailyTraining) {
      
      return new BadRequestException('Daily training not found');
    }

    await this.dailyTrainingRepository.delete({ id });

    return {
      status: 200,
      message: 'Daily training deleted successfully'
    }
  }
}
