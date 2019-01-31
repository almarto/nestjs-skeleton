import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';

import { Book } from './book.entity';

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
    return this.bookRepository.findOne(bookId);
  }

  async addBook(book: Book): Promise<Book> {
    return this.bookRepository.save(book);
  }

  async updateBook(bookId: string, book: DeepPartial<Book>): Promise<Book> {
    const bookToUpdate = await this.bookRepository.findOne(bookId);
    return this.bookRepository.save({ ...bookToUpdate, ...book });
  }

  async deleteBook(bookId: string): Promise<Book> {
    const bookToRemove = await this.bookRepository.findOne(bookId);
    return this.bookRepository.remove(bookToRemove);
  }
}
