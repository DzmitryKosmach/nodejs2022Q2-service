import { FavoritesEntity } from '../entities/favorites.entity';

export interface FavoritesStore {
  getAll: () => Promise<FavoritesEntity>;

  addTrack: (id: string) => Promise<boolean>;

  addAlbum: (id: string) => Promise<boolean>;

  addArtist: (id: string) => Promise<boolean>;

  deleteTrack: (id: string) => Promise<boolean>;

  deleteAlbum: (id: string) => Promise<boolean>;

  deleteArtist: (id: string) => Promise<boolean>;
}
