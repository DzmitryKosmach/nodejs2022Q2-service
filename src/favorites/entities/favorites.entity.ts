import { Exclude } from 'class-transformer';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('favorites')
export class FavoritesEntity {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => ArtistEntity, (artist) => artist.favorites)
  artists: ArtistEntity[];

  @OneToMany(() => AlbumEntity, (album) => album.favorites)
  albums: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.favorites)
  tracks: TrackEntity[];
}
