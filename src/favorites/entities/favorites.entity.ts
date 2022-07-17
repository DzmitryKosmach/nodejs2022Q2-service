import { Favorites } from '../interfaces/favourites.interface';

export class FavoritesEntity implements Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];

  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
}
