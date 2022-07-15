import { Module } from '@nestjs/common';
import { InMemoryArtistsStorage } from './store/in-memory.artists.storage';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    { provide: 'ArtistsStore', useClass: InMemoryArtistsStorage },
  ],
})
export class ArtistsModule {}
