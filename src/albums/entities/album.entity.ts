import { FavoritesEntity } from 'src/favorites/entities/favorites.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Album } from '../interfaces/album.interface';

@Entity('album')
export class AlbumEntity implements Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column('varchar', { length: 36, nullable: true })
  /* @ManyToOne(() => ArtistEntity, (artist: ArtistEntity) => artist.id, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: true,
  }) */
  artistId: string | null;

  @ManyToOne(() => FavoritesEntity, (favorites) => favorites.albums)
  favorites: FavoritesEntity;
}
