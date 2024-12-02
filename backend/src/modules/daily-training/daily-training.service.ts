import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateDailyTrainingDto } from './dto/create-daily-training.dto';
import { UpdateDailyTrainingDto } from './dto/update-daily-training.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DailyTraining } from './entities/daily-training.entity';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { DailyTrainingRepository } from './daily-training.repository';

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
    const today = new Date().getDay();
    const userId = this.request['userId'];

    console.log(`Today: ${today}, UserId: ${userId}`);

    if (!userId || isNaN(parseInt(userId, 10))) {
        throw new BadRequestException('Invalid userId');
    }

    const userIdInt = parseInt(userId, 10);

    const findDailyTraining = await this.dailyTrainingRepository.getTrainingOfTheDay(today, userId);

    if (!findDailyTraining) {
        throw new BadRequestException('Daily training not found');
    }

    console.log(findDailyTraining);

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
