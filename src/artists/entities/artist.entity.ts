import { AlbumEntity } from 'src/albums/entities/album.entity';
import { FavoritesEntity } from 'src/favorites/entities/favorites.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Artist } from '../interfaces/artist.interface';

@Entity('artist')
export class ArtistEntity implements Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => AlbumEntity, (album) => album.artistId)
  albums: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.artistId)
  tracks: TrackEntity[];

  @ManyToOne(() => FavoritesEntity, (favorites) => favorites.artists, {
    onDelete: 'SET NULL',
  })
  favorites: FavoritesEntity;
}
