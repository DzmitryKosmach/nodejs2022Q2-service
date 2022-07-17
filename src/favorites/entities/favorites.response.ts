import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
//import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { IFavoritesRepsonse } from '../interfaces/favorites.response.interface';

export class FavoritesRepsonse implements IFavoritesRepsonse {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];

  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
}
