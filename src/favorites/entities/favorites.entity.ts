import { Favorites } from '../interfaces/favourites.interface';

export class FavoritesEntity implements Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}
