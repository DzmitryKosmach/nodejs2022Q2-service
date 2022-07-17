import { v4 as uuid } from 'uuid';
import { Artist } from '../interfaces/artist.interface';

export class ArtistEntity implements Artist {
  id: string = uuid();
  name: string;
  grammy = false;

  constructor(artistName: string, artistGrammy: boolean) {
    this.name = artistName || '';
    this.grammy = artistGrammy || false;
  }
}
