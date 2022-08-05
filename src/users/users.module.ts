import { Module } from '@nestjs/common';
//import { InMemoryUsersStorage } from './store/in-memory.users.storage';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RepositoryUsersStorage } from './store/repository.users.storage';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: 'UsersStore', useClass: RepositoryUsersStorage },
    { provide: 'APP_GUARD', useClass: JwtAuthGuard },
  ],
  exports: [UsersService],
})
export class UsersModule {}
