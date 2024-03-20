import {
  Catch,
  ExceptionFilter as BaseExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';
import * as Sentry from '@sentry/node';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcExceptionsFilter implements BaseExceptionFilter {
  constructor(private readonly serviceName) {}

  catch(exception: any, host: ArgumentsHost) {
    const error: any = exception.getError();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    const sentryEventId = Sentry.captureException(exception) || '';
    console.log('caiu no sentry');

    response.status(error.status).json({
      ...error,
      meta: {
        origin: this.serviceName,
        timestamp: new Date().toISOString(),
        path: request.url,
        sentryEventId,
      },
    });
  }
}
