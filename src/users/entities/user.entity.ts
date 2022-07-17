import { v4 as uuid } from 'uuid';
import { User } from '../interfaces/user.interface';

export class UserEntity implements User {
  id: string = uuid();
  login = 'user';
  password = 'P@55w0rd';
  version = 1;
  createdAt: number;
  updatedAt: number;

  constructor(userLogin: string, userPassword: string) {
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
  }

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
