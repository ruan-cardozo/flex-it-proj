import * as Joi from 'joi';

export const requiredString = (fieldName: string) => Joi.string().required()
    .messages({
        'any.required': `O ${fieldName} é obrigatório`,
        'string.empty': `O ${fieldName} não pode estar vazio`,
    });

export const requiredDate = (fieldName: string) => Joi.date().required()
    .messages({
        'any.required': `O ${fieldName} é obrigatório`,
        'date.base': `O ${fieldName} deve ser uma data válida`,
    })
