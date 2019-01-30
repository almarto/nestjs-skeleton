import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { BooksService } from './books.service';
import { CreateBookDTO } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  public async getBooks() {
    const books = await this.booksService.getBooks();
    return books;
  }

  @Get(':bookID')
  public async getBook(@Param('bookID') bookID) {
    const book = await this.booksService.getBook(bookID);
    return book;
  }

  @Post()
  public async addBook(@Body() createBookDTO: CreateBookDTO) {
    const book = await this.booksService.addBook(createBookDTO);
    return book;
  }

  @Delete()
  public async deleteBook(@Query() query) {
    const books = await this.booksService.deleteBook(query.bookID);
    return books;
  }
}
