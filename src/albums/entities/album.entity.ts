import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { FavoritesEntity } from 'src/favorites/entities/favorites.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Album } from '../interfaces/album.interface';

@Entity('album')
export class AlbumEntity implements Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;

  @OneToMany(() => TrackEntity, (track) => track.albumId)
  tracks: TrackEntity[];

  @ManyToOne(() => FavoritesEntity, (favorites) => favorites.albums, {
    onDelete: 'SET NULL',
  })
  favorites: FavoritesEntity;
}
