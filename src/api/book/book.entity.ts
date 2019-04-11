import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';

import { UserEntity } from 'src/api/user';

@Entity({ name: 'books' })
export class BookEntity extends BaseEntity {
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
