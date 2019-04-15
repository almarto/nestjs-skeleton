import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user';

import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookEntity } from './book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity]), UserModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
