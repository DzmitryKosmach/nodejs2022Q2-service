import { Module } from '@nestjs/common';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { InMemoryAlbumsStorage } from './store/in-memory.albums.storage';

@Module({
  imports: [TracksModule],
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    { provide: 'AlbumsStore', useClass: InMemoryAlbumsStorage },
  ],
  exports: [AlbumsService],
})
export class AlbumsModule {}
