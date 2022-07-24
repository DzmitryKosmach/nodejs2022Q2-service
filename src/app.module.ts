import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
//import configService from './ormconfig';
//import { UserEntity } from './users/entities/user.entity';

const { POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } =
  process.env;

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: Number(POSTGRES_PORT),
      username: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,
      synchronize: true,
      retryAttempts: 3,
      logNotifications: true,
      entities: ['dist/**/entities/*.entity.js'],
      //entities: [UserEntity],
      //migrations: ['dist/migration/*.js'],
      //migrationsRun: true,
      //migrations: ['src/migration/**/*{.ts,.js}', 'build/migration/**/*.js'],
      //subscribers: ['src/migration/**/*.ts'],
      /* cli: {
            entitiesDir: 'src/entities',
            migrationsDir: 'src/migration',
            subscribersDir: 'src/subscriber',
          }, */
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
