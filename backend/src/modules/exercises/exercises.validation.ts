import * as Joi from 'joi';
import { requiredString } from 'src/common/helpers/joi-helper';

export const exerciseSchema = Joi.object({
    name: requiredString('nome do exercício'),
    muscle_group: requiredString('grupo muscular'),
    series: Joi.number().optional(),
    repetitions: Joi.number().optional(),
    exercise_weight: Joi.number().optional(),
    rest_time: Joi.string().optional(),
    observation: Joi.string().optional(),
});