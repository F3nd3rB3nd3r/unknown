import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as requestIp from 'request-ip';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const ip = requestIp.getClientIp(request);
    const { method } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('close', () => {
      const headers = JSON.stringify(request.headers);

      this.logger.log(
        `${method} ${request.originalUrl} ${response.statusCode} - ${userAgent} ${ip} ${headers}`,
      );
    });

    next();
  }
}
