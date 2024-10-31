import { Column, Entity, OneToMany } from "typeorm";
import { MuscleGroup, RestTime } from "../exercises.enum";
import { BaseEntity } from "src/common/entities/base.entity";
import { TrainingExercise } from "src/common/entities/training-exercise.entity";

@Entity()
export class Exercise extends BaseEntity {

    @Column()
    name: string;

    @Column()
    series?: number;

    @Column()
    repetitions?: number;

    @Column()
    muscle_group: MuscleGroup;

    @Column()
    exercise_weight?: number;

    @Column()
    rest_time?: RestTime;

    @Column()
    observation?: string;

    @OneToMany(() => TrainingExercise, trainingExercise => trainingExercise.exercise, { cascade: true })
    trainingExercises: TrainingExercise[];
}