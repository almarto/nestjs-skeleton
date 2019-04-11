import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { BookModule } from './api/book';
import { UserModule } from './api/user';
import { AppController } from './app.controller';

@Module({
  imports: [TypeOrmModule.forRoot(), BookModule, UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
