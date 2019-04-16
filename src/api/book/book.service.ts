import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

  async getBooks(user: UserEntity): Promise<BookEntity[]> {
    const userId = user.id;
    return this.bookRepository.find({ where: { user: userId } });
  }

  async getBook(bookId: string, user: UserEntity): Promise<BookEntity> {
    const bookFound = await this.bookRepository.findOne({
      where: { id: bookId },
      relations: ['user'],
    });

    if (!bookFound) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }

    if (bookFound.user.id !== user.id) {
      throw new UnauthorizedException();
    }

    delete bookFound.user;
    return bookFound;
  }

  async addBook(book: CreateBookDto, user: UserEntity): Promise<BookEntity> {
    const bookCreated = await this.bookRepository.save({ ...book, user });

    delete bookCreated.user;
    return bookCreated;
  }

  async updateBook(
    bookId: string,
    book: DeepPartial<CreateBookDto>,
    user: UserEntity,
  ): Promise<BookEntity> {
    const bookToUpdate = await this.bookRepository.findOne({
      where: { id: bookId },
      relations: ['user'],
    });

    if (!bookToUpdate) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }

    if (bookToUpdate.user.id !== user.id) {
      throw new UnauthorizedException();
    }

    const bookUpdated = await this.bookRepository.save({ ...bookToUpdate, ...book });

    delete bookUpdated.user;
    return bookUpdated;
  }

  async deleteBook(bookId: string, user: UserEntity): Promise<BookEntity> {
    const bookToRemove = await this.bookRepository.findOne({
      where: { id: bookId },
      relations: ['user'],
    });

    if (!bookToRemove) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }

    if (bookToRemove.user.id !== user.id) {
      throw new UnauthorizedException();
    }

    const bookDeleted = await this.bookRepository.remove(bookToRemove);

    delete bookDeleted.user;
    return bookDeleted;
  }
}
