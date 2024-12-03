import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class TrainingGoal extends BaseEntity {

    @Column()
    goal: string;

    @Column()
    done: boolean;
}
