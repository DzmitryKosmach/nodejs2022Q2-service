import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { FavoritesEntityORM } from 'src/favorites/entities/favorites-orm.entity';
//import { FavoritesEntity } from 'src/favorites/entities/favorites.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Track } from '../interfaces/track.interface';

@Entity('track')
export class TrackEntity implements Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  //@Column('varchar', { length: 36, nullable: true })
  @ManyToOne(() => ArtistEntity, (artist: ArtistEntity) => artist.id, { onDelete: 'SET NULL', nullable: true, eager: true })
  artistId: string | null;

  //@Column('varchar', { length: 36, nullable: true })
  @ManyToOne(() => AlbumEntity, (album: AlbumEntity) => album.id, { onDelete: 'SET NULL', nullable: true, eager: true })
  albumId: string | null;

  @Column()
  duration: number;

  @ManyToOne(() => FavoritesEntityORM, (favorites) => favorites.tracks)
  favorites: FavoritesEntityORM;
}
