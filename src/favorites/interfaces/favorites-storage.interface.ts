//import { CreateFavoritesDto } from '../dto/create-favorites.dto';
//import { UpdateFavoritesDto } from '../dto/update-favorites.dto';
//import { FavoritesEntity } from '../entities/favorites.entity';
import { IFavoritesRepsonse } from './favorites.response.interface';

export interface FavoritesStore {
  getAll: () => Promise<IFavoritesRepsonse>;

  addTrack: (id: string) => Promise<boolean>;

  addAlbum: (id: string) => Promise<boolean>;

  addArtist: (id: string) => Promise<boolean>;

  deleteTrack: (id: string) => Promise<boolean>;

  deleteAlbum: (id: string) => Promise<boolean>;

  deleteArtist: (id: string) => Promise<boolean>;
}
