// auth.middleware.ts

import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { RequestProvider } from './gateway/providers/RequestProvider';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly httpProvider: RequestProvider) {}
  async use(req: Request, res: Response, next: Function) {
    const token = req.headers.authorization;
    if (!token) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    try {
      // Request to Auth service to validate token
      const response = await this.httpProvider.post(
        'auth',
        '/api/auth/validate',
        { token },
        'user',
        { Authorization: token },
      );
      if (response.status == 'success') {
        next();
      } else {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
