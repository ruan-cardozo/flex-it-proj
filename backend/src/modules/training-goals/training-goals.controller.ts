import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrainingGoalsService } from './training-goals.service';
import { CreateManyGoalsDto, CreateTrainingGoalDto } from './dto/create-training-goal.dto';
import { UpdateTrainingGoalDto } from './dto/update-training-goal.dto';

@Controller('/v1/training-goals')
export class TrainingGoalsController {
  constructor(private readonly trainingGoalsService: TrainingGoalsService) {}

  @Post('/create-many')
  public createMany(@Body() createManyGoalsDto: CreateManyGoalsDto) {

    return this.trainingGoalsService.createMany(createManyGoalsDto);
  }


  @Post()
  create(@Body() createTrainingGoalDto: CreateTrainingGoalDto) {

    return this.trainingGoalsService.create(createTrainingGoalDto);
  }

  @Get()
  findAll() {
    return this.trainingGoalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.trainingGoalsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTrainingGoalDto: UpdateTrainingGoalDto) {
    return this.trainingGoalsService.update(+id, updateTrainingGoalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.trainingGoalsService.remove(id);
  }
}
 