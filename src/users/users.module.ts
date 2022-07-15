import { Module } from '@nestjs/common';
import { InMemoryUsersStorage } from './store/in-memory.users.storage';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: 'UsersStore', useClass: InMemoryUsersStorage },
  ],
  exports: [UsersService],
})
export class UsersModule {}
