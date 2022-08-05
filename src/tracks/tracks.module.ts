import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/auth.guard';
//import { FavoritesModule } from 'src/favorites/favorites.module';
import { TrackEntity } from './entities/track.entity';
import { RepositoryTracksStorage } from './store/repository.tracks.storage';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity])],
  controllers: [TracksController],
  providers: [
    TracksService,
    { provide: 'TracksStore', useClass: RepositoryTracksStorage },
    { provide: 'APP_GUARD', useClass: JwtAuthGuard },
  ],
  exports: [TracksService],
})
export class TracksModule {}
