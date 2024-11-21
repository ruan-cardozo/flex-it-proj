import { Column, Entity, OneToMany } from "typeorm";
import { TrainingObjective, WeeklyFrequency } from "../training.enum";
import { BaseEntity } from "src/common/entities/base.entity";
import { TrainingExercise } from "src/common/entities/training-exercise.entity";

@Entity()
export class Training extends BaseEntity {

    @Column()
    name: string;

    @Column()
    training_objective: TrainingObjective;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column()
    weekly_frequency: WeeklyFrequency;

    @Column({ nullable: true })
    necessary_equipment: string;

    @OneToMany(() => TrainingExercise, trainingExercise => trainingExercise.training, { cascade: true })
    trainingExercises: TrainingExercise[];
}