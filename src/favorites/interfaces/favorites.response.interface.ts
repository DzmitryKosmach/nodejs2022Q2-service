import { Album } from 'src/albums/interfaces/album.interface';
import { Track } from 'src/tracks/interfaces/track.interface';

export interface FavoritesRepsonse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
