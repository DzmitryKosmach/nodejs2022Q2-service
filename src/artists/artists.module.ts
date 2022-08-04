import { forwardRef, Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { RepositoryArtistsStorage } from './store/repository.artists.storage';
import { JwtAuthGuard } from 'src/auth/auth.guard';
//import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArtistEntity]),
    TracksModule,
    AlbumsModule,
    forwardRef(() => FavoritesModule),
  ],
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    { provide: 'ArtistsStore', useClass: RepositoryArtistsStorage },
    { provide: 'APP_GUARD', useClass: JwtAuthGuard },
  ],
  exports: [ArtistsService],
})
export class ArtistsModule {}
