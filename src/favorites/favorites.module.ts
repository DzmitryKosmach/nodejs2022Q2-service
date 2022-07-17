import { forwardRef, Module } from '@nestjs/common';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
//import { TracksService } from 'src/tracks/tracks.service';
//import { InMemoryTracksStorage } from 'src/tracks/store/in-memory.tracks.storage';
import { TracksModule } from 'src/tracks/tracks.module';
//import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { InMemoryFavoritesStorage } from './store/in-memory.favorites.storage';

@Module({
  imports: [TracksModule, AlbumsModule, forwardRef(() => ArtistsModule)],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    { provide: 'FavoritesStore', useClass: InMemoryFavoritesStorage },
  ],
  exports: [FavoritesService],
})
export class FavoritesModule {}
