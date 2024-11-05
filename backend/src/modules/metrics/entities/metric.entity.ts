import {
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Entity
} from "typeorm";

@Entity()
export class Metric {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    peso:number;

    @Column()
    altura:number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
