import { appendFileSync, statSync, existsSync, unlinkSync } from 'fs';
import { Response } from 'express';
import * as dotenv from 'dotenv';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

dotenv.config();

const newLineChar = process.platform === 'win32' ? '\r\n' : '\n';
const { FILE_SIZE_ROTATE_KB } = process.env;

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

    const logErrorFile = __dirname + '/../../../logs/error_log.txt';

    if (existsSync(logErrorFile)) {
      const stats = statSync(logErrorFile);
      const fileSizeKb = stats.size / 1024;
      if (fileSizeKb > Number(FILE_SIZE_ROTATE_KB)) {
        unlinkSync(logErrorFile);
      }
    }

    try {
      const errorLogInfo = `${new Date().toUTCString()}; [${
        request.method
      }] url: ${
        request.url
      }; status: ${httpStatus}; message error: ${errorMessage};${newLineChar}`;
      appendFileSync(logErrorFile, errorLogInfo);
      Logger.error(errorLogInfo);
    } catch (error) {
      const errorLogInfo = `${new Date().toUTCString()}; status: ${
        HttpStatus.INTERNAL_SERVER_ERROR
      }; ${request.method} ${request.url}; error: ${
        (exception as Error).stack
      };${newLineChar}`;
      appendFileSync(logErrorFile, errorLogInfo);
      Logger.error(errorLogInfo);
    }

    response.status(httpStatus).json({
      statusCode: httpStatus,
      path: request.url,
    });
  }
}
