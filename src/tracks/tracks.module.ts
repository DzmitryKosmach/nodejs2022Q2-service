import { forwardRef, Module } from '@nestjs/common';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { InMemoryTracksStorage } from './store/in-memory.tracks.storage';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
  imports: [forwardRef(() => TracksModule), forwardRef(() => FavoritesModule)],
  controllers: [TracksController],
  providers: [
    TracksService,
    { provide: 'TracksStore', useClass: InMemoryTracksStorage },
  ],
  exports: [TracksService],
})
export class TracksModule {}
