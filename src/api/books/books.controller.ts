import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Put,
} from '@nestjs/common';

import { BooksService } from './books.service';
import { Book } from './book.entity';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  public async getBooks() {
    const books = await this.booksService.getBooks();
    return books;
  }

  @Get(':bookId')
  public async getBook(@Param('bookId') bookId) {
    const book = await this.booksService.getBook(bookId);
    return book;
  }

  @Post()
  public async addBook(@Body() book: Book) {
    const createdBook = await this.booksService.addBook(book);
    return createdBook;
  }

  @Put(':bookId')
  public async updateBook(@Param('bookId') bookId, @Body() book: Book) {
    const createdBook = await this.booksService.updateBook(bookId, book);
    return createdBook;
  }

  @Delete()
  public async deleteBook(@Query() query) {
    const books = await this.booksService.deleteBook(query.bookID);
    return books;
  }
}
