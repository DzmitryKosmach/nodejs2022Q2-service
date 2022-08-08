import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AlbumsController } from 'src/albums/albums.controller';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsController } from 'src/artists/artists.controller';
import { ArtistsModule } from 'src/artists/artists.module';
import { AuthController } from 'src/auth/auth.controller';
import { AuthModule } from 'src/auth/auth.module';
import { FavoritesController } from 'src/favorites/favorites.controller';
import { TracksController } from 'src/tracks/tracks.controller';
import { TracksModule } from 'src/tracks/tracks.module';
import { UsersController } from 'src/users/users.controller';
import { UsersModule } from 'src/users/users.module';
import { LoggingService } from './logger.service';

@Module({
  imports: [ArtistsModule, AlbumsModule, TracksModule, UsersModule, AuthModule],
})
export class AppLogger implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoggingService)
      .forRoutes(
        ArtistsController,
        AlbumsController,
        TracksController,
        UsersController,
        FavoritesController,
        AuthController,
      );
  }
}
