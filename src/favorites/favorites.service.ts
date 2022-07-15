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
    this.storage.addTrack(id);
  }

  addAlbum(id: string) {
    console.log('id: ' + id);
    return Promise<void>;
  }

  addArtist(id: string) {
    console.log('id: ' + id);
    return Promise<void>;
  }

  deleteTrack(id: string) {
    console.log('id: ' + id);
    return Promise<void>;
  }

  deleteAlbum(id: string) {
    console.log('id: ' + id);
    return Promise<void>;
  }

  deleteArtist(id: string) {
    console.log('id: ' + id);
    return Promise<void>;
  }
}
