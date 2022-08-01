import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('favorites')
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => ArtistEntity, (artist) => artist.favorites, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  artists: ArtistEntity[];

  @OneToMany(() => AlbumEntity, (album) => album.favorites, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  albums: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.favorites, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  tracks: TrackEntity[];
}
