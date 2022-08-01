//import { v4 as uuid } from 'uuid';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../interfaces/user.interface';

@Entity('user')
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: number;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: number;

  /* constructor(userLogin: string, userPassword: string) {
    this.login = userLogin;
    this.password = userPassword;
    const timeStamp = this.getTimeStamp();
    this.createdAt = timeStamp;
    this.updatedAt = timeStamp;
  }

  updateTimeStampAndVersion() {
    this.updatedAt = this.getTimeStamp();
    this.version = this.version + 1;
  }

  getTimeStamp() {
    return new Date().getTime();
  } */

  static toResponse(user: UserEntity): {
    id: string;
    login: string;
    version: number;
    createdAt: number;
    updatedAt: number;
  } {
    const { id, login, version, createdAt, updatedAt } = user;
    return { id, login, version, createdAt, updatedAt };
  }
}
