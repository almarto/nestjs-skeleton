import { ApiUseTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Query, Put } from '@nestjs/common';

import { CreateBookDto, DeleteBookQuery } from './models';
import { BookService } from './book.service';

@ApiUseTags('books')
@Controller('books')
export class BookController {
  constructor(private booksService: BookService) {}

  @Get()
  public async getBooks() {
    const books = await this.booksService.getBooks();
    return books;
  }

  @Get(':bookId')
  public async getBook(@Param('bookId') bookId: string) {
    const book = await this.booksService.getBook(bookId);
    return book;
  }

  @Post()
  public async addBook(@Body() book: CreateBookDto) {
    // , @SessionUser() user: UserEntity
    const createdBook = await this.booksService.addBook(book);
    return createdBook;
  }

  @Put(':bookId')
  public async updateBook(@Param('bookId') bookId: string, @Body() book: CreateBookDto) {
    const createdBook = await this.booksService.updateBook(bookId, book);
    return createdBook;
  }

  @Delete()
  public async deleteBook(@Query() { bookId }: DeleteBookQuery) {
    const books = await this.booksService.deleteBook(bookId);
    return books;
  }
}
