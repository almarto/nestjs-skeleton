import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { UserEntity } from '../user';

@Entity({ name: 'books' })
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column('text')
  description: string;

  @Column()
  author: string;

  @ManyToOne(type => UserEntity, user => user.books)
  user: UserEntity;
}
