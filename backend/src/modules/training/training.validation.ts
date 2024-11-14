import * as Joi from 'joi';
import { requiredDate, requiredString } from 'src/common/helpers/joi-helper';

export const trainingSchema = Joi.object({
    name: requiredString('nome do treino'),
    training_objective: requiredString('objetivo do treino'),
    start_date: requiredDate('data de início'),
    end_date: requiredDate('data de término'),
    weekly_frequency: requiredString('frequência semanal'),
    necessary_equipment: requiredString('equipamento necessário'),
}) as Joi.ObjectSchema;
