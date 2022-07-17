import { v4 as uuid } from 'uuid';
import { Album } from '../interfaces/album.interface';

export class AlbumEntity implements Album {
  id: string = uuid();
  name: string;
  year: number;
  artistId: string | null = null;

  constructor(
    albumName: string,
    albumYear: number,
    albumArtistId: string | null,
  ) {
    this.name = albumName;
    this.year = albumYear;
    this.artistId = albumArtistId;
  }
}
