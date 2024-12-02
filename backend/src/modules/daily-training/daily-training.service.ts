import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateDailyTrainingDto } from './dto/create-daily-training.dto';
import { UpdateDailyTrainingDto } from './dto/update-daily-training.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DailyTraining } from './entities/daily-training.entity';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class DailyTrainingService {

  constructor(
    @InjectRepository(DailyTraining)
    private readonly dailyTrainingRepository: Repository<DailyTraining>,
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
