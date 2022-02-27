import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, disableErrorMessages: false }));
  const port = parseInt(process.env.API_PORT);
  await app.listen(port);
  return port;
}

bootstrap().then((port) => {
  Logger.log(`Server started running on http://localhost:${port}`)
});
