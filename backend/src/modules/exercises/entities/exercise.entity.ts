import { Column, Entity, OneToMany } from "typeorm";
import { MuscleGroup, RestTime } from "../exercises.enum";
import { BaseEntity } from "src/common/entities/base.entity";
import { TrainingExercise } from "src/common/entities/training-exercise.entity";

@Entity()
export class Exercise extends BaseEntity {

    @Column()
    name: string;

    @Column()
    muscle_group: MuscleGroup;

    @Column({ nullable: true })
    series?: number;

    @Column({ nullable: true })
    repetitions?: number;

    @Column({ nullable: true })
    exercise_weight?: number;

    @Column({ nullable: true })
    rest_time?: RestTime;

    @Column({ nullable: true })
    observation?: string;

    @OneToMany(() => TrainingExercise, trainingExercise => trainingExercise.exercise, { cascade: true })
    trainingExercises: TrainingExercise[];
}