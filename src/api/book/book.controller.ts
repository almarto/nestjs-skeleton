import { ApiUseTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Query, Put, UseGuards } from '@nestjs/common';

import { SessionGuard } from '../auth/SessionGuard';
import { UserEntity, sessionUser } from '../user';

import { CreateBookDto, DeleteBookQuery } from './models';
import { BookService } from './book.service';

@ApiUseTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @UseGuards(SessionGuard)
  public async getBooks(@sessionUser() user: UserEntity) {
    const books = await this.bookService.getBooks(user);
    return books;
  }

  @Get(':bookId')
  @UseGuards(SessionGuard)
  public async getBook(@Param('bookId') bookId: string, @sessionUser() user: UserEntity) {
    const book = await this.bookService.getBook(bookId, user);
    return book;
  }

  @Post()
  @UseGuards(SessionGuard)
  public async addBook(@Body() book: CreateBookDto, @sessionUser() user: UserEntity) {
    const createdBook = await this.bookService.addBook(book, user);
    return createdBook;
  }

  @Put(':bookId')
  @UseGuards(SessionGuard)
  public async updateBook(
    @Param('bookId') bookId: string,
    @Body() book: CreateBookDto,
    @sessionUser() user: UserEntity,
  ) {
    const createdBook = await this.bookService.updateBook(bookId, book, user);
    return createdBook;
  }

  @Delete()
  @UseGuards(SessionGuard)
  public async deleteBook(@Query() { bookId }: DeleteBookQuery, @sessionUser() user: UserEntity) {
    const books = await this.bookService.deleteBook(bookId, user);
    return books;
  }
}
