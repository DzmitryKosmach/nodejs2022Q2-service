import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ErrorLogger } from './middlewares/errorLogger/errorLogging.middleware';
//import { loggingLevel } from './logging.level';

const { LOGGING_LEVEL } = process.env;

async function bootstrap() {
  //const loggLevel = loggingLevel.slice(0, Number(LOGGING_LEVEL));
  const app = await NestFactory.create(AppModule, {
    logger:
      LOGGING_LEVEL === '1'
        ? ['log', 'debug', 'error', 'verbose', 'warn']
        : ['error', 'warn'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorLogger());
  await app.listen(process.env.PORT);

  process.on('uncaughtException', (error) => {
    process.stderr.write(`The uncaughtException ${error}`);
    process.exit(1);
  });

  process.on('unhandledRejection', (error) => {
    process.stderr.write(`The unhandledRejection ${error}`);
  });
  console.log(`Application started at http://localhost:${process.env.PORT}`);
}
bootstrap();
