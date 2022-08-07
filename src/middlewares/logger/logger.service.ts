import { NextFunction, Request, Response } from 'express';
import { appendFileSync, statSync } from 'fs';
//import filesize from 'filesize';

import {
  Injectable,
  Logger,
  NestMiddleware,
  Next,
  Req,
  Res,
} from '@nestjs/common';

const newLineChar = process.platform === 'win32' ? '\r\n' : '\n';

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

      appendFileSync(logFile, logInfo);

      const stats = statSync(logFile);
      //const fileSizeInMb = filesize(stats.size, { round: 0 });
      process.stdout.write('File size = ' + stats.size);

      Logger.log(logInfo);
    });

    next();
  }
}
