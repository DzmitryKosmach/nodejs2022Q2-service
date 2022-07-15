import { Module } from '@nestjs/common';
//import { TracksService } from 'src/tracks/tracks.service';
//import { InMemoryTracksStorage } from 'src/tracks/store/in-memory.tracks.storage';
import { TracksModule } from 'src/tracks/tracks.module';
//import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { InMemoryFavoritesStorage } from './store/in-memory.favorites.storage';

@Module({
  imports: [TracksModule],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    { provide: 'FavoritesStore', useClass: InMemoryFavoritesStorage },
    //TracksService,
    //{ provide: 'TracksStore', useClass: InMemoryTracksStorage },
  ],
})
export class FavoritesModule {}
