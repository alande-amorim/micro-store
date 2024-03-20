import { Catch, ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const error: any = exception.getError();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    const errorJson = {
      status: error.status,
      error: error.response.error,
      message: error.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(error.status).json(errorJson);
  }
}
