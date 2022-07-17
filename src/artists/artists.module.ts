import { forwardRef, Module } from '@nestjs/common';
import { InMemoryArtistsStorage } from './store/in-memory.artists.storage';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
//import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  imports: [TracksModule, AlbumsModule, forwardRef(() => FavoritesModule)],
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    { provide: 'ArtistsStore', useClass: InMemoryArtistsStorage },
  ],
  exports: [ArtistsService],
})
export class ArtistsModule {}
