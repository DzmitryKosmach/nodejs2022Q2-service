import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UserEntity } from '../entities/user.entity';
//import { UserDTO } from '../dto/user.dto';

export interface UsersStore {
  getAll: () => Promise<UserEntity[]>;

  getById: (id: string) => Promise<UserEntity>;

  update: (id: string, dto: UpdatePasswordDto) => Promise<UserEntity>;

  create: (dto: CreateUserDto) => Promise<UserEntity>;

  remove: (id: string) => Promise<boolean>;
}
