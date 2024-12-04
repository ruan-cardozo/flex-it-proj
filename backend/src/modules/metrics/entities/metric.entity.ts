import { BaseEntity } from "../../../common/entities/base.entity";
import {
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Entity
} from "typeorm";

@Entity()
export class Metric extends BaseEntity {
    @Column()
    data:Date;

    @Column()
    peso:number;

    @Column()
    altura:number;

    
    @Column('float', { nullable: true })
    imc?: number;

}
