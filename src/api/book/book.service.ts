import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';

import { CreateBookDto } from './models';
import { BookEntity } from '../book';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async getBooks(): Promise<BookEntity[]> {
    return this.bookRepository.find();
  }

  async getBook(bookId: string): Promise<BookEntity> {
    const bookFound = await this.bookRepository.findOne(bookId);

    if (!bookFound) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }

    return bookFound;
  }

  async addBook(book: CreateBookDto): Promise<BookEntity> {
    return this.bookRepository.save(book);
  }

  async updateBook(bookId: string, book: DeepPartial<CreateBookDto>): Promise<BookEntity> {
    const bookToUpdate = await this.bookRepository.findOne(bookId);

    if (!bookToUpdate) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }

    return this.bookRepository.save({ ...bookToUpdate, ...book });
  }

  async deleteBook(bookId: string): Promise<BookEntity> {
    const bookToRemove = await this.bookRepository.findOne(bookId);

    if (!bookToRemove) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }

    return this.bookRepository.remove(bookToRemove);
  }
}
