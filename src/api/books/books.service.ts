import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';

import { Book } from './book.entity';
import { CreateBookDto } from './models/CreateBookDto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async getBooks(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async getBook(bookId: string): Promise<Book> {
    const bookFound = await this.bookRepository.findOne(bookId);

    if (!bookFound) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }

    return bookFound;
  }

  async addBook(book: CreateBookDto): Promise<Book> {
    return this.bookRepository.save(book);
  }

  async updateBook(
    bookId: string,
    book: DeepPartial<CreateBookDto>,
  ): Promise<Book> {
    const bookToUpdate = await this.bookRepository.findOne(bookId);

    if (!bookToUpdate) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }

    return this.bookRepository.save({ ...bookToUpdate, ...book });
  }

  async deleteBook(bookId: string): Promise<Book> {
    const bookToRemove = await this.bookRepository.findOne(bookId);

    if (!bookToRemove) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }

    return this.bookRepository.remove(bookToRemove);
  }
}
