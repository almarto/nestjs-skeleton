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
  public async getBooks() {
    const books = await this.bookService.getBooks();
    return books;
  }

  @Get(':bookId')
  public async getBook(@Param('bookId') bookId: string) {
    const book = await this.bookService.getBook(bookId);
    return book;
  }

  @Post()
  @UseGuards(SessionGuard)
  public async addBook(@Body() book: CreateBookDto, @sessionUser() user: UserEntity) {
    const createdBook = await this.bookService.addBook(book, user);
    return createdBook;
  }

  @Put(':bookId')
  public async updateBook(@Param('bookId') bookId: string, @Body() book: CreateBookDto) {
    const createdBook = await this.bookService.updateBook(bookId, book);
    return createdBook;
  }

  @Delete()
  public async deleteBook(@Query() { bookId }: DeleteBookQuery) {
    const books = await this.bookService.deleteBook(bookId);
    return books;
  }
}
