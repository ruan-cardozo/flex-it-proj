import { IsEnum, IsNumber, IsString } from "class-validator";
import { MuscleGroup, RestTime } from "../exercises.enum";

export class CreateExerciseDto {

    @IsString()
    name: string;

    @IsNumber()
    series?: number;
    
    @IsNumber()
    repetitions?: number;

    @IsEnum(MuscleGroup)
    muscle_group: MuscleGroup;

    @IsNumber()
    exercise_weight?: number;

    @IsEnum(RestTime)
    rest_time?: RestTime;

    @IsString()
    observation?: string;
}
