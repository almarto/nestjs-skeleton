import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as crypto from 'crypto';

@Entity()
export class User {
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
    const passHash = crypto.createHmac('sha256', password).digest('hex');
    this.passwordHash = passHash;
  }
}
