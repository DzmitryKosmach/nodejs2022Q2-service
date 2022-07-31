import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { FavoritesEntity } from './entities/favorites.entity';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { RepositoryFavoritesStorage } from './store/repository.favorites.storage';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoritesEntity]),
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistsModule),
  ],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    { provide: 'FavoritesStore', useClass: RepositoryFavoritesStorage },
  ],
  exports: [FavoritesService],
})
export class FavoritesModule {}
