import { NextFunction, Request, Response } from 'express';
import { appendFileSync, statSync, existsSync, unlinkSync } from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

import {
  Injectable,
  Logger,
  NestMiddleware,
  Next,
  Req,
  Res,
} from '@nestjs/common';

const newLineChar = process.platform === 'win32' ? '\r\n' : '\n';
const { FILE_SIZE_ROTATE_KB } = process.env;


@Injectable()
export class LoggingService implements NestMiddleware {
  async use(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { url, method } = req;
    const currentTime = new Date();
    const requestData: string | null = JSON.stringify(req.body);

    res.on('close', () => {
      const { statusCode } = res;

      const logInfo = `Date: ${currentTime.toUTCString()}; Method: [${method}]; Query params: [${JSON.stringify(
        req.query,
      )}]; request body: [${requestData}]; URL: ${url}; status code: ${statusCode};${newLineChar}`;

      const logFile = __dirname + '/../../../logs/log_info.txt';

      //checkFileForRotate(logFile);

      if (existsSync(logFile)) {
        const stats = statSync(logFile);
        const fileSizeKb = stats.size / 1024;
        //process.stdout.write('checkFileForRotate: ' + +fileSizeKb);
        if (fileSizeKb > Number(FILE_SIZE_ROTATE_KB)) {
          unlinkSync(logFile);
        }
      }

      appendFileSync(logFile, logInfo);

      Logger.log(logInfo);
    });

    next();
  }
}
