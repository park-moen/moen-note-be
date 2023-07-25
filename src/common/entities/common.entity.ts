import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNumber } from 'class-validator';
import { Exclude } from 'class-transformer';

export abstract class CommonEntity {
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  updateAt: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp' })
  deleteAt?: Date | null;
}
