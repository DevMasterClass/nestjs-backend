import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 'NO NICKNAME' })
  nickname?: string;

  @Column()
  age: number;

  @Column()
  breed: string;
}
