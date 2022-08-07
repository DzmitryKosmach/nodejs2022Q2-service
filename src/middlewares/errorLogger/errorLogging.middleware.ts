import { appendFileSync } from 'fs';
import { Response } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

const newLineChar = process.platform === 'win32' ? '\r\n' : '\n';

@Catch()
export class ErrorLogger implements ExceptionFilter {
  public catch(exception: unknown, host: ArgumentsHost): Response | void {
    const context = host.switchToHttp();
    //const next = context.getNext();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorMessage = (exception as Error).message;

    /* const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    }; */

    try {
      const errorLogInfo = `${new Date().toUTCString()}; [${
        request.method
      }] url: ${
        request.url
      }; status: ${httpStatus}; message error: ${errorMessage};${newLineChar}`;
      appendFileSync(__dirname + '/../../../logs/error_log.txt', errorLogInfo);
      Logger.error(errorLogInfo);
    } catch (error) {
      const errorLogInfo = `${new Date().toUTCString()}; status: ${
        HttpStatus.INTERNAL_SERVER_ERROR
      }; ${request.method} ${request.url}; error: ${
        (exception as Error).stack
      };${newLineChar}`;
      appendFileSync(__dirname + '/../../../logs/error_log.txt', errorLogInfo);
      Logger.error(errorLogInfo);
    }

    response.status(httpStatus).json({
      statusCode: httpStatus,
      path: request.url,
    });
  }
}
