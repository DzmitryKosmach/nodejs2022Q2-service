import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Favorites } from '../interfaces/favorites.interface';

@Entity('favorites')
export class FavoritesEntity implements Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //@Column('varchar', { array: true })
  @OneToMany(() => ArtistEntity, (artist) => artist.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  artists: string[];

  @OneToMany(() => AlbumEntity, (album) => album.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  albums: string[];

  @OneToMany(() => TrackEntity, (track) => track.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  tracks: string[];
}
