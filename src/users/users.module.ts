import { Module } from '@nestjs/common';
//import { InMemoryUsersStorage } from './store/in-memory.users.storage';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RepositoryUsersStorage } from './store/repository.users.storage';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: 'UsersStore', useClass: RepositoryUsersStorage },
  ],
  exports: [UsersService],
})
export class UsersModule {}
