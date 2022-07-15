//import { CreateFavoritesDto } from '../dto/create-favorites.dto';
//import { UpdateFavoritesDto } from '../dto/update-favorites.dto';
import { FavoritesEntity } from '../entities/favorites.entity';

export interface FavoritesStore {
  getAll: () => Promise<FavoritesEntity>;

  addTrack: (id: string) => Promise<void>;

  addAlbum: (id: string) => Promise<void>;

  addArtist: (id: string) => Promise<void>;

  deleteTrack: (id: string) => Promise<void>;

  deleteAlbum: (id: string) => Promise<void>;

  deleteArtist: (id: string) => Promise<void>;
}
