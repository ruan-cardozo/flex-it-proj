import {
    BadRequestException,
    NestMiddleware,
    Injectable,
  } from '@nestjs/common';
  import { Request, Response, NextFunction } from 'express';
  import { LoginRequestBody } from '../models/LoginRequestBody';
  import { validate } from 'class-validator';
  
  interface LoginRequest extends Request {
    body: {
      email: string;
      password: string;
    };
  }
  
  @Injectable()
  export class LoginValidationMiddleware implements NestMiddleware {
    async use(req: LoginRequest, res: Response, next: NextFunction) {
      const body = req.body;
  
      const loginRequestBody = new LoginRequestBody();
      loginRequestBody.email = body.email;
      loginRequestBody.password = body.password;
  
      const validations = await validate(loginRequestBody);
  
      if (validations.length) {
        throw new BadRequestException(
          validations.reduce((acc, curr) => {
            return [...acc, ...Object.values(curr.constraints)];
          }, []),
        );
      }
  
      next();
    }
  }
  