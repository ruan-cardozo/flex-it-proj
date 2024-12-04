import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, Res } from '@nestjs/common';
import { Response } from 'express';
import { TrainingService } from './training.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { JoiValidationPipe } from 'src/pipes/joi-validation.pipe';
import { trainingSchema } from './training.validation';
import { IsPublic } from 'src/common/decorators/is-public.decorator';

@Controller('/v1/training')
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService
  ) { }

  @Post()
  @UsePipes(new JoiValidationPipe(trainingSchema))
  create(@Body() createTrainingDto: CreateTrainingDto) {
    return this.trainingService.create(createTrainingDto);
  }

  @Get()
  findAll() {
    return this.trainingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainingService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTrainingDto: UpdateTrainingDto) {
    return this.trainingService.update(+id, updateTrainingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainingService.remove(+id);
  }

  @Get('print-training/:id')
  async printTraining(@Param('id') id: number, @Res() res: Response) {
    const pdfBuffer = await this.trainingService.printTraining(id);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=training-${id}.pdf`,
      'Content-Length': pdfBuffer.length,
    });

    res.send(pdfBuffer);
  }
}
