import { Injectable } from '@nestjs/common';
//import { TracksStore } from 'src/tracks/interfaces/track-storage.interface';
import { TracksService } from 'src/tracks/tracks.service';
//import { CreateFavoritesDto } from '../dto/create-favorites.dto';
//import { UpdateFavoritesDto } from '../dto/update-favorites.dto';
import { FavoritesEntity } from '../entities/favorites.entity';
import { FavoritesStore } from '../interfaces/favorites-storage.interface';

@Injectable()
export class InMemoryFavoritesStorage implements FavoritesStore {
  //https://docs.nestjs.com/fundamentals/injection-scopes#usage

  //constructor(@Inject('TracksService') private tracksStorage: TracksService) {}
  favorites: FavoritesEntity = new FavoritesEntity();
  constructor(private readonly tracksService: TracksService) {
    console.log('Construrtor: ' + JSON.stringify(this.favorites));
  }

  //constructor(@Inject('TracksStore') tracksStore: TracksStore) {
  //  const tracksStore1 = tracksStore;
  //}

  /* @Inject('TracksStore')
  private tracksStore: TracksStore; */

  getAll = async (): Promise<FavoritesEntity> => {
    return this.favorites;
  };

  addTrack = async (id: string): Promise<void> => {
    const track = await this.tracksService.findOne(id);
    //const tracks = await this.tracksService.findAll;
    console.log('Favs: add tarck ' + JSON.stringify(this.favorites));
    if (track) {
      //this.favorites.tracks.push(id);
    }
    /* else {
      throw new NotFoundException();
    } */
  };

  addAlbum: (id: string) => Promise<void>;
  addArtist: (id: string) => Promise<void>;
  deleteTrack: (id: string) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;
  deleteArtist: (id: string) => Promise<void>;
}
