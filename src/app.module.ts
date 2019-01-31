import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { BooksModule } from './api/books/books.module';

import { AppController } from './app.controller';

@Module({
  imports: [TypeOrmModule.forRoot(), BooksModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
