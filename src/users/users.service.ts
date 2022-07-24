import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { UsersStore } from './interfaces/user-storage.interface';

@Injectable()
export class UsersService {
  constructor(@Inject('UsersStore') private storage: UsersStore) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = await this.storage.create(createUserDto);
    if (createdUser) {
      return this.dateToNumber(createdUser);
    } else return createdUser;
  }

  findAll() {
    return this.storage.getAll();
  }

  findOne(id: string) {
    return this.storage.getById(id);
  }

  async update(id: string, updateUserDto: UpdatePasswordDto) {
    const updatedUser = await this.storage.update(id, updateUserDto);
    if (updatedUser) {
      return this.dateToNumber(updatedUser);
    } else return updatedUser;
  }

  remove(id: string) {
    return this.storage.remove(id);
  }

  private dateToNumber(user: UserEntity): UserEntity {
    user.createdAt = +user.createdAt;
    user.updatedAt = +user.updatedAt;
    return user;
  }
}
