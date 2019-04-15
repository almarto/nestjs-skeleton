import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';

import { UserEntity, UserService } from '../user';

import { CreateBookDto } from './models';
import { BookEntity } from './book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    private readonly userService: UserService,
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

  async addBook(book: CreateBookDto, user: UserEntity): Promise<BookEntity> {
    const bookCreated = await this.bookRepository.save({ ...book, user });
    return bookCreated;
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
