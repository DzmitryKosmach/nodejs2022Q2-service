import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { InMemoryAlbumsStorage } from './store/in-memory.albums.storage';

@Module({
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    { provide: 'AlbumsStore', useClass: InMemoryAlbumsStorage },
  ],
})
export class AlbumsModule {}
