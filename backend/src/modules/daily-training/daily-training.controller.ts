import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { DailyTrainingService } from './daily-training.service';
import { CreateDailyTrainingDto } from './dto/create-daily-training.dto';
import { UpdateDailyTrainingDto } from './dto/update-daily-training.dto';

@Controller('/v1/daily-training')
export class DailyTrainingController {
  constructor(private readonly dailyTrainingService: DailyTrainingService) {}

  @Post()
  create(@Body() createDailyTrainingDto: CreateDailyTrainingDto) {
    return this.dailyTrainingService.create(createDailyTrainingDto);
  }

  @Get()
  findAll() {
    return this.dailyTrainingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.dailyTrainingService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateDailyTrainingDto: UpdateDailyTrainingDto) {
    return this.dailyTrainingService.update(id, updateDailyTrainingDto);
  }
}
