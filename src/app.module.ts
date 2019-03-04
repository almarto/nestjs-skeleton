import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { BooksModule } from './api/books/books.module';
import { UsersModule } from './api/user/user.module';

import { AppController } from './app.controller';

@Module({
  imports: [TypeOrmModule.forRoot(), BooksModule, UsersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
