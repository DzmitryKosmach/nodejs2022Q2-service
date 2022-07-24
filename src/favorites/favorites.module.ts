import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { TrackEntity } from 'src/tracks/entities/track.entity';
//import { TracksModule } from 'src/tracks/tracks.module';
import { FavoritesEntityORM } from './entities/favorites-orm.entity';
//import { FavoritesEntity } from './entities/favorites.entity';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
//import { InMemoryFavoritesStorage } from './store/in-memory.favorites.storage';
import { RepositoryFavoritesStorage } from './store/repository.favorites.storage';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoritesEntityORM]),
    TypeOrmModule.forFeature([TrackEntity]),
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistsModule),
  ],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    { provide: 'FavoritesStore', useClass: RepositoryFavoritesStorage },
  ],
  exports: [FavoritesService],
})
export class FavoritesModule {}
