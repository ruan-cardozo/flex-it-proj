import { BaseEntity } from 'src/common/entities/base.entity';
import {
  Column,
  Entity
} from 'typeorm';

@Entity()
export class User extends BaseEntity {

  @Column()
  name: string;

  @Column({nullable: true})
  user_name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
