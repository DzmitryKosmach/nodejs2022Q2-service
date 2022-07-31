import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
  ],
  exports: [AlbumsService],
})
export class AlbumsModule {}
