import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const validUsername = 'admin';
const validPassword = 'password';

@Injectable()
export class BasicAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Basic ')) {
      const encodedCredentials = authHeader.split(' ')[1];
      const decodedCredentials = Buffer.from(
        encodedCredentials,
        'base64',
      ).toString('utf-8');
      const [username, password] = decodedCredentials.split(':');

      if (username === validUsername && password === validPassword) {
        return next();
      }
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
