import { Module } from '@nestjs/common';
import { InMemoryTracksStorage } from './store/in-memory.tracks.storage';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
  controllers: [TracksController],
  providers: [
    TracksService,
    { provide: 'TracksStore', useClass: InMemoryTracksStorage },
  ],
  exports: [TracksService],
})
export class TracksModule {}
