import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { DispatchError } from './common/filter/DispatchError';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new DispatchError());

  const options = new DocumentBuilder()
    .setTitle('Nest Skeleton Documentation Title')
    .setDescription('Nest Skeleton API Documentation Description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
}
bootstrap();
