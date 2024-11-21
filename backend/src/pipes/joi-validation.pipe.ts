import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: joi.ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);

    if (error) {
      throw new BadRequestException(error.message);
    }
    return value;
  }
}