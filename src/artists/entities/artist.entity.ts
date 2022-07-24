//import { FavoritesEntity } from 'src/favorites/entities/favorites.entity';
import { FavoritesEntityORM } from 'src/favorites/entities/favorites-orm.entity';
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

  @ManyToOne(() => FavoritesEntityORM, (favorites) => favorites.artists)
  favorites: FavoritesEntityORM;
}
