import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UserEntity } from '../entities/user.entity';
import { UsersStore } from '../interfaces/user-storage.interface';

@Injectable()
export class InMemoryUsersStorage implements UsersStore {
  private users: UserEntity[] = [];

  getAll = async (): Promise<UserEntity[]> => {
    return this.users;
  };

  getById = async (id: string): Promise<UserEntity> => {
    const user = this.users.find((u) => u.id === id);
    return user;
  };

  update = async (id: string, dto: UpdatePasswordDto): Promise<UserEntity> => {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex > -1) {
      const user = this.users[userIndex];
      if (user.password === dto.oldPassword) {
        user.password = dto.newPassword;
        //user.updateTimeStampAndVersion();
        this.users[userIndex] = user;
        return user;
      } else {
        throw new ForbiddenException();
      }
    }
  };

  create = async (dto: CreateUserDto): Promise<UserEntity> => {
    const { login, password } = dto;
    console.log(login, password);
    //const newUser = new UserEntity(login, password);
    //this.users.push(newUser);
    //return newUser;
    return new UserEntity();
  };

  remove = async (id: string): Promise<boolean> => {
    const lengthBefore = this.users.length;
    this.users = this.users.filter((u) => u.id !== id);
    const lengthAfter = this.users.length;
    const isDeleted = lengthBefore !== lengthAfter;
    return isDeleted;
  };
}
