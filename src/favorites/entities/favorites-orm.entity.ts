import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';

@Entity('favorites')
export class FavoritesEntityORM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 36, nullable: true })
  userId: string;

  //Column('varchar', { array: true })
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
