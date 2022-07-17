import { Inject, Injectable } from '@nestjs/common';
//import { CreateFavoritesDto } from './dto/create-favorites.dto';
//import { UpdateFavoritesDto } from './dto/update-favorites.dto';
import { FavoritesStore } from './interfaces/favorites-storage.interface';

@Injectable()
export class FavoritesService {
  constructor(@Inject('FavoritesStore') private storage: FavoritesStore) {}

  findAll() {
    return this.storage.getAll();
  }

  addTrack(id: string) {
    return this.storage.addTrack(id);
  }

  addAlbum(id: string) {
    return this.storage.addAlbum(id);
  }

  addArtist(id: string) {
    return this.storage.addArtist(id);
  }

  deleteTrack(id: string) {
    return this.storage.deleteTrack(id);
  }

  deleteAlbum(id: string) {
    return this.storage.deleteAlbum(id);
  }

  deleteArtist(id: string) {
    return this.storage.deleteArtist(id);
  }
}
