import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class {{pascalCase name}} {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;
}
