import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { FavoritesModule } from 'src/favorites/favorites.module';
//import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { AlbumEntity } from './entities/album.entity';
import { RepositoryAlbumsStorage } from './store/repository.albums.storage';
//import { InMemoryAlbumsStorage } from './store/in-memory.albums.storage';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumEntity]),
    //forwardRef(() => TracksModule),
    //forwardRef(() => FavoritesModule),
  ],
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    { provide: 'AlbumsStore', useClass: RepositoryAlbumsStorage },
  ],
  exports: [AlbumsService],
})
export class AlbumsModule {}
