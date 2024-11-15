import * as Joi from 'joi';
import { requiredString } from 'src/common/helpers/joi-helper';

export const exerciseSchema = Joi.object({
    name: requiredString('nome do exercício'),
    muscle_group: requiredString('grupo muscular'),
    series: Joi.number().integer().min(1).optional().messages({
        'number.base': 'O campo "series" deve ser um número.',
        'number.integer': 'O campo "series" deve ser um número inteiro.',
        'number.min': 'O campo "series" deve ser pelo menos 1.'
    }),
    repetitions: Joi.number().integer().min(1).optional().messages({
        'number.base': 'O campo "repetitions" deve ser um número.',
        'number.integer': 'O campo "repetitions" deve ser um número inteiro.',
        'number.min': 'O campo "repetitions" deve ser pelo menos 1.'
    }),
    exercise_weight: Joi.number().min(0).optional().messages({
        'number.base': 'O campo "exercise_weight" deve ser um número.',
        'number.min': 'O campo "exercise_weight" deve ser pelo menos 0.'
    }),
    rest_time: Joi.string().pattern(/^\d+(s|min)$/).optional().messages({
        'string.pattern.base': 'O campo "rest_time" deve estar no formato correto (ex: "1min" ou "30s").'
    }),
    observation: Joi.string().allow('').optional().messages({
        'string.base': 'O campo "observation" deve ser uma string.'
    }),
});