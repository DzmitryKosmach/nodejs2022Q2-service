import { v4 as uuid } from 'uuid';
import { Track } from '../interfaces/track.interface';

export class TrackEntity implements Track {
  id: string = uuid();
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor(
    trackName: string,
    trackDuration: number,
    trackArtistId: string | null,
    trackAlbumId: string | null,
  ) {
    this.name = trackName;
    this.duration = trackDuration;
    this.artistId = trackArtistId;
    this.albumId = trackAlbumId;
  }
}
