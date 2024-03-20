import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as Sentry from '@sentry/node';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly serviceName) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const sentryEventId = Sentry.captureException(exception) || '';
    response.status(status).json({
      ...exception,
      meta: {
        origin: this.serviceName,
        timestamp: new Date().toISOString(),
        path: request.url,
        sentryEventId,
      },
    });
  }
}
