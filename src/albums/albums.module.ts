import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { AlbumEntity } from './entities/album.entity';
import { RepositoryAlbumsStorage } from './store/repository.albums.storage';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    { provide: 'AlbumsStore', useClass: RepositoryAlbumsStorage },
    { provide: 'APP_GUARD', useClass: JwtAuthGuard },
  ],
  exports: [AlbumsService],
})
export class AlbumsModule {}
