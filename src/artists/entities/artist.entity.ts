import { FavoritesEntity } from 'src/favorites/entities/favorites.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Artist } from '../interfaces/artist.interface';

@Entity('artist')
export class ArtistEntity implements Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  /* @OneToMany(() => TrackEntity, (track) => track.artistId)
  tracks: TrackEntity[]; */

  @ManyToOne(() => FavoritesEntity, (favorites) => favorites.artists)
  favorites: FavoritesEntity;
}
