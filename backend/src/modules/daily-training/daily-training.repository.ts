import { Repository, DataSource } from 'typeorm';
import { DailyTraining } from './entities/daily-training.entity';

export class DailyTrainingRepository extends Repository<DailyTraining> {
    constructor(dataSource: DataSource) {
        super(DailyTraining, dataSource.createEntityManager());
    }

    getTrainingOfTheDay(today: number, userId: number) {
        return this.createQueryBuilder('dailyTraining')
            .leftJoinAndSelect('dailyTraining.training', 'training')
            .leftJoinAndSelect('training.trainingExercises', 'trainingExercises')
            .leftJoinAndSelect('trainingExercises.exercise', 'exercise')
            .where('dailyTraining.day = :today', { today })
            .andWhere('dailyTraining.created_by = :userId', { userId })
            .getOne();
    }
}