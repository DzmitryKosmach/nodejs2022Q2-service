import { Module } from '@nestjs/common';
import { InMemoryArtistsStorage } from './store/in-memory.artists.storage';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { TracksModule } from 'src/tracks/tracks.module';

@Module({
  imports: [TracksModule],
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    { provide: 'ArtistsStore', useClass: InMemoryArtistsStorage },
  ],
  exports: [ArtistsService],
})
export class ArtistsModule {}
