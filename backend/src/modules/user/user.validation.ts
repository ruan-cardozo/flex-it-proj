import * as Joi from 'joi';
import { requiredString } from 'src/common/helpers/joi-helper';

export const userSchema = Joi.object({
    name: requiredString('nome é obrigatório'),
    email: Joi.string().email().required().messages({
        'string.email': 'O email é inválido',
        'any.required': 'Email é obrigatório',
        'string.empty': 'Email não pode ser vazio'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'A senha deve ter no mínimo 6 caracteres',
        'any.required': 'Senha é obrigatória',
        'string.empty': 'Senha não pode ser vazia'
    }),
});