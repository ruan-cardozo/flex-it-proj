import { IsNumber } from "class-validator";

export class CreateDailyTrainingDto {
    @IsNumber()
    day: number;

    @IsNumber()
    trainingId: number;

    @IsNumber()
    created_by: number;
}
