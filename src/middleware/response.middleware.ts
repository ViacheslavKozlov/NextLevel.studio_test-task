import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { StandardizedResponse } from './interface.middleware';

@Injectable()
export class ResponseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestId = uuidv4();

    res.locals.requestId = requestId;

    const originalJson = res.json.bind(res);
    res.json = (body: any) => {
      const response: StandardizedResponse = {
        requestId,
        data: body,
      };
      return originalJson(response);
    };

    next();
  }
}
