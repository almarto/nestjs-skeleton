import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { createHmac } from 'crypto';

import { BookEntity } from '../book';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 30,
  })
  firstName: string;

  @Column({
    length: 50,
  })
  username: string;

  @Column({
    length: 250,
    select: false,
    name: 'password',
  })
  passwordHash: string;
  set password(password: string) {
    const passHash = createHmac('sha256', password).digest('hex');
    this.passwordHash = passHash;
  }

  @OneToMany(type => BookEntity, book => book.user)
  books: BookEntity[];
}
