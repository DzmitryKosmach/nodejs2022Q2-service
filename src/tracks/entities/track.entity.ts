import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { FavoritesEntity } from 'src/favorites/entities/favorites.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Track } from '../interfaces/track.interface';

@Entity('track')
export class TrackEntity implements Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => ArtistEntity, (artist: ArtistEntity) => artist.id, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: true,
  })
  artistId: string | null;

  @ManyToOne(() => AlbumEntity, (album: AlbumEntity) => album.id, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: true,
  })
  albumId: string | null;

  @Column()
  duration: number;

  @ManyToOne(() => FavoritesEntity, (favorites) => favorites.tracks)
  favorites: FavoritesEntity;
}
