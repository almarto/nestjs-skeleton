import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as passport from 'passport';
import * as session from 'express-session';

import { DispatchError } from './common/filter/DispatchError';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new DispatchError());

  app.use(
    session({
      secret: 'secret-key',
      name: 'nestjs-skeleton',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  const options = new DocumentBuilder()
    .setTitle('Nest Skeleton Documentation Title')
    .setDescription('Nest Skeleton API Documentation Description')
    .setVersion('1.0')
    .addBearerAuth('Authorization', 'header')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
}
bootstrap();
