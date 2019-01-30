import { HttpException, Injectable } from '@nestjs/common';

import { BOOKS } from '../mocks/books.mocks';

@Injectable()
export class BooksService {
  public books = BOOKS;

  public getBooks(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.books);
    });
  }

  public getBook(bookID): Promise<any> {
    const id = Number(bookID);
    return new Promise((resolve) => {
      const book = this.books.find(({ id: bookId }) => bookId === id);
      if (!book) {
        throw new HttpException('Book does not exist!', 404);
      }
      resolve(book);
    });
  }

  public addBook(book): Promise<any> {
    return new Promise((resolve) => {
      this.books.push(book);
      resolve(this.books);
    });
  }

  public deleteBook(bookID): Promise<any> {
    const bookIdToRemove = Number(bookID);
    return new Promise((resolve) => {
      this.books = this.books.filter(({ id }) => id !== bookIdToRemove);
      resolve(this.books);
    });
  }
}
